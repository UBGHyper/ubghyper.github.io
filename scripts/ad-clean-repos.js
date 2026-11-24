'use strict';
// Applies scripts/strip-injected-ads.js across the shard/GameList clones and commits ONLY the files it
// changed, so uncommitted work already sitting in those clones is never swept into a commit.
//   node scripts/ad-clean-repos.js              plan only: per repo, files to change and any overlap with pending edits
//   node scripts/ad-clean-repos.js --write      clean the files (no git)
//   node scripts/ad-clean-repos.js --commit     clean + commit the cleaned files in each repo (no push)
//   node scripts/ad-clean-repos.js --push       clean + commit + push each repo's current branch
// Files that are ALREADY modified (uncommitted) in their repo are skipped and listed - those belong to
// someone's in-progress work, and the owner decides when to commit them.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const { stripInjected, MARKER, ADSENSE } = require('./strip-injected-ads.js');
const ROOT = path.resolve(__dirname, '..', '..');
const REPOS = [
  ...[13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3].map(n => path.join(ROOT, 'GamesLists(Active)', `gamelist${n}.github.io`)),
  path.join(ROOT, 'GameList.github.io'),
];
const mode = process.argv.includes('--push') ? 'push' : process.argv.includes('--commit') ? 'commit' : process.argv.includes('--write') ? 'write' : 'plan';
const git = (repo, ...a) => cp.execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', maxBuffer: 1 << 26 });

let _tok;
function shardToken() {
  if (!_tok) _tok = fs.readFileSync(path.join(ROOT, 'git.env'), 'utf8').match(/^GITHUB_TOKEN_SHARD=(.*)$/m)[1].trim().replace(/^["']|["']$/g, '');
  return _tok;
}

function findFiles(repo) {
  const out = [];
  const walk = (d, depth) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === '.git') continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (depth < 3) walk(p, depth + 1); continue; }
      if (!/\.html?$/i.test(e.name)) continue;
      try { if (fs.statSync(p).size > 30 * 1024 * 1024) continue; } catch { continue; }
      const s = fs.readFileSync(p, 'utf8');
      if (!s.includes(MARKER) && !ADSENSE.test(s)) continue;
      const r = stripInjected(s);
      if (r.html !== s && !r.html.includes(MARKER)) out.push({ p, rel: path.relative(repo, p).replace(/\\/g, '/'), html: r.html, saved: s.length - r.html.length });
    }
  };
  walk(repo, 0);
  return out;
}

let total = 0, skipped = 0, committed = 0;
for (const repo of REPOS) {
  const name = path.basename(repo);
  const files = findFiles(repo);
  if (!files.length) { console.log(name.padEnd(24), 'nothing to clean'); continue; }
  const dirty = new Set(git(repo, 'status', '--porcelain', '--untracked-files=no').split('\n').filter(Boolean).map(l => l.slice(3).replace(/"/g, '')));
  const todo = files.filter(f => !dirty.has(f.rel)), held = files.filter(f => dirty.has(f.rel));
  const branch = git(repo, 'branch', '--show-current').trim();
  console.log(`${name.padEnd(24)} ${String(todo.length).padStart(2)} to clean${held.length ? `, ${held.length} HELD (already modified: ${held.map(h => h.rel).join(', ')})` : ''}  [branch ${branch}, ${(todo.reduce((a, f) => a + f.saved, 0) / 1024) | 0} KB]`);
  total += todo.length; skipped += held.length;
  if (mode === 'plan') continue;
  for (const f of todo) fs.writeFileSync(f.p, f.html, 'utf8');
  if (mode === 'write' || !todo.length) continue;
  git(repo, '-c', 'core.safecrlf=false', 'add', '--', ...todo.map(f => f.rel));
  git(repo, '-c', 'core.safecrlf=false', 'commit', '-q', '-m',
    `Remove ads embedded in ${todo.length} game page${todo.length === 1 ? '' : 's'}\n\nStrips the gn-math sidebar-ad injector and pasted AdSense units (scripts/strip-injected-ads.js in the site repo).\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`);
  committed++;
  if (mode === 'push') {
    // shard repos live on the freeonlinewebtools account, whose token is in ../git.env (never printed or
    // stored in config); GameList is on the other account and uses the machine's own credentials.
    const remote = git(repo, 'remote', 'get-url', 'origin').trim();
    const auth = /freeonlinewebtools/i.test(remote) ? ['-c', 'http.extraheader=AUTHORIZATION: basic ' + Buffer.from('x-access-token:' + shardToken()).toString('base64')] : [];
    const r = cp.spawnSync('git', [...auth, '-C', repo, 'push', 'origin', branch], { encoding: 'utf8' });
    console.log('   push:', r.status === 0 ? 'ok ' + (r.stderr.trim().split('\n').pop() || '') : 'FAILED ' + r.stderr.trim().slice(-200));
  }
}
console.log(`\n${mode}: ${total} file(s) across ${REPOS.length} repos${skipped ? `, ${skipped} held back` : ''}${committed ? `, ${committed} commit(s)` : ''}`);

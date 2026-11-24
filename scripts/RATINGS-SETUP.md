# Real game ratings (Firebase) — setup

The code is already wired up. Ratings stay invisible/local-only until you add a
Firebase project. No fake ratings are ever shown — `AggregateRating` schema is
only baked into a game page once it has **5+ real votes**.

## One-time setup (~5 min)

1. **Create a Firebase project** at <https://console.firebase.google.com> (free "Spark" plan is fine).
2. **Create a Cloud Firestore database** (Build → Firestore Database → Create database → *Production mode* → pick a region).
3. **Publish the security rules**: Firestore → Rules tab → paste the contents of [`firestore.rules`](../firestore.rules) → Publish.
4. **Get your web config**: Project settings (gear icon) → General → "Your apps" → add a Web app (`</>`). Copy the `projectId` and `apiKey`.
5. **Fill in** [`assets/firebase-config.json`](../assets/firebase-config.json):
   ```json
   { "projectId": "your-project-id", "apiKey": "AIza...your-web-key" }
   ```
   (The web API key is a public identifier, safe to commit — security is the rules, not the key.)
6. Commit + push. Visitors can now rate games; the live average shows under the stars.

## Showing review stars in Google

Votes accumulate in Firestore. To bake the real numbers into each page's schema
(what Google reads for star snippets), run periodically and push:

```bash
node scripts/gen-ratings.js     # pulls live aggregates → assets/ratings.json
node scripts/gen-game-pages.js  # bakes AggregateRating into pages with 5+ votes
git add -A && git commit -m "Update rating snapshots" && git push
```

Automate it later with a GitHub Action on a weekly cron if you like.

## How it works
- `assets/js/ratings.js` — reads the live aggregate per game and submits one vote per device (guarded by `localStorage` key `ubg_rated`).
- `firestore.rules` — anyone can read; a write must be exactly +1 vote (count +1, sum +1..5).
- `scripts/gen-ratings.js` — snapshots aggregates into `assets/ratings.json`.
- `scripts/gen-game-pages.js` — emits `AggregateRating` only when `count >= 5` (the `RATING_THRESHOLD`).

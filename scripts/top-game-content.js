// Hand-written long-form content for the top 10 traffic games on UBGHyper.
// Used by gen-game-pages.js — if a game's URL key is present here, the generator
// substitutes the auto-generated About + FAQ blocks with this curated version
// and adds a "How to play" section.
//
// To add another game, add a new entry keyed by the game's `url` from games.json.

module.exports = {

  'Drive-Mad': {
    longdesc: `Drive Mad is a physics-based driving puzzle where balance matters more than speed. You control a tiny vehicle navigating absurd obstacle courses — ramps, swinging hammers, narrow ledges, falling pillars — and your goal is simple: reach the flag without flipping over. Sounds easy. It isn't.

The genius of Drive Mad is its single-button gameplay paired with a physics engine that punishes overconfidence. Hit the gas too hard on an incline and your wheels lose grip. Don't accelerate enough on a jump and you stall in mid-air. Lean too far back at speed and you flip onto your roof. Every level is a tiny puzzle of when to push the throttle and when to ease off.

Drive Mad has dozens of levels that escalate steadily. The early stages teach you the rhythm — short ramps, gentle inclines, simple gaps. By level 20 you're juggling moving platforms, falling pillars, and timing windows that close in seconds. The community-favourite is the level where you have to drive across a row of dominoes without knocking the next one too soon.

It's free, runs in any browser, and works perfectly at school. Drive Mad has become one of the most-played unblocked games of 2026 — partly because the physics is fun, partly because the levels are short enough to retry without frustration. A failed run takes 5 seconds; a winning run takes 30. That ratio is why people get hooked.

Play Drive Mad unblocked at UBGHyper alongside other physics classics like Happy Wheels, Getting Over It, and Drift Boss.`,
    controls: `<strong>Right arrow</strong> or <strong>D</strong> — accelerate forward. <strong>Left arrow</strong> or <strong>A</strong> — reverse or brake. That's the entire control scheme. The challenge is in <em>when</em> to use the gas, not how often.`,
    tips: [
      'Lift off the throttle just before steep ramps so you don\'t fly off backwards.',
      'On narrow ledges, pulse the gas — short taps keep you balanced.',
      'Always have a finger ready on the reverse to recover from a bad lean.',
      'Slow runs beat fast runs. Speed flips the car; patience finishes the level.',
    ],
    faqs: [
      { q: 'How many levels does Drive Mad have?', a: 'Drive Mad has over 100 levels in the main campaign, with new community levels added in updates.' },
      { q: 'Is Drive Mad better with a keyboard or touchscreen?', a: 'Drive Mad plays well on both. Keyboards give finer control over the throttle; touchscreens are fine for casual play. Most experienced players prefer keyboard.' },
      { q: 'How do I unlock the secret levels in Drive Mad?', a: 'Some advanced levels unlock once you complete the main set without using too many retries on a single stage. Stunt levels appear after you finish the main campaign.' },
      { q: 'Is Drive Mad free to play on UBGHyper?', a: 'Yes — Drive Mad is 100% free on UBGHyper with no sign-up, no pop-ups, and no premium tier.' },
      { q: 'What other games are like Drive Mad?', a: 'If you like Drive Mad, try Happy Wheels (more chaotic), Getting Over It (slower but harder), Drift Boss (one-button driving), and Eggy Car (similar physics but with an egg).' },
      { q: 'Who made Drive Mad, and is this the Fancade version?', a: 'Drive Mad was created by Martin Magni and first launched in the Fancade app. UBGHyper runs the full browser version unblocked — the same Drive Mad you find on Fancade or Poki, but with no download and no pop-ups, so you can play Drive Mad online for free at school.' },
    ],
  },

  'Slope': {
    longdesc: `Slope is the iconic infinite ball-roller. You control a chrome ball hurtling down a neon canyon, dodging red blocks, narrow gaps, and the inevitable cliff. The track never ends and the ball never slows down. Your only inputs are left and right.

What makes Slope a 10-year evergreen is how the difficulty curves. The first 30 seconds are easy — wide track, slow speed, obvious obstacles. The next 30 seconds are tense as the ball accelerates and the track narrows. Past one minute, you're reading patterns by reflex alone, hands tight on the keys, brain pattern-matching colours and angles a second ahead of where you actually are.

Slope's leaderboard culture is part of its charm. Kids at school compete for the highest score. Teachers pretend not to notice the ball-rolling. Reaching 1000 metres is a flex; 2000 is rare; 5000 is mythical. The game makes no concessions to skill — there's no shop, no upgrades, no powers. You either dodge or you don't.

The physics in Slope are more nuanced than they look. The ball has momentum, so corrections take time. Tilted ramps in the track mean the ball curves even when you're not steering. Veteran players use ramps to control speed — letting the ball drift sideways into the wall to slow down before tight sections.

Play Slope unblocked at UBGHyper, with no downloads and instant load. If you like Slope try Tunnel Rush 2, Run 3, and Snow Rider 3D — same arcade ball-roller energy with their own twists.`,
    controls: `<strong>Left arrow</strong> or <strong>A</strong> — steer left. <strong>Right arrow</strong> or <strong>D</strong> — steer right. There's no jump, no brake, no acceleration. Just steering.`,
    tips: [
      'Don\'t over-correct. Tap the keys in short bursts; held inputs send you off the edge.',
      'The ball drifts on tilted ramps. Use them to slow down by drifting wide.',
      'Red blocks are lethal. White blocks are just walls — touching them ends the run too.',
      'Look two screens ahead, not one. The ball is going faster than you think.',
    ],
    faqs: [
      { q: 'What\'s the world record on Slope?', a: 'Top scores cluster around 200,000+ metres. Online communities track records on YouTube and Speedrun.com.' },
      { q: 'How do I make the ball go faster in Slope?', a: 'You can\'t. The ball auto-accelerates over time. The longer you survive, the faster you go.' },
      { q: 'Why does the ball jump on its own sometimes?', a: 'Slope has small ramps built into the track. Your ball goes airborne, then lands. It looks random but it\'s part of the level pattern.' },
      { q: 'Is Slope unblocked at UBGHyper free?', a: 'Yes — Slope on UBGHyper is 100% free, no ads on the game, no sign-up needed.' },
      { q: 'Can I play Slope on a phone?', a: 'Slope works on phones via touchscreen, but keyboard play is significantly better. Most players run it on Chromebooks at school.' },
    ],
  },

  'Basket-Random': {
    longdesc: `Basket Random is a one-button basketball game where two cartoon characters with rubber-band physics flop around a court trying to dunk on each other. It's deliberately stupid and absolutely fun.

The brilliance of Basket Random is its single-input design. Both you and the AI use the same key — pressing it makes your character jump up, swing arms, and (sometimes) shoot the ball. The physics are intentionally ragdoll. Players flop, rebound, fall over, and occasionally accidentally score from across the court. Every match is unpredictable.

Each round is first-to-5 baskets. Backgrounds change between rounds — basketball court, beach, snowy field, retro 8-bit gym. The characters change too: pot-bellied refs, sumo wrestlers, ninjas, robots. The randomness is the gameplay. Strategy exists (timing the jump, position before pressing), but luck dominates.

Basket Random is built for two-player local couch play. One player on W, one player on Up Arrow. It's the kind of game that becomes a playground tournament — passed around between friends until someone wins by a hilarious margin. The single-player mode against AI is fine but the real game is two-player.

The game has spawned a whole genre of "Random" games on the same physics engine — Soccer Random, Basket Champs, Volley Random. Basket Random remains the most popular because basketball's stop-start rhythm fits the chaos engine perfectly.

Play Basket Random unblocked at UBGHyper. The two-player option works on a single keyboard.`,
    controls: `<strong>1-Player:</strong> W to jump/shoot. <strong>2-Player:</strong> W (player 1) and Up Arrow (player 2). Both players play on the same keyboard.`,
    tips: [
      'Press W at the peak of your jump for the most controlled shots.',
      'Don\'t hold the key — short presses give cleaner shots than held inputs.',
      'Position matters more than timing. Get under the basket before pressing.',
      'In 2-player, block your opponent by jumping when they jump.',
    ],
    faqs: [
      { q: 'How do I play 2-player Basket Random?', a: 'Player 1 uses W, Player 2 uses the Up Arrow. Both players play on the same keyboard, no second device needed.' },
      { q: 'Is Basket Random on UBGHyper free?', a: 'Yes — Basket Random on UBGHyper is 100% free with no pop-ups.' },
      { q: 'How do you win a round?', a: 'First to 5 baskets wins. The first character with 5 points takes the round and the game moves to a new background.' },
      { q: 'Why are the physics so weird in Basket Random?', a: 'The ragdoll physics are intentional. The game is built around the chaos. There\'s no realism setting.' },
      { q: 'What other games are like Basket Random?', a: 'Try Soccer Random, Basket Champs, Volley Random, and Basketball Stars — all use similar physics-based two-player mechanics.' },
    ],
  },

  'Polytrack-New': {
    longdesc: `Polytrack is the modern evolution of low-poly arcade racers. Built in WebGL with a clean blocky aesthetic and tight physics, you race AI cars or your own ghost on community-built tracks of every imaginable difficulty.

The core appeal of Polytrack is its track editor and time-attack mode. Anyone can build a track and share it; the community has produced thousands of levels ranging from 30-second fun runs to 10-minute marathons of loops, jumps, and impossible-looking corners. Speedrun culture has formed around the game with leaderboards on every popular track.

Polytrack's physics are the sweet spot between arcadey and realistic. Cars grip the road during normal driving but slide gracefully through corners when you brake into them. There's no damage system — you can clip walls and survive, just slower. Drifting is encouraged because it's faster.

The visual style — pastel low-poly with chunky shadows and clean geometry — keeps frame rates high on Chromebooks where most players run it. Polytrack runs smoothly even on weak school laptops, which is part of why it's exploded as an unblocked games staple in 2026.

Play Polytrack New unblocked at UBGHyper. The "New" version has the latest tracks; "Modded" has community-built tracks; "Old" preserves the original 2024 feel for nostalgic players.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> to drive. <strong>Up</strong> to accelerate, <strong>Down</strong> to brake/reverse, <strong>Left/Right</strong> to steer. <strong>Spacebar</strong> for handbrake on most builds.`,
    tips: [
      'Use the handbrake to enter tight corners faster.',
      'Don\'t over-steer mid-corner — let the car drift through naturally.',
      'On long straights, hold Up and don\'t touch anything else — that\'s the fastest way through.',
      'Watch the apex of each corner. Cut as close as you can without clipping.',
    ],
    faqs: [
      { q: 'What\'s the difference between Polytrack New and Polytrack Old?', a: 'Polytrack New is the latest version with updated tracks and physics. Old preserves the original 2024 build for players who prefer the older feel. Modded includes community-built tracks.' },
      { q: 'Can I make my own Polytrack levels?', a: 'The original game has a track editor. Whether the editor is enabled in the UBGHyper embed depends on the build version.' },
      { q: 'Are the leaderboards live on UBGHyper?', a: 'The full multiplayer leaderboards run on the official Polytrack server. The UBGHyper embed is single-player time-attack focused.' },
      { q: 'Is Polytrack free?', a: 'Yes — Polytrack on UBGHyper is 100% free.' },
      { q: 'What other games are like Polytrack?', a: 'Try Drift Boss, Drive Mad, and the Moto X3M series for similar racing-puzzle vibes.' },
    ],
  },

  '2048': {
    longdesc: `2048 is the most-cloned puzzle game of the last decade. Combine matching numbered tiles on a 4x4 grid by sliding them in any of four directions. Two 2s become a 4, two 4s become 8, and you keep doubling until — in theory — you reach 2048.

In practice you don't. 2048 is sneakily hard. Every move slides every tile, so a single mis-direction can collapse your carefully built corner stack. Master players use the "snake" strategy: keep your highest tile in one corner and only ever slide three of the four directions, never breaking the corner. Even with optimal play, RNG matters — a single bad spawn position can end an otherwise perfect run.

The game has been a productivity sinkhole since 2014. It's instant to start, has no music, no narrative, no graphics beyond colored squares, and yet players burn hours on it. Every modern phone OS shipped with a clone at some point.

2048 became a school-network favourite because it loads instantly and quits cleanly. Pull up a tab, slide for 5 minutes, close the tab. No save loss. No FOMO. No social pressure. It's the calmest game on UBGHyper.

The 2048 community has produced spinoffs — 2048 Cupcakes, Doge 2048, Threes (the spiritual predecessor), and infinite-mode hacks. The original remains the cleanest experience.

Play 2048 unblocked at UBGHyper.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> to slide tiles. On touchscreen, swipe in any direction.`,
    tips: [
      'Pick a corner and never let your highest tile leave it.',
      'Avoid the up-arrow once your stack is built — it scrambles your bottom-row.',
      'Plan three moves ahead. Once your board is half-full, every move matters.',
      'The "snake" pattern: build a chain of decreasing values along one row, never break the chain.',
    ],
    faqs: [
      { q: 'Has anyone ever reached 2048?', a: 'Yes — many players reach 2048. Top players have reached 8192 and even 16384 with patience and strategy.' },
      { q: 'Is 2048 just luck?', a: 'Mostly skill, partly luck. New tiles spawn randomly, but a skilled player can consistently reach 2048 in 10-20 minutes.' },
      { q: 'What\'s the best strategy for 2048?', a: 'The corner snake: keep your highest tile in one corner, only slide three directions, build a chain of decreasing values along one row.' },
      { q: 'Is 2048 free on UBGHyper?', a: 'Yes — 100% free, no ads, no account.' },
      { q: 'What\'s the difference between 2048 and Threes?', a: 'Threes (released earlier) requires combining 1+2 to make 3, then 3+3 = 6. 2048 simplified the math to just doubling matching numbers, which made it more popular.' },
    ],
  },

  'Crossy-Road': {
    longdesc: `Crossy Road is Frogger reborn for the touchscreen generation. You control a chicken (or one of dozens of unlockable characters) crossing endless lanes of cars, rivers, and railroads. One mistake — a car, a log gap, a train — and you're done.

What separates Crossy Road from its arcade predecessor is the unlock economy and the presentation. Each game earns coins; coins buy random characters from a gacha machine. Some characters are simple skins; others change the game world (the Yeti turns the road into snow; the South Park characters turn the world into Colorado).

The gameplay loop is brutally simple but tight. Every decision is a tap. Each tap commits — you can't undo a step into traffic. Skilled players read the patterns of approaching cars three lanes ahead, plan jumps across log clusters, and sprint through gaps that look impossible to a beginner.

Crossy Road plays beautifully on Chromebooks because it's framerate-stable and uses small files. It's been an unblocked-games staple since 2016 and shows no sign of fading.

The 100+ unlockable characters give Crossy Road serious replay value. Some change game mechanics (the dragon breathes fire; the wizard slows time briefly). The character chase is what brings players back even after they've mastered the road-crossing.

Play Crossy Road unblocked at UBGHyper.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong>. <strong>Up</strong> — hop forward. <strong>Left/Right</strong> — sidestep. <strong>Down</strong> — backstep.`,
    tips: [
      'Don\'t stop moving — hawks and birds will eat you if you idle too long.',
      'Cross logs at the gap angle, not perpendicular — sidestep across narrow gaps.',
      'Save coins for the gacha — single characters don\'t matter, but unlocking enough changes the game.',
      'The faster you cross, the more bonus points you earn.',
    ],
    faqs: [
      { q: 'How do I unlock new characters in Crossy Road?', a: 'Save up coins from runs and use the gacha (prize machine). Characters drop randomly. UBGHyper hosts the free web version where most are unlock-only.' },
      { q: 'What\'s the highest score in Crossy Road?', a: 'The game continues indefinitely. Top players reach 1000+ steps; the game gets relentlessly harder past 500.' },
      { q: 'Can I play Crossy Road on a phone?', a: 'Yes, Crossy Road plays well on touch — tap forward, swipe to sidestep. UBGHyper hosts the WebGL build that works on all devices.' },
      { q: 'Is Crossy Road free?', a: 'Yes. Crossy Road on UBGHyper is 100% free with no ads on the game.' },
      { q: 'What\'s the rarest character in Crossy Road?', a: 'Several "secret" characters are pulled from low-percentage gacha rolls. Lucky players collect 50+ in a long session.' },
    ],
  },

  'Bloons-TD-5': {
    longdesc: `Bloons Tower Defence 5 is the franchise peak. Every monkey tower, every upgrade path, every map, and every game mode the series spent a decade refining is here in one polished package — and it's free in your browser.

The premise is simple: balloons (called "bloons") follow a path from spawn to exit. You place monkey towers along the path that pop the bloons before they escape. Money from popping bloons buys more towers and upgrades. Make it through 100+ rounds without letting too many bloons through.

What makes Bloons TD 5 the franchise's best is the upgrade depth. Each tower has two specialization paths with 4 tiers each. The Sniper monkey can become a deadly long-range bullet specialist OR a slow, area-denial cannon. The Boomerang can be a hit-everything-you-pass tank OR a single-target precision hammer. Combinations matter — paired towers deal more damage than the sum of their parts.

The game has hundreds of hours of content. Beyond the main maps there's Apopalypse mode (bloons spawn continuously), Reverse mode (bloons go backward), Deflation mode (no money earned), and the brutal Special Missions. Speedrunners attempt fastest-NLL (No Lives Lost) clears across all maps.

Bloons TD 5 is the perfect study-procrastination game because rounds take 3-5 minutes each. You can pause anytime, walk away, come back. The save system in UBGHyper preserves your progress between sessions.

Play Bloons TD 5 unblocked at UBGHyper. If you like it, try Bloons TD 4 (the predecessor), Kingdom Rush (the spiritual cousin), and Bubble Tanks TD.`,
    controls: `Mouse only — click towers in the sidebar to place them, click placed towers to buy upgrades.`,
    tips: [
      'Spam Dart Monkeys with the Triple Darts upgrade for the early-game.',
      'Always have at least one Super Monkey by round 60.',
      'Buy a Banana Farm by round 15 — passive income wins late-game.',
      'Diversify damage types: physical, sharp, fire, and explosive each pop different bloon types.',
    ],
    faqs: [
      { q: 'Is Bloons TD 5 better than Bloons TD 6?', a: 'They serve different audiences. BTD 5 is browser-perfect, plays free on UBGHyper, and is faster-paced. BTD 6 is a paid mobile/Steam release with more towers but more grind.' },
      { q: 'How many rounds does Bloons TD 5 have?', a: 'The standard mode goes to round 85; freeplay continues indefinitely past that with escalating difficulty.' },
      { q: 'Are there cheats for Bloons TD 5?', a: 'The web version doesn\'t have official cheats. Some browser extensions modify save data; UBGHyper doesn\'t recommend or support them.' },
      { q: 'Is Bloons TD 5 free on UBGHyper?', a: 'Yes — 100% free, no in-app purchases, no ads on the game.' },
      { q: 'What\'s the strongest tower in Bloons TD 5?', a: 'The Sun God (Super Monkey 4-2 path) has the highest single-tower DPS. The Phoenix from the Engineer also dominates late-game.' },
    ],
  },

  'Stickman-Hook': {
    longdesc: `Stickman Hook is the ultimate one-button parkour game. You play a stickman swinging through 100+ levels by attaching a grappling hook to floating ring anchors. Time your release to fly to the next ring. Land on the platform. Repeat.

The genius of Stickman Hook is its momentum-based feel. Every level is a Tarzan-puzzle: when do you grab? When do you let go? The early levels teach the basics — short swings, easy gaps. By level 50 you're chaining 5-ring sequences across enormous gaps with one-frame timing windows. Get it right and you flow like water. Get it wrong and you slam face-first into a wall.

The presentation is clean. Color-coded skins, smooth physics, no UI clutter. Every level is short — most take 10-30 seconds — which makes the "just one more" loop relentless. The game has spawned skin-collection meta with dozens of unlockable characters.

Stickman Hook works perfectly on Chromebooks and phones. The single-input design (hold to grab, release to let go) makes it ideal for laptops without good keyboards.

The community of Stickman Hook speedrunners has produced sub-second clears of every level. Watching a top player flow through level 89 in 8 seconds is mesmerizing — the whole run looks like one continuous motion with no "thinking" beats.

Play Stickman Hook unblocked at UBGHyper.`,
    controls: `<strong>Mouse hold</strong> or <strong>Spacebar</strong> — grabs the nearest ring. Release to let go.`,
    tips: [
      'Release at the apex of your swing for maximum forward momentum.',
      'Don\'t grab too early — let yourself swing in close before attaching.',
      'Failed first attempt? Watch where you fell and adjust your release timing by half a beat.',
      'Walls are death. Always release toward open air, never toward solid surfaces.',
    ],
    faqs: [
      { q: 'How many levels does Stickman Hook have?', a: 'The main game has 100+ levels with new ones added in updates.' },
      { q: 'Are there power-ups in Stickman Hook?', a: 'Some advanced levels include speed boosts and gravity zones, but the core mechanics stay one-button throughout.' },
      { q: 'How do I unlock new skins?', a: 'Earn coins from completing levels. Skins drop in random rewards or can be bought directly with accumulated coins.' },
      { q: 'Is Stickman Hook free?', a: 'Yes — 100% free on UBGHyper.' },
      { q: 'What other games are like Stickman Hook?', a: 'Try Vex 8, Run 3, and Tanuki Sunset for similar momentum-based platforming.' },
    ],
  },

  'Gladihoppers': {
    longdesc: `Gladihoppers is a 2D physics-based gladiator brawler where the fighting is as much about staying upright as it is about hitting your opponent. Two pixel-art gladiators hop around a tiny arena, swinging weapons, stumbling, and occasionally landing a kill by complete accident. It is ridiculous, competitive, and deeply entertaining.

The gameplay is built on a simple physics engine where every swing affects your character's balance. Thrust a spear too hard and you overextend and fall. Miss a sword swipe and your momentum carries you off-platform. The janky feel is the entire point — the "skilled" play in Gladihoppers is learning to weaponize the chaos rather than fight it.

The weapon variety is where the game gets deep. Spears have range but low damage. Swords are balanced. Axes deal massive damage but swing slowly. Morningstars pin the enemy. Each combination creates a different rhythm of combat. Two spear fighters play completely differently from a sword vs axe matchup.

Character progression lets you upgrade your gladiator between matches — stats, weapons, and armor. The campaign mode sends you through a growing roster of enemy gladiators, each with their own weapon preference and combat pattern. By the end you're reading their rhythm and exploiting their overextensions like a veteran.

Gladihoppers is exceptional as a two-player couch game. Both players on the same keyboard, same chaotic arena, yelling at each other — it's peak local-multiplayer energy.

Play Gladihoppers unblocked at UBGHyper.`,
    controls: `<strong>WASD</strong> — move and jump. <strong>F</strong> or <strong>Left-click</strong> — attack. In 2-player: Player 2 uses <strong>Arrow keys</strong> + <strong>Enter/NumPad</strong>.`,
    tips: [
      'Don\'t spam the attack button — overextending leaves you wide open.',
      'Hop backward before attacking: it puts you out of range after the swing.',
      'Spear has the longest range — use it to poke safely from distance.',
      'In campaign mode, let the enemy swing first and punish the recovery.',
    ],
    faqs: [
      { q: 'Can I play Gladihoppers 2-player?', a: 'Yes — Gladihoppers has a 2-player local mode on the same keyboard. Player 1 uses WASD/F, Player 2 uses Arrow keys.' },
      { q: 'How many weapons are in Gladihoppers?', a: 'The game features spears, swords, axes, morningstars, shields, and more — each with different reach and swing timing.' },
      { q: 'Is Gladihoppers hard?', a: 'The early campaign is approachable. Later enemies have much better balance and timing. The chaotic physics mean even skilled players get surprised.' },
      { q: 'Is Gladihoppers free on UBGHyper?', a: 'Yes — fully free, no account needed.' },
      { q: 'What games are similar to Gladihoppers?', a: 'Try Stick War, Super Smash Flash, and Iron Snout for similar physics-brawler energy with different mechanics.' },
    ],
  },

  'Bendy': {
    longdesc: `Bendy and the Ink Machine is a first-person horror adventure set in a 1930s animation studio that has gone catastrophically wrong. You play Henry, an animator who returns to his old workplace after 30 years to find it flooded with black ink, overrun by cartoon creatures, and haunted by Bendy — the studio's ink-drenched mascot brought terrifyingly to life.

The game's genius is its aesthetic. Everything is styled like a depression-era cartoon but rendered in a dirty, decayed 3D world. Posters on walls. Desks covered in sketches. Machinery that still runs. The normalcy of the studio props clashing with the horror of what inhabits them creates a tension that jump-scare-heavy games can't match.

Chapter 1 sets the tone: you explore the studio, find Henry's old workspace, start a generator — and then Bendy appears. The encounter teaches you a core lesson: running is usually better than fighting. Bendy is a puzzle first and a horror game second.

Bendy's story unfolds through audio logs, written notes, and environmental storytelling. What happened to the studio? What did Joey Drew do to his staff? The mystery is compelling enough that players tear through all five chapters hungry for answers.

The ink physics are also remarkable — pools of ink slow you down, ink creatures patrol corridors, and the whole world slowly drips. It creates the sense that the studio itself is alive and hostile.

Play Bendy and the Ink Machine unblocked at UBGHyper.`,
    controls: `<strong>WASD</strong> — move. <strong>Mouse</strong> — look around. <strong>E</strong> — interact. <strong>Shift</strong> — run. <strong>Left-click</strong> — use item/weapon.`,
    tips: [
      'When Bendy appears, sprint immediately — don\'t stand and fight.',
      'Collect everything you find — items used later are rare and not respawnable.',
      'Audio logs tell most of the story — listen to every one you find.',
      'The bathroom stalls in Chapter 1 are hiding spots. Remember that for later.',
    ],
    faqs: [
      { q: 'How many chapters does Bendy have on UBGHyper?', a: 'UBGHyper hosts the Bendy Chapter 1 web build. The full 5-chapter game is available on Steam and mobile.' },
      { q: 'Is Bendy scary?', a: 'Bendy is atmospheric horror — tense, creepy, with some jump scares. It\'s rated E10+ in most markets so it\'s appropriate for school age but not for sensitive players.' },
      { q: 'Who is Bendy in the game?', a: 'Bendy is the ink-covered mascot of the fictional Joey Drew Studios — a rubber-hose cartoon character that has come to life in a corrupted form and now hunts intruders.' },
      { q: 'Does Bendy have a story?', a: 'Yes — the story unfolds through audio logs, written notes, and cutscenes across 5 chapters. It covers what happened to the studio staff and what Joey Drew was experimenting with.' },
      { q: 'Is Bendy free on UBGHyper?', a: 'Yes — the Chapter 1 web build is fully free on UBGHyper.' },
    ],
  },

  'Jelly-Drift': {
    longdesc: `Jelly Drift is a hypnotic one-button driving game where you steer a wobbly car through winding tracks by alternating between drifting left and drifting right. No brakes. No throttle. Just the angle of the drift and your timing.

The car permanently accelerates. Your only control is the direction of the drift. Hold right and the car curves right. Release and it curves left. The entire game is the dance between those two states — timing when to hold and when to release to thread your jelly car through increasingly tight courses without hitting the walls.

The visual style is the game's biggest draw. Every element has a soft, gelatinous bounce: the car wobbles, the track shimmers, the walls ripple. The color palette shifts between levels in gentle gradients. Jelly Drift is somehow one of the most relaxing games on UBGHyper despite being a racing game.

The difficulty curve is elegant. Early levels are wide, forgiving, and slow. Later levels tighten into hairpin bends where the car barely fits and the drift window is a fraction of a second. High levels play more like rhythm games — the drift inputs become muscle memory and you stop thinking consciously about where to go.

Jelly Drift has a clean minimalist leaderboard. Your best time on each course is saved locally and the global leaderboard shows the fastest runs. Chasing sub-second improvements on a course you've done 40 times is the purest form of score attack.

Play Jelly Drift unblocked at UBGHyper.`,
    controls: `<strong>Hold left-click</strong> or <strong>hold spacebar</strong> to drift right. Release to drift left. That's everything.`,
    tips: [
      'On tight right corners, hold early and release late. On left corners, do the opposite.',
      'The car moves faster over time — time your drifts a fraction sooner on long tracks.',
      'If you\'re hitting the outside wall, you\'re releasing too late. Shorten your hold.',
      'Don\'t panic-correct — oversteering causes a chain of corrections that send you off track.',
    ],
    faqs: [
      { q: 'How many levels does Jelly Drift have?', a: 'Jelly Drift has progressively harder courses. The count depends on build version — UBGHyper hosts the full available web build.' },
      { q: 'Is Jelly Drift good on a phone?', a: 'Yes — the single-hold input works perfectly on touchscreen. Tap and hold = drift right, release = drift left.' },
      { q: 'Who made Jelly Drift?', a: 'Jelly Drift was developed by Dani, an indie developer known for highly polished small games.' },
      { q: 'Is Jelly Drift free?', a: 'Yes — fully free on UBGHyper, no sign-up.' },
      { q: 'What games are like Jelly Drift?', a: 'Try Drift Boss (same one-button drift concept, different aesthetic) and Tanuki Sunset (skateboard drifting, chilled vibes).' },
    ],
  },

  'AmongUs-Online-2': {
    longdesc: `Among Us Online is a free browser recreation of the hit social deduction game. Up to 10 players join a shared spaceship, complete tasks — wiring panels, scanning, fuelling — and argue about who among them is secretly murdering the crew. The impostors kill in silence. The crewmates investigate in panic. Both sides lie constantly.

What makes Among Us the most social game in school history is that it requires no game skill at all. You win or lose on rhetoric. A nervous laugh in the meeting room is evidence. Blaming someone the instant a body is found is suspicious. Being too quiet is suspicious. Being too loud is suspicious. It's a pressure cooker of paranoia.

Among Us Online Server 2 is the second server version of the UBGHyper-hosted browser build, providing additional capacity for when Server 1 is busy. It uses the same game client with an alternative server connection so your friends can always find a slot.

The meta of Among Us evolves rapidly. The community has developed frameworks — "hard claiming" (asserting your alibi before anyone asks), "calling code red" (announcing kill count), and "self-reporting" suspicion analysis. Most school groups develop their own vocabulary for what they call certain behaviours.

Impostors win by eliminating crewmates faster than tasks are completed, by sabotaging critical systems (Reactor, Oxygen), or by voting crewmates out in meetings. Crewmates win by completing all tasks or voting all impostors out.

Play Among Us Online Server 2 unblocked at UBGHyper.`,
    controls: `<strong>WASD</strong> or <strong>Arrow keys</strong> to move. <strong>E</strong> to use/interact. <strong>Q</strong> to kill (impostors only). <strong>R</strong> to report a body. <strong>Spacebar</strong> to call emergency meeting.`,
    tips: [
      'Crewmates: complete visual tasks like Card Swipe where others can watch you do the animation.',
      'Impostors: kill early in the round and move toward a group before the body is found.',
      'Keep track of where people say they were — contradictions win meetings.',
      'Vent paths are your best escape route as impostor — memorise them before killing.',
    ],
    faqs: [
      { q: 'What\'s the difference between Server 1 and Server 2 for Among Us Online?', a: 'Server 2 is an additional capacity server for when Server 1 is full. Same game, alternative connection for busy periods.' },
      { q: 'How many players can play Among Us Online?', a: 'Among Us supports 4-10 players per lobby. The more players the harder it is for impostors to blend in.' },
      { q: 'Is Among Us Online free?', a: 'Yes — fully free on UBGHyper, no account required to join public lobbies.' },
      { q: 'How do you win as impostor?', a: 'Kill crewmates to outnumber them, then win the vote. Alternatively, trigger a critical sabotage (Reactor/Oxygen) and let it run out while crewmates fail to fix it.' },
      { q: 'How do you win as crewmate?', a: 'Complete all tasks, or vote all impostors out in meetings. Keep track of suspicious behaviour and be vocal in discussions.' },
    ],
  },

  'Minecraft': {
    longdesc: `Minecraft 1.12 is one of the most beloved versions of the most popular game ever made, running directly in your browser with no download. This is classic Minecraft — the version many players grew up with — with full creative and survival modes, biome exploration, crafting, and multiplayer.

Version 1.12 ("World of Color") introduced concrete blocks, the color spectrum update, and the in-game tutorial. It predates the caves update and the overhaul of later versions — which is exactly why many players prefer it. The world generation is the classic Minecraft landscape: flowing hills, ocean monuments, strongholds, deep mines, and the nether portal at the end of an early-game gear progression.

Survival mode is the core experience: punch trees, build shelter before night, avoid skeletons and creepers and that horrifying sound a spider makes, craft a bed before you die to random zombies. Creative mode gives you infinite blocks and flight — it's where servers build cities.

The browser version on UBGHyper is Eaglercraft, a faithful JavaScript recreation of the 1.12 client that runs without Java, no plugins, and no downloads. It connects to a live multiplayer server so you can play with other UBGHyper visitors — building together, trading, or inevitably blowing up each other's houses with TNT.

Minecraft 1.12 in a browser is a minor miracle. Play it at school, at the library, on any machine with a browser.`,
    controls: `<strong>WASD</strong> — move. <strong>Spacebar</strong> — jump. <strong>Shift</strong> — sneak. <strong>Left-click</strong> — break block. <strong>Right-click</strong> — place block/use item. <strong>E</strong> — open inventory. <strong>1–9</strong> — hotbar slots. <strong>T</strong> — chat.`,
    tips: [
      'Your first night priority: 4 logs → crafting table → wood planks → sticks → wood pickaxe → dig into a hill.',
      'Never dig straight down — you\'ll fall into lava or a cave with no way out.',
      'Sleep in a bed every night to set your spawn point. Never go to the Nether without one.',
      'Creepers are silent until they hiss. Kill them with sword hits and retreats — don\'t let them get close.',
    ],
    faqs: [
      { q: 'Can I play with friends on Minecraft 1.12 at UBGHyper?', a: 'Yes — UBGHyper\'s Minecraft (Eaglercraft build) connects to a multiplayer server where you can play with anyone else on the site.' },
      { q: 'Is this the real Minecraft or a clone?', a: 'It\'s Eaglercraft, a browser-faithful recreation of the official 1.12 Java client. It plays identically to the original but runs in a web browser.' },
      { q: 'Can I use mods in the browser Minecraft?', a: 'The base Eaglercraft build on UBGHyper doesn\'t support mods. For full modding, you need the official Java version.' },
      { q: 'Why is it version 1.12 and not newer?', a: 'Eaglercraft is built from the 1.12 codebase because it\'s well-documented and stable. Newer versions require more resources that don\'t port cleanly to browser JavaScript.' },
      { q: 'Is Minecraft on UBGHyper free?', a: 'Yes — the Eaglercraft build on UBGHyper is fully free, no account or purchase required.' },
    ],
  },

  'Tiny-Fishing': {
    longdesc: `Tiny Fishing is a one-click idle game about casting a line, reeling it back up, and watching fish get caught along the way. Simple mechanics, satisfying numbers, and a surprisingly deep upgrade loop have made it one of the most quietly addictive games in the unblocked genre.

You tap to cast, then tap and drag upward to reel in. Fish appear at various depths — shallow water has small common fish; deep water hides rare, valuable species. As you bring the line up, fish bump into it and get caught. More fish caught per cast means more coins. More coins means better rods, longer lines, and wider nets.

The upgrade system is where Tiny Fishing earns its hooks. Longer line means deeper casts. Wider net means more fish per cast. Higher coin multipliers mean faster progression. Early upgrades are cheap and the game moves quickly; late upgrades cost millions but unlock species you've never seen before.

The fish database is the game's secret depth. There are dozens of species — each with a rarity, a depth range, and a coin value. Catching your first shark or nautilus or whale is genuinely exciting. The rare spawn chance for the deepest creatures creates a slot-machine feeling when the line goes down far.

Tiny Fishing works perfectly in short sessions: three minutes between classes, a long recess, a study period. You don't need to commit — cast a few times, pocket the upgrades, come back later.

Play Tiny Fishing unblocked at UBGHyper.`,
    controls: `<strong>Click</strong> to cast. <strong>Click and hold</strong> then drag up to reel in. Fishing happens automatically as you pull up.`,
    tips: [
      'Upgrade line depth first — deeper casts reach rarer, more valuable fish.',
      'Don\'t rush the reel — pulling up too fast misses fish that haven\'t connected yet.',
      'Buy the net width upgrade whenever you can afford it — it multiplies every cast.',
      'The rarest fish only spawn below depth 100. Save for a longer line before hunting them.',
    ],
    faqs: [
      { q: 'How many fish are in Tiny Fishing?', a: 'Tiny Fishing has dozens of fish species ranging from common sardines to rare deep-sea creatures. New species unlock as your line reaches greater depths.' },
      { q: 'Does Tiny Fishing save progress?', a: 'Yes — Tiny Fishing auto-saves your coins and upgrades in browser localStorage. Your progress persists between sessions.' },
      { q: 'Is there an end to Tiny Fishing?', a: 'There\'s no hard ending — the game continues indefinitely as you upgrade toward deeper fish and higher coin totals.' },
      { q: 'Is Tiny Fishing free?', a: 'Yes — fully free on UBGHyper.' },
      { q: 'What games are similar to Tiny Fishing?', a: 'Try Idle Breakout and Cookie Clicker for similar idle progression loops, or Happy Fishing for a slightly different fishing format.' },
    ],
  },

  'Soccer-Random': {
    longdesc: `Soccer Random is the football cousin of Basket Random — a one-button physics game where two floppy cartoon players compete to kick a ball into the goal. Press the button. Your player lunges. The ball goes somewhere. Chaos ensues.

Like Basket Random, Soccer Random's core appeal is ragdoll unpredictability. Perfectly-timed button presses produce beautiful arcing shots. Slightly mistimed ones send your player face-down on the pitch while the ball dribbles uselessly sideways. Teams rotate with every round — you might be a sumo wrestler, then a knight, then two tiny children — each with slightly different weight and movement.

The environment changes every round too: grass pitch, sand beach, snowy ground, bouncy floor. Snow makes players slide further. Sand slows momentum. The rotating physics create a new micro-puzzle every two minutes.

Soccer Random is most popular as a two-player couch game. One player on W, one on Up Arrow, shouting at each other across the keyboard. First to 5 goals wins. Games last about 3 minutes and someone always demands a rematch.

The single-player mode against the AI is also solid. The AI plays with the same chaotic button logic you do — it doesn't cheat by knowing the physics — so you'll occasionally destroy it 5-0 and occasionally lose 0-5 on pure random luck.

Play Soccer Random unblocked at UBGHyper alongside Basket Random and Basket Champs.`,
    controls: `<strong>1-Player:</strong> W to jump/kick. <strong>2-Player:</strong> W (player 1) and Up Arrow (player 2). Same keyboard.`,
    tips: [
      'Time your press when you\'re directly beside the ball for the cleanest kick direction.',
      'A well-timed press on the ball\'s approach trajectory redirects it toward goal.',
      'On snowy maps, press early — your player slides further after the lunge.',
      'Let the AI commit first, then time your press against the ball as it bounces.',
    ],
    faqs: [
      { q: 'How do I play Soccer Random 2-player?', a: 'Player 1 uses W, Player 2 uses Up Arrow. Both play on the same keyboard.' },
      { q: 'How many rounds does Soccer Random take?', a: 'First to 5 goals wins a round. Matches typically take 2-4 minutes.' },
      { q: 'Is Soccer Random free?', a: 'Yes — fully free on UBGHyper, no sign-up.' },
      { q: 'What\'s the difference between Soccer Random and Basketball Random?', a: 'Same physics engine and button mechanic. Soccer Random uses a pitch and goal; Basket Random uses a court and hoop. Soccer involves more positional play since the goal is fixed.' },
      { q: 'What other games are like Soccer Random?', a: 'Try Basket Random, Basket Champs, and Volley Random — all from the same one-button ragdoll physics engine.' },
    ],
  },

  'Paper-IO-2': {
    longdesc: `Paper IO 2 is a territory-capture game where you control a colored square, extending a trail from your zone to claim new ground. If an enemy cuts through your trail before you return to your territory, you die. If you cut through theirs, they die. The result is a constantly evolving map of competing colored zones that looks like abstract art while playing like a chess-speed battle.

The tension of Paper IO 2 comes from commitment. Every time you leave your zone to claim land, you're vulnerable. Your trail is your Achilles' heel — a long looping expedition that grabs a huge chunk of the map also creates a long fragile line that any opponent can sever. The risk-reward of each excursion is the core game loop.

The multiplayer mode is where Paper IO 2 shines. You're competing against real players from around the world on a shared map. Early-game expansion is contested; mid-game is about defending your borders while probing for territory; late-game is about finding isolated corners to vacuum up while the big players fight each other.

The single-player and AI modes exist but the game is designed for multiplayer — the meta of real opponents who also don't want to die makes every match unpredictable. A top player controls 30-40% of the map; novices average 5-10%.

Paper IO 2 loads in seconds and runs flawlessly on Chromebooks. No plugins, no downloads. A full match lasts about 10 minutes.

Play Paper IO 2 unblocked at UBGHyper.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> to move. Your character moves continuously — steering only changes direction.`,
    tips: [
      'Small loops close to your border are safer than wide expeditions — low risk, consistent growth.',
      'Watch for opponent trails near you before going deep. If someone\'s looping toward your area, retreat.',
      'Cut diagonally through enemy territory — straight lines are predictable and easier to counter.',
      'Claim the corners of the map early — they\'re harder for enemies to reach from multiple sides.',
    ],
    faqs: [
      { q: 'Is Paper IO 2 multiplayer?', a: 'Yes — Paper IO 2 multiplayer puts you on a shared map against real players worldwide. A solo mode also exists.' },
      { q: 'How do you get a big territory in Paper IO 2?', a: 'Small, fast loops consistently near your border beat risky large loops. Secure ground incrementally rather than gambling on huge hauls.' },
      { q: 'What happens if two trails cross at the same time?', a: 'Both players typically die simultaneously. Experienced players use this as a kamikaze move to take out threatening opponents.' },
      { q: 'Is Paper IO 2 free?', a: 'Yes — fully free on UBGHyper.' },
      { q: 'What games are similar to Paper IO 2?', a: 'Try Slither.io and Sandboxels for similar territory/survival mechanics, or Canabalt for a different take on competitive spatial awareness.' },
    ],
  },

  'People-Playground': {
    longdesc: `People Playground is a physics sandbox with no goals, no rules, and no limits. You spawn ragdoll humans onto an open stage and subject them to anything the game's enormous toolkit will allow: guns, explosives, electricity, fire, acid, blades, vehicles, and physics contraptions of your own design.

The appeal of People Playground is pure experimentation. What happens if you chain two people together and pull them apart at high speed? What happens if you electrocute a human sitting in a puddle while another holds a metal rod? What happens if you drop a piano on five people stacked on top of each other? The game answers every question with committed, screaming-loud physics.

The object spawner is the star feature. Every item has physical properties — weight, conductivity, flammability, elasticity. You can chain objects together, attach motors, build contraptions that generate chain reactions. The community has built cars, rollercoasters, trebuchets, and elaborate execution rigs purely from scratch.

People Playground's modding community has expanded the base game enormously — new objects, new effects, new human types. The UBGHyper version is the unmodded browser build, but the base content alone takes hours to fully explore.

Sessions typically go: spawn 3 humans, try something stupid, laugh, undo, try something worse. The undo button (Ctrl+Z) is essential. So is the volume slider.

Play People Playground unblocked at UBGHyper.`,
    controls: `<strong>Left-click</strong> — select/drag objects. <strong>Right-click</strong> — spawn context menu. <strong>WASD</strong> — pan camera. <strong>Scroll</strong> — zoom. <strong>Delete</strong> — remove selected. <strong>Ctrl+Z</strong> — undo.`,
    tips: [
      'The Toolbar at the top holds every object category — explore it systematically before free-building.',
      'Chain objects together using the Connect tool to build contraptions.',
      'Electricity + water + metal creates the best chain reactions for minimal setup.',
      'Use the Undo button aggressively — it\'s your best friend in a physics sandbox.',
    ],
    faqs: [
      { q: 'Is People Playground on UBGHyper the full game?', a: 'UBGHyper hosts the browser-compatible build. The full Steam version has more content and mod support.' },
      { q: 'Is People Playground appropriate for school?', a: 'The game contains cartoon violence involving ragdoll figures. Most schools block violence-themed content — it depends on your school\'s filter settings.' },
      { q: 'Can I save my creations in People Playground?', a: 'The browser build supports limited in-session saves. The Steam version has full save/share functionality for contraptions.' },
      { q: 'Is People Playground free?', a: 'The browser build on UBGHyper is free. The full Steam game is paid.' },
      { q: 'What similar games exist on UBGHyper?', a: 'Try Mutilate a Doll 2 for a similar physics sandbox, or Sandboxels for a different type of simulation.' },
    ],
  },

  'Awesome-Planes': {
    longdesc: `Awesome Planes is a top-down aerial combat game where you pilot a small plane through waves of enemy aircraft, upgrading your jet between missions with better weapons, faster engines, and improved armor. It's a vertical-scrolling shooter with a meaningful upgrade economy between runs.

The core gameplay is simple and satisfying: fly through a level, shoot down everything that moves, dodge bullets and missiles, and reach the end boss. The difficulty ramps quickly — early missions are a warm-up, later missions are dense walls of fire you have to thread through constantly.

The upgrade screen between missions is where Awesome Planes builds its depth. Engine speed, weapon fire rate, bullet damage, health, and bomb capacity are all upgradeable with coins collected mid-mission. Each upgrade takes your plane from a flimsy crop duster to a weapon of mass destruction. The decisions are interesting: more speed makes dodging easier but harder to aim; more health lets you tank through hard sections but you'll take more upgrades to finish them efficiently.

Awesome Planes has multiple plane types to unlock — each with a different stats baseline. Fighter planes emphasize speed; bombers deal area damage; twin-engine models have double fire rate at the cost of maneuverability.

The game is a pure arcade shooter, built for 10-20 minute sessions. No story, no padding, just the satisfying crunch of air combat.

Play Awesome Planes unblocked at UBGHyper alongside Awesome Tanks and Awesome Cars.`,
    controls: `<strong>WASD</strong> or <strong>Arrow keys</strong> — fly. <strong>Left-click</strong> or <strong>Spacebar</strong> — shoot. <strong>Z</strong> or <strong>X</strong> — drop bomb (when equipped).`,
    tips: [
      'Keep moving — a stationary plane in Awesome Planes is a dead plane.',
      'Prioritize the missile launchers in early levels before upgrading offense — one missile hit ends a run.',
      'Fly in wide circles around enemy clusters rather than driving straight through.',
      'Bombs clear entire screens on dense waves — save them for the moments you\'re about to be overwhelmed.',
    ],
    faqs: [
      { q: 'How many missions are in Awesome Planes?', a: 'Awesome Planes has progressively harder missions with increasing enemy density and new enemy types each stage.' },
      { q: 'What\'s the best upgrade path in Awesome Planes?', a: 'Speed and health early, then max fire rate once you can survive long enough to use it. Bombs become more useful mid-game.' },
      { q: 'Are there bosses in Awesome Planes?', a: 'Yes — each mission ends with a boss aircraft that has significantly more health and fires special attack patterns.' },
      { q: 'Is Awesome Planes free?', a: 'Yes — fully free on UBGHyper.' },
      { q: 'What games are similar to Awesome Planes?', a: 'Try Awesome Tanks (same series, ground combat), Strikeforce Heroes, and Gun Mayhem Redux for similar arcade action.' },
    ],
  },

  'Awesome-Cars': {
    longdesc: `Awesome Cars is the racing-meets-combat sibling of Awesome Tanks and Awesome Planes — top-down vehicular action where you weave through tracks at speed, shoot rival drivers, dodge mines, and upgrade your car between races with better engines, weapons, and armour. It's a deceptively deep racer that has quietly become one of the most-played games on UBGHyper.

The basic loop is fast and satisfying. Each track is a short, twisty circuit packed with hazards: oil slicks, ramps, narrow choke points, and rivals who actively shoot back. Win a race and you bank coins to spend in the garage on faster acceleration, better top speed, heavier armour, more dangerous primary weapons (machine gun, shotgun, plasma cannon), and limited-use specials like mines and rockets. Lose a race and you replay it with whatever you've already unlocked.

What makes Awesome Cars different from a pure racer is the combat economy. Pacing matters as much as speed. Going flat-out wins early laps but drains your armour against opponents' fire. Hanging back to pick off rivals saves armour but costs you position. The best runs balance both — burst ahead during the few seconds your enemies are reloading, drift around a corner to break their lock, and time your last lap so you cross the line just as the leader explodes behind you.

Awesome Cars is a Flash-era classic preserved on UBGHyper via Ruffle, which means it loads instantly in any modern browser including school Chromebooks — no plugin, no download, no install. Sessions are short (a single race is 1-3 minutes) and the upgrade tree is deep enough to keep you tweaking for hours.

If you like Awesome Cars, you'll like Drive Mad (physics-puzzle driving), Crazy Cars (a chaotic free-for-all), Burnin' Rubber-style arcade racers, and the other Awesome titles (Tanks and Planes) — same upgrade-loop satisfaction, different vehicle.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — drive (up to accelerate, down to brake/reverse, left/right to steer). <strong>Spacebar</strong> or <strong>Left-click</strong> — fire your primary weapon. <strong>Z</strong> / <strong>X</strong> — drop a mine or fire a special (when equipped). <strong>R</strong> — restart the race.`,
    tips: [
      'Buy a speed upgrade before a weapon upgrade — your first race is mostly about not dying, and faster acceleration lets you avoid combat entirely on easy tracks.',
      'The machine gun beats the shotgun until you can afford a fully upgraded shotgun — closer-range weapons are stronger but only if you can keep pace with the target.',
      'Use the brake to drift around tight corners. Holding the gas all the way around scrubs more speed than a controlled drift.',
      'Mines are placement weapons, not panic weapons. Drop them on choke points the AI must drive through, not directly behind you when you\'re being chased.',
      'On championship-style tracks, conserve your specials for the final lap — the AI gets more aggressive when you\'re in first place.',
    ],
    faqs: [
      { q: 'Is Awesome Cars unblocked at school?', a: 'Yes — Awesome Cars runs entirely in your browser at UBGHyper via Ruffle Flash emulation. No plugin or install is needed, and it works on Chromebooks, Windows, Mac, and most school networks.' },
      { q: 'How long is a full Awesome Cars run?', a: 'A single race is 1-3 minutes, and a full championship circuit takes 15-30 minutes. The full upgrade tree takes a few hours to max out if you replay tracks.' },
      { q: 'What\'s the best car / loadout in Awesome Cars?', a: 'A balanced build wins more often than a min-maxed one: max acceleration, mid-range top speed, mid-armour, plus a fully upgraded machine gun. Heavy-armour builds work on combat-focused tracks but lose pure races.' },
      { q: 'Why does Awesome Cars need Ruffle?', a: 'Awesome Cars was originally a Flash game and Flash has been retired since 2020. Ruffle is an open-source Flash emulator that loads transparently in the page — you don\'t need to install anything. UBGHyper handles it automatically.' },
      { q: 'Are there cheats for Awesome Cars?', a: 'There are no official cheats. The save-editor tool at /saves.html lets you back up and restore your Awesome Cars progress between devices, but it does not modify game stats.' },
      { q: 'What other games are like Awesome Cars?', a: 'Try Drive Mad (physics puzzle driving), Crazy Cars (chaotic multi-car racing), Awesome Tanks (same studio, ground combat), Awesome Planes (same studio, aerial), and Burrito Bison 3 (different vehicle, same upgrade-loop satisfaction).' },
    ],
  },

  'Cookie-Clicker': {
    longdesc: `Cookie Clicker is the godfather of idle games. You start with one cookie. You click it. You get a cookie. You buy a cursor that clicks for you. The cursor makes more cookies. You buy a grandma. The grandma bakes cookies. The grandma's grandmas bake more grandmas. Eventually you're producing trillion-cookies-per-second from antimatter condensers, alchemy labs, and time-distortion farms.

The genius of Cookie Clicker is the layered progression. The first hour is fast — every minute unlocks a new building, a new upgrade. After an hour the numbers go cosmic and the game shifts from active clicking to passive optimization: prestige, golden cookies, season events, achievements, mini-games.

Cookie Clicker is the first idle game most players experience because it teaches the genre's grammar without any tutorial. Click for early progress. Buy producers. Stack production multipliers. Prestige for permanent buffs. Repeat.

The lore is part of the appeal. The "grandmas" eventually rise up and try to take over your cookie empire. The "elder pact" lets you ally with them for huge production but introduces grandma-related disasters. The game has hundreds of micro-narratives delivered through achievement descriptions and news ticker.

Cookie Clicker has been continuously updated since 2013. It's older than half the players who play it. The game saves progress in browser localStorage, so you can return weeks later to a vault of accumulated cookies.

Play Cookie Clicker unblocked at UBGHyper.`,
    controls: `Mouse only — click the big cookie, click buildings to buy them, click upgrades when you can afford them.`,
    tips: [
      'Click the cookie 100 times early — it pays for the first cursor.',
      'Save up for the next building tier rather than spamming cheap upgrades.',
      'Always grab golden cookies when they appear — they\'re free production.',
      'Once you hit a trillion cookies, prestige for heavenly chips. Chips are forever.',
    ],
    faqs: [
      { q: 'Does Cookie Clicker save my progress?', a: 'Yes — Cookie Clicker auto-saves your bakery in browser localStorage. As long as you don\'t clear cookies (no pun intended), your progress persists across sessions.' },
      { q: 'What\'s the goal of Cookie Clicker?', a: 'There\'s no single goal. The game has 600+ achievements ranging from "Bake 1,000,000 cookies" to "Survive a grandmapocalypse". Progress is its own reward.' },
      { q: 'Is there an end to Cookie Clicker?', a: 'Technically no — production scales infinitely. Practically, top players reach scores on the order of duodecillions of cookies.' },
      { q: 'Should I prestige?', a: 'Prestige once you have at least 1 trillion cookies. Each prestige gives heavenly chips that grant permanent boosts to all future runs.' },
      { q: 'Is Cookie Clicker free on UBGHyper?', a: 'Yes — fully free, no in-app purchases, full save/load support.' },
    ],
  },

  'Cuphead': {
    longdesc: `Cuphead is a run-and-gun platformer built around non-stop boss fights, hand-drawn 1930s cartoon animation, and a difficulty curve that doesn't apologise for itself. You play as Cuphead (or Mugman in co-op) battling a series of contracts for the Devil — every level is a multi-phase boss encounter that demands you read attack patterns, dodge projectiles, and deal damage precisely under pressure.

What makes Cuphead different is its commitment to the bit. Every animation is hand-drawn and inked, every sound effect pulled from jazz recordings of the 1930s, and every boss has a personality and theme that matches its era. The result is something that feels like a lost cartoon from a time before video games existed — except it's extremely challenging to finish.

The difficulty is real. Cuphead doesn't hand out checkpoints between boss phases. You restart the full fight each attempt. Early attempts feel impossible; with pattern recognition, the same fight becomes manageable. The game respects the effort required to learn it.

The browser version on UBGHyper runs the full game — all three islands, the run-and-gun levels, and the DLC-adjacent bonus content. Controls are keyboard-based and remappable. Fullscreen mode gives the best experience.

Cuphead has become one of the most-played unblocked games on UBGHyper because it's genuinely impressive to watch regardless of skill level — classmates gather around screens when it's running. Play it at school unblocked on UBGHyper alongside other tough games like Hollow Knight, Happy Wheels, and Retro Bowl.`,
    controls: `<strong>Arrow keys</strong> — move. <strong>Z</strong> — shoot. <strong>X</strong> — jump. <strong>C</strong> — dash. <strong>V</strong> — lock position (shoot in any direction without moving). <strong>Enter</strong> — pause. Hold a direction while shooting to aim.`,
    tips: [
      'Learn the first two phases of every boss before worrying about the final phase — you\'ll never see the end if you\'re inconsistent early.',
      'Parry the pink objects to build your super meter — they appear in almost every fight.',
      'The spread shot deals massive close-range damage. On slow bosses, get in close.',
      'Dying costs nothing — each death teaches the next attempt. Embrace the retry loop.',
    ],
    faqs: [
      { q: 'How many bosses does Cuphead have?', a: 'Cuphead has 19 bosses across three main islands, plus 6 run-and-gun levels. The DLC adds 6 more bosses.' },
      { q: 'Can I play Cuphead in 2-player co-op?', a: 'The browser version supports solo play. The desktop version supports 2-player local co-op with Mugman as the second character.' },
      { q: 'What\'s the easiest weapon in Cuphead?', a: 'The Spread shot is the most forgiving — wide coverage, strong damage. The Charge shot is high-risk, high-reward for experienced players.' },
      { q: 'How hard is Cuphead?', a: 'Hard. Most players take 10–30 attempts on early bosses and more on later ones. The game is designed around learning through failure, not skill checks.' },
      { q: 'Is Cuphead free on UBGHyper?', a: 'Yes — play Cuphead unblocked for free on UBGHyper with no download required.' },
    ],
  },

  'Retro-Bowl': {
    longdesc: `Retro Bowl is an American football game that strips the sport down to what matters: the plays, the pressure, and the satisfaction of a perfectly placed touchdown. You control the quarterback, call routes, and throw the ball — defence is handled automatically, which keeps the focus entirely on the offensive game plan.

The management layer is what separates Retro Bowl from a simple sports game. Between matches you handle your roster, negotiate contracts, deal with morale, manage the press, and make decisions about which positions to upgrade. Getting sacked mid-drive because you neglected your offensive line is a real consequence of bad front-office decisions.

The pixel art style is deliberately retro — 8-bit sprites, chunky playfields, chiptune commentary — but the AI adapts to your tendencies. If you throw short routes every play, the defence adjusts and starts blitzing. Defences also vary by team, forcing you to read what the opponent is doing rather than running the same play every game.

The game has a career mode across multiple seasons, a full playoff bracket, and a MVP/HOF system for players who stay with your franchise long enough. Your QB improves over time if you protect him; young receivers grow if you feed them targets.

Retro Bowl has become a staple unblocked game in schools — quick to pick up, deep enough to keep playing, and short enough that a quarter of football takes about four minutes. Play it unblocked on UBGHyper alongside Awesome Planes, Basketball Stars, and Soccer Random.`,
    controls: `<strong>Swipe / drag</strong> to aim and throw (mouse click and drag on desktop). Tap/click receivers to select a target. The power and angle of your throw depend on the drag direction. On defence, the game plays itself — focus on the offence.`,
    tips: [
      'Throw to the flat and short routes early — they\'re reliable and let you build momentum before risking deeper passes.',
      'Upgrade your offensive line first. A sacked QB loses yards; a protected QB has time for the whole route to develop.',
      'Watch the receiver icons — a "!" means they\'re open. Don\'t force it to a covered target.',
      'Manage player morale. Low-morale players fumble more and perform worse in big games.',
    ],
    faqs: [
      { q: 'How many seasons can you play in Retro Bowl?', a: 'There\'s no season limit — you can build a dynasty over 10, 20, or more seasons. The game tracks franchise records and hall-of-fame inductees.' },
      { q: 'Can you control defence in Retro Bowl?', a: 'No — defence is fully automatic. The game puts the player in the offensive coordinator role only.' },
      { q: 'What\'s the best position to upgrade first?', a: 'Offensive linemen. A high OL rating gives your QB more time in the pocket, which makes every offensive play more effective.' },
      { q: 'Does Retro Bowl save progress?', a: 'Yes — your franchise autosaves between games. Progress persists in browser localStorage as long as you don\'t clear it.' },
      { q: 'Is Retro Bowl free on UBGHyper?', a: 'Yes — play the full Retro Bowl unblocked on UBGHyper for free with no download or account required.' },
    ],
  },

  'Happy-Wheels': {
    longdesc: `Happy Wheels is a ragdoll physics obstacle course game that has been making people laugh and wince in equal measure since 2010. You pick a character — the reckless dad on a Segway, the irresponsible parent with a child passenger, the wheelchair-bound senior — and attempt to navigate grotesque obstacle courses filled with spikes, wrecking balls, and explosions.

The core mechanic is simple: get from start to finish in one piece. The reality is rarely that clean. Limbs detach. Characters are launched into spikes at speed. The physics engine calculates every collision with brutal fidelity, and a run that starts with cautious progress can end in a spectacular dismemberment two seconds later.

Happy Wheels has a level editor that lets players build and share their own courses, which is why the game has tens of thousands of community-made levels. The user levels range from carefully designed puzzles to deliberately sadistic gauntlets. The Segway Guy became an internet icon precisely because of the absurdity of navigating him through courses that were clearly designed by people who wanted to see him destroyed.

The browser version on UBGHyper includes the full character roster and access to featured levels. It runs in Ruffle, the Flash emulator, so it behaves identically to the original. Fullscreen mode is recommended — more field of view, better reaction time.

Play Happy Wheels unblocked on UBGHyper alongside other physics games like Drive Mad, Jelly Drift, and Getting Over It.`,
    controls: `<strong>Arrow keys</strong> — move / accelerate. <strong>Z</strong> — eject from vehicle. <strong>Ctrl</strong> — brake hard. <strong>Space</strong> — special action (varies by character). <strong>Shift</strong> — lean. Controls vary slightly between characters — check the in-game help for the full list.`,
    tips: [
      'Lean back before big drops to keep your vehicle upright on landing.',
      'Don\'t eject unless you have a clear path — most ejections make things worse, not better.',
      'Momentum is your enemy on spike courses — approach slowly and use the brake.',
      'Community levels marked "featured" are tested and fair. Random user levels vary wildly in quality.',
    ],
    faqs: [
      { q: 'Which character is easiest in Happy Wheels?', a: 'The Segway Guy has the most stable vehicle and is the most forgiving for beginners. The Wheelchair is the hardest to control.' },
      { q: 'Can I build my own levels in Happy Wheels?', a: 'Yes — the full level editor is available. You can build and share custom obstacle courses with the community.' },
      { q: 'How many characters are there in Happy Wheels?', a: 'There are 13 playable characters, each with a different vehicle and special ability — Segway, wheelchair, bicycle, shopping cart, and more.' },
      { q: 'Why does Happy Wheels use Ruffle?', a: 'Happy Wheels was built in Flash, which browsers no longer support natively. Ruffle is an open-source Flash emulator that runs .swf files in modern browsers.' },
      { q: 'Is Happy Wheels free on UBGHyper?', a: 'Yes — play the full Happy Wheels unblocked on UBGHyper for free with no download required.' },
    ],
  },

  'hollowknight': {
    longdesc: `Hollow Knight is a hand-drawn action-adventure set in Hallownest, a ruined underground kingdom of insects. You play as the Knight — a small, silent bug armed with a nail — exploring sprawling caverns, fighting deadly creatures, and uncovering a story told almost entirely through environment and brief, cryptic dialogue.

The game is a masterclass in atmosphere. Every region of Hallownest has its own visual identity, enemy set, and ambient sound — from the mushroom-lit Fungal Wastes to the neon-infected City of Tears. The art is all hand-drawn, the music composed by Christopher Larkin, and every enemy has a specific attack pattern that rewards learning.

Combat is precision-based. The nail swings in four directions; the Soul meter charges on hits and lets you cast spells or heal. Boss fights require reading attack patterns across multiple phases and committing to aggressive play when openings appear. The difficulty is high but fair — every death teaches something.

Exploration is the heart of the game. Hallownest is massive — 40+ hours for a first playthrough — and the map fills in as you travel. Charms collected through exploration let you customise your build. Discovering a new area, finding a hidden passage, or beating a boss after ten attempts delivers genuine satisfaction.

The browser version on UBGHyper runs the complete game. Play Hollow Knight unblocked at school on UBGHyper alongside other exploration games like People Playground and Minecraft.`,
    controls: `<strong>Arrow keys / WASD</strong> — move. <strong>Z / Space</strong> — jump (double jump unlocked later). <strong>X</strong> — attack with nail. <strong>C</strong> — cast spell (costs Soul). <strong>A</strong> — dash (unlocked via upgrade). <strong>S / Down</strong> — drop through platforms. <strong>Enter</strong> — open map/inventory.`,
    tips: [
      'Mark everything on your map — the game gives you pins and markers for a reason. You will get lost without them.',
      'Fill the Soul meter before every boss by hitting the entry enemies — you want a full heal available.',
      'Grubs give geo (currency) and Mask Shards give health — hunt them actively, don\'t assume you\'ll find them by chance.',
      'The Shaman Stone + Quick Slash charm combo turns spells into primary weapons for boss fights.',
    ],
    faqs: [
      { q: 'How long is Hollow Knight?', a: 'A first playthrough averages 35–50 hours. 100% completion including all charms, bosses, and endings takes 60–70 hours.' },
      { q: 'Is Hollow Knight hard?', a: 'Moderately hard. Boss fights require pattern recognition and persistence. The exploration is forgiving; the combat escalates significantly in later areas.' },
      { q: 'How many endings does Hollow Knight have?', a: 'Three main endings, with a fourth (the true ending) requiring specific quests completed in order before the final boss.' },
      { q: 'Do I need to play in order?', a: 'No — Hallownest is open-ended. Most areas can be visited whenever you find them. Some upgrades gate access to specific regions.' },
      { q: 'Is Hollow Knight free on UBGHyper?', a: 'Yes — play Hollow Knight unblocked on UBGHyper for free with no download or install required.' },
    ],
  },

  'Block-Blast': {
    longdesc: `Block Blast is a block-dropping puzzle game that slots perfectly into the gap between Tetris and casual mobile games. You're given a 8x8 grid and a set of three pieces at a time — drag them onto the board to place them, clear full rows or columns to score, and keep going until no more pieces can fit.

The twist is that pieces don't fall from the top — you place them anywhere you want on the grid. This gives you more control than Tetris but demands more forward planning. A piece that fits neatly now might box you into an uncleared mess three turns later. The game rewards thinking two or three moves ahead.

Combos are the score multiplier. Clearing a row and a column simultaneously in one move scores a combo — multiple combos on the same placement chain up for massive point bonuses. High-level play is about engineering board states where a single piece placement clears two, three, or four lines at once.

Block Blast has no timer, which removes the panic of Tetris and lets you think. It's also genuinely difficult at high scores — the piece selection eventually puts you in configurations where every option costs you something. Knowing when to sacrifice a line for better board shape is the skill ceiling.

Play Block Blast unblocked at school on UBGHyper alongside other strategy games like 2048, Bloons TD 5, and Kingdom Rush.`,
    controls: `<strong>Click and drag</strong> pieces from the tray onto the board. Release to place. Pieces cannot be rotated. Clear rows or columns to score. The game ends when none of the three available pieces can be placed anywhere on the board.`,
    tips: [
      'Keep the center of the board clear — pieces placed edge-to-edge are harder to clear.',
      'Plan for combos: if you can clear a row and column simultaneously, do it even if it means waiting.',
      'Never fill an 8x8 grid corner completely — it traps you if a large piece appears.',
      'When three bad pieces appear, place the one that does least damage and accepts the board hit.',
    ],
    faqs: [
      { q: 'What\'s the highest score in Block Blast?', a: 'Competitive players reach scores in the hundreds of thousands through sustained combo chains. The game has no official leaderboard in the browser version.' },
      { q: 'Can pieces be rotated in Block Blast?', a: 'No — pieces are fixed orientation. You must fit them as shown.' },
      { q: 'Is Block Blast the same as Tetris?', a: 'Similar concept, different mechanics. Tetris has falling pieces with real-time pressure; Block Blast has no falling and no timer — it\'s a placement puzzle.' },
      { q: 'What happens when you run out of moves?', a: 'The game ends and your final score is recorded. Start a new game to try again — there\'s no penalty for restarting.' },
      { q: 'Is Block Blast free on UBGHyper?', a: 'Yes — play Block Blast unblocked on UBGHyper for free with no download required.' },
    ],
  },

  'Buckshot-Roulete': {
    longdesc: `Buckshot Roulette is a horror-themed gambling game where you and a dealer take turns shooting each other with a shotgun loaded with a mix of live and blank rounds. Before each turn, you both know the composition of the chamber — a certain number of lives and blanks — but not the order. Every decision is a calculated risk.

The game adds items each round that change the calculus: handcuffs that skip the dealer's turn, a magnifying glass that reveals the next shell, beer that ejects the current shell without firing, and a knife that doubles the shotgun's damage. Knowing when to shoot yourself with a blank (to take another turn) versus shooting the dealer is the core tension.

What makes Buckshot Roulette work is that it's never pure luck. When the chamber is loaded with 3 blanks and 1 live, you're playing a probability game, not a slot machine. The items give you edges. The dealer has imperfect play patterns you can learn. A player who reads the table correctly wins consistently.

The horror aesthetic — dim lighting, casino soundtrack, unsettling dealer animations — turns a math problem into something genuinely tense. It's the kind of game that produces genuine table reactions even from players who understand every mechanic.

Play Buckshot Roulette unblocked on UBGHyper alongside other strategy games like Blackjack and Swords and Souls.`,
    controls: `Mouse only — click options to select them. Click the shotgun to shoot the dealer. Click yourself to shoot yourself. Click items to use them. All interactions are point-and-click with no keyboard shortcuts required.`,
    tips: [
      'Track the shell count — if 4 blanks are loaded and 0 lives remain, shoot yourself confidently for a free turn.',
      'Handcuffs on the dealer when you have a live shell next = two shots guaranteed. Highest value item.',
      'The magnifying glass is best used when the table is near 50/50 — certainty on those odds changes everything.',
      'Never panic-shoot. Think through the current probability before each decision.',
    ],
    faqs: [
      { q: 'Is Buckshot Roulette luck-based?', a: 'Partly — shell order is random. But the item system and shell count knowledge mean skilled players win far more consistently than pure luck would allow.' },
      { q: 'What happens when both players run out of health?', a: 'The round ends and a new round begins with a freshly loaded shotgun and a new item set.' },
      { q: 'How many rounds does Buckshot Roulette have?', a: 'Three escalating rounds, each with more shells and more dangerous item selections. The dealer gets more aggressive in later rounds.' },
      { q: 'Should I ever shoot myself?', a: 'Yes — if you\'re confident the next shell is blank, shooting yourself gives you another turn without spending health. It\'s often the correct play.' },
      { q: 'Is Buckshot Roulette free on UBGHyper?', a: 'Yes — play Buckshot Roulette unblocked on UBGHyper for free with no download required.' },
    ],
  },

  'Plants-Vs-Zombies-2': {
    longdesc: `Plants vs. Zombies 2 is the sequel to the iconic tower defence game, expanding on the original with time-travelling worlds, hundreds of new plants, and a zombie cast that escalates from shambling lawn-dwellers to medieval knights and ancient Egyptian mummies.

The core gameplay is unchanged: you plant sun-producing plants to fund your defences, then place combat plants in lanes to stop the zombie horde reaching your house. The lane-based structure and sun economy make it one of the most approachable tower defence games ever made — placing a Peashooter correctly feels intuitive from the first level.

What makes the sequel richer is the world variety. Ancient Egypt, the Pirate Seas, Wild West, and later worlds each introduce new mechanics — mine carts in the Wild West change lane positioning mid-level; tombstones in Egypt periodically spawn zombies. Plants unlocked in one world carry into others, letting you build increasingly powerful cross-world loadouts.

The game rewards experimentation. A Cherry Bomb in a crowd of tombstones clears a lane instantly; a Snow Pea slows a group so your other plants can kill them efficiently. Understanding plant synergies — which slow, which damage, which produce — is the gap between struggling and breezing through levels.

Play Plants vs. Zombies 2 unblocked on UBGHyper alongside other strategy games like Bloons TD 5, Kingdom Rush, and Awesome Tanks.`,
    controls: `Mouse only — click to select plants from the seed bank, click a lane tile to place them. Collect sun by clicking the falling sun icons. Click zombies with certain plants active to target them. No keyboard input required.`,
    tips: [
      'Always have a sun-producing plant (Sunflower or Sun-shroom) in the back row before anything else.',
      'Wall-nuts in front of your best damage dealers buy critical extra seconds against fast zombies.',
      'Save Cherry Bombs and Jalapenos for crowds — wasting them on single zombies is a huge mistake.',
      'Spend coins on plant food first — it charges your best plants instantly and turns tough spots around.',
    ],
    faqs: [
      { q: 'How many worlds are in Plants vs. Zombies 2?', a: 'The full game has 11 worlds including Ancient Egypt, Pirate Seas, Wild West, Far Future, Dark Ages, and more — each with 10–20 levels.' },
      { q: 'Which plants are the strongest in PvZ 2?', a: 'Snow Pea (utility), Spikeweed (lane control), Snapdragon (close-range area), and Infi-nut (shield wall) are consistently useful across worlds.' },
      { q: 'Is PvZ 2 harder than the original?', a: 'Yes — later worlds introduce zombies with armour, shields, and special abilities that require specific counter-plants. Early worlds are similar difficulty to PvZ 1.' },
      { q: 'Can I use plants from one world in another?', a: 'Yes — plants are unlocked permanently and carried across all worlds, letting you build the optimal loadout for each level.' },
      { q: 'Is Plants vs. Zombies 2 free on UBGHyper?', a: 'Yes — play Plants vs. Zombies 2 unblocked for free on UBGHyper with no download required.' },
    ],
  },

  'CrazyCattle3d': {
    longdesc: `Crazy Cattle 3D is the chaotic physics game that broke the internet in 2025. You control a sheep on a series of platform arenas — the goal is to be the last one standing by ramming other sheep off the edge. The catch: your sheep is wobbly, unpredictable, and governed by physics that turns every collision into a comedy.

The game is deceptively simple. Move your sheep into opponents. Momentum does the rest. But getting consistent kills means learning how the sheep's weight and speed interact with the terrain. A slow approach gives you control; a fast charge sends both you and the target flying. The ideal play is a glancing hit at moderate speed that redirects the opponent off-platform while you stay on.

The maps escalate in difficulty. Flat arenas reward pure aggression; maps with ramps, narrow platforms, and moving sections reward timing and positioning. You quickly learn that standing still is a death sentence — stationary sheep get picked off from behind — but charging blindly into crowds ends your run just as fast.

The viral moment for Crazy Cattle 3D was the clip format: short, chaotic, full of unexpected bounces and last-second saves. The game's physics engine produces so many absurd outcomes that no two rounds play out the same way.

Play Crazy Cattle 3D unblocked at school on UBGHyper alongside other physics games like Happy Wheels, Basket Random, and Soccer Random.`,
    controls: `<strong>WASD</strong> or <strong>Arrow keys</strong> — move your sheep. No jump, no special attacks. All combat is physics-based ramming — build speed and use momentum to knock opponents off the platform.`,
    tips: [
      'Aim for the side of opponents rather than head-on — a glancing hit redirects them off-edge without bouncing you back.',
      'Use the edges of the arena as weapons: herd opponents toward the boundary then clip them over.',
      'On elevated maps, let other sheep fight each other first — enter the chaos when the crowd thins.',
      'Speed comes from distance. Back up before a charge to build enough momentum for a decisive hit.',
    ],
    faqs: [
      { q: 'Why did Crazy Cattle 3D go viral?', a: 'The physics engine produces unpredictable, clip-worthy moments every round — unexpected bounces, last-second saves, and chain-reaction eliminations that are easy to share.' },
      { q: 'How many players can play Crazy Cattle 3D?', a: 'The browser version is single-player against AI sheep. The standalone version supports local multiplayer.' },
      { q: 'Is Crazy Cattle 3D on mobile?', a: 'The browser version on UBGHyper works on desktop. Mobile support depends on your browser\'s WebGL capability.' },
      { q: 'Who made Crazy Cattle 3D?', a: 'Crazy Cattle 3D was developed by Oleg V as an indie project. It gained traction through short-form video sharing.' },
      { q: 'Is Crazy Cattle 3D free on UBGHyper?', a: 'Yes — play Crazy Cattle 3D unblocked on UBGHyper for free with no download required.' },
    ],
  },

  'Run-3': {
    longdesc: `Run 3 is an infinite runner set in outer space that has been a staple of school unblocked game sites for over a decade. You guide a small alien through tunnels floating in space, hopping over gaps and avoiding holes in the floor that drop you into the void. The further you run, the faster it gets.

What separates Run 3 from other infinite runners is its galaxy map. Instead of a single endless track, Run 3 has hundreds of named levels across a branching galaxy, plus an "Infinite Mode" for those who want pure endurance. Each level has a specific layout — some test precision jumping, others demand speed and momentum management. The galaxy map means there's always a clear destination rather than just chasing a high score.

The character roster is another layer. The base Runner is balanced; the Skater is faster but harder to control; the Lizard can walk on walls. Each character changes how the tunnel physics feel and which levels are approachable first. Unlocking them by collecting power cells adds a light progression loop.

The tunnels rotate mid-run, which is the game's signature mechanic. What looks like a gap can be reached by running on the wall; a hole that seems unavoidable becomes passable if you let the tunnel turn you onto safer ground. Recognising and exploiting the rotation is the difference between a beginner and an experienced player.

Play Run 3 unblocked on UBGHyper alongside other endless runners like Slope, Canabalt, and Stickman Hook.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — move left/right. <strong>Space</strong> or <strong>Up arrow</strong> — jump. Hold jump for extra height. The tunnel rotates automatically — let it carry you to avoid gaps rather than fighting it with constant corrections.`,
    tips: [
      'Don\'t overcorrect. When the tunnel rotates, trust it — fighting the rotation causes more falls than it prevents.',
      'Short hops over small gaps; long held jumps for large ones. Tap vs hold determines distance.',
      'The Skater\'s momentum makes tight levels harder. Switch to the Runner for precision sections.',
      'In Infinite Mode, gaps become narrower at high speeds — reduce lateral movement and stay centered.',
    ],
    faqs: [
      { q: 'How many levels does Run 3 have?', a: 'Run 3 has over 300 named levels in the galaxy map, plus an unlimited Infinite Mode. New tunnels continue to be added in updates.' },
      { q: 'What\'s the difference between Infinite Mode and the galaxy map?', a: 'Galaxy map levels are hand-designed with specific challenges. Infinite Mode is procedurally generated and continues until you fall — it\'s a pure high-score mode.' },
      { q: 'Which character should I start with in Run 3?', a: 'Start with the Runner — balanced speed and control. Once you\'ve completed 20+ levels, unlock the Skater for Infinite Mode speed runs.' },
      { q: 'Is Run 3 related to Run 1 and Run 2?', a: 'Yes — same series, same developer (Player_03). Run 3 is the largest entry with the most content and the galaxy map system.' },
      { q: 'Is Run 3 free on UBGHyper?', a: 'Yes — play Run 3 unblocked on UBGHyper for free. No downloads, no account required.' },
    ],
  },

  '2048': {
    longdesc: `2048 is the deceptively simple sliding puzzle that ate the internet in 2014 and never quite let go. The rules fit in one sentence: swipe to slide every tile in one direction, identical numbers merge, and your goal is to combine tiles up to 2048. The hard part is doing it without filling the board and locking yourself out.

The genius of 2048 is the tension between two competing pressures. Every move adds a new 2 or 4 to the board, so the longer you play the more crowded it gets. But every merge frees a tile and doubles a value. Skilled players keep the board ordered — biggest tile in a corner, descending values along the edge — so merges cascade and the board never fills.

Reaching 2048 the first time takes most players a few hours of practice. After that, the metagame starts: 4096, 8192, and the truly absurd 16384 are theoretically possible but require near-perfect play across hundreds of moves. The current world record is 131,072 — a single tile so large the game has to scale the font down to fit it.

There's no time pressure, no scoring beyond your own tile values, and no losing condition except running out of moves. That's why 2048 became the universal procrastination game: low stakes, infinite depth, one more move always feels reasonable.

Play 2048 unblocked on UBGHyper alongside other puzzle classics like Block Blast, Bloxorz, and Cookie Clicker.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — slide all tiles in that direction. On mobile, <strong>swipe</strong> in any direction. That's the entire control scheme — there's no select, no deselect, every move shifts every tile.`,
    tips: [
      'Pick a corner (most pros use bottom-left) and never let your highest tile leave it. Build your largest values along one edge.',
      'Avoid using the "up" direction once you commit to a bottom-corner strategy — it scrambles your column.',
      'When the board is nearly full, look two moves ahead. A single panicked swipe can lock you out permanently.',
      'Don\'t chase merges in the middle of the board. Edge and corner merges are the only ones that preserve your structure.',
    ],
    faqs: [
      { q: 'What\'s the highest possible tile in 2048?', a: 'Theoretically the limit is 131,072 (the world record). Reaching 2048 is the standard win; 4096 and 8192 are advanced goals; anything beyond is exceptional play.' },
      { q: 'Is there a way to undo a move in 2048?', a: 'The classic version has no undo. Some clones add an undo button — UBGHyper hosts the original Gabriele Cirulli version with no undo.' },
      { q: 'How do I win 2048 reliably?', a: 'Pick a corner, build your highest tile there, and only ever swipe in 2-3 directions to preserve the chain. Most losses come from random "up" swipes that break the corner structure.' },
      { q: 'Does the game ever end?', a: 'Only when no moves are possible — every tile is filled and no two adjacent tiles match. There\'s no time limit, so a careful player can keep going for hours.' },
      { q: 'Is 2048 free on UBGHyper?', a: 'Yes — 2048 unblocked on UBGHyper is 100% free, no download, no sign-up. Plays instantly in any browser.' },
    ],
  },

  'Drift-Boss': {
    longdesc: `Drift Boss is the one-button driving game that proves you don't need complicated controls to make a hard game. You drive an endless winding road suspended in the sky. Press to turn right, release to turn left. That's it. Survival depends on knowing exactly when to press and when to let go.

The road is procedurally generated and tilts unpredictably — sometimes you need a long press to clear a wide right curve, sometimes the tiniest tap to nudge through a chicane. Misjudge by a fraction of a second and your car flies off into the void. The physics are simple but unforgiving.

What gives Drift Boss its surprising depth is the upgrade economy. As you survive longer, you bank currency that you can spend on better cars — each with different turn rates, top speeds, and handling profiles. The default car is responsive but slow; later cars are faster but harder to control on tight turns. Choosing the right car for your skill level is half the game.

Drift Boss is everywhere on school browsers because it's compulsively replayable. A typical run lasts 30-90 seconds, the restart button is one click, and there's no story or progression to slow you down between attempts. It's the kind of game you tell yourself you'll play "one more time" and find yourself still playing 20 minutes later.

Play Drift Boss unblocked on UBGHyper alongside other one-button arcade games like Slope, Drive Mad, and Eggy Car.`,
    controls: `<strong>Spacebar</strong>, <strong>up arrow</strong>, or <strong>left mouse click</strong> — turn right (hold to keep turning). <strong>Release</strong> — turn left. That's the full control scheme. Tap timing is everything.`,
    tips: [
      'Wide turns need long holds; sharp turns need short taps. Reading the road two seconds ahead matters more than reaction speed.',
      'Upgrade your car only when you\'ve mastered the current one. A faster car with looser handling kills more runs than it saves.',
      'Don\'t panic-tap when you start drifting off-road. Releasing momentarily gives the car space to recover into the next turn.',
      'The road repeats patterns in long runs. Memorising the first 30 seconds gives you a head start on upgrade grinding.',
    ],
    faqs: [
      { q: 'How many cars are in Drift Boss?', a: 'There are around 25 unlockable cars, ranging from cheap starter vehicles to high-end sports cars and themed cars (police, fire truck, ice cream van).' },
      { q: 'What\'s the best car in Drift Boss?', a: 'The high-end sports cars have the best top speed but the loosest handling. For most players the mid-tier balanced cars produce the longest runs.' },
      { q: 'Is Drift Boss the same as Drift Hunters?', a: 'No — Drift Hunters is a full 3D drift simulator with garage tuning. Drift Boss is a top-down one-button arcade game. Different developers, different genres.' },
      { q: 'How do I get more money in Drift Boss?', a: 'Longer runs = more money. The road has coin patches scattered along it; running through them adds bonus currency. No grinding or ad-watch needed.' },
      { q: 'Is Drift Boss free on UBGHyper?', a: 'Yes — Drift Boss unblocked on UBGHyper is fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Basketball-Stars': {
    longdesc: `Basketball Stars is the chaotic 1v1 / 2v2 arcade basketball game that turned a simple court layout into one of the most-played sports browser games of the decade. You pick a player from a roster of unlockable characters — each with different speed, dunk power, and three-point accuracy — and battle the AI or a friend on a single half-court.

The controls are easy but the matches are intense. You move with arrows, shoot with a single button, dunk by holding shoot near the rim. Defence is just as important as offence — stealing the ball mid-dribble or blocking a jump shot completely flips a possession. Matches are short (usually 2 minutes), so every play matters.

What keeps Basketball Stars on top is its competitive design. The character roster is genuinely balanced — there's no single best pick. Your favourite player at silver tier might be outclassed at gold, where AI defenders are sharper and time windows shrink. The career mode rewards consistent improvement rather than memorising one cheese strategy.

Two-player mode on the same keyboard is where most of the game's lasting appeal lives. Classroom games where two players hunch over one Chromebook taking turns shoving each other through the lane are exactly the chaos the developers designed for. Five-second possessions, last-second three-pointers, hilarious rebounds — it's a game built for the school-friend audience.

Play Basketball Stars unblocked on UBGHyper alongside other sports games like Basket Random, Basketball Legends 2020, and Soccer Random.`,
    controls: `<strong>Player 1</strong>: WASD to move, <strong>B</strong> to shoot/dunk, <strong>V</strong> to steal/block, <strong>S</strong> to do super shot. <strong>Player 2</strong>: Arrow keys to move, <strong>L</strong> to shoot/dunk, <strong>K</strong> to steal/block, <strong>Down arrow</strong> for super shot.`,
    tips: [
      'Pump-fake (tap shoot and cancel) to bait a block, then shoot when the defender lands. Wins more shots than you\'d think.',
      'Dunks always score if you make contact with the rim. Cut to the basket whenever the defender over-commits to the perimeter.',
      'Save your super shot for tied games in the final 30 seconds. It\'s near-automatic but burns your meter completely.',
      'Steal aggressively when the ball-handler stops dribbling — that\'s the easiest steal window.',
    ],
    faqs: [
      { q: 'How many characters are in Basketball Stars?', a: 'There are 24+ unlockable characters, each with different stat profiles. Some are based on real-world basketball stars (likeness-only).' },
      { q: 'Can I play Basketball Stars with a friend?', a: 'Yes — Basketball Stars supports two-player local play on the same keyboard. It\'s the most popular mode in school settings.' },
      { q: 'What\'s the best character in Basketball Stars?', a: 'Balanced characters (high dunk and decent three-point) outperform pure specialists at most skill levels. Pure three-point characters dominate in casual play but get smothered against active defenders.' },
      { q: 'How do super shots work in Basketball Stars?', a: 'Build up your meter through normal plays, then trigger the super shot for a near-guaranteed score that bypasses normal defence. It empties the meter completely.' },
      { q: 'Is Basketball Stars free on UBGHyper?', a: 'Yes — Basketball Stars unblocked on UBGHyper is fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'AmongUs-Online': {
    longdesc: `Among Us Online is the original browser port of the social deduction phenomenon — crewmates aboard a spaceship trying to complete tasks while one or more impostors hunt them down. The rules are familiar to anyone who played the mobile or PC versions, but here it runs entirely in the browser with no download or account.

The core loop is unchanged from the original: crewmates complete tiny minigames (wire repair, asteroid clearing, sample analysis) scattered around the map, while impostors blend in, sabotage systems, and pick off isolated crewmates without being seen. Meetings let players discuss who looked suspicious, vote out the most likely impostor, and continue until either all impostors are gone or impostors outnumber crewmates.

What makes the browser version specifically good for schools is the friction-free join. No accounts, no app install, no friend codes. Drop into a public lobby and you're playing with five other students in under 30 seconds. Private lobbies with friends work the same way — share a room code, everyone clicks the link, you're playing.

The catalogue of maps and tasks is full from the original game — The Skeld (classic ship), Polus (snowy outpost), MIRA HQ (sky-bound research base), and The Airship are all here. Impostor count scales with lobby size, voting works as expected, and the visual style is faithful to the original.

Play Among Us Online unblocked on UBGHyper alongside other multiplayer browser games like Among Us Online Server 2, Eaglercraft, and the Chat Room.`,
    controls: `<strong>WASD</strong> or <strong>arrow keys</strong> — move. <strong>E</strong> — use/interact (start a task, open a door). <strong>R</strong> — report a body. <strong>Q</strong> — kill (impostor only). <strong>Tab</strong> — open the task list. <strong>Spacebar</strong> — open the map.`,
    tips: [
      'As crewmate, never wander alone in corridors during impostor windows. Buddy up with at least one other player.',
      'As impostor, sabotage Comms or Lights before killing — it covers your visibility and forces crewmates to scatter.',
      'In meetings, watch who voted for who. Patterns reveal alliances and isolated suspicious votes signal impostors trying to deflect.',
      'Common task locations are not random — memorise the map so you can spot fake-tasking impostors instantly.',
    ],
    faqs: [
      { q: 'Is Among Us Online the same as the official Among Us?', a: 'It\'s a faithful browser port — same gameplay, same maps, same tasks. Built to play in a browser without the official client.' },
      { q: 'Do I need an account to play Among Us Online?', a: 'No — jump straight into public lobbies, or create a private room with a shareable code. No sign-up required.' },
      { q: 'Can I play with my friends?', a: 'Yes — create a private lobby, share the room code in your group chat, everyone clicks join. Works on Chromebooks at school.' },
      { q: 'What\'s the difference between Among Us Online and Server 2?', a: 'Server 2 is a separate instance with its own lobby pool. If Server 1 lobbies are full or slow, Server 2 usually has openings.' },
      { q: 'Is Among Us Online free on UBGHyper?', a: 'Yes — fully free, no account needed, no premium tier.' },
    ],
  },

  'Basketball-Legends-2020': {
    longdesc: `Basketball Legends 2020 is the classic 2-player browser basketball game that takes everything good about Basketball Stars and strips it down to its purest form. No upgrades, no character roster grinds, no menus — just pick a team, pick a player, and play.

The game is built around couch (or shared-keyboard) competitive play. Two players sit at one machine, each takes one half of the keyboard, and the entire game happens in 90-second matches. Quick to start, quick to finish, brutally fun. The character roster is themed around real NBA stars (likeness-changed for legal reasons) and each has unique speed, jump height, and three-point range.

What makes Basketball Legends 2020 stand out from the dozens of similar titles is its physics. Dunks have weight. Three-pointers feel earned. Steals have a real risk-reward — go for the ball too early and you commit a foul; go too late and you give up an open lane. The shot meter requires actual timing rather than just a button press.

Tournament mode adds career-mode structure: pick a team, play through brackets, unlock stronger opponents. Solo play against the AI gets surprisingly hard at the highest difficulty — the AI plays passing lanes and times its blocks with frame-perfect precision. Two-player mode bypasses all that and just lets two humans punch it out.

Play Basketball Legends 2020 unblocked on UBGHyper alongside other sports classics like Basketball Stars, Basket Random, and Soccer Random.`,
    controls: `<strong>Player 1</strong>: WASD to move, <strong>B</strong> to shoot, <strong>V</strong> to dunk/block, <strong>D</strong> for special. <strong>Player 2</strong>: Arrow keys to move, <strong>L</strong> to shoot, <strong>K</strong> to dunk/block, <strong>Down arrow</strong> for special.`,
    tips: [
      'Hold the shoot button for power, release for a perfectly-timed three. Mash-tap = bricks.',
      'Defence wins games. Active blocks (V/K) interrupt opponent shots; passive D (just standing in the lane) only stops weak drives.',
      'Each character\'s special move is wildly different — some are dunks, some are precision threes, some are screen-shaking power-ups. Test all of them in practice.',
      'Two-player mode rewards aggressive defence. Camping the perimeter wins games against humans who can\'t pull off mid-range jumpers reliably.',
    ],
    faqs: [
      { q: 'How many characters are in Basketball Legends 2020?', a: 'Around 30 characters, divided across multiple teams. Each has distinct stats and special moves.' },
      { q: 'What\'s the difference between Basketball Stars and Basketball Legends 2020?', a: 'Different developers, different feel. Basketball Stars is faster and more arcade-flavoured; Basketball Legends 2020 has weightier physics and a stronger 2-player local focus.' },
      { q: 'Can I play 2-player on the same keyboard?', a: 'Yes — that\'s the most popular mode. Both players share one keyboard, one player on WASD/B/V, the other on arrow keys/L/K.' },
      { q: 'Is there an offline mode?', a: 'The AI tournament mode is offline. Multiplayer requires both players on the same machine — there\'s no online mode in this title.' },
      { q: 'Is Basketball Legends 2020 free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up needed.' },
    ],
  },

  'Eggy-Car': {
    longdesc: `Eggy Car is the deceptively cruel physics game where you drive a small car with a giant raw egg balanced precariously on top, and your only objective is not to drop the egg. Sounds easy. The egg has other ideas.

The course is an endless side-scrolling track of hills, drops, jumps, and ramps. The car handles smoothly — acceleration, braking, easy turns. The egg, however, is barely attached. Every bump shifts it. Every steep climb tips it backward. Every fast descent threatens to roll it off the hood. You spend the entire run feathering the throttle and brake to keep the egg centred.

The game rewards patience over speed. Slow runs are long runs. Going too fast over a single hill flings the egg into orbit; cresting the same hill at a controlled pace passes safely. The longer you survive, the trickier the terrain — hills get steeper, gaps get wider, the egg seems to actively try to fall off.

There's a coin economy that unlocks new cars and skins, but the game's draw isn't progression — it's the constant tension of an unstable load. Each run is a tiny exercise in restraint. Some players reach distances of 5km+; most experience a perfect tense little 200-metre run before disaster strikes.

Play Eggy Car unblocked on UBGHyper alongside other physics-driving classics like Drive Mad, Drift Boss, and Hill Climb Racing.`,
    controls: `<strong>Right arrow</strong> or <strong>D</strong> — accelerate. <strong>Left arrow</strong> or <strong>A</strong> — brake / reverse. There's no jump, no tilt — physics is everything. Throttle control is the entire game.`,
    tips: [
      'Crest hills slowly. The single biggest egg-killer is hitting a peak too fast and launching off the back of the car.',
      'Brake INTO downhills, then accelerate out. Letting gravity build speed unchecked tips the egg forward.',
      'Air time is the enemy. Stay grounded on every bump — landing nose-down ejects the egg every time.',
      'When the road levels out, don\'t race. Conserve speed and recentre the egg before the next obstacle.',
    ],
    faqs: [
      { q: 'How far can you go in Eggy Car?', a: 'Top scores cluster around 10km+, but most casual runs end in the first 500 metres. Beating 1km consistently marks a skilled player.' },
      { q: 'How do you unlock new cars in Eggy Car?', a: 'Coins collected along the road buy new vehicles. Some cars have flatter hoods (easier balance) but slower top speeds — trade-offs.' },
      { q: 'Does the egg ever fall on its own?', a: 'No — every drop is a result of the car\'s motion. If you stop completely on flat ground, the egg sits forever.' },
      { q: 'Is Eggy Car like Drive Mad?', a: 'Similar physics-driving genre, very different goal. Drive Mad has fixed levels and obstacles; Eggy Car is an endless runner about balance, not platform navigation.' },
      { q: 'Is Eggy Car free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Idle-Breakout': {
    longdesc: `Idle Breakout is the genre mash-up that asked: what if the classic Breakout brick game ran itself while you bought upgrades? The result is one of the most-played idle games of the decade — a clicker game where the "clicks" are actually balls bouncing autonomously around the screen breaking bricks.

You start with a single basic ball that does 1 damage per brick hit. Money piles up as bricks break. You spend it on more balls (more brick damage per second), upgraded ball types (sniper, splash, plasma, poison), and ball speed/damage upgrades. Within an hour you have dozens of balls flying simultaneously, dealing tens of thousands of damage per second. Within a day you're breaking levels in milliseconds.

The genius of Idle Breakout is that the optimisation never stops. There are six different ball types, each with their own upgrade tree. Plasma balls chain damage between bricks; sniper balls one-shot the strongest bricks; splash balls clear groups. The optimal build changes as you progress — early game is about ball count, mid-game shifts to ball variety, late game is about prestige multipliers.

Prestige mode lets you reset progress for "gold" — a permanent currency that boosts your starting damage. The first prestige is a big leap; later prestiges become a slow grind that incentivises leaving the game running in a background tab. Which is, of course, exactly what every idle game wants.

Play Idle Breakout unblocked on UBGHyper alongside other idle classics like Cookie Clicker, Clicker Heroes, and Idle Mining Empire.`,
    controls: `Mouse only — click to manually break bricks for early-game progress. All upgrades are clicked through menus. Once you have multiple balls, the game plays itself.`,
    tips: [
      'Click manually until you can afford 5+ basic balls. After that, manual clicking is a waste of attention.',
      'Buy ball variety over ball quantity in mid-game. A few plasma balls outpace a dozen basic balls on dense brick levels.',
      'Don\'t prestige too early. Wait until your gold gain per prestige is at least 10x your last prestige — first one should happen around level 100.',
      'Leave the game open in a background tab during class for free progression. Idle games are designed for absence.',
    ],
    faqs: [
      { q: 'How many ball types are in Idle Breakout?', a: 'Six core ball types: Basic, Plasma, Sniper, Scatter, Cannon, and Poison. Each has its own upgrade tree and use case.' },
      { q: 'What does prestige do in Idle Breakout?', a: 'Resets all progress in exchange for permanent gold multipliers. First prestige is around level 100; the gold multiplier grows exponentially each prestige.' },
      { q: 'Does Idle Breakout save progress?', a: 'Yes — progress saves automatically in your browser. UBGHyper preserves it across visits.' },
      { q: 'What\'s the best ball type to buy first?', a: 'Sniper balls — they target the highest-HP brick and one-shot it. Massively faster level clearing than basic ball spam.' },
      { q: 'Is Idle Breakout free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Tunnel-Rush-2': {
    longdesc: `Tunnel Rush 2 is the dizzying psychedelic endless runner where you fly through a rotating geometric tunnel dodging obstacles that come at you faster than your brain can process. It's pure pattern recognition, executed at speeds that genuinely test reaction time.

The first 30 seconds of a run are warm-up. The tunnel rotates slowly, obstacles are widely spaced, gaps are obvious. Past one minute the speed doubles, the rotation accelerates, and the obstacles start arriving in interlocking patterns that require committing to a path several seconds before you see the gap. Top players run on muscle memory and peripheral vision — at full speed there's no time to consciously identify each obstacle.

What separates Tunnel Rush 2 from the original is the visual chaos. The walls flash colour, the tunnel pulses with the music, and at high speeds the screen becomes a strobing kaleidoscope. Some players love this — it puts them into a flow state where reactions feel automatic. Others find it physically exhausting. There's no middle ground.

The levels (or "worlds") have distinct visual themes — neon city, fire pit, ice tunnel — and each unlocks at score thresholds. Beyond the level system there's Endless Mode for the true masochists. Top scores require 5+ minute survival runs at speeds where the tunnel is essentially a blur.

Play Tunnel Rush 2 unblocked on UBGHyper alongside other reflex classics like Slope, Run 3, and Snow Rider 3D.`,
    controls: `<strong>Left arrow</strong> or <strong>A</strong> — rotate tunnel left. <strong>Right arrow</strong> or <strong>D</strong> — rotate tunnel right. That's it. There's no jump, no acceleration — you\'re always moving forward at increasing speed.`,
    tips: [
      'Don\'t look at the obstacle in front of you. Look 1-2 seconds ahead so your brain has time to plan the path.',
      'Tap rotations, don\'t hold them. Holding rotates too far past the gap; tap-tap-tap gives finer control.',
      'When the screen strobes, focus on the centre dot. Peripheral vision handles the obstacles better than direct staring at speed.',
      'Take breaks. Long sessions of Tunnel Rush 2 can cause eye fatigue and motion sickness — 5-minute breaks help maintain reaction speed.',
    ],
    faqs: [
      { q: 'How is Tunnel Rush 2 different from the original?', a: 'More levels, stronger visual effects, faster scaling at high scores. The base mechanics are unchanged — it\'s a sequel, not a rebuild.' },
      { q: 'Is there an end to Tunnel Rush 2?', a: 'No — Endless Mode runs forever, with speed and difficulty scaling indefinitely. Top players manage 10,000+ scores.' },
      { q: 'Can Tunnel Rush 2 cause motion sickness?', a: 'For some players, yes — the rotation and strobe effects are intense. If you start feeling unwell, stop and take a break.' },
      { q: 'What\'s the highest level in Tunnel Rush 2?', a: 'Multiple themed levels unlock at score gates. The full progression has 20+ distinct visual worlds.' },
      { q: 'Is Tunnel Rush 2 free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up needed.' },
    ],
  },

  'Stick-Merge-2': {
    longdesc: `Stick Merge 2 is the sequel that took a perfectly fine idle-merger game and tripled the depth. You operate a stickman gun-merging assembly line — buy guns, drag matching pairs together to upgrade them, and aim the result at a wave of targets. Sounds simple. By the third upgrade tier it becomes a serious optimisation puzzle.

The mechanics layer beautifully. You start with peashooters that take 20 hits to kill a basic dummy. By merging four of them into a stronger tier, then four of those into the next tier, you suddenly one-shot the entire target row. Money pools from your kill streaks, which buys more starting guns, which compound into faster merges. Within an hour you're farming galaxy-scale damage numbers.

The sequel adds prestige currency, special weapon types (lasers, rockets, miniguns, bows), and bonus rounds that test reflexes instead of just income optimisation. The progression curve is well-tuned — there's no plateau where the game becomes pure idle grinding. Every 10 minutes you unlock something genuinely new.

Stick Merge 2 is one of those games that's perfect for school browsers because each session is exactly as long as you want it. Quick 5-minute burn between classes? You'll unlock 3 weapons. Stuck in a study hall for 90 minutes? You'll prestige twice and unlock the lategame meta. It scales to your available time.

Play Stick Merge 2 unblocked on UBGHyper alongside other idle classics like Idle Breakout, Cookie Clicker, and Bloons TD 5.`,
    controls: `Mouse only. <strong>Click and drag</strong> matching guns together to merge them into a stronger weapon. <strong>Click empty slots</strong> to spawn new starter guns. <strong>Click upgrade buttons</strong> in the menu to permanently improve damage, fire rate, and merge value.`,
    tips: [
      'Always merge from the highest tier down. Merging 4 tier-1s creates a tier-2; merging 4 tier-2s creates a tier-3. The fastest path to high-tier weapons is bulk merging, not single one-at-a-time.',
      'Empty slot management matters. Keep at least 2 slots empty so you can buy starter guns and place them somewhere — otherwise you stall.',
      'Prestige early once your gold-per-second plateaus. The permanent multiplier far outweighs the temporary income from grinding the same level.',
      'Special-weapon waves give 10x money for finishing fast. Save your highest-tier weapons for those waves.',
    ],
    faqs: [
      { q: 'How is Stick Merge 2 different from the original?', a: 'More weapon tiers, a proper prestige system, special bonus rounds, and ~5x the lategame depth. Same merge mechanic, much more polished progression.' },
      { q: 'Does Stick Merge 2 save progress?', a: 'Yes — automatically in your browser\'s localStorage. UBGHyper preserves it across visits on the same device.' },
      { q: 'What\'s the highest weapon tier?', a: 'There are around 12 standard tiers, plus special weapons that branch off the main merge tree. Reaching the top usually takes 5+ prestiges.' },
      { q: 'Should I focus on damage upgrades or merge value upgrades?', a: 'Merge value early (cheaper merges = faster progression), damage upgrades mid-game (once you have a steady merge cycle).' },
      { q: 'Is Stick Merge 2 free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Minecraft-Case-Simulator': {
    longdesc: `Minecraft Case Simulator is the loot-box clicker that took the appeal of opening Counter-Strike cases and recreated it in Minecraft\'s blocky aesthetic. You buy cases, watch the slot-machine animation, and pull out blocks, weapons, mobs, and rare cosmetics with varying drop rates. There\'s no actual Minecraft gameplay here — it\'s a pure loot-grinding loop disguised as Minecraft.

The hook is the same hook every loot-box game uses: variable-ratio reinforcement. You know the rare drops exist (golden tools, enchanted diamond armour, mob spawn eggs), you can see the rarity percentages, and every case might be The One. Players regularly grind through 200+ cases looking for a single legendary drop.

What makes Case Simulator above-average for the genre is the inventory layer. Every item you pull goes into a persistent collection you can sort, trade in for in-game currency, or showcase. The collection-completion drive becomes its own meta-game — there are hundreds of unique pulls and most players never see them all.

The game is genuinely free — there\'s no IRL money involved, just the in-game currency you earn by opening cases or completing daily tasks. That means none of the predatory monetisation that the real CS case-opening sites use. It\'s a clean version of the genre.

Play Minecraft Case Simulator unblocked on UBGHyper alongside other Minecraft titles like Minecraft 1.12 (Eaglercraft) and Minecraft Classic Online.`,
    controls: `Mouse only. <strong>Click "Buy Case"</strong> to purchase one with your in-game currency. <strong>Click "Open"</strong> to trigger the reveal animation. <strong>Click inventory items</strong> to view, sort, or sell them. Navigate menus with point-and-click.`,
    tips: [
      'Save up for the rarer case tiers — they have proportionally better odds and the legendaries only drop from higher-tier cases.',
      'Daily login bonuses give free cases. Set a routine to check in once a day so you never lose the streak multiplier.',
      'Sell duplicate commons immediately. The currency adds up faster than you\'d think and accelerates your case-buying.',
      'Don\'t chase a single rare drop in marathon sessions. Drop rates are independent — your 500th case has the same odds as your first.',
    ],
    faqs: [
      { q: 'Is Minecraft Case Simulator the real Minecraft?', a: 'No — it\'s a standalone game that uses Minecraft\'s visual style and item iconography. There\'s no building, no survival, no exploration. Just case-opening.' },
      { q: 'Does it cost real money?', a: 'No. The in-game currency is earned by opening cases, completing daily quests, and selling duplicates. Zero IRL money involvement.' },
      { q: 'What\'s the rarest item in Minecraft Case Simulator?', a: 'Legendary-tier drops (golden enchanted tools, special mob eggs, mythic skins) typically have <1% drop rates from premium cases. Some are sub-0.1%.' },
      { q: 'Can I trade items with other players?', a: 'No — Case Simulator is single-player. Your inventory is local to your browser. There\'s no live trading or marketplace.' },
      { q: 'Is Minecraft Case Simulator free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Blackjack': {
    longdesc: `Blackjack is the most-played casino card game on Earth, and the browser version on UBGHyper is the pure, no-frills original. You\'re dealt two cards, the dealer is dealt two (one face-down), and your goal is to get as close to 21 as possible without going over while beating the dealer\'s eventual hand. Hit for another card, stand to lock in your total, double down for big bets, split pairs into two hands. Classic rules, classic decisions.

What makes Blackjack the favourite of casino-game players is that it\'s the lowest house-edge game in the building — and with basic strategy you can lower that edge to under 0.5%. Card counting (in a real casino) drops it further. None of that applies here because the digital deck reshuffles every hand, but the strategy mechanics — knowing when to hit vs stand on each total against each dealer up-card — are the same skill you\'d use at a real table.

The browser version is perfect for learning. There\'s no IRL money, the chip stack is replenishable, and you can practice basic strategy infinitely without burning real cash. Players who put in 30 minutes of basic-strategy practice typically improve their win rate dramatically over playing on intuition alone.

Play Blackjack unblocked on UBGHyper alongside other casino-style strategy games like Bartender the Right Mix, Buckshot Roulette, and Cookie Clicker.`,
    controls: `Mouse only. <strong>Click "Hit"</strong> to draw another card. <strong>Click "Stand"</strong> to lock in your current total. <strong>Click "Double"</strong> to double your bet and take exactly one more card. <strong>Click "Split"</strong> to split a pair into two separate hands (if dealt a pair). Bet by clicking chip denominations before each hand.`,
    tips: [
      'Always split aces and 8s. Never split 10s or 5s. This single rule prevents the most common beginner losses.',
      'Hit on 16 against dealer 7+. Stand on 17+. These two rules cover 60% of your decisions and dramatically lower house edge.',
      'Double down on 11 against any dealer card except an ace. It\'s the single most profitable double.',
      'The dealer\'s face-down card is statistically more likely to be a 10 than any other value. Play assuming they have 10+ them card up.',
    ],
    faqs: [
      { q: 'Is the browser Blackjack rigged?', a: 'No — UBGHyper\'s Blackjack uses standard random card draws. Each hand is independent and follows real Vegas rules.' },
      { q: 'Can I count cards in the browser version?', a: 'No, because the digital deck reshuffles between hands. Card counting requires a finite shoe that gets dealt down over many hands — which doesn\'t happen here.' },
      { q: 'What\'s basic strategy in Blackjack?', a: 'A mathematically optimal set of decisions for every possible hand vs dealer up-card combination. Following it lowers the house edge to under 1%. There are basic strategy charts online for reference.' },
      { q: 'Does Blackjack on UBGHyper save my chip total?', a: 'Yes — chip totals persist in your browser\'s localStorage. Lose it all? Reset to a starting stack from the menu.' },
      { q: 'Is Blackjack on UBGHyper free?', a: 'Yes — fully free, no IRL money involved, no pop-ups, no sign-up required.' },
    ],
  },

  'Fruit-Ninja': {
    longdesc: `Fruit Ninja is the touchscreen-era classic that turned mouse-swipes into a rhythm game. Fruit launches up the screen from the bottom, you swipe to slice it before it falls, and you avoid the occasional bomb that ends your run if you slice it. The combos build, the multipliers stack, and the screen becomes a juicy slow-motion mess of pomegranates and watermelons exploding mid-air.

The browser version is faithful to the mobile original — same fruit physics, same bomb tension, same slow-motion bonus on big combos. The mouse-based control is actually more precise than touchscreen for high-level play; experienced players can carve three-fruit combos with a single diagonal swipe that takes practice on a phone.

What gives Fruit Ninja its longevity is the score curve. Beginners struggle to hit 50 fruits. Intermediate players hit 200 with combos. Top players chain combos so consistently that they keep multipliers active across most of the run and score in the thousands. There\'s always another tier to chase.

Game modes vary from the classic endless to time-attack to bomb-only challenges. The browser version on UBGHyper includes the core modes — perfect for a 5-minute decompression between classes.

Play Fruit Ninja unblocked on UBGHyper alongside other quick-reflex arcade games like Tiny Fishing, Doodle Jump, and Eggy Car.`,
    controls: `<strong>Click and drag</strong> to swipe across the screen. Cut through fruit to slice it. Avoid bombs — slicing one ends your run instantly. Touchscreen: swipe with your finger.`,
    tips: [
      'Diagonal swipes cover more fruit per stroke. Slicing three fruits in one swipe triggers a combo bonus worth way more than three single slices.',
      'When bombs appear in clusters with fruit, pick your slice path carefully. Sometimes letting one fruit drop is worth the avoided -1 from a bomb.',
      'The slow-motion bonus on big combos gives you free time to set up the next slice. Use it to position for another combo, not just to admire the explosion.',
      'In time-attack, prioritise combos over total fruit count. A 5-fruit combo beats five single slices on points and time.',
    ],
    faqs: [
      { q: 'Is this the official Fruit Ninja?', a: 'It\'s a browser version of the original Halfbrick Fruit Ninja gameplay. Same mechanics, same fruit physics, runs without the mobile app.' },
      { q: 'How do you get a high score in Fruit Ninja?', a: 'Chain combos (slice 3+ fruits in one swipe), avoid all bombs, and use slow-motion windows to set up the next combo. Top scores require sustained combo chains.' },
      { q: 'Are there power-ups in the browser version?', a: 'Some browser builds include power-up fruit (freeze bombs, frenzy mode, multi-fruit bonuses). Look for the special-coloured fruits during play.' },
      { q: 'Does Fruit Ninja work on touchscreen at school?', a: 'Yes — full touchscreen support. Mouse and touchscreen both work; mouse is actually slightly more precise for combo-chasing.' },
      { q: 'Is Fruit Ninja free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Effing-Worms': {
    longdesc: `Effing Worms is the chaos-arcade game where you control a giant subterranean worm whose only job is to burst out of the ground and eat everything. People run. Cars try to escape. The military rolls in tanks and helicopters. Your worm grows larger with each meal, until you\'re the size of a city block and the screen fills with carnage every time you surface.

The brilliance of the original is its escalation. You start small, eating cows in a quiet field. By minute three you\'re ambushing convoys. By minute ten you\'re tearing through fighter jets mid-flight and the screen is constant explosions. The game scales the threats faster than you scale yourself, which means even at maximum worm-size every emergence is genuinely tense.

What makes Effing Worms a school-browser staple is the run length. Each session is 5-15 minutes. Death is fast (military jets coordinate strikes that overwhelm careless worms), restart is one click, and there\'s a meta-progression of unlocked abilities that gives long-term replayability without trapping you in a single long run.

Play Effing Worms unblocked on UBGHyper alongside other action-arcade chaos games like Burrito Bison 3, Storm The House 2, and Hobo.`,
    controls: `<strong>Mouse</strong> — move your worm in the direction of the cursor. <strong>Left-click</strong> — bite/attack. <strong>Spacebar</strong> — burrow underground (escape danger). Surface to attack, burrow to escape and regenerate health.`,
    tips: [
      'Don\'t stay surfaced too long. The military scales threats based on how exposed you are; a 5-second surface attack followed by a 3-second burrow keeps you alive far longer than constant aggression.',
      'Eat cars and tanks when full — they\'re worth more growth points than humans and replenish your size faster.',
      'Helicopters are the biggest mid-game threat. They track you while burrowed via heat signature. Avoid them by surfacing only when they\'re directly above (so you\'re behind them on emergence).',
      'Unlock the spike upgrade early — passive damage during burrows kills tanks above ground without exposing you.',
    ],
    faqs: [
      { q: 'How long is an Effing Worms run?', a: 'Typical runs last 5-15 minutes. Top players survive 30+ minutes and reach city-destroying sizes; most players die to coordinated military strikes around minute 10.' },
      { q: 'Are there boss enemies?', a: 'Yes — late-game spawns elite military units, helicopter formations, and (in some versions) a final mech-suit boss with high HP and tracking missiles.' },
      { q: 'What\'s the biggest your worm can grow?', a: 'Roughly 5-10x starting size in most versions. Larger worms move slower, so the game balances growth against agility.' },
      { q: 'Is Effing Worms appropriate for school?', a: 'The violence is cartoonish (no blood, exaggerated reactions) and the title is a censored "f-word" reference. Most school filters don\'t flag it, but check your school\'s specific rules.' },
      { q: 'Is Effing Worms free on UBGHyper?', a: 'Yes — fully free, no pop-ups, no sign-up required.' },
    ],
  },

  'Slope-2': {
    longdesc: `Slope 2 is the sequel to the iconic chrome-ball roller, and it keeps everything that made the original a school-computer legend while cranking up the speed. You guide a ball down an endless neon course suspended in a dark void, steering left and right to stay on the track, dodge red obstacles, and clear the gaps that open beneath you.

The core loop is identical to Slope — survive as long as possible while the ball accelerates — but Slope 2 adds wider tracks, new obstacle layouts, and steeper drops that throw your momentum off if you're not ready. The further you get, the faster the ball moves, until you're reacting on pure reflex.

What makes Slope 2 click is the same thing that made the first one addictive: the runs are short, the restart is instant, and "one more try" is always tempting. A bad run ends in seconds; a good one becomes a personal-best chase. There are no upgrades, no power-ups, and no shop — just you, the ball, and how long your reflexes hold up.

Play Slope 2 unblocked at UBGHyper with no download and instant load. If you like it, the original Slope, Tunnel Rush, and Run 3 deliver the same high-speed, reflex-twitch energy.`,
    controls: `<strong>Left arrow</strong> or <strong>A</strong> — steer left. <strong>Right arrow</strong> or <strong>D</strong> — steer right. That's it — there's no jump and no brake. The ball accelerates on its own.`,
    tips: [
      'Tap to steer instead of holding — small corrections keep you centred; long presses send you off the edge.',
      'Watch two screens ahead, not the ball itself. At high speed you need to read obstacles early.',
      'Stay near the middle of wide sections so you have room to react either way.',
      'Speed only goes up. Treat every second as harder than the last and don\'t get greedy near the edges.',
    ],
    faqs: [
      { q: 'How is Slope 2 different from the original Slope?', a: 'Slope 2 is faster out of the gate and adds new track layouts, wider sections, and steeper drops. The controls and goal are the same — survive the endless descent — but it ramps up sooner.' },
      { q: 'What are the controls for Slope 2?', a: 'Just left and right — use the arrow keys or A and D to steer the ball. There is no jump or brake; the ball speeds up automatically the longer you survive.' },
      { q: 'How do you get a high score in Slope 2?', a: 'Make small, frequent steering taps, look ahead of the ball rather than at it, and stay centred on wide tracks. Survival time is your score, so consistency beats risky shortcuts.' },
      { q: 'Is Slope 2 free and unblocked at school?', a: 'Yes — Slope 2 runs entirely in your browser at UBGHyper, so it loads on most school networks with no download, no sign-up, and no pop-ups.' },
      { q: 'Can I play Slope 2 on a Chromebook?', a: 'Yes. Slope 2 works on Chromebooks, Windows, Mac and Linux in any modern browser. Keyboard controls feel best, which is why most players run it on a school laptop.' },
    ],
  },

  'Snow-Rider-3D': {
    longdesc: `Snow Rider 3D is an endless winter sledding game where you bomb down a snowy slope on a toboggan, weaving between trees, snowmen, stone arches, and wooden ramps. The hill never ends, the obstacles never stop coming, and one crash sends you straight back to the start — so every run is a test of nerve and reflexes.

The hook is the gift boxes scattered down the mountain. Collect enough and you unlock new sleds — from basic toboggans to sports cars, jet skis, and sillier rides — each a small reward that keeps you coming back for "just one more descent." Ramps launch you into the air, and timing your landings to thread the next gap is where the skill comes in.

Snow Rider 3D earns its spot among UBGHyper's most-played games because it's pure pick-up-and-play: no tutorial, no menus to fight, just steer and survive. Runs are short enough to squeeze in between classes and tense enough that beating your distance record feels genuinely satisfying.

Play Snow Rider 3D unblocked at UBGHyper, free and instant in the browser. Fans of Slope, Subway Surfers, and Tunnel Rush will feel right at home with its endless-runner rhythm.`,
    controls: `<strong>Left/Right arrows</strong> or <strong>A/D</strong> — steer the sled. <strong>Spacebar</strong> or <strong>Up arrow</strong> — jump over obstacles and gaps. You can also steer with the mouse in most builds.`,
    tips: [
      'Grab every gift box you safely can — they\'re the only way to unlock new sleds.',
      'Use jumps to clear clusters of trees you can\'t steer around in time.',
      'Land facing straight downhill; a crooked landing makes the next obstacle much harder to dodge.',
      'Stay loose on wide sections and tighten up your steering as the obstacles bunch together.',
    ],
    faqs: [
      { q: 'How do you unlock new sleds in Snow Rider 3D?', a: 'Collect the gift boxes scattered down the slope. Each sled has a gift cost, so the further you ride and the more boxes you grab, the more rides — from toboggans to cars — you can unlock.' },
      { q: 'What are the controls for Snow Rider 3D?', a: 'Steer with the left/right arrows or A and D (or the mouse), and press spacebar or the up arrow to jump over obstacles and gaps.' },
      { q: 'Is Snow Rider 3D endless?', a: 'Yes — the slope generates forever and gets denser with obstacles the longer you survive. Your score is the distance you travel before crashing.' },
      { q: 'Is Snow Rider 3D unblocked and free at school?', a: 'Yes. Snow Rider 3D runs in your browser at UBGHyper with no download and no sign-up, so it works on most school Chromebooks and networks.' },
      { q: 'What games are like Snow Rider 3D?', a: 'If you like Snow Rider 3D, try Slope and Slope 2 (neon ball-rollers), Tunnel Rush, and Subway Surfers — all fast, endless dodging games.' },
    ],
  },

  'Moto3XM': {
    longdesc: `Moto X3M is a side-scrolling motorbike stunt racer built around one thing: beating the clock. Each level is a short obstacle course packed with ramps, spikes, explosives, swinging wrecking balls, and loops, and your job is to reach the finish line as fast as possible without wiping out — though wiping out is half the fun.

The genius of Moto X3M is the flip system. Doing backflips and frontflips off ramps shaves seconds off your time, so the fastest runs aren't just about speed — they're about risking spectacular mid-air stunts and landing them cleanly. Crash and you respawn instantly at the last checkpoint, so experimentation is cheap and the retry loop is addictive.

Levels escalate from simple jumps to elaborate Rube-Goldberg death traps, and a three-star rating on each stage pushes you to keep refining your line. It's the kind of game where your first clear feels great and your fifth clear — flipping through every gap to chase three stars — feels even better.

Play Moto X3M unblocked at UBGHyper, free and instant. If you like it, try Happy Wheels, Drive Mad, and the other Moto X3M levels for more physics-driven, restart-happy chaos.`,
    controls: `<strong>Up arrow</strong> or <strong>W</strong> — accelerate. <strong>Down arrow</strong> or <strong>S</strong> — brake/reverse. <strong>Left / Right arrows</strong> (or <strong>A / D</strong>) — lean back and forward to control flips and landings.`,
    tips: [
      'Do backflips off every ramp you can — each completed flip cuts time off your run.',
      'Always level the bike before landing; touching down mid-flip is an instant crash.',
      'Brake before tight obstacles instead of trusting full speed — a clean run beats a fast crash.',
      'Memorise the hazards. Levels are short, so a few practice attempts make the three-star time achievable.',
    ],
    faqs: [
      { q: 'How do you go faster in Moto X3M?', a: 'Do flips. Completing backflips and frontflips off ramps reduces your finish time, so the fastest runs chain stunts together — as long as you land them cleanly.' },
      { q: 'What are the controls for Moto X3M?', a: 'Up or W to accelerate, down or S to brake, and the left/right arrows (or A/D) to lean and rotate the bike for flips and landings.' },
      { q: 'How do you get three stars on a Moto X3M level?', a: 'Beat the level under its target time. That usually means taking risky shortcuts, flipping for time bonuses, and learning the hazard layout so you don\'t slow down.' },
      { q: 'Is Moto X3M unblocked and free at school?', a: 'Yes — Moto X3M runs in your browser at UBGHyper with no download, no sign-up, and no pop-ups, so it works on most school Chromebooks.' },
      { q: 'What other games are like Moto X3M?', a: 'If you like Moto X3M, try Happy Wheels (more chaotic ragdoll physics), Drive Mad (balance puzzles), and the other Moto X3M sequels on UBGHyper.' },
    ],
  },

  'Monkey-Mart': {
    longdesc: `Monkey Mart is a cosy supermarket management game where you play a monkey running an ever-expanding grocery store. You plant bananas, harvest them, stock the shelves, and then watch customers grab your produce and queue at the checkout — where you ring them up and collect the cash to grow the business.

The clever part is the rhythm. You're constantly walking a loop: plant, harvest, restock the shelf that's running low, dash to the register. As money rolls in you unlock new stations — corn, eggs, coffee, peanut butter — and hire monkey assistants to automate the jobs you were doing by hand, turning the store into a self-running money machine.

Monkey Mart sits between an idle game and a management sim: active enough to keep you busy, automated enough to feel like steady progress. There's no failure state and no timer — just the satisfying climb from a one-shelf fruit stand to a sprawling supermarket with staff handling every aisle.

Play Monkey Mart unblocked at UBGHyper, free and instant in the browser. If you like its plant-and-stock loop, try Idle Mining Empire, Cooking Mama, and Cookie Clicker.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — walk your monkey around the store. Everything else is automatic: stand next to a crop to harvest it, next to a shelf to stock it, or next to the register to serve customers. On touchscreens, drag to move.`,
    tips: [
      'Never let a shelf sit empty — customers leave money on the table when there\'s nothing to buy.',
      'Hire assistants as soon as you can afford them; automating harvesting and checkout frees you to expand.',
      'Unlock higher-value products (coffee, peanut butter) to boost income per customer.',
      'Upgrade your movement speed early — most of the game is walking between stations, so speed compounds.',
    ],
    faqs: [
      { q: 'How do you make money fast in Monkey Mart?', a: 'Keep every shelf stocked, hire assistant monkeys to automate jobs, and unlock higher-value products like coffee and peanut butter. Income per customer rises as your store grows.' },
      { q: 'What are the controls for Monkey Mart?', a: 'Move with the arrow keys or WASD (or drag on touchscreens). Standing next to a station automatically harvests, stocks, or serves — there are no extra buttons to press.' },
      { q: 'Can you hire workers in Monkey Mart?', a: 'Yes. As you earn money you can hire assistant monkeys who automatically run stations like harvesting and the checkout, turning the store into a mostly self-running operation.' },
      { q: 'Is there an end to Monkey Mart?', a: 'There\'s no fail state or finish line — it\'s an open-ended management game. The goal is to keep unlocking products, hiring staff, and expanding your supermarket.' },
      { q: 'Is Monkey Mart free and unblocked at school?', a: 'Yes — Monkey Mart runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks and networks.' },
    ],
  },

  'OvO-2': {
    longdesc: `OvO 2 is a fast, precise momentum platformer where you guide a little stick figure through tight obstacle courses using nothing but running, jumping, sliding, and diving. There are no enemies to fight — the challenge is the level itself: spikes, gaps, moving platforms, and walls that demand exact timing and clean movement.

The whole game is built on momentum. Sliding down a slope launches you further; diving from a height converts into speed; chaining a slide into a jump carries you across gaps a normal jump can't reach. Mastering OvO 2 means learning to keep your momentum alive instead of stopping and starting, which is also what makes it so satisfying to speedrun.

OvO 2 keeps the punishing-but-fair design of the original: you'll die a lot, but the restart is instant and every death teaches you the timing for the next attempt. Clearing a level you've failed twenty times — finally flowing through it without a single stop — is the payoff the whole game is chasing.

Play OvO 2 unblocked at UBGHyper, free and instant. If you like its tight platforming, try the original OvO, Vex, and Super Meat Boy for more precision-jumping challenge.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — move and jump (up/W to jump). <strong>Down arrow</strong> or <strong>S</strong> — slide on the ground and dive in the air. Hold a direction while sliding off a ramp to launch further.`,
    tips: [
      'Keep moving. OvO 2 rewards continuous momentum — stopping kills your speed and makes long gaps impossible.',
      'Dive from heights to convert your fall into forward speed, then slide to carry it.',
      'Slide into a jump off ramps to clear gaps a standing jump can\'t reach.',
      'Failure is free — the instant restart means you should experiment with risky lines until the timing clicks.',
    ],
    faqs: [
      { q: 'How do you slide and dive in OvO 2?', a: 'Press down or S on the ground to slide, and down or S in the air to dive. Diving from a height converts into forward speed, and sliding off ramps launches you across bigger gaps.' },
      { q: 'What are the controls for OvO 2?', a: 'Move with the arrow keys or WASD, jump with up or W, and slide/dive with down or S. The whole game uses just movement, jump, and slide.' },
      { q: 'Is OvO 2 harder than the original OvO?', a: 'OvO 2 keeps the same precise, momentum-based platforming and adds new level layouts and obstacles. It\'s demanding but fair, with instant restarts so you learn each section quickly.' },
      { q: 'Is OvO 2 free and unblocked at school?', a: 'Yes — OvO 2 runs in your browser at UBGHyper with no download, no sign-up, and no pop-ups, so it loads on most school Chromebooks.' },
      { q: 'What games are like OvO 2?', a: 'If you like OvO 2, try the original OvO, the Vex series, and Super Meat Boy — all precision platformers built around tight timing and quick restarts.' },
    ],
  },

  'Escape-Road': {
    longdesc: `Escape Road is a top-down car-chase survival game where you drive through a sprawling city with the police on your tail, and the only goal is to stay free as long as possible. Cop cars chase you down, ram you, and try to box you in — and the longer you survive, the more aggressive the pursuit becomes.

The driving is all about handling and nerve. You drift around corners, cut through traffic, and use the map's tight alleys and open stretches to shake your pursuers. There's a real risk-reward tension: push too hard and you spin into a wall or a roadblock; play it too safe and the police swarm closes in. Collecting coins during the chase lets you unlock new cars with different speed and handling.

Escape Road earns its replay value from how fast a run resets — wreck the car and you're straight back into a new chase. It's the kind of game where you start "just one escape" and look up several attempts later, chasing a longer survival time.

Play Escape Road unblocked at UBGHyper, free and instant in the browser. If you like the chase, try Drive Mad, Madalin Stunt Cars, and Race Master for more driving action.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — steer, accelerate and reverse. Ease off the throttle and turn early to drift around tight corners; full speed into a turn usually ends in a crash.`,
    tips: [
      'Drift through corners instead of braking hard — keeping momentum is how you out-run the police.',
      'Use narrow alleys and turns to break the line of sight and shake pursuers off your tail.',
      'Grab coins when it\'s safe; they unlock faster cars that make later chases survivable.',
      'Don\'t drive into dead ends — always leave yourself an exit before the cop cars close the gap.',
    ],
    faqs: [
      { q: 'What is the goal in Escape Road?', a: 'Survive the police chase for as long as you can. There\'s no finish line — your score is how long you stay free while cop cars try to ram and trap you.' },
      { q: 'What are the controls for Escape Road?', a: 'Drive with the arrow keys or WASD. Turn early and ease off the throttle to drift around corners; flooring it into a tight turn usually ends in a crash.' },
      { q: 'How do you unlock new cars in Escape Road?', a: 'Collect coins during your escapes. Saved-up coins let you unlock faster cars with better handling, which makes the more aggressive late-chase stages survivable.' },
      { q: 'Is Escape Road unblocked and free at school?', a: 'Yes — Escape Road runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks and networks.' },
      { q: 'What games are like Escape Road?', a: 'If you like Escape Road, try Drive Mad, Madalin Stunt Cars, and Race Master for more driving and car-control challenge.' },
    ],
  },

  'Level-Devil': {
    longdesc: `Level Devil looks like an innocent little platformer — a tiny black square, a door at the end of each room, a few simple jumps in between. Then the floor disappears under your feet. Then spikes erupt where you were about to land. Then the ceiling drops on your head. Level Devil is a "troll" platformer built entirely around betraying your expectations, and that twist is exactly why it went viral.

The genius is that every trap is invisible until it's already killing you. A platform that held weight a second ago vanishes on your second pass. A safe-looking gap hides a spike pit that only appears mid-jump. The game is teaching you through death — each failure shows you one more lie the level is telling, and the only way forward is to memorise the deception and react a beat faster next time.

Because the rooms are short and the restart is instant, Level Devil never feels unfair for long. A death costs you two seconds, not two minutes, so you keep diving back in to outsmart the trap that just got you. The difficulty ramps from cheeky to genuinely cruel, with later levels stacking multiple fake-outs into a single screen.

Play Level Devil unblocked at UBGHyper — free, instant, and perfect for quick rage-and-retry sessions between classes. If you like it, try Getting Over It, OvO, and Vex for more precision-platforming punishment.`,
    controls: `<strong>Left / Right arrows</strong> or <strong>A / D</strong> — move. <strong>Up arrow</strong>, <strong>W</strong> or <strong>Space</strong> — jump. That's the whole control scheme; the challenge is reading the traps, not the inputs.`,
    tips: [
      'Assume nothing is safe. If a path looks obvious, the level is probably about to punish you for taking it.',
      'Move in short, deliberate hops so a vanishing floor or sudden spike doesn\'t catch you mid-commitment.',
      'Die on purpose to scout. The first run through a room is reconnaissance — learn where the trap is, then clear it.',
      'Stay calm after a fake-out. Most deaths come from panicking right after the first trick triggers a second one.',
    ],
    faqs: [
      { q: 'Why is Level Devil so hard?', a: 'Level Devil is a troll platformer — the levels deliberately hide traps (disappearing floors, sudden spikes, dropping ceilings) that only trigger once you commit. It\'s designed to kill you the first time so you learn each trick.' },
      { q: 'What are the controls for Level Devil?', a: 'Move with the arrow keys or A/D and jump with up, W, or space. The controls are simple on purpose — the difficulty is in reading the traps.' },
      { q: 'How many levels does Level Devil have?', a: 'Level Devil has dozens of short rooms across multiple chapters, and the difficulty escalates as traps start stacking together. New levels are added in updates.' },
      { q: 'Is Level Devil free and unblocked at school?', a: 'Yes — Level Devil runs entirely in your browser at UBGHyper with no download, no sign-up, and no pop-ups, so it works on most school Chromebooks.' },
      { q: 'What games are like Level Devil?', a: 'If you like Level Devil, try Getting Over It (rage platformer), OvO (precision speed-platformer), and the Vex series (trap-filled obstacle courses).' },
    ],
  },

  'Subway-Surfers': {
    longdesc: `Subway Surfers is the endless runner that defined the genre on phones and is just as addictive in the browser. You play a graffiti-tagging kid sprinting down the train tracks one step ahead of a grumpy inspector and his dog. The tracks never end, the speed only climbs, and your job is to run as far as you can while dodging trains, barriers, and tunnels.

The controls are pure swipe-and-react: move left or right between three lanes, jump over obstacles, and roll under barriers. What makes it stick is the rhythm — early on you have time to think, but as your speed ramps the lane changes come faster and faster until you're reacting on instinct alone. Coins and power-ups (the jetpack, the super sneakers, the hoverboard) litter the track, tempting you into risky lane swaps for a bigger haul.

Subway Surfers rewards greed and punishes it in equal measure. Grabbing a coin line that drifts toward an oncoming train is the classic trap — do you take the points or play it safe? The hoverboard is your safety net, saving you from one crash every thirty seconds, and learning when to pop it is the difference between a short run and a record.

Play Subway Surfers unblocked at UBGHyper — free, no download, and ready in your browser on a school Chromebook. If you like it, try Crossy Road, Temple Run 2, and Snow Rider 3D for more endless-runner action.`,
    controls: `<strong>Left / Right arrows</strong> or <strong>A / D</strong> — switch lanes. <strong>Up arrow</strong> or <strong>W</strong> — jump. <strong>Down arrow</strong> or <strong>S</strong> — roll under barriers. <strong>Space</strong> — activate your hoverboard.`,
    tips: [
      'Stay in the middle lane when you can — it gives you the most room to dodge either direction.',
      'Don\'t chase every coin. A line of coins curving toward a train is bait; survival beats score.',
      'Save your hoverboard for genuine "no escape" moments rather than popping it the second you have it.',
      'Look ahead, not at your character. Reading the track two trains early is how you survive the high-speed late game.',
    ],
    faqs: [
      { q: 'How do you get a high score in Subway Surfers?', a: 'Score climbs with distance, so survival is everything. Stay centred for room to react, grab the score multiplier when it appears, and use power-ups like the jetpack and hoverboard to push your run further.' },
      { q: 'What are the controls for Subway Surfers?', a: 'Use the arrow keys (or A/D) to change lanes, up to jump, down to roll, and space for the hoverboard. Everything is quick swipe-style movement.' },
      { q: 'How does the hoverboard work?', a: 'The hoverboard saves you from one crash and lasts about 30 seconds. Activate it with space and save it for moments where a crash is otherwise unavoidable.' },
      { q: 'Is Subway Surfers free and unblocked at school?', a: 'Yes — Subway Surfers runs in your browser at UBGHyper with no download or sign-up, so it loads on most school Chromebooks and networks.' },
      { q: 'What games are like Subway Surfers?', a: 'If you like Subway Surfers, try Crossy Road, Temple Run 2, and Snow Rider 3D — all fast, endless dodging games.' },
    ],
  },

  'FNAF-1': {
    longdesc: `Five Nights at Freddy's is the game that turned a haunted pizzeria into a global horror phenomenon. You take a minimum-wage night-security job at Freddy Fazbear's Pizza, watching a bank of security cameras from a tiny office. The catch: the animatronic mascots wander the building after hours, and if one reaches your office, it's game over. Survive from midnight to 6 AM, five nights in a row.

The terror comes from scarcity. You have limited power, and every action drains it — flicking between cameras, slamming the steel doors, clicking on the hallway lights. Run the meter to zero before 6 AM and the doors swing open in the dark. So you ration: check the cameras just enough to track Bonnie and Chica creeping closer, shut a door only at the last possible second, and pray Freddy stays in the shadows. It's a game of nerve and resource management dressed as a horror experience.

What made FNAF a franchise is the lore buried in the static — Easter eggs, hidden minigames, a murder mystery you piece together across the series. But the core loop is timeless: a dark room, a power meter, and four animatronics that only move when you're not looking.

Play Five Nights at Freddy's unblocked at UBGHyper — free, instant, and playable in your browser at school. If you like it, the rest of the series (FNAF 2, 3, 4, Sister Location, World, and UCN) is all here too.`,
    controls: `<strong>Mouse</strong> — click the camera panel at the bottom to check rooms, click the door and light buttons on each side of the office to seal doors or peek down the hall. Managing your power is the whole game.`,
    tips: [
      'Watch your power meter constantly. Every camera flick, door, and light costs power — idle hands save the night.',
      'Track Bonnie (your left) and Chica (your right) on the cameras, and only close a door when one is right outside.',
      'Check the lights before opening a door. If an animatronic is in the doorway, opening means death.',
      'Freddy moves in the dark and when you stop watching. Keep tabs on him, but don\'t burn power watching one spot.',
    ],
    faqs: [
      { q: 'How do you survive Night 1 in FNAF?', a: 'Conserve power: check cameras sparingly to track Bonnie and Chica, use the door lights to confirm a threat, and only shut a door at the last second. Make it to 6 AM without hitting zero power.' },
      { q: 'What are the controls for Five Nights at Freddy\'s?', a: 'It\'s all mouse — click the camera tablet to watch rooms and click the light/door buttons in your office to defend yourself. There\'s no movement; you stay in the office.' },
      { q: 'Who are the animatronics in FNAF 1?', a: 'The main threats are Freddy Fazbear, Bonnie, Chica, and Foxy (who charges from the Pirate Cove if you don\'t check on him). Each has its own behaviour pattern.' },
      { q: 'Is FNAF free and unblocked at school?', a: 'Yes — Five Nights at Freddy\'s runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks. Play with sound on for the full effect.' },
      { q: 'Are the other FNAF games on UBGHyper?', a: 'Yes — UBGHyper has FNAF 1, 2, 3, 4, Sister Location, World, Ultimate Custom Night, and Pizzeria Simulator, plus the Candy\'s spin-offs.' },
    ],
  },

  'Pizza-Tower': {
    longdesc: `Pizza Tower is a frantic, hand-drawn platformer that wears its Wario Land inspiration on its sleeve. You play Peppino Spaghetti, a sweaty, perpetually-panicking pizza chef who has to tear through a surreal tower to stop it crashing down on his restaurant. The whole game is built around momentum: the faster you move, the more powerful you become, and standing still is basically failure.

Where most platformers reward patience, Pizza Tower rewards reckless speed. Peppino can build up a sprint that lets him run up walls, smash through enemies, and bounce across gaps. Each level is explored twice — once on the way up at your own pace, and again in a frantic timed escape where you retrace the whole stage before the timer runs out. That escape sequence, with the music ramping and Peppino screaming, is where the game's chaotic energy peaks.

The animation is the other star: every frame is bursting with squash-and-stretch cartoon energy, and Peppino's terrified expressions sell the absurd panic. Combo scoring rewards stylish, uninterrupted destruction, so mastery is about chaining your movement into one unbroken, screaming run.

Play Pizza Tower unblocked at UBGHyper — free and instant in your browser. If you like its high-speed platforming, try Sonic, Super Meat Boy, and Cluster Rush.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — move. <strong>Hold the dash button</strong> (typically Shift or X) — build up a sprint to run up walls and smash through enemies. <strong>Jump</strong> with the up/Z key. Speed is everything; keep moving.`,
    tips: [
      'Keep your momentum. Peppino is at his strongest at full sprint — stopping kills your combo and your options.',
      'Use the dash to run up walls and across gaps you can\'t clear with a normal jump.',
      'Learn the level on the way up so the timed escape isn\'t a panicked guess.',
      'Chain your destruction. Uninterrupted combos rack up huge scores and unlock the game\'s best ranks.',
    ],
    faqs: [
      { q: 'What is Pizza Tower about?', a: 'Pizza Tower is a fast-paced platformer where you play Peppino, a pizza chef racing through a surreal tower. It\'s built around momentum — sprinting makes you stronger, and each level ends in a frantic timed escape.' },
      { q: 'What are the controls for Pizza Tower?', a: 'Move with the arrow keys or WASD, jump with up/Z, and hold the dash key (Shift/X) to build up a sprint that lets you run up walls and smash enemies.' },
      { q: 'How do you go fast in Pizza Tower?', a: 'Hold the dash to charge a sprint. At full speed Peppino can run up walls, break through obstacles, and chain combos — keeping that momentum unbroken is the core skill.' },
      { q: 'Is Pizza Tower free and unblocked at school?', a: 'Yes — Pizza Tower runs in your browser at UBGHyper with no download, no sign-up, and no pop-ups, so it works on most school Chromebooks.' },
      { q: 'What games are like Pizza Tower?', a: 'If you like Pizza Tower, try Sonic, Super Meat Boy, and Cluster Rush for more high-speed, momentum-driven action.' },
    ],
  },

  'Solar-Smash': {
    longdesc: `Solar Smash is a planet-destruction sandbox with one simple, endlessly satisfying pitch: here is a planet, now annihilate it. There's no score, no timer, and no failure — just a beautifully rendered world and a toolbox of apocalyptic weapons to take it apart with. It's equal parts physics toy and stress relief.

The arsenal is the whole game. Fire lasers that carve glowing trenches across continents, hurl asteroids that punch craters through the crust, summon a black hole that slowly swallows the planet whole, or call down a fleet of UFOs. Each weapon interacts with the planet's physics differently — some crack the surface, some boil the oceans, some shatter the world into a drifting field of debris. Watching a planet's atmosphere strip away or its core expose is genuinely mesmerising.

Beyond the default Earth, Solar Smash lets you target other planets and even entire solar systems, each with its own look and reactions. There's a quiet creativity to it — combining weapons, timing impacts, and seeing how much destruction one world can take before it stops being a planet at all.

Play Solar Smash unblocked at UBGHyper — free, instant, and endlessly replayable in your browser. If you like sandbox destruction, try People Playground, Sandboxels, and Melon Playground.`,
    controls: `<strong>Mouse</strong> — select a weapon from the menu, then click and drag on the planet to aim and fire. Rotate the planet by dragging, and switch planets or systems from the side menu. There are no rules — experiment.`,
    tips: [
      'Combine weapons. Crack the surface with asteroids first, then a laser reaches the molten core for bigger destruction.',
      'Try the black hole on a fully-intact planet and just watch — it\'s the most dramatic weapon in the game.',
      'Rotate the planet as you fire to spread damage across the whole surface instead of one spot.',
      'Switch to other planets and systems from the menu — each reacts to weapons differently.',
    ],
    faqs: [
      { q: 'What is the goal of Solar Smash?', a: 'There is no goal — Solar Smash is a sandbox planet-destruction simulator. You pick a planet and destroy it however you like with lasers, asteroids, black holes and more. It\'s about experimenting, not winning.' },
      { q: 'What are the controls for Solar Smash?', a: 'It\'s all mouse: pick a weapon from the menu, then click and drag on the planet to aim and fire. Drag to rotate the planet and use the side menu to switch planets or solar systems.' },
      { q: 'What weapons are in Solar Smash?', a: 'Lasers, asteroids, missiles, a black hole, UFO fleets, and more — each affecting the planet\'s physics differently, from cracking the crust to swallowing the whole world.' },
      { q: 'Is Solar Smash free and unblocked at school?', a: 'Yes — Solar Smash runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks.' },
      { q: 'What games are like Solar Smash?', a: 'If you like Solar Smash, try People Playground, Sandboxels, and Melon Playground for more physics-sandbox destruction.' },
    ],
  },

  'Drift-Hunters': {
    longdesc: `Drift Hunters is the browser drifting game serious sim fans actually respect. Instead of arcade button-mashing, it gives you a weighty, physics-driven drift model where holding a long, high-angle slide takes real throttle and steering control. You earn points for the angle, speed, and duration of your drifts, then spend them tuning and unlocking a garage of real-world-inspired cars.

The depth is in the tuning. Every car can be adjusted — engine swaps, turbo, gear ratios, camber, tyre pressure, suspension stiffness — and those settings genuinely change how the car breaks traction and holds a slide. Dialling in a setup that lets you link corners into one continuous drift is half the game. The other half is throttle discipline: too much and you spin, too little and you straighten out and lose the chain.

Drift Hunters offers several tracks, from tight technical circuits to open spaces built for big sweeping slides, plus a free-roam mode for practice. There's no clock pressure — it's a game about the feel of the car, the satisfaction of a perfectly held drift, and the steady grind of points toward your next upgrade.

Play Drift Hunters unblocked at UBGHyper — free, no download, and running in your browser on a school Chromebook. If you like it, try Madalin Stunt Cars, Drift Boss, and Cluster Rush.`,
    controls: `<strong>Up arrow / W</strong> — accelerate. <strong>Down arrow / S</strong> — brake. <strong>Left / Right arrows</strong> or <strong>A / D</strong> — steer. <strong>Space</strong> — handbrake to break traction and start a drift. <strong>Shift / Ctrl</strong> — shift gears (in manual).`,
    tips: [
      'Initiate a drift with a flick of the handbrake, then control the slide with throttle, not just steering.',
      'Modulate the gas. Drifting is throttle control — feed it in smoothly to hold the angle instead of spinning out.',
      'Tune for grip while you learn, then loosen the setup as you get comfortable holding bigger angles.',
      'Link corners. Points multiply for one continuous drift, so aim to chain slides rather than reset between them.',
    ],
    faqs: [
      { q: 'How do you drift in Drift Hunters?', a: 'Build up speed, tap the handbrake (space) to break traction into a corner, then control the slide with throttle and steering. Holding the angle smoothly without spinning is the core skill.' },
      { q: 'What are the controls for Drift Hunters?', a: 'Accelerate with up/W, brake with down/S, steer with left/right or A/D, handbrake with space, and shift gears with Shift/Ctrl in manual mode.' },
      { q: 'How do you earn money in Drift Hunters?', a: 'You earn points from the angle, speed, and length of your drifts. Chaining corners into one continuous drift scores the most, and points buy car upgrades and new cars.' },
      { q: 'Is Drift Hunters free and unblocked at school?', a: 'Yes — Drift Hunters runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks and networks.' },
      { q: 'What games are like Drift Hunters?', a: 'If you like Drift Hunters, try Madalin Stunt Cars, Drift Boss, and Cluster Rush for more driving and drifting action.' },
    ],
  },

  'Sprunki': {
    longdesc: `Sprunki is the fan-made music game that took the Incredibox formula and made it weird, dark, and wildly shareable. You drag a roster of quirky characters onto a stage, and each one loops a sound — a beat, a bassline, a vocal hook, a melody. Stack them together and they automatically lock into the same tempo, building a full track out of nothing but a few drag-and-drops. It's a music toy anyone can make something cool with in thirty seconds.

What turned Sprunki into a viral phenomenon is the "horror mode" twist. Drop the right character onto the stage and the whole scene transforms — the art goes unsettling, the cheerful loops mutate into eerie ones, and hidden animations trigger. Discovering these transformations and the secret combinations is half the fun, and it's exactly the kind of thing that blew up across YouTube and TikTok.

There's no score and no failure — Sprunki is a creative sandbox. You experiment with layering sounds, hunt for the hidden "bonus" animations, and try to build the catchiest (or creepiest) mix you can. Different Sprunki mods add new characters, new sounds, and new secrets, so there's always another version to explore.

Play Sprunki unblocked at UBGHyper — free, instant, and perfect for a quick creative break. If you like it, try Magic Tiles 3, FNF, and Incredibox-style rhythm games.`,
    controls: `<strong>Mouse</strong> — drag a character from the row at the bottom onto a slot on the stage to add their sound. Drag a character off to remove them. Click characters to mute or explore. That's it — there's nothing to lose.`,
    tips: [
      'Start with a beat and a bassline, then layer melodies and vocals on top — that\'s how the catchiest mixes are built.',
      'Experiment with the special characters; the right one can flip the whole stage into horror mode.',
      'Hunt for bonus animations — certain combinations of characters trigger hidden secret sequences.',
      'Mute individual characters to hear how each loop fits before committing to a full mix.',
    ],
    faqs: [
      { q: 'What is Sprunki?', a: 'Sprunki is a music-making game inspired by Incredibox. You drag characters onto a stage and each adds a looping sound, building a track together. It\'s famous for its hidden "horror mode" transformations.' },
      { q: 'How do you trigger horror mode in Sprunki?', a: 'Dropping certain special characters onto the stage transforms the scene into the darker "horror" version, changing the art and the sounds. Experimenting with the unique characters is how you unlock it.' },
      { q: 'What are the controls for Sprunki?', a: 'It\'s all mouse — drag characters from the bottom row onto the stage to add their sound, and drag them off to remove them. There\'s no score or fail state.' },
      { q: 'Is Sprunki free and unblocked at school?', a: 'Yes — Sprunki runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks. Headphones recommended.' },
      { q: 'What games are like Sprunki?', a: 'If you like Sprunki, try Magic Tiles 3, Friday Night Funkin, and other Incredibox-style music games.' },
    ],
  },

  'Speed-Stars': {
    longdesc: `Speed Stars is a sprinting game that turns the simple act of running into a genuinely hard skill. Instead of holding one button to auto-run, you alternate two keys in rhythm to drive your athlete's legs — left, right, left, right — and the faster and more evenly you alternate, the faster you sprint. Get the rhythm wrong and your runner stumbles, trips, or face-plants in glorious ragdoll fashion.

It's the spiritual successor to QWOP, but far more playable: where QWOP was deliberately impossible, Speed Stars is about finding a smooth, fast cadence and holding it through the whole race. Events range from short sprints to hurdles, and every fraction of a second counts. Nailing a clean 100m where your athlete never breaks stride is enormously satisfying.

The game's charm is in the ragdoll physics. A mistimed key turns a confident sprint into a flailing tumble, and the leaderboard culture is built on shaving milliseconds off your personal best. It's quick to pick up, brutal to master, and endlessly re-runnable — a bad race costs five seconds, so you always go again.

Play Speed Stars unblocked at UBGHyper — free, instant, and a perfect quick-competition game with friends. If you like it, try Getting Over It, QWOP, and Stickman Boost.`,
    controls: `Alternate two keys in rhythm to run — typically <strong>left arrow / right arrow</strong> (or two assigned keys) to drive each leg. Keep the alternation smooth and even; press the timing keys for hurdles and the finish lean.`,
    tips: [
      'Find a steady rhythm before you chase speed — even alternation beats frantic mashing.',
      'Don\'t panic after a stumble; recover your cadence rather than spamming keys.',
      'In hurdle events, time your jump key just before the hurdle, not on top of it.',
      'Consistency wins. A clean race with no trips usually beats a fast-but-messy one.',
    ],
    faqs: [
      { q: 'How do you run fast in Speed Stars?', a: 'Alternate the two run keys in a smooth, even rhythm — left, right, left, right. Speed comes from a consistent fast cadence, not from mashing as hard as you can.' },
      { q: 'What are the controls for Speed Stars?', a: 'You alternate two keys (usually the left and right arrows) to move each leg, with timing presses for hurdles and the finish-line lean. The rhythm is the whole challenge.' },
      { q: 'Is Speed Stars like QWOP?', a: 'Yes — it\'s a rhythm-based ragdoll running game in the same spirit as QWOP, but much more playable. The goal is a smooth, fast sprint without tripping.' },
      { q: 'Is Speed Stars free and unblocked at school?', a: 'Yes — Speed Stars runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks.' },
      { q: 'What games are like Speed Stars?', a: 'If you like Speed Stars, try QWOP, Getting Over It, and Stickman Boost for more physics-and-timing challenge.' },
    ],
  },

  'Eaglercraft': {
    longdesc: `Eaglercraft is Minecraft running entirely in your browser — no download, no Java install, no account. It's a faithful port of Minecraft (based on the beloved 1.5 and 1.8 versions) compiled to run on plain web technology, which means you can mine, craft, build, and survive blocky worlds straight from a tab, even on a locked-down school Chromebook.

Everything you expect from classic Minecraft is here. Singleplayer gives you survival and creative modes — punch trees, craft tools, dig for diamonds, fight off mobs at night, and build whatever you can imagine. Worlds generate and save locally in your browser, so your builds persist between sessions on the same device. There's no creative limit in creative mode and a full survival loop with hunger, health, and crafting.

The standout feature is multiplayer. Eaglercraft can connect to community servers, so you can join friends, play minigames, and explore shared worlds — all without leaving the browser. It's the closest thing to "real" Minecraft you can get on a device where you can't install anything, which is exactly why it became a staple of the unblocked-games scene.

Play Eaglercraft unblocked at UBGHyper — free, instant, with both singleplayer and multiplayer. If you like it, try Minecraft Classic and the Minecraft Case Simulator.`,
    controls: `<strong>WASD</strong> — move. <strong>Mouse</strong> — look around; <strong>left-click</strong> to break/attack, <strong>right-click</strong> to place/use. <strong>Space</strong> — jump (double-tap to fly in creative). <strong>Shift</strong> — sneak. <strong>E</strong> — inventory. <strong>1–9</strong> — hotbar.`,
    tips: [
      'On your first night, build a quick dirt shelter and a crafting table — survive until morning before exploring.',
      'Your worlds save in your browser on this device. Use the Saves page if you want to move a world elsewhere.',
      'For multiplayer, add a community server address in the multiplayer menu to play with friends.',
      'Press double-space in creative mode to toggle flight and build big quickly.',
    ],
    faqs: [
      { q: 'What is Eaglercraft?', a: 'Eaglercraft is a browser port of Minecraft (based on versions 1.5/1.8) that runs without any download or account. You get singleplayer survival and creative plus multiplayer servers, all in a browser tab.' },
      { q: 'Can you play Eaglercraft multiplayer?', a: 'Yes — Eaglercraft connects to community servers, so you can join friends and play minigames. Add a server address in the multiplayer menu to get started.' },
      { q: 'What are the controls for Eaglercraft?', a: 'Standard Minecraft controls: WASD to move, mouse to look, left-click to break, right-click to place, space to jump, E for inventory, and the number keys for your hotbar.' },
      { q: 'Is Eaglercraft free and unblocked at school?', a: 'Yes — Eaglercraft runs entirely in your browser at UBGHyper with no download, no Java, and no account, so it works on most school Chromebooks.' },
      { q: 'Does Eaglercraft save my world?', a: 'Yes — worlds save in your browser\'s storage on the same device, so you can continue your build later. Back them up via the Saves page to move them between devices.' },
    ],
  },

  'Krunker': {
    longdesc: `Krunker is the browser FPS that proved a web shooter could feel as crisp as a downloaded one. It's a fast, low-poly first-person shooter built for instant play — no install, no launcher, just click and you're fragging in a colourful arena. The movement is the hook: Krunker rewards bunny-hopping and slide-jumping, so the best players flow around the map at high speed while landing flick shots.

There are multiple classes, each with a distinct weapon and playstyle — the Triggerman (assault rifle) for all-rounders, the Hunter (sniper) for long-range duels, the Run N Gun (SMG) for aggressive rushers, and more. Game modes span free-for-all, team deathmatch, capture the flag, and parkour, so you can grind for kills or just practice movement on a custom map.

What keeps Krunker alive is its depth and community: a thriving custom-map and modding scene, skins to unlock and trade, and a competitive ceiling high enough that it has a real esports following. For a game that loads in seconds in a browser tab, it punches massively above its weight.

Play Krunker unblocked at UBGHyper — free, instant, and built for quick FPS sessions. If you like it, try Shell Shockers, 1v1.LOL, and Bullet Force.`,
    controls: `<strong>WASD</strong> — move. <strong>Mouse</strong> — aim, <strong>left-click</strong> to shoot. <strong>Space</strong> — jump (bunny-hop for speed). <strong>Shift</strong> — slide. <strong>R</strong> — reload. <strong>1/2</strong> — switch weapons. Movement is half the skill — keep moving.`,
    tips: [
      'Never stand still. Bunny-hop and slide-jump to make yourself a hard target and move faster.',
      'Pick a class that fits your style — sniper for patient aim, SMG for aggressive rushing.',
      'Aim for the head. Krunker rewards headshots heavily, especially with the sniper.',
      'Learn one map\'s sightlines well rather than spreading yourself thin across all of them.',
    ],
    faqs: [
      { q: 'Is Krunker free to play?', a: 'Yes — Krunker is completely free on UBGHyper. There\'s no install, no payment to play, and no ads on the game.' },
      { q: 'What are the controls for Krunker?', a: 'WASD to move, mouse to aim and shoot, space to jump (bunny-hop), shift to slide, R to reload, and 1/2 to switch weapons. Mastering movement is key.' },
      { q: 'What classes are in Krunker?', a: 'Krunker has several classes including Triggerman (assault rifle), Hunter (sniper), Run N Gun (SMG), and more — each with a different weapon and playstyle.' },
      { q: 'Is Krunker unblocked at school?', a: 'Yes — Krunker runs in your browser at UBGHyper, so it loads on most school networks and Chromebooks with no download.' },
      { q: 'What games are like Krunker?', a: 'If you like Krunker, try Shell Shockers, 1v1.LOL, and Bullet Force for more fast browser FPS action.' },
    ],
  },

  'Granny': {
    longdesc: `Granny is the stealth-horror game that turned hide-and-seek into a heart-pounding survival puzzle. You wake up locked inside a creaky house, and Granny — a terrifying old woman with incredible hearing — is hunting you. You have five days to find the keys, tools, and clues you need to escape, and every dropped object, creaky floorboard, or slammed door can bring her sprinting to your location.

The tension comes from sound. Granny can't see far, but she hears everything — so survival is about moving slowly, peeking around corners, and freezing when she's near. Knock something over and you'll hear her footsteps quicken. Get caught and she knocks you out; you lose a day and respawn, one step closer to her final, unforgiving fifth-night confrontation. Every run is a tense negotiation between progress and noise.

What makes Granny replayable is its puzzle layer. The house is full of locks, hidden items, and contraptions that have to be solved in the right order to open the front door or the car in the garage. Memorising the layout, planning a quiet route, and executing it under pressure is the whole game.

Play Granny unblocked at UBGHyper — free, instant, and genuinely scary with the sound on. If you like it, try the FNAF series, Slendytubbies, and Fears to Fathom.`,
    controls: `<strong>WASD</strong> — move. <strong>Mouse</strong> — look; <strong>left-click</strong> to interact, pick up, and use items. <strong>Shift</strong> — sometimes sprint (noisy!). <strong>C / Ctrl</strong> — crouch to move quietly. Move slowly — noise is what gets you caught.`,
    tips: [
      'Move slowly and crouch near Granny — running and dropping items makes noise that draws her instantly.',
      'Learn the house layout so you can plan a quiet route to your next objective.',
      'Hide under beds or in closets when you hear her footsteps coming closer.',
      'Pick up every useful item — keys, tools, and weapons all factor into solving the escape.',
    ],
    faqs: [
      { q: 'How do you escape in Granny?', a: 'You have five days to find the keys, tools, and clues hidden around the house and solve the locks in the right order to open the front door or escape via the car. Move quietly so Granny doesn\'t catch you.' },
      { q: 'What are the controls for Granny?', a: 'WASD to move, mouse to look and interact, crouch (C/Ctrl) to stay quiet, and click to pick up and use items. Avoiding noise is the core skill.' },
      { q: 'Why does Granny always find me?', a: 'Granny has excellent hearing — running, dropping objects, and slamming doors all make noise that draws her. Move slowly, crouch, and hide when she\'s near.' },
      { q: 'Is Granny free and unblocked at school?', a: 'Yes — Granny runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks. Play with sound on for the full scare.' },
      { q: 'What games are like Granny?', a: 'If you like Granny, try the Five Nights at Freddy\'s series, Slendytubbies, and Fears to Fathom for more survival horror.' },
    ],
  },

  'Undertale': {
    longdesc: `Undertale is the indie RPG that rewrote the rules of the genre and became a cultural landmark. You play a child who falls into the Underground, a world of monsters sealed beneath the mountain, and your goal is to find a way home. The twist that made it famous: you never have to kill anyone. Every monster you meet in a battle can be defeated through violence — or spared by figuring out the right words and actions to calm them down.

The combat is a clever hybrid. Enemy attacks become bullet-hell sequences you dodge with a little heart, while your turn lets you fight, act, or show mercy. Choosing mercy throughout the whole game unlocks the legendary "Pacifist" route, with an ending and story beats that hit far harder than any boss fight. Choose violence and the world reacts — characters remember, and the tone darkens.

What elevates Undertale is its writing and music. The characters — Sans, Papyrus, Toriel, Undyne — are funny, heartfelt, and unforgettable, and Toby Fox's soundtrack is one of the most beloved in gaming. It's a short game you can finish in an afternoon, but its choices and characters stick with you for years.

Play Undertale unblocked at UBGHyper — free and instant in your browser. If you like it, try Deltarune, DELTATRAVELER, and other story-driven RPGs.`,
    controls: `<strong>Arrow keys</strong> — move and navigate menus. <strong>Z / Enter</strong> — confirm / interact. <strong>X / Shift</strong> — cancel. In battle, move the heart with the arrow keys to dodge attacks, and choose Fight, Act, Item, or Mercy.`,
    tips: [
      'You never have to kill anyone — use ACT and MERCY to spare monsters for the true Pacifist route.',
      'In battle, dodge enemy attacks by moving your heart with the arrow keys; each enemy has a different pattern.',
      'Talk to everyone and explore — Undertale\'s best moments are in its dialogue and side characters.',
      'Your choices matter and are remembered. A pacifist run unlocks the game\'s best ending.',
    ],
    faqs: [
      { q: 'Do you have to kill anyone in Undertale?', a: 'No — that\'s the whole point. Every enemy can be spared by using ACT and MERCY instead of FIGHT. Sparing everyone unlocks the famous Pacifist ending.' },
      { q: 'What are the controls for Undertale?', a: 'Arrow keys to move and navigate, Z/Enter to confirm, X/Shift to cancel. In battles you dodge attacks by moving your heart with the arrow keys and choose Fight, Act, Item, or Mercy.' },
      { q: 'How long is Undertale?', a: 'A single run takes roughly 6–8 hours, but the multiple routes (Pacifist, Neutral, Genocide) and the writing give it huge replay value.' },
      { q: 'Is Undertale free and unblocked at school?', a: 'Yes — Undertale runs in your browser at UBGHyper with no download or sign-up, so it works on most school Chromebooks.' },
      { q: 'What games are like Undertale?', a: 'If you like Undertale, try Deltarune (by the same creator), DELTATRAVELER, and other story-driven indie RPGs.' },
    ],
  },

  'Granny-2': {
    longdesc: `Granny 2 is the horror-escape sequel from DVloper, and the twist is right there in the setup: this time Granny isn't alone. She's joined by Grandpa, and the two of them hunt very differently. Granny hears everything — a dropped jar, a slammed door, footsteps on a creaky board and she's sprinting at you. Grandpa is hard of hearing, so noise barely registers, but he hits much harder when he catches you and patrols on his own schedule. Learning to play the pair off each other is the whole game.

You're locked in their house with five days to escape, and every time you're caught you wake back up in the bedroom having lost a day. Escape isn't one locked door — there are several routes out (the main door, the car, a boat, hidden hatches), each needing a chain of keys, gears, and tools scattered across rooms that are themselves guarded, trapped, or noisy to open. The map is bigger than the first Granny, with more floors, more drawers to rummage, and more bear traps waiting under the dark.

What makes Granny 2 tense rather than cheap is information management. You're constantly weighing risk: do you sneak into the room where Granny just walked, or wait and lose precious seconds? Do you grab the item now and risk the noise, or come back when Grandpa's path clears? Hiding spots — wardrobes and under beds — buy you time, but a pursuer who saw you duck will come check.

Difficulty scales hard, from Practice (no enemies, learn the layout) up through Easy, Normal, Hard and Extreme, where the AI is relentless and your margin for a single mistake is basically zero. Practice mode is genuinely the smart way in: map the house with no pressure, then turn the monsters on.

Play Granny 2 unblocked at UBGHyper free, no download, in the browser — and if you want more horror after, try Granny 3, the original Granny, and the Five Nights at Freddy's series.`,
    controls: `<strong>WASD</strong> or <strong>arrow keys</strong> to move, <strong>mouse</strong> to look around. <strong>Left-click</strong> or <strong>E</strong> to interact and pick up items; <strong>right-click</strong> / <strong>Q</strong> to drop. Hide inside wardrobes and under beds, and throw items to make noise and lure a pursuer the wrong way.`,
    tips: [
      'Move slowly near Granny — she reacts to running, dropped items, and slammed doors. Grandpa barely hears, so save your noise for when he\'s the one nearby.',
      'Close drawers and doors gently behind you. An open door is a dead giveaway that you were just there.',
      'Use Grandpa\'s slow patrol to your advantage — lure him into a far room, then work the area he just left.',
      'Run Practice mode first to memorise where the keys, gears and traps are, then switch the enemies on.',
    ],
    faqs: [
      { q: 'Who made Granny 2 and what\'s new compared to Granny 1?', a: 'Granny 2 is by DVloper. The big addition is Grandpa — a second hunter who can\'t hear well but hits harder — plus a larger house and more ways to escape. You now have to manage two enemies with completely different behaviour.' },
      { q: 'How many days do you have to escape in Granny 2?', a: 'Five days. Each time a hunter catches you, you wake back in the bedroom and lose a day. Run out of days and it\'s game over.' },
      { q: 'What are the difficulty modes in Granny 2?', a: 'Practice (no enemies), Easy, Normal, Hard, and Extreme. Practice is the best way to learn the house layout before turning the monsters on; Extreme leaves almost no room for mistakes.' },
      { q: 'Is Granny 2 free and unblocked at school?', a: 'Yes — Granny 2 runs entirely in your browser at UBGHyper with no download, no install, and no account, so it works on most school Chromebooks.' },
      { q: 'Is the browser version the same as the mobile Granny 2?', a: 'It\'s the same horror-escape game DVloper released, playable here in the browser with keyboard-and-mouse controls instead of touch. Your progress is stored locally in your browser.' },
    ],
  },

  'Granny-3': {
    longdesc: `Granny 3 is DVloper's biggest escape house yet, and it raises the stakes again: now you're up against three threats. Granny still hears the smallest sound. Grandpa is back, slow and half-deaf but heavy-handed (and in this one he carries a shotgun). And lurking through it all is Slendrina, whose appearances drain your nerve and force you to keep moving. Three different hunters, one sprawling two-storey mansion, five days to get out.

The house is the real star. Granny 3 spreads its puzzles across two full floors connected by stairs and tight corridors, so you're constantly making vertical decisions — chase a key upstairs while both grandparents are patrolling the ground floor, or clear the basement first? There are multiple escape routes again, including a car and a train, each gated behind a long chain of items: keys, a battery, a cog, fuses, weapons to clear an obstacle. Nothing is one step.

Because the map is so much larger, route planning matters more than reflexes. Veterans memorise a single efficient path — which rooms to hit in what order, where the safe hiding spots sit on each floor, which doors are noisy. A panicked sprint just brings all three hunters down on you at once. The game rewards patience, quiet movement, and knowing exactly where you're going before you commit to crossing an open hallway.

Difficulty runs from Practice (empty house, no enemies) through Easy, Normal, Hard and Extreme. As with the rest of the series, Practice is the smart on-ramp: walk the whole mansion with zero pressure, learn the layout cold, then flip the enemies on and put your route to the test.

Play Granny 3 unblocked at UBGHyper free in the browser, no download — then keep the scares going with Granny 2, the original Granny, and the Five Nights at Freddy's games.`,
    controls: `<strong>WASD</strong> or <strong>arrow keys</strong> to move, <strong>mouse</strong> to look. <strong>Left-click</strong> / <strong>E</strong> to interact and pick up; <strong>right-click</strong> / <strong>Q</strong> to drop. Hide in wardrobes and under beds, and use thrown items or noise to pull a hunter away from where you need to be.`,
    tips: [
      'Think in floors. Granny 3 is two storeys — know which hunter is on which level before you cross open ground.',
      'Grandpa is slow but dangerous up close (and armed in this one) — keep distance and let his patrol pass rather than sneaking past his face.',
      'Plan one efficient route through the item chain instead of wandering; the bigger map punishes aimless searching.',
      'Use Practice mode to map both floors and the train/car escape steps, then turn the enemies on.',
    ],
    faqs: [
      { q: 'Who made Granny 3 and what\'s new versus Granny 2?', a: 'Granny 3 is by DVloper. It adds a third threat (Slendrina) alongside Granny and Grandpa, a much larger two-storey house, and new escape routes including a train.' },
      { q: 'How many enemies are in Granny 3?', a: 'Three: Granny (hears everything), Grandpa (slow, hard of hearing, hits hard), and Slendrina, who appears to unnerve you and push you to keep moving.' },
      { q: 'How do you escape in Granny 3?', a: 'You have five days. There are multiple exits — including a car and a train — each requiring a chain of keys, tools and parts collected from across both floors while avoiding the hunters.' },
      { q: 'What are the difficulty modes in Granny 3?', a: 'Practice (no enemies), Easy, Normal, Hard and Extreme. Practice lets you learn the larger map safely before adding the pressure.' },
      { q: 'Is Granny 3 free and unblocked at school?', a: 'Yes — Granny 3 plays in your browser at UBGHyper with no download or sign-up, so it runs on most school Chromebooks. Progress is saved locally.' },
    ],
  },

  'Brawl-Stars': {
    longdesc: `Brawl Stars is Supercell's fast, top-down multiplayer brawler — quick three-minute matches where a roster of characters, each with their own attack and a charged "Super" ability, fight across tight arenas. It's built around short rounds and snap decisions: you're rarely more than a few seconds from a fight, and matches are won by reading the map, using cover, and timing your Super, not by grinding.

The variety comes from its game modes. Gem Grab is the signature 3-v-3: hold ten gems as a team without dying long enough to bank the win. Showdown is a battle-royale free-for-all (solo or duo) where you scavenge power-ups and outlast everyone. Brawl Ball is essentially arcade soccer with weapons. Bounty, Heist and Knockout each twist the objective — protect a safe, rack up stars, or win without respawns — so the "best" approach changes completely depending on what you're playing.

Each brawler plays differently: short-range heavy hitters that bully you in close, long-range sharpshooters that punish open lanes, throwers that lob shots over walls, healers and tanks that anchor a team. That spread is why the bushes and walls of every map matter so much — a brawler who's helpless in the open can be terrifying ambushing from a hedge. Landing hits charges your Super, and a well-timed Super — a wall-break, a dash, a burst of area damage — usually decides the skirmish.

What keeps it fun in short bursts is the same loop that makes it a phone hit: matches are quick, the controls are simple to pick up, and there's always a "one more game" pull. You learn by playing — which brawler suits each mode, when to push, when to hang back and let your Super build.

Play Brawl Stars unblocked at UBGHyper in the browser, free, no download. If you like the fast multiplayer action, try Krunker, BrawlGuys.io, and Among Us next.`,
    controls: `Move with <strong>WASD</strong> or the arrow keys (or the on-screen joystick), and <strong>aim and fire your basic attack with the mouse</strong>. Once it's charged from landing hits, trigger your <strong>Super</strong> with the dedicated button/key. Exact bindings can vary slightly by build — check the in-game prompts when a match loads.`,
    tips: [
      'Keep moving. Standing still makes you an easy target; strafe while you shoot.',
      'Use bushes and walls. Ambushing from cover turns a weak matchup into a free hit, and walls block long-range shots.',
      'Charge your Super by landing basic attacks, then save it for the moment it wins a fight or the objective — don\'t waste it.',
      'Play the mode, not just the kills. In Gem Grab hold the gems; in Brawl Ball score the ball; in Showdown survive. Objective beats frags.',
    ],
    faqs: [
      { q: 'Who made Brawl Stars?', a: 'Brawl Stars is made by Supercell, the studio behind Clash of Clans and Clash Royale. UBGHyper hosts a browser-playable version so you can play it unblocked without the mobile app.' },
      { q: 'What game modes are in Brawl Stars?', a: 'The main modes are Gem Grab (3-v-3 gem control), Showdown (solo/duo battle royale), Brawl Ball (arcade soccer), plus Bounty, Heist and Knockout. Each has its own objective and best strategy.' },
      { q: 'Is Brawl Stars free and unblocked at school?', a: 'Yes — it plays in your browser at UBGHyper with no download and no sign-up, so it works on most school Chromebooks.' },
      { q: 'Is the browser version the same as mobile Brawl Stars?', a: 'It\'s a browser-playable version of the game, controlled with keyboard and mouse instead of touch. Treat it as a way to play unblocked in the browser; account progress from the official mobile app isn\'t carried over here.' },
      { q: 'How do you win fights in Brawl Stars?', a: 'Land basic attacks to charge your Super, use cover and bushes to control engagements, keep moving so you\'re hard to hit, and pick a brawler that fits the mode you\'re playing.' },
    ],
  },

  'Getting-Over-It': {
    longdesc: `Getting Over It with Bennett Foddy is the most famous rage game ever made. You are Diogenes, a man in a cauldron, and your only tool is a sledgehammer. With it you hook, push, pole-vault and fling yourself up a mountain of junk — furniture, rocks, scaffolding, a literal playground slide — knowing the entire time that one wrong swing can undo an hour of progress in two seconds.

There are no checkpoints. That's the whole point. Foddy narrates as you climb, offering philosophy about failure and loss exactly when you least want to hear it, and the game's cruelty is completely honest: nothing is random, nothing is unfair, every fall is your own hand on the mouse. The hammer physics are precise and consistent — which is why the game is beatable in under two minutes by speedrunners and unbeatable for months by everyone else.

The climb has famous landmarks that veterans speak of like war stories: the tree near the start that lobs over-eager climbers all the way back to the beginning, the church roof, the slide section, the buckets, and the snake-bend near the summit. Reaching the snow zone for the first time produces a very specific heart rate.

What makes Getting Over It great rather than just mean is the skill curve. The hammer becomes an extension of your arm. Sections that once took 20 minutes take 20 seconds. The game never gets easier — you get better, measurably, and that's a feeling very few games deliver this purely.

Play Getting Over It unblocked at UBGHyper free in your browser — and when you need something kinder afterwards, try Stickman Hook or Drive Mad.`,
    controls: `<strong>Mouse only.</strong> Move the mouse to swing the sledgehammer around the cauldron. Hook it on ledges to pull yourself up, press it against the ground to push, and flick it to launch yourself. Sensitivity matters — small, smooth movements beat fast flailing.`,
    tips: [
      'Slow down. Nearly every catastrophic fall comes from rushing a section you\'ve already cleared.',
      'Learn to "pogo": press the hammer straight down and bounce — it\'s the safest way up shallow slopes.',
      'On the tree near Orange Hell: hook BEHIND the trunk and pull through gently. Never swing at full speed there.',
      'After a big fall, take a breath before climbing. Tilted, angry climbing causes the second big fall.',
    ],
    faqs: [
      { q: 'Who made Getting Over It?', a: 'Bennett Foddy, the philosopher-game-designer also behind QWOP. He narrates the game himself, quoting philosophy as you climb (and fall).' },
      { q: 'How long does it take to beat Getting Over It?', a: 'First completions typically take 5–15 hours spread over many rage-quits. Top speedrunners finish in under 2 minutes — the world record is around a minute and a half.' },
      { q: 'Are there checkpoints or saves in Getting Over It?', a: 'No checkpoints. Your position persists between sessions, but nothing stops a fall from sending you back to the very start. That risk is the game\'s core design.' },
      { q: 'What is the reward for finishing Getting Over It?', a: 'There is a real reward at the summit beyond the famous chat with Foddy — but spoiling it is against the spirit of the climb.' },
      { q: 'Is Getting Over It free and unblocked at school?', a: 'Yes — it runs in your browser at UBGHyper with no download or sign-up, so it works on school Chromebooks. Mouse strongly recommended over trackpad.' },
    ],
  },

  'TABS': {
    longdesc: `Totally Accurate Battle Simulator (TABS) is the physics sandbox where you build two armies out of history's silliest units and watch them wobble into battle. Every soldier is a floppy ragdoll with genuine physics — swings miss, spears wobble, catapult shots flatten entire squads, and a farmer with a pitchfork occasionally takes down a knight because his arms happened to flail correctly.

The core loop is simple: you get a budget, the enemy army is laid out across the field, and you spend your coins placing units to counter it. Cheap chaff like clubbers and halflings soak damage in front; archers and musketeers work behind them; a single expensive unit — a mammoth, a da Vinci tank, Zeus himself — can anchor a whole strategy. Then you press start and lose all control, which is exactly where the comedy lives.

TABS rewards real tactical thinking under all the slapstick. Flanking genuinely works: a couple of cavalry units circling behind enemy archers wins fights that head-on charges lose. Terrain matters — archers on a hill out-range everything below. Unit matchups matter most of all: shields beat arrows, mass beats shields, range beats mass, and something ridiculous beats everything if you place it right.

The campaign maps escalate from farmers-versus-farmers to full mythological warfare, and sandbox mode lets you stage any matchup you can imagine — a hundred halflings against one giant, pirates versus dinosaurs, whatever needs settling.

Play TABS unblocked at UBGHyper free in your browser. If you enjoy physics chaos, Gladihoppers and People Playground are natural next stops.`,
    controls: `<strong>Mouse</strong> to place units on your side of the field before battle — click a unit type, click the ground. <strong>WASD</strong> + mouse to fly the camera during the fight. Press start when you're ready; once the battle begins, the physics is in charge, not you.`,
    tips: [
      'Spend on a front line first. Cheap melee units that hold the enemy in place make every ranged unit behind them twice as valuable.',
      'Flank with fast units. Two units attacking enemy archers from behind beat five attacking from the front.',
      'Don\'t stack everything in one blob — one catapult stone or boulder can erase a clustered army.',
      'Watch the replay after a loss. TABS shows you exactly which matchup failed, and the counter is usually obvious.',
    ],
    faqs: [
      { q: 'Who made TABS?', a: 'Landfall Games, the Swedish studio known for physics-comedy games. TABS started as an April Fools-adjacent prototype and became their biggest hit.' },
      { q: 'What\'s the best unit in TABS?', a: 'There\'s no single best — the game is about counters. Pound for pound, halflings and clubbers are famously cost-efficient chaff, while late-game units like Zeus, the Mammoth and the Da Vinci Tank can solo entire armies if protected.' },
      { q: 'Does TABS have a campaign?', a: 'Yes — themed campaign maps (farmer, medieval, viking, dynasty, fantasy and more) with set enemy armies and a budget to beat them, plus a sandbox mode for custom battles.' },
      { q: 'Is the browser version of TABS the full game?', a: 'It\'s a browser-playable port of TABS, controlled with mouse and keyboard. It plays in your tab at UBGHyper with no download or sign-up.' },
      { q: 'Why do my units miss so much in TABS?', a: 'That\'s the joke — and the design. Every unit runs on wobbly active-ragdoll physics, so attacks genuinely connect or whiff based on physics, not dice rolls. Positioning matters more than precision.' },
    ],
  },

  'Karlson': {
    longdesc: `Karlson is the fast, slippery FPS-parkour game by Dani — the Danish-accented YouTube developer whose "yo have you heard about Karlson?" running gag turned a student project into one of the most wishlisted indie games ever. This browser build is the playable Karlson experience: speed, slide, shoot, repeat.

The movement is the star. You sprint, you crouch-slide to build speed, you jump out of the slide to keep momentum, and you chain it all across low-poly levels full of crates, ramps and enemies with guns. Touch the movement keys with any rhythm at all and Karlson feels incredible — a kind of budget Titanfall where every level is a speedrun waiting to happen.

The shooting is deliberately simple: grab a gun, point it at the milk-white enemies before they point theirs at you, and keep moving because standing still is death. Weapons can be thrown when empty, and the throw itself stuns — a classic Karlson play is hurling your empty pistol at one enemy while sliding past to grab the shotgun behind him.

And then there's the milk. The goal of the game, canonically, is to get the milk. Dani built an entire community in-joke around it, and the levels honour it — finish fast, finish stylishly, get the milk.

Play Karlson unblocked at UBGHyper free in your browser, no download. If the movement clicks for you, try Ultrakill for more speed-FPS or OvO for pure parkour flow.`,
    controls: `<strong>WASD</strong> to move, <strong>mouse</strong> to aim and shoot, <strong>Space</strong> to jump, <strong>Ctrl/C or Shift</strong> to crouch-slide (build speed, then jump out of the slide to keep it). <strong>Click</strong> picks up and fires weapons; throw an empty gun at enemies to stun them.`,
    tips: [
      'Slide-jump everywhere. A slide into a jump carries your speed — it\'s faster than sprinting and harder for enemies to hit.',
      'Your empty gun is a weapon: throwing it stuns the next enemy long enough to take theirs.',
      'Height is safety. Enemies aim slowly upward — staying airborne off ramps and crates breaks their tracking.',
      'Restart instantly when a run goes bad (the levels are short by design). Karlson is a speedrun game wearing an FPS costume.',
    ],
    faqs: [
      { q: 'Who made Karlson and why is it famous?', a: 'Karlson is by Dani (Daniel Sooman), the YouTuber-developer whose devlogs turned the game into a meme — it became one of Steam\'s most-wishlisted games off the back of his videos and the "milk" running joke.' },
      { q: 'What does the milk mean in Karlson?', a: 'It\'s the community in-joke: Dani drinks milk in his videos, so milk became Karlson\'s collectible/goal and the fandom\'s whole identity. Getting the milk = beating the level.' },
      { q: 'How do I go faster in Karlson?', a: 'Chain crouch-slides into jumps. Sliding builds speed, jumping preserves it, and landing into another slide keeps the chain going. Mastering that loop is the entire skill ceiling.' },
      { q: 'Is this the full Steam version of Karlson?', a: 'This is the playable browser build of Karlson — the same movement-shooter sandbox from Dani\'s devlogs, running free in your tab with no download or sign-up.' },
      { q: 'Is Karlson unblocked at school?', a: 'Yes — it runs entirely in your browser at UBGHyper, so it works on most school networks and Chromebooks.' },
    ],
  },

  'Escape-Road-2': {
    longdesc: `Escape Road 2 is the bigger, faster sequel to the viral police-chase driving game. You've robbed the bank, the cops know, and the only direction is forward — weave through traffic, smash through corners, and survive as the pursuit escalates from a couple of patrol cars to helicopters, roadblocks and spike strips.

The sequel's big upgrade is variety. New maps move the chase beyond the city — over snow, sand and waterfronts, each with its own traffic patterns and hazards. The driving stays one-touch simple: your car accelerates on its own, you steer, and every decision is a split-second lane choice between a head-on bus, a cop pit-maneuvering from the left, and a gap that may or may not be a dead end.

Crashes are sudden and total, which is exactly what makes a long run feel earned. The longer you survive, the more aggressive the AI pursuit gets — cruisers start boxing you in, and the difficulty ramps until escape becomes a pipe dream and the run becomes about distance, money collected, and style.

Coins picked up mid-chase unlock new vehicles, from sensible getaway cars to genuinely silly rides, and each handles differently enough to change how you thread traffic. It's a perfect quick-session game: a run takes a minute or two, a "one more run" loop takes an afternoon.

Play Escape Road 2 unblocked at UBGHyper free in your browser — and if you finish your getaway, the original Escape Road and Drift Boss are parked right next to it.`,
    controls: `<strong>One-touch driving:</strong> your car accelerates automatically — steer with <strong>A/D</strong>, the <strong>arrow keys</strong>, or by holding and releasing the mouse/touch. That's it. Survival is about reading traffic two cars ahead, not about the controls.`,
    tips: [
      'Look past your bumper — scan two or three cars ahead and pick your lane early. Late swerves end runs.',
      'Use the cops against traffic: pursuers crash into the same buses you dodge. A tight weave can shed two cruisers at once.',
      'Grab coins only when the line through them is clean. A coin detour into a truck is the classic Escape Road death.',
      'Try the unlockable vehicles — handling differences are real, and a nimbler car can be worth more than a fast one.',
    ],
    faqs: [
      { q: 'What\'s new in Escape Road 2 versus the original?', a: 'More maps and environments (snow, desert, waterfront), more unlockable vehicles, and a more aggressive police AI that escalates harder the longer you survive.' },
      { q: 'Can you actually escape the police in Escape Road 2?', a: 'The chase is endless by design — the goal is distance, coins and survival time. The pursuit always escalates until it gets you; the leaderboard flex is how long you lasted.' },
      { q: 'How do I unlock new cars in Escape Road 2?', a: 'Collect the coins that appear on the road during runs, then spend them on new vehicles. Each handles differently through traffic.' },
      { q: 'Is Escape Road 2 free and unblocked at school?', a: 'Yes — it plays in your browser at UBGHyper with no download or sign-up, and the one-hand controls work fine on a Chromebook trackpad.' },
      { q: 'What games are like Escape Road 2?', a: 'The original Escape Road, Drift Boss (one-button drifting), Drive Mad (physics driving), and Snow Rider 3D all scratch the same quick-run arcade itch.' },
    ],
  },

  'OvO': {
    longdesc: `OvO is a minimalist precision platformer built entirely around momentum. You play a small stick figure racing through stark black-and-white obstacle courses, and every move — running, sliding, jumping, diving, wall-jumping — feeds into one flowing system of speed. Master it and you move like water; fumble it and you faceplant into a spike two seconds in.

The core idea is that speed is something you build and spend. Sliding down a slope accelerates you; diving from a height converts a fall into forward launch; wall-jumps keep momentum alive across vertical gaps. Nothing is automatic. A clean OvO run looks effortless precisely because the player is constantly making tiny timing decisions — when to slide, when to dive, when to hold a jump.

OvO's levels start gently, teaching one mechanic at a time, then combine them into brutal gauntlets of moving platforms, crushers, and precise wall sequences. Each stage has a checkpoint at its start, so death is cheap and instant — you respawn in under a second and go again. That fast retry loop is why OvO is so replayable: a failed attempt costs nothing, so you keep pushing "one more try."

The game also has a serious speedrunning following. Because movement is momentum-based, the same level can be cleared slowly and safely or blazed through with dive-cancels and wall-boosts, and players compete for the cleanest, fastest lines. Bonus and gravity-flipped levels wait for anyone who finishes the main set and wants more punishment.

Play OvO unblocked at UBGHyper free in your browser. If you like it, try OvO Dimensions, Vex 7, and Cluster Rush for the same precision-movement rush.`,
    controls: `<strong>Left / Right</strong> or <strong>A / D</strong> — move. <strong>Up</strong>, <strong>W</strong> or <strong>Space</strong> — jump. <strong>Down</strong> or <strong>S</strong> — slide on the ground, or dive when airborne. Wall-jump by pressing jump while pressed against a wall. Every advanced trick is just a combination of these four inputs.`,
    tips: [
      'Slide down slopes before a jump — the extra speed carries you across gaps a standing jump can\'t reach.',
      'Dive (Down while airborne) to snap to the floor fast and convert height into forward momentum.',
      'Wall-jumps preserve speed. Chain them up vertical shafts instead of stopping to line up each jump.',
      'Respawns are instant, so commit to risky lines — hesitation ends more runs than mistakes do.',
    ],
    faqs: [
      { q: 'How many levels does OvO have?', a: 'OvO has a full campaign of increasingly difficult stages plus bonus and gravity-flipped levels that unlock later. Each stage has its own checkpoint, so you never lose much progress on a death.' },
      { q: 'Who made OvO?', a: 'OvO was created by Dedra Games. UBGHyper runs the full browser version unblocked — no download and no sign-up.' },
      { q: 'What\'s the difference between OvO and OvO Dimensions?', a: 'OvO is the original precision platformer. OvO Dimensions adds new mechanics and level themes on top of the same momentum-based movement, so it\'s the natural next step once you\'ve cleared OvO.' },
      { q: 'Why do I keep dying at the very start of a level?', a: 'OvO expects you to carry speed in. Starting from a standstill leaves you short on the first jump — build momentum with a slide before your first big gap.' },
      { q: 'Is OvO free to play at school?', a: 'Yes — OvO is 100% free on UBGHyper, runs in any browser, and works on school Chromebooks with no install.' },
    ],
  },

  'Vex-7': {
    longdesc: `Vex 7 is the latest mainline chapter of the long-running Vex stickman platformer series, and it doubles down on what made the series a school-computer staple: tight, responsive controls and obstacle courses that want you dead. You guide a little stick figure through side-scrolling "Acts" packed with buzzsaws, spikes, collapsing platforms, water sections, and timing gates that only forgive perfect movement.

The Vex movement set is deep for a platformer. You run, jump, wall-slide, wall-jump, swim, slide under low gaps, and cling to surfaces — and Vex 7 layers these into sequences where you have to switch between them mid-air without breaking rhythm. The controls are famously precise, which is the whole point: when you die in Vex, it's your fault, not the game's, and that fairness is what keeps you retrying.

Levels are built around frequent checkpoints, so a death drops you back a few seconds rather than to the start. That keeps the difficulty motivating instead of punishing. Beyond the main Acts, Vex 7 carries the series tradition of brutal optional Challenges — bonus stages designed to test complete mastery of the movement, with far fewer checkpoints and much less mercy.

Part of Vex's appeal is how readable it is. The art is clean, the hazards are colour-coded, and you can see a whole obstacle sequence before you commit to it. That means deaths feel like solvable puzzles: you learn the pattern, refine your timing, and eventually flow through a section that felt impossible ten tries ago.

Play Vex 7 unblocked at UBGHyper free in your browser. Fans of the series can jump straight to Vex 5, and OvO scratches the same precision-platformer itch.`,
    controls: `<strong>WASD</strong> or the <strong>arrow keys</strong>: Up/W to jump, Left and Right to run, Down/S to slide and drop through platforms. Hold toward a wall while falling to wall-slide, then jump to wall-jump. In water, tap jump to swim upward. Everything is keyboard — no mouse needed.`,
    tips: [
      'Learn the wall-jump rhythm early — most late-game Acts are vertical shafts that demand fast alternating wall-jumps.',
      'Slide (Down) to clear low gaps and to shave a hair off your landing, which matters in tight timing sections.',
      'Checkpoints are frequent — sprint sections between them instead of creeping, since a death barely sets you back.',
      'Save the optional Challenges for last. They assume you\'ve mastered every movement the Acts taught you.',
    ],
    faqs: [
      { q: 'Is Vex 7 harder than the earlier Vex games?', a: 'Broadly yes — each mainline Vex ups the complexity of its obstacle sequences, and Vex 7 combines more mechanics per section. The controls stay the same, so skill from earlier entries carries straight over.' },
      { q: 'What are the Challenges in Vex 7?', a: 'Challenges are optional bonus stages separate from the main Acts. They have fewer checkpoints and much tougher timing, and they\'re meant for players who want to fully master the movement.' },
      { q: 'Do I need to play the earlier Vex games first?', a: 'No. Vex 7 stands alone and teaches its mechanics as you go. Playing Vex 5 or 6 first just means you already know the controls.' },
      { q: 'Can I play Vex 7 with a controller?', a: 'Vex 7 is designed for keyboard. It plays best on a full keyboard where you can hold a direction and tap jump precisely; touch and trackpad work but are harder in the timing sections.' },
      { q: 'Is Vex 7 free and unblocked at school?', a: 'Yes — Vex 7 runs free in your browser at UBGHyper with no download or sign-up, and works on school Chromebooks.' },
    ],
  },

  'Vex-5': {
    longdesc: `Vex 5 is the entry that cemented the Vex series as one of the best browser platformers for anyone who loves precise, unforgiving movement. You play a stick figure sprinting through a set of side-scrolling Acts, each a gauntlet of saw blades, spikes, swinging hazards, water pools, and collapsing platforms that punish sloppy timing and reward flow.

What makes Vex 5 special is the tightness of its controls. Running, jumping, wall-sliding, wall-jumping, swimming and sliding all respond instantly, so the difficulty comes purely from reading the course and executing — never from the game feeling unfair. Die on a Vex 5 obstacle and you always know exactly what you did wrong, which is why players keep hammering the same section until they nail it.

The level design is built around momentum and verticality. Many stages funnel you into narrow shafts you have to climb with rapid wall-jumps, or long runs where you chain a slide into a jump into a swim without stopping. Frequent checkpoints keep the pain manageable — a death costs you seconds, not the whole Act — so the loop stays addictive rather than rage-inducing.

Beyond the main Acts, Vex 5 keeps the series' hardcore Challenge stages: standalone bonus levels stripped of easy checkpoints and tuned for players who want to prove they've truly mastered the movement. Clearing them is a genuine flex.

Vex 5 was made by Amazing Adam, the creator behind the series. Play it unblocked at UBGHyper free in your browser — no download, no sign-up — and when you want more, Vex 7 and OvO are right next door.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong>: Up/W jumps, Left/Right run, Down/S slides and drops through thin platforms. Fall against a wall to wall-slide, then press jump to wall-jump off it. Tap jump repeatedly to swim up through water.`,
    tips: [
      'Wall-jump climbs are everywhere in Vex 5 — practise the left-right-left rhythm until it\'s automatic.',
      'Carry speed into gaps. A running or sliding start clears jumps that a standing leap falls just short of.',
      'Use Down to slide under saws and low ceilings; standing through them is a guaranteed death.',
      'Attempt the Challenge stages only after finishing the Acts — they assume total command of the controls.',
    ],
    faqs: [
      { q: 'Who developed Vex 5?', a: 'Vex 5 was made by Amazing Adam, the developer behind the Vex platformer series. UBGHyper hosts the full browser version unblocked.' },
      { q: 'What\'s the difference between Vex 5 and Vex 7?', a: 'They share the same controls and core feel. Vex 7 is the newer entry with fresh Acts and tougher, more combined obstacle sequences. Vex 5 is a great place to learn the movement.' },
      { q: 'How do the Challenge levels work in Vex 5?', a: 'Challenges are optional stages outside the main Acts, with fewer checkpoints and harder timing. They\'re designed as a mastery test for experienced players.' },
      { q: 'Why do I keep failing wall-jumps?', a: 'Wall-jumping needs you to hold toward the wall to cling, then tap jump — pressing away too early drops you. Keep the direction held into the wall until the instant you jump.' },
      { q: 'Is Vex 5 free to play at school?', a: 'Yes — Vex 5 is free at UBGHyper, runs in any browser with no install, and works on Chromebooks.' },
    ],
  },

  'Tunnel-Rush': {
    longdesc: `Tunnel Rush is a first-person speed-dodging game that drops you into an endless 3D tunnel and dares you to survive the barrage. You hurtle forward automatically through a spinning corridor of geometric obstacles — spike walls, rotating barriers, and colour gates — and your only job is to slide left and right (and read the rotation) fast enough to thread every gap. The tunnel never ends and the speed only climbs.

It sits in the same family as Slope and Run 3: pure reflex, no shop, no upgrades, just you versus your reaction time. The genius is in the visual overload. Bright colours pulse, the tunnel corkscrews, and obstacles rush at you faster than feels fair — but every hazard is fair, telegraphed just far enough ahead that a sharp player can react. Deaths feel earned, which is exactly why "one more run" turns into twenty.

Tunnel Rush ramps difficulty through raw velocity. Early seconds are a gentle glide; a minute in, the tunnel is a strobing blur and you're pattern-matching gaps by instinct rather than thought. The rotating sections are the real test — you have to account for the whole tunnel spinning while you're also shifting sideways, and misjudging the spin is the classic Tunnel Rush death.

Because a run is short and a restart is instant, it's a perfect between-classes game: quick to pick up, impossible to fully master, and endlessly re-runnable on a school Chromebook.

Play Tunnel Rush unblocked at UBGHyper free in your browser. If it clicks, Tunnel Rush 2, Slope, and Run 3 deliver the same reflex-arcade high.`,
    controls: `<strong>Left / Right arrows</strong> or <strong>A / D</strong> to move around the tunnel. Some versions also let you use the mouse. That's the whole scheme — there is no jump and no brake. Everything is about steering and reading the rotation early.`,
    tips: [
      'Look at the far end of the tunnel, not the obstacles closest to you — reacting to what\'s near is already too late.',
      'On rotating sections, track the spin direction first, then commit your dodge to match it.',
      'Tap in short bursts. Holding a direction over-shoots the gap and slams you into the next wall.',
      'Colour gates only let matching colours through in some versions — glance at your colour before the gate arrives.',
    ],
    faqs: [
      { q: 'Does Tunnel Rush ever end?', a: 'No — the tunnel is endless and the speed keeps increasing. The goal is to survive as long as possible and beat your previous distance or score.' },
      { q: 'How do you get better at Tunnel Rush?', a: 'Focus your eyes on the far end of the tunnel so you read gaps early, and dodge in small taps rather than long holds. The rotating segments are the hardest — learn to read the spin before reacting.' },
      { q: 'What\'s the difference between Tunnel Rush and Tunnel Rush 2?', a: 'Tunnel Rush 2 keeps the same core dodging but adds new obstacle types, environments, and visual variety. Both play identically at their core.' },
      { q: 'Is Tunnel Rush like Slope?', a: 'Very much so — both are endless, speed-scaling reflex games with minimal controls. Slope is a rolling ball on an open track; Tunnel Rush wraps the same idea inside a spinning tunnel.' },
      { q: 'Is Tunnel Rush free and unblocked?', a: 'Yes — Tunnel Rush is free at UBGHyper, plays instantly in your browser with no sign-up, and works at school on a Chromebook.' },
    ],
  },

  '1v1-LOL': {
    longdesc: `1v1.LOL is a build-and-shoot game that turns the building mechanics of battle-royale shooters into a fast, focused duel. You drop into an arena and fight using two intertwined skills at once: aiming your weapons and instantly throwing up walls, ramps, floors and roofs to protect yourself, gain high ground, and push an opponent. It's the practice-arena distilled — pure mechanics, no loot grind.

The building is what sets 1v1.LOL apart from ordinary browser shooters. You can place structures in a fraction of a second, edit them into windows and doorways, and use ramps to rush an enemy from above. Great players "build fight" — a rapid back-and-forth of walls and edits where whoever controls the high ground usually wins the exchange. Learning to build and shoot at the same time is the entire skill curve, and it's deep.

There's more than one way to play. The headline 1v1 mode pits you against another player in a build battle, but there are also Box Fight and Zone Wars-style modes, a Party mode for friends, and a battle-royale option when you want a bigger fight. Because everything runs in the browser, you can practise the same building drills people grind in bigger shooters without any download.

The learning curve is steep but rewarding. Your first matches are chaotic flailing; a week later you're wall-taking, ramp-rushing, and cone-editing on reflex. That visible skill growth is why 1v1.LOL has such a dedicated following on school and home computers alike.

1v1.LOL was made by JustPlay.LOL. Play it unblocked at UBGHyper free in your browser — no download, no sign-up — and pair it with Shell Shockers or Krunker for more browser FPS.`,
    controls: `<strong>WASD</strong> move, <strong>mouse</strong> aim, <strong>left-click</strong> shoot. <strong>Space</strong> jump. Build with <strong>Q</strong> (wall), <strong>C</strong> (ramp), <strong>V</strong> (floor) and <strong>F</strong> (roof) — keys vary by layout and can be rebound. Number keys or <strong>1–5</strong> swap between weapons and building/edit mode. <strong>G</strong> or right-click edits a structure.`,
    tips: [
      'Wall then ramp: drop a wall for cover, then a ramp behind it to take high ground. Height wins almost every fight.',
      'Practise building and aiming together — swapping between them smoothly matters more than raw aim.',
      'Edit walls into windows to peek and shoot, then re-close them. Editing is faster than rebuilding.',
      'Rebind the build keys to whatever your fingers reach fastest. Default layouts slow most new players down.',
    ],
    faqs: [
      { q: 'Who made 1v1.LOL?', a: '1v1.LOL was developed by JustPlay.LOL. UBGHyper runs the free browser version unblocked, with no download or sign-up.' },
      { q: 'What game modes does 1v1.LOL have?', a: 'The core 1v1 build battle plus modes like Box Fight, Zone Wars-style arenas, Party mode for friends, and a battle-royale option for larger fights.' },
      { q: 'How do I get better at building in 1v1.LOL?', a: 'Drill the wall-ramp combo until it\'s automatic, learn to edit walls into windows for quick peeks, and rebind the build keys to keys you can reach without looking. Building speed beats aim at every level.' },
      { q: 'Can I play 1v1.LOL with friends?', a: 'Yes — 1v1.LOL has a Party mode and shareable rooms so you can duel friends directly in the browser.' },
      { q: 'Is 1v1.LOL free and does it work at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and runs on school Chromebooks.' },
    ],
  },

  'Shell-Shockers': {
    longdesc: `Shell Shockers is a multiplayer first-person shooter where every player is a heavily armed egg. It sounds like a joke, and the tone is gleefully silly, but underneath the yolk is a genuinely competitive .io FPS with real aim, movement and class mechanics — which is exactly why it's been a school-computer favourite for years.

You pick one of several egg classes, each tuned around a weapon and playstyle. The all-rounder runs an assault rifle, the shotgun class rules close quarters, the sniper-style "Crackshot" wants distance, and there are fast, aggressive and explosive options for players who like to brawl. Matches are quick, respawns are instant, and the whole thing is built for drop-in, drop-out chaos — join a server, start cracking other eggs, and climb the scoreboard.

The combat is more skilful than the cartoon look suggests. Eggs move fast and have small hitboxes, so tracking targets takes real aim, and the maps are full of cover, ramps and sightlines that reward map knowledge. Land enough hits and you crack an enemy egg; take too many and you're scrambled — but you're back in the fight a second later.

Game modes include free-for-all, team battles, and the objective-based "Captula the Spatula" (a capture-the-flag twist), so there's variety beyond straight fragging. It's a browser game with the feel of a full multiplayer shooter, which is a big part of its staying power.

Shell Shockers was created by Blue Wizard Digital. Play it unblocked at UBGHyper free in your browser — no download, no sign-up — and if you want more browser FPS, try Krunker and 1v1.LOL.`,
    controls: `<strong>WASD</strong> move, <strong>mouse</strong> aim, <strong>left-click</strong> shoot, <strong>right-click</strong> aim down sights. <strong>Space</strong> jump, <strong>Shift</strong> to move quietly, <strong>R</strong> reload, <strong>1 / 2</strong> swap weapon and melee, <strong>Q</strong> or a number key to throw grenades where the class has them.`,
    tips: [
      'Pick a class that fits your aim: shotgun eggs for close brawling, the rifle for all-round play, Crackshot for long sightlines.',
      'Keep moving and jumping — eggs are small, fast targets, and standing still gets you cracked instantly.',
      'Reload behind cover, never in the open. Getting caught mid-reload is the most common death.',
      'Learn each map\'s ramps and high spots; controlling elevation gives you the first shot in most fights.',
    ],
    faqs: [
      { q: 'Who made Shell Shockers?', a: 'Shell Shockers was created by Blue Wizard Digital. UBGHyper hosts the free browser version unblocked, with no download or account needed.' },
      { q: 'What are the classes in Shell Shockers?', a: 'Each class is built around a weapon and playstyle — an all-round rifle egg, a close-range shotgun class, a longer-range sharpshooter, plus faster and more explosive options. Try a few to find what suits your aim.' },
      { q: 'What game modes does Shell Shockers have?', a: 'Free-for-all, team battles, and Captula the Spatula — a capture-the-flag-style objective mode. Modes rotate across public servers.' },
      { q: 'Do I need an account to play Shell Shockers?', a: 'No — you can jump straight into a match as a guest. It\'s a drop-in .io shooter, so you\'re fighting within seconds.' },
      { q: 'Is Shell Shockers free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Smash-Karts': {
    longdesc: `Smash Karts is a 3D multiplayer kart-battle game where the goal isn't to finish first — it's to blow everyone else up. You drive a little kart around compact arenas, grab weapon crates, and unload rockets, machine guns and mines on other players in fast, frantic free-for-all rounds. Think Mario Kart's battle mode rebuilt as a drop-in browser .io game.

Rounds are short and explosive. You spawn, scramble for the glowing item boxes scattered around the map, and use whatever you pull — homing rockets, a spread of machine-gun fire, dropped mines, or a speed boost — to rack up kills before the timer runs out. Get destroyed and you respawn almost immediately, so the action never stops; there's no waiting around, just constant chaos.

The maps are designed for combat, not racing: tight corners, ramps, choke points and open arenas that create natural ambush spots. Good players learn to read where item boxes respawn, control those zones, and use terrain to dodge incoming rockets. It's simple to pick up but has real depth in positioning and weapon timing.

Progression keeps you coming back. Earning XP across matches levels you up and unlocks a big roster of characters and kart skins — purely cosmetic, but a satisfying carrot for regulars. Because matches fill with other live players (and bots to keep games full), there's always a lobby ready to go.

Smash Karts was made by Tall Team. Play it unblocked at UBGHyper free in your browser — no download, no sign-up — and for more multiplayer mayhem try Rooftop Snipers 2 and Krunker.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> to drive — up to accelerate, down to reverse, left/right to steer. <strong>Space</strong> or <strong>Enter</strong> fires your current weapon once you\'ve picked one up. Drive over glowing crates to grab a random weapon or power-up.`,
    tips: [
      'Never stop moving. A parked kart is a free kill — keep circling and grabbing item boxes.',
      'Learn where crates respawn and camp those zones so you\'re always armed.',
      'Rockets home slightly, but you can break lock by cutting behind a wall or pillar the instant you hear one fire.',
      'Drop mines on tight corners and choke points where chasers can\'t avoid them.',
    ],
    faqs: [
      { q: 'Who developed Smash Karts?', a: 'Smash Karts was made by Tall Team. UBGHyper runs the free browser version unblocked, with no download or sign-up.' },
      { q: 'Is Smash Karts multiplayer or against bots?', a: 'Both — matches fill with live players, and bots top up any empty slots so games start fast and stay full.' },
      { q: 'How do you unlock characters in Smash Karts?', a: 'Earn XP by playing and getting kills. Leveling up unlocks new characters and kart skins, which are cosmetic — they don\'t change how your kart handles.' },
      { q: 'What weapons are in Smash Karts?', a: 'You pick up random weapons and power-ups from crates — homing rockets, machine guns, mines, and speed boosts among them. Everyone starts each round unarmed and scrambles for boxes.' },
      { q: 'Is Smash Karts free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Time-Shooter-3': {
    longdesc: `Time Shooter 3: SWAT is a first-person shooter built on one brilliant twist: time only moves when you move. Stand still and the world freezes — bullets hang in the air, enemies pause mid-aim, grenades stop falling. The moment you step, look around, or pull the trigger, everything springs back to life. It turns every firefight into a slow-motion puzzle you solve in real time.

The third entry gives you a SWAT loadout — pistols, shotguns, SMGs and rifles — and throws you into rooms full of armed enemies. Because time is frozen while you plan, you can study incoming fire, sidestep a bullet, snatch a weapon out of the air, and line up the perfect shot before time catches up. Empty your gun? Throw it at an enemy to stagger them, then grab theirs. It rewards cool, deliberate movement over panic-spraying.

Each level is a bite-sized combat scenario: clear the room without getting hit once, since a single bullet ends the run. That "one hit and restart" tension is what makes it addictive — you replay a room over and over, each attempt smoother, until you flow through a whole gunfight like a choreographed action-movie scene. When it clicks, you feel like the hero dodging bullets in slow motion.

The controls are standard FPS, so it's instantly familiar, and the time mechanic adds a layer of strategy you won't find in ordinary shooters. It's short, punchy, and endlessly satisfying to master.

Time Shooter 3: SWAT was made by g80g. Play it unblocked at UBGHyper free in your browser — no download, no sign-up. If you like it, the SUPERHOT-style vibe continues in the earlier Time Shooter games.`,
    controls: `<strong>WASD</strong> move, <strong>mouse</strong> aim, <strong>left-click</strong> shoot, <strong>right-click</strong> or <strong>G</strong> to throw your weapon. <strong>Space</strong> jump, <strong>Shift</strong> to sprint. Pick up dropped guns by walking over them. Remember: time advances only while you move or act — stop to think.`,
    tips: [
      'Freeze and read the room before firing. Standing still stops time, giving you a free moment to plan.',
      'Out of ammo? Throw your empty gun to stagger an enemy, then grab their weapon off the ground.',
      'Lean on movement to dodge — step sideways and a hanging bullet slides harmlessly past.',
      'Clear the closest threat first; one hit restarts the level, so never leave an armed enemy at your back.',
    ],
    faqs: [
      { q: 'How does time work in Time Shooter 3?', a: 'Time only advances when you move, look around, or act. Stand still and the world freezes — bullets and enemies included — so you can plan each move without pressure.' },
      { q: 'Who made Time Shooter 3: SWAT?', a: 'It was developed by g80g, the studio behind the Time Shooter series. UBGHyper hosts the free browser version unblocked.' },
      { q: 'Is Time Shooter 3 like SUPERHOT?', a: 'Yes — it\'s directly inspired by SUPERHOT\'s "time moves when you move" mechanic, rebuilt as a free browser shooter with a SWAT theme and its own levels.' },
      { q: 'Why do I die in one hit?', a: 'That\'s intentional. A single bullet ends the run, which forces you to use the time-freeze to dodge and plan. Levels are short so restarting is quick.' },
      { q: 'Is Time Shooter 3 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Temple-Run-2': {
    longdesc: `Temple Run 2 is the endless runner that defined the genre. You play an explorer who's just grabbed a cursed idol and is now sprinting for their life through a crumbling temple, chased by a giant demonic ape. The world builds itself in front of you — winding paths, broken bridges, mine-cart rails and zip-lines — and you react on the fly: turn, jump, slide and lean to survive as the run gets faster and faster.

What made Temple Run 2 a phenomenon is how it stacks simple inputs into constant tension. You swipe or press to turn corners, jump gaps, slide under obstacles, and tilt to drift sideways and hoover up the coins that snake along the path. Miss a turn and you smash into a wall; misjudge a jump and you tumble into a chasm. There's always something demanding your attention, and the pace never lets up.

Coins fuel the meta-game. You spend them upgrading power-ups — coin magnets, boosts, score multipliers — and unlocking new characters, which keeps a long-term goal ticking under the moment-to-moment reflex play. Mine-cart sections mix things up, swapping running for rail-riding where you tilt to steer and duck to survive.

Runs are short and instantly restartable, which is the whole appeal on a school computer: a death just means tapping to go again and chasing a higher distance. The difficulty is self-scaling — the longer you last, the faster you run — so every session naturally pushes your reflexes.

Temple Run 2 was made by Imangi Studios. Play it unblocked at UBGHyper free in your browser, no download or sign-up — and for more endless-runner energy try Subway Surfers and Tomb of the Mask.`,
    controls: `<strong>Arrow keys</strong> or swipe: Left/Right to turn corners and lean for coins, Up to jump gaps, Down to slide under obstacles. On desktop the arrows cover everything; on touch you swipe in the matching direction. Tilt/lean steers you between lanes to grab coins.`,
    tips: [
      'React to turns late, not early — the path only reveals corners at the last second, so watch the near edge.',
      'Jump and slide are lifesavers on the same stretch; keep both fingers ready, since obstacles alternate fast.',
      'Lean to sweep up coin lines without leaving your lane — coins fund every upgrade and unlock.',
      'Prioritise the coin-magnet and boost upgrades first; they compound your score on every future run.',
    ],
    faqs: [
      { q: 'Who made Temple Run 2?', a: 'Temple Run 2 was developed by Imangi Studios, the creators of the original Temple Run. UBGHyper runs a free browser version unblocked.' },
      { q: 'How is Temple Run 2 different from the first game?', a: 'Temple Run 2 adds a more dynamic, curving track, mine-cart and zip-line sections, better visuals, and deeper upgrades and characters, while keeping the same turn-jump-slide core.' },
      { q: 'What do coins do in Temple Run 2?', a: 'Coins buy power-up upgrades (magnets, boosts, multipliers) and unlock new playable characters. Grabbing coin lines during runs is how you progress the meta-game.' },
      { q: 'Does Temple Run 2 ever end?', a: 'No — it\'s an endless runner that speeds up the longer you survive. The goal is to beat your best distance and score.' },
      { q: 'Is Temple Run 2 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Cluster-Rush': {
    longdesc: `Cluster Rush is a chaotic first-person platformer about jumping across a convoy of speeding trucks. You start on the back of one truck hurtling down a highway, and to survive you have to leap from vehicle to vehicle as they weave, brake, and peel away beneath you — all while an ever-present threat forces you forward. Fall behind or misjudge a jump and you're roadkill.

The magic of Cluster Rush is its sense of momentum and panic. Everything moves fast, the trucks shuffle unpredictably, and the camera bobs with every landing, so each run feels like a barely-controlled sprint across a moving obstacle course. There's no time to overthink — you spot the next surface, commit to the jump, and adjust in mid-air. It's the kind of game where your body learns the timing before your brain does.

Levels string together set-pieces that keep escalating: gaps widen, trucks move faster, ramps and hazards appear, and the safe platforms get smaller and more spread out. The difficulty is all about reading the layout a beat ahead and trusting your momentum, because hesitating mid-jump is what kills most runs. When you finally chain a clean sequence of leaps across a whole cluster of trucks, it's genuinely exhilarating.

It's short-session friendly and instantly restartable, which makes it a perfect quick-play game between classes — punchy, funny, and hard enough to keep pulling you back for one more attempt.

Play Cluster Rush unblocked at UBGHyper free in your browser, no download or sign-up. If the fast, first-person movement clicks, OvO and Cluster Rush's arcade cousins Tunnel Rush and Subway Surfers keep the adrenaline going.`,
    controls: `<strong>WASD</strong> or <strong>arrow keys</strong> to move, <strong>Space</strong> to jump, <strong>mouse</strong> to look around. Some sections let you sprint with <strong>Shift</strong>. The whole game is run-and-jump — the skill is in timing your leaps between moving trucks, not in complex inputs.`,
    tips: [
      'Keep momentum. Jumping while already running clears far bigger gaps than a standing leap.',
      'Look ahead to the next truck before you land the current one — plan your route a jump in advance.',
      'Aim for the center of a truck bed, not the edge, so a slightly early or late jump still lands safe.',
      'Don\'t freeze mid-air deliberating — commit to a target the moment you jump and adjust with small movements.',
    ],
    faqs: [
      { q: 'What is the goal in Cluster Rush?', a: 'Survive by jumping across a convoy of moving trucks and reach the end of each stage without falling or getting left behind. It\'s a momentum-based first-person platformer.' },
      { q: 'Why is Cluster Rush so hard?', a: 'The trucks move and shuffle unpredictably and the pace is relentless, so you have to read the layout a jump ahead and trust your momentum. Hesitating in mid-air is the most common cause of death.' },
      { q: 'What are the controls for Cluster Rush?', a: 'Move with WASD or the arrow keys, jump with Space, and look with the mouse. It\'s deliberately simple — the challenge is timing, not the control scheme.' },
      { q: 'Is Cluster Rush free to play?', a: 'Yes — Cluster Rush is 100% free at UBGHyper, plays in your browser with no sign-up, and there\'s nothing to download.' },
      { q: 'Does Cluster Rush work at school on a Chromebook?', a: 'Yes — it runs in the browser and works on school Chromebooks. Keyboard controls make it easiest to play.' },
    ],
  },

  'Tomb-of-the-Mask': {
    longdesc: `Tomb of the Mask is a vertical arcade maze game with a retro-neon look and a deceptively simple hook: you dash in one of four directions and don't stop until you hit a wall. That single rule — full-speed dashes that only end on impact — turns every screen into a fast puzzle of momentum, timing and route-reading as you climb an endless procedurally-shifting tomb.

You start by finding a mask that grants the power to scale walls, and from there it's a race upward. You flick up, down, left or right and your character rockets across the maze, ricocheting off walls, snatching dots and coins, and dodging spikes, enemies and traps. In the main arcade mode a wall of hazard rises from the bottom of the screen, so you can't dawdle — you have to keep climbing, making split-second direction calls while collecting as you go.

The brilliance is how it blends Pac-Man-style collection with pinball-like momentum. Because you always travel until you hit something, planning your path is about picking which wall to stop against next, chaining dashes so you sweep up dots without slamming into a trap. It reads as chaotic but rewards deliberate route-planning, and the further you climb the tighter and deadlier the mazes get.

Beyond the endless arcade climb there are structured levels with their own layouts and objectives, giving you both a high-score chase and a stage-by-stage progression. Runs are quick and restarts instant, which makes it an ideal pick-up-and-play game on a school computer.

Tomb of the Mask was made by Happymagenta. Play it unblocked at UBGHyper free in your browser — no download, no sign-up — and for more arcade energy try Tunnel Rush and Temple Run 2.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> — tap a direction to dash that way until you hit a wall. On touch, swipe in the direction you want to fling. There\'s no stop button; you control your character purely by choosing which wall to slam into next.`,
    tips: [
      'Plan the wall you\'ll stop against, not just the direction — since you travel until impact, your stopping point is your real move.',
      'In arcade mode the rising hazard never waits, so keep climbing; camping to grab every dot gets you caught.',
      'Chain dashes to sweep dot lines in one motion instead of collecting them one wall at a time.',
      'Watch for spikes on the wall you\'re about to hit — dashing into a spiked wall ends the run instantly.',
    ],
    faqs: [
      { q: 'How do you play Tomb of the Mask?', a: 'You dash in four directions and slide until you hit a wall, collecting dots and coins while dodging spikes and enemies. In arcade mode you climb upward ahead of a rising hazard; there are also structured levels.' },
      { q: 'Who developed Tomb of the Mask?', a: 'Tomb of the Mask was made by Happymagenta. UBGHyper hosts the free browser version unblocked, with no download or sign-up.' },
      { q: 'What\'s the difference between arcade mode and levels?', a: 'Arcade mode is an endless procedurally-generated climb with a rising hazard and a high-score focus. Levels are fixed, hand-designed stages with specific layouts and objectives.' },
      { q: 'Why do I keep dying on the walls?', a: 'Because you always travel until you hit something, a careless dash can slam you into a spiked wall or an enemy. Check what you\'re about to hit before you flick that direction.' },
      { q: 'Is Tomb of the Mask free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Melon-Playground': {
    longdesc: `Melon Playground (also known as Melon Sandbox) is a pure ragdoll sandbox with no goals, no score and no rules — just a flat stage, a ragdoll figure, and a giant menu of items to experiment with. It's a digital toy box: you spawn objects, wire up contraptions, and see what happens. What you build and why is entirely up to you, which is exactly why it's so popular as a stress-relief and creativity game.

The item list is the whole game. You drag in melee weapons, firearms, explosives, mechanisms, electrical parts, barrels, blocks and more, then place, rotate and combine them however you like. Because everything obeys the physics engine, parts interact — a spark sets off a barrel, a swinging blade knocks the ragdoll around, a rigged chain reaction cascades across the stage. Half the fun is engineering elaborate setups; the other half is knocking them down.

There's a genuine building side too. Players connect mechanical and electrical components to make working machines, traps and gadgets, sharing the more impressive contraptions online. Others treat it as a physics playground for pure slapstick, testing how items affect the ragdoll. Either way, the loop is the same: imagine something, spawn the parts, and watch the simulation react.

Because there's no fail state and no timer, it's the opposite of a twitch game — a calm, open-ended space to tinker at your own pace. That makes it a great pick when you want to mess around and create rather than compete.

Play Melon Playground unblocked at UBGHyper free in your browser, no download or sign-up. If you like open-ended physics sandboxes, People Playground and Sandboxels are the natural next steps.`,
    controls: `Mouse-driven: <strong>click and drag</strong> from the item menu to spawn objects, then drag to move them and use the on-screen handles to <strong>rotate</strong> and <strong>delete</strong>. Interact with placed items by dragging or activating them. There\'s no win condition — the interface is a toolbox, and the "goal" is whatever you decide to build.`,
    tips: [
      'Browse the full item menu first — the fun scales with how many parts you know exist.',
      'Build chain reactions: place a spark or explosive next to barrels to trigger a cascade.',
      'Combine mechanical and electrical parts to make working machines and traps, not just piles of objects.',
      'Nothing can go wrong — there\'s no fail state, so experiment freely and reset the stage whenever you want a clean slate.',
    ],
    faqs: [
      { q: 'What is the goal of Melon Playground?', a: 'There isn\'t one — Melon Playground is an open-ended ragdoll sandbox. You spawn items and contraptions and experiment freely, with no score, timer or win condition.' },
      { q: 'Is Melon Playground the same as Melon Sandbox?', a: 'Yes — the game is known by both names. It\'s the same ragdoll physics sandbox where you build with a large menu of items.' },
      { q: 'What can you do in Melon Playground?', a: 'Spawn weapons, explosives, blocks, and mechanical and electrical parts, then combine them into machines, traps and chain reactions — or just test how everything affects the ragdoll.' },
      { q: 'Is Melon Playground free to play?', a: 'Yes — Melon Playground is free at UBGHyper, plays in your browser with no sign-up, and there\'s nothing to install.' },
      { q: 'What games are like Melon Playground?', a: 'People Playground is the closest — a deeper physics-and-ragdoll sandbox. Sandboxels (a falling-sand simulator) scratches the same experimental itch in 2D.' },
    ],
  },

  'Tetris': {
    longdesc: `Tetris is the most famous puzzle game ever made, and it's endured for one reason: the rules take ten seconds to learn and a lifetime to master. Seven differently-shaped blocks — the tetrominoes — fall one at a time into a well. You slide and rotate each piece as it drops, trying to pack them into complete horizontal rows. Fill a row and it vanishes, everything above it settling down. Let the stack climb to the top and it's game over.

The tension comes from speed. Early on the pieces drift down gently and you have all the time you need to place them. As you clear more lines the drop speed ramps up, until the well is filling faster than you can think and you're placing pieces on pure instinct. The whole game is a running negotiation between clearing rows now for safety and building up for a bigger, higher-scoring clear.

That bigger clear is the Tetris itself: wiping four rows at once by dropping a long I-piece into a carefully-kept vertical gap. It scores far more than four single clears, so skilled players deliberately leave one column open and stack nine-wide, gambling that the I-piece arrives before the stack gets dangerous. It's risk management disguised as a block puzzle.

Tetris is endlessly replayable because every game is different — the piece order is random, so you're always reacting, never memorising. It's the definitive "one more go" game: a round can last thirty seconds or fifteen minutes, and a bad start is over quickly enough that you just restart.

This is a free open-source HTML5 build of the classic, playable unblocked at UBGHyper. If you like it, try Block Blast, Bloxorz, and 2048 for more puzzle-stacking.`,
    controls: `<strong>Left / Right arrows</strong> move the piece sideways. <strong>Up arrow</strong> or <strong>X</strong> rotates it. <strong>Down arrow</strong> soft-drops (speeds the fall); <strong>Space</strong> hard-drops (slams it straight down). Some builds add <strong>C</strong> or <strong>Shift</strong> to hold a piece for later.`,
    tips: [
      'Keep the stack flat. A bumpy surface leaves holes you can\'t fill; a level surface accepts almost any piece.',
      'Leave one column empty and stack nine-wide to set up a four-line Tetris with the long I-piece.',
      'Never cover a gap — a buried hole traps every row above it. Clear down to it first.',
      'Use hard-drop (Space) once you\'re sure of placement; at high speed, hesitation is what kills runs.',
    ],
    faqs: [
      { q: 'Who invented Tetris?', a: 'Tetris was created by Alexey Pajitnov in 1984. This is a free open-source HTML5 version of the classic, playable unblocked in your browser at UBGHyper.' },
      { q: 'What is a "Tetris"?', a: 'Clearing four rows at once by dropping the long I-piece into a vertical gap. It scores much more than four separate single-row clears, which is why skilled players set up for it.' },
      { q: 'How do you get better at Tetris?', a: 'Keep the stack flat and low, avoid burying holes, and practise reacting to the random piece order rather than planning too far ahead. Setting up four-line clears is the key to high scores.' },
      { q: 'Does Tetris ever end?', a: 'No — the game continues, speeding up as you clear lines, until the stack reaches the top. The goal is the highest score and the most lines before that happens.' },
      { q: 'Is Tetris free and unblocked at school?', a: 'Yes — this Tetris runs free in your browser at UBGHyper with no download or sign-up, and works on school Chromebooks.' },
    ],
  },

  'Doodle-Jump': {
    longdesc: `Doodle Jump is the endless vertical jumper that defined the genre on early smartphones and still plays perfectly in a browser. You control the Doodler, a little green creature that bounces upward automatically, and your only job is to steer it left and right so it keeps landing on platforms and climbing higher. Fall off the bottom of the screen and the run is over. There's no finish line — just how high you can get.

The genius is in the escalating platform mix. At first you're hopping across simple static ledges. Then moving platforms slide side to side, breakable platforms crumble the instant you touch them, and disappearing platforms vanish after one use. Layer in springs and trampolines that fling you skyward, jetpacks and propeller hats that carry you up automatically, and black holes and monsters that end your run on contact, and every screen becomes a quick read-and-react puzzle.

Monsters are the real threat up high. You can shoot them by aiming and firing upward — but shooting freezes your horizontal aim for a beat, so there's a constant trade-off between defending and steering. Skilled players learn which monsters to shoot, which to bounce on, and which to simply dodge around.

Because the Doodler jumps on its own, Doodle Jump is pure one-axis control — deceptively simple, genuinely hard to master. Scores are measured in height, and beating your personal best by a few thousand is the whole hook. Runs are short and restarts instant, making it a perfect quick-session game.

Doodle Jump was created by Lima Sky. Play it unblocked at UBGHyper free in your browser. For more endless-climb energy, try Tomb of the Mask and OvO.`,
    controls: `<strong>Left / Right arrows</strong> or <strong>A / D</strong> steer the Doodler as it auto-jumps. On some builds you can also tilt or use the mouse. <strong>Space</strong> or click shoots upward at monsters. The Doodler bounces on its own — you never press a jump button.`,
    tips: [
      'Line up your landing before you reach a platform — you steer in the air, so plan the next hop early.',
      'Springs and jetpacks are huge height gains; angle toward them whenever they appear.',
      'Breakable platforms only work once — treat them as a single bounce, not a place to linger.',
      'Shoot monsters you can\'t safely bounce on, but remember firing briefly locks your aim, so pick your moment.',
    ],
    faqs: [
      { q: 'Who made Doodle Jump?', a: 'Doodle Jump was created by Lima Sky. UBGHyper hosts a free browser version, playable unblocked with no download.' },
      { q: 'How do you get a high score in Doodle Jump?', a: 'Score is based on height, so focus on steady upward progress — grab springs and jetpacks for big boosts, avoid falling, and dodge or shoot monsters rather than colliding with them.' },
      { q: 'How do you shoot in Doodle Jump?', a: 'Press Space or click upward to fire at monsters above you. Firing briefly fixes your horizontal position, so time it between steering adjustments.' },
      { q: 'Does Doodle Jump have an ending?', a: 'No — it\'s an endless vertical climb. You keep going higher until you fall or hit a monster or hazard. The goal is to beat your best height.' },
      { q: 'Is Doodle Jump free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Fireboy-and-Watergirl': {
    longdesc: `Fireboy and Watergirl is the co-op puzzle platformer that turned "grab a friend and share one keyboard" into a genre staple. You control two characters at once — Fireboy, who's immune to red lava, and Watergirl, who's immune to blue water — as they work through a series of temple chambers toward their exit doors. The catch: fire kills Watergirl, water kills Fireboy, and green goo kills both. Every room is a puzzle of getting each character past the hazards that would destroy the other.

The design leans hard into cooperation and timing. Levers open doors, buttons hold platforms in place, and pushable blocks bridge gaps — but many require one character to hold a switch while the other passes, so you're constantly coordinating two sets of movements. Play it solo and you're juggling both characters on one keyboard, hands split across WASD and the arrow keys; play it with a friend and it becomes a genuine two-player teamwork test.

Beyond just reaching the exits, each level hides coloured diamonds — red for Fireboy, blue for Watergirl — and tracks your completion time. Grabbing every gem and beating the clock turns a simple "reach the door" level into an optimisation challenge, which is why the game has such replay value.

The elemental gimmick keeps the puzzles fresh across the whole Forest Temple: pools you must route the right character through, lakes you have to avoid, and lifts that only work when both characters balance them. It's approachable enough for kids and tricky enough that adults still get stuck.

Fireboy and Watergirl was created by Oslo Albet. Play it unblocked at UBGHyper free in your browser — solo or with a friend. For more 2-player fun, try Basket Random and Rooftop Snipers.`,
    controls: `<strong>Fireboy:</strong> move and jump with the <strong>arrow keys</strong>. <strong>Watergirl:</strong> move and jump with <strong>A</strong>, <strong>D</strong> and <strong>W</strong>. Solo players drive both at once; with a friend, each takes one character. Fireboy walks safely through lava, Watergirl through water — never swap them.`,
    tips: [
      'Remember the rule: Fireboy dies in blue water, Watergirl dies in red lava, and green goo kills either. Route each character only through their own colour.',
      'Many levers and buttons need one character to hold them while the other moves — plan who waits and who goes.',
      'Collect the red and blue diamonds as you pass; backtracking for them wastes time on the level clock.',
      'Playing solo is easier if you move one character to safety first, then focus fully on the other.',
    ],
    faqs: [
      { q: 'Who developed Fireboy and Watergirl?', a: 'Fireboy and Watergirl was created by Oslo Albet. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Can you play Fireboy and Watergirl with one person?', a: 'Yes — solo players control both characters at once, Fireboy on the arrow keys and Watergirl on WASD. It\'s more of a juggling challenge alone, and smoother with a friend.' },
      { q: 'What kills each character?', a: 'Water (blue) kills Fireboy, lava (fire, red) kills Watergirl, and green goo kills both. Each character can safely pass through their own element.' },
      { q: 'How do you get three stars or a perfect level?', a: 'Collect every red and blue diamond and finish under the level\'s time target. Doing both on one run is the real challenge of each stage.' },
      { q: 'Is Fireboy and Watergirl free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks for solo or two-player play.' },
    ],
  },

  'Rooftop-Snipers': {
    longdesc: `Rooftop Snipers is a two-button, two-player duel that's built almost entirely out of chaos and laughter. Two stiff-legged characters stand on a rooftop, each holding a gun, and the goal is brutally simple: knock your opponent off the edge. First to five wins. That's the whole game — and it's hilarious, because the controls are just awkward enough that nobody looks graceful doing it.

You have exactly two inputs: one to jump, one to shoot. Every shot has recoil that shoves both fighters backward, so the "sniping" is really a physics shoving match — you fire to push your opponent toward the edge, jump to avoid being knocked off yourself, and try to time both against a character that flails like a marionette. Matches are pure slapstick: people miss, overshoot, bounce off each other, and tumble off the roof in ways that feel more like a ragdoll comedy than a shooter.

The beauty of Rooftop Snipers is how instantly it clicks. There's nothing to learn, so a friend can pick up the second set of keys and be competitive in one round. It's the definitive "grab whoever's next to you" school-computer game — quick, funny, and endlessly rematchable. You can also play against the CPU when there's no one around, though the real fun is human-versus-human trash talk.

Different maps swap the rooftop for other precarious arenas, adding hazards and layouts that change the shoving dynamics, but the core stays the same: two buttons, one keyboard, maximum chaos.

Rooftop Snipers was made by New Eich Games. Play it unblocked at UBGHyper free in your browser. For more 2-player mayhem, try Basket Random, Soccer Random, and Getaway Shootout.`,
    controls: `<strong>Player 1:</strong> <strong>W</strong> to jump, <strong>E</strong> to shoot. <strong>Player 2:</strong> <strong>I</strong> (up arrow on some builds) to jump, <strong>O</strong> to shoot. Two buttons each — the recoil from firing shoves both players, so shooting is how you push your opponent off the edge.`,
    tips: [
      'Fire when your opponent is near the edge — the recoil push, not the "hit," is what knocks them off.',
      'Jump the instant you fire to avoid being shoved off by your own recoil or their return shot.',
      'Bait them to the middle, then push hard toward the edge with a couple of quick shots.',
      'It\'s physics, not precision — expect chaos and play the rebounds rather than trying to aim carefully.',
    ],
    faqs: [
      { q: 'How do you play Rooftop Snipers?', a: 'It\'s a two-player duel with two buttons each — one to jump, one to shoot. Use the recoil from your shots to knock your opponent off the rooftop. First to five wins.' },
      { q: 'Who made Rooftop Snipers?', a: 'Rooftop Snipers was made by New Eich Games. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Can you play Rooftop Snipers solo?', a: 'Yes — there\'s a CPU opponent for single players, but the game shines as a two-player game on one keyboard.' },
      { q: 'Why are the controls so awkward?', a: 'That\'s the joke. The stiff, physics-driven movement makes every duel a slapstick shoving match — the awkwardness is the whole comedy of the game.' },
      { q: 'Is Rooftop Snipers free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks for two-player play.' },
    ],
  },

  'Google-Feud': {
    longdesc: `Google Feud takes the format of Family Feud and points it at the strangest survey panel imaginable: Google's own autocomplete. You're shown the start of a real search query — something like "how do I" or "why is my" — and you have to guess the ten most common ways people finish it, based on Google's actual autocomplete suggestions. Guess a real completion and you score points scaled to how popular it is; guess wrong three times and the round ends.

What makes it addictive is how it holds up a mirror to what humanity actually types into a search bar. The top answers are rarely the sensible ones you'd expect — they're the anxious, absurd, and oddly specific things millions of strangers quietly Google at 2am. Half the fun is the surprise of seeing what made the list, and the groan when the obvious answer you skipped turns out to be number one.

The game splits queries into categories — Culture, People, Names, and Questions — each with its own flavour. "Questions" tends toward the weird and existential; "People" turns into a guessing game about what the internet wants to know about public figures. Because the answers are pulled from genuine search data, the game doubles as a funny, slightly unsettling snapshot of collective curiosity.

Rounds are short, so it's ideal for quick sessions or passing the keyboard around a group — everyone shouting guesses at the screen is where it really comes alive. There's real strategy too: think in the voice of an average, slightly panicked searcher rather than a careful writer, and you'll climb the board faster.

Play Google Feud unblocked at UBGHyper free in your browser. For more quick-thinking party games, try Guess Their Answer.`,
    controls: `<strong>Mouse and keyboard.</strong> Pick a category, then type your guess for how the search phrase is completed and press <strong>Enter</strong>. Matching one of the ten hidden answers scores points; three wrong guesses ends the round.`,
    tips: [
      'Think like an average searcher, not a careful writer — the top answers are casual, anxious, and often misspelled-simple.',
      'Start with short, common completions; single words and short phrases dominate real autocomplete.',
      'The obvious literal answer is often number one — say it before you overthink and skip it.',
      'It\'s a great group game: pass the keyboard and let everyone shout guesses to cover more of the board.',
    ],
    faqs: [
      { q: 'How does Google Feud work?', a: 'You\'re given the start of a real search query and guess the ten most common autocomplete completions, Family Feud style. Correct guesses score by popularity; three wrong guesses end the round.' },
      { q: 'Are the answers really from Google?', a: 'The game is built around real Google autocomplete-style suggestion data, which is exactly why the top answers are often so strange — they reflect what people actually search.' },
      { q: 'What are the categories in Google Feud?', a: 'Queries are grouped into Culture, People, Names, and Questions, each with its own style — Questions tends to be the weirdest and most fun.' },
      { q: 'How do you win at Google Feud?', a: 'Guess in the mindset of a typical, casual searcher rather than a formal writer. Short, common, slightly-panicked phrasings match the real autocomplete data best.' },
      { q: 'Is Google Feud free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Mutilate-A-Doll-Two': {
    longdesc: `Mutilate a Doll 2 is one of the original browser physics sandboxes — a goal-free playground where you spawn a ragdoll and an enormous toolkit of objects, then experiment with how they interact. There's no score, no timer, and no objective. The entire point is to tinker: build contraptions, trigger chain reactions, and watch a genuinely deep physics engine react to whatever you throw at it.

The depth is what separated MAD2 from the countless sandbox clones that followed. The item menu is huge — melee objects, firearms, explosives, ropes, hinges, motors, electrical parts, liquids, and environmental tools — and everything obeys the same physics rules, so parts combine in emergent ways. You can bolt objects together, wire up mechanisms, rig elaborate Rube-Goldberg setups, or just test how different forces affect the ragdoll. Advanced players build working machines and share them; casual players poke at things and enjoy the chaos.

The ragdoll itself is surprisingly detailed, with realistic joints and reactions, which makes the "experiment on a physics dummy" loop endlessly watchable. Because there's no fail state, you're free to try anything — reset the scene with a click whenever you want a clean slate and start a new contraption from scratch.

MAD2 has aged into a relaxing, creative time-sink rather than a game you "win." It scratches the same itch as building with blocks or messing with a toy: imagine something, assemble the parts, and see what the simulation does. That open-endedness is exactly why it's endured on school and home computers for years.

Mutilate a Doll 2 was made by Rava Games. Play it unblocked at UBGHyper free in your browser. If you like open-ended physics sandboxes, try People Playground and Melon Playground next.`,
    controls: `<strong>Mouse-driven:</strong> pick objects and tools from the menu, then click and drag to place, move, and manipulate them. Use the tool panels to spawn items, attach joints, apply forces, and reset the scene. There\'s no win condition — the interface is a toolbox, and the goal is whatever you build.`,
    tips: [
      'Explore the full item and tool menus first — the fun scales directly with how many parts you know exist.',
      'Use joints, hinges and motors to build working machines rather than static piles of objects.',
      'Set up chain reactions: place explosives or forces so one trigger cascades across the whole scene.',
      'There\'s no fail state — reset the scene freely and treat every attempt as an experiment.',
    ],
    faqs: [
      { q: 'What is the goal of Mutilate a Doll 2?', a: 'There isn\'t one — MAD2 is an open-ended physics sandbox. You spawn a ragdoll and objects and experiment freely, with no score, timer, or win condition.' },
      { q: 'Who made Mutilate a Doll 2?', a: 'Mutilate a Doll 2 was developed by Rava Games. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'What can you build in Mutilate a Doll 2?', a: 'Using joints, motors, electrical parts and a huge item menu, you can build working machines, traps, and chain-reaction contraptions — or simply test how different forces affect the ragdoll.' },
      { q: 'Is Mutilate a Doll 2 free to play?', a: 'Yes — it\'s free at UBGHyper, plays in your browser with no sign-up, and there\'s nothing to install.' },
      { q: 'What games are like Mutilate a Doll 2?', a: 'People Playground and Melon Playground are the closest modern equivalents — deeper physics-and-ragdoll sandboxes with the same experiment-freely loop.' },
    ],
  },

  'Vex-8': {
    longdesc: `Vex 8 is the latest chapter in the Vex stickman platformer series, and it delivers exactly what the series is loved for: razor-precise controls and obstacle courses engineered to kill you in creative ways. You steer a stick figure through side-scrolling Acts packed with buzzsaws, spikes, crushers, water sections and timing gates, using the full Vex movement set — run, jump, wall-slide, wall-jump, swim, and slide — to thread each hazard by a hair.

By the eighth entry the series has refined its formula to a fine point. The controls are famously tight and consistent, so every death reads as a solvable problem rather than an unfair one, and that fairness is the engine of the "just one more try" loop. Frequent checkpoints keep the pain in check — a mistake sets you back seconds, not minutes — so even the hardest sections stay motivating instead of infuriating.

Vex 8 layers its mechanics more aggressively than earlier entries, chaining movement types into sequences where you have to switch from a slide into a jump into a wall-climb without breaking rhythm. The level art stays clean and readable, with colour-coded hazards you can scan before committing, so mastering a stage is about learning the pattern and refining your timing until you flow straight through.

As always, the main Acts are only half the game. Vex 8 keeps the series' brutal optional Challenge stages — standalone levels with sparse checkpoints and merciless timing, built to test complete command of the movement. Clearing them is a real badge of skill.

Vex 8 was made by Amazing Adam, the creator of the series. Play it unblocked at UBGHyper free in your browser. If you want more, Vex 5, Vex 7 and OvO deliver the same precision-platformer challenge.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong>: Up/W jump, Left/Right run, Down/S slide and drop through thin platforms. Fall against a wall to wall-slide, then jump to wall-jump. Tap jump to swim upward through water. It\'s all keyboard — no mouse needed.`,
    tips: [
      'Drill the wall-jump rhythm — the toughest Acts are vertical shafts that demand fast alternating wall-jumps.',
      'Carry momentum into gaps; a running or sliding start clears jumps a standing leap falls short of.',
      'Slide (Down) under saws and low ceilings — standing through them is an instant death.',
      'Save the Challenge stages for after the Acts; they assume you\'ve mastered every movement the game taught you.',
    ],
    faqs: [
      { q: 'Who made Vex 8?', a: 'Vex 8 was made by Amazing Adam, the developer of the Vex platformer series. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Is Vex 8 harder than Vex 7?', a: 'It follows the series pattern of combining more mechanics per section, so it\'s broadly a step up. The controls are identical, so skill from earlier Vex games carries straight over.' },
      { q: 'Do I need to play the earlier Vex games first?', a: 'No — Vex 8 stands alone and teaches its mechanics as you go. Prior entries just mean you already know the controls.' },
      { q: 'What are the Challenge stages in Vex 8?', a: 'Challenges are optional levels separate from the main Acts, with few checkpoints and tough timing. They\'re a mastery test for experienced players.' },
      { q: 'Is Vex 8 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Mini-Metro': {
    longdesc: `Mini Metro is a minimalist strategy puzzle about designing a subway network under pressure. You start with a few stations and a couple of train lines, and as a city grows, new stations keep appearing. Your job is to draw and redraw the lines connecting them so passengers can always reach their destinations — before any single station overflows with people waiting and forces a game over.

What looks like a clean, elegant map is really a constant optimisation problem. Passengers appear at stations wanting to travel to specific shapes — a circle passenger wants any circle station, a triangle wants a triangle — and they ride your lines to get there. As the city sprawls, demand shifts, hubs get congested, and you have to reroute lines, add trains, and spend limited weekly resources (extra lines, carriages, tunnels, interchanges) to keep everything flowing. One poorly-connected hub can back up and end an otherwise perfect run.

The brilliance is how much tension it wrings from such a calm presentation. There's no combat, no timer bar screaming at you — just a slowly rising pressure as passengers accumulate and you scramble to reengineer your network on the fly. Every decision is a trade-off: a direct line is efficient but inflexible; a big loop is robust but slow. Real-world city maps (London, New York, Tokyo and more) each bring their own geography and rivers to route around.

Mini Metro rewards elegant, forward-thinking design and punishes sprawl, which makes each game a satisfying little lesson in systems thinking. Runs build slowly and end decisively, and you'll immediately want to try again with a better plan.

Mini Metro was made by Dinosaur Polo Club. Play it unblocked at UBGHyper free in your browser. For more thoughtful puzzle-strategy, try Bloxorz and 2048.`,
    controls: `<strong>Mouse-driven:</strong> click and drag from one station to another to draw a line; drag along a line to extend or reroute it, and drag a line off a station to remove that leg. Use the <strong>resource icons</strong> (lines, trains, tunnels, carriages) at the bottom to upgrade your network as the city grows.`,
    tips: [
      'Build for flexibility, not just the shortest path — a network you can reroute survives longer than a rigid one.',
      'Watch station shapes: connect a variety of shapes on each line so passengers have somewhere to go.',
      'Spend your weekly upgrades on trains and interchanges before hubs start backing up, not after.',
      'A single overloaded station ends the game — react to the first sign of congestion instead of waiting.',
    ],
    faqs: [
      { q: 'How do you play Mini Metro?', a: 'You draw subway lines connecting stations so passengers can reach their destinations. As the city grows you reroute lines and spend weekly upgrades to keep any station from overflowing, which ends the game.' },
      { q: 'Who developed Mini Metro?', a: 'Mini Metro was made by Dinosaur Polo Club. UBGHyper hosts a free browser version, playable unblocked with no download.' },
      { q: 'What causes a game over in Mini Metro?', a: 'If any single station gets too crowded with waiting passengers and stays that way, the game ends. Keeping every station served is the core challenge.' },
      { q: 'What do the passenger shapes mean?', a: 'Each passenger wants to reach a station of their shape — a circle passenger rides to any circle station, a triangle to a triangle, and so on. Your lines need to connect a mix of shapes.' },
      { q: 'Is Mini Metro free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Bloxorz': {
    longdesc: `Bloxorz is a classic tile-based puzzle game with one of the most satisfying central mechanics in browser gaming: rolling a 1×2 block around suspended platforms to drop it, end-first, into a square hole. It sounds trivial and turns out to be a genuine brain-teaser, because the block occupies different footprints depending on whether it's standing upright or lying down — and the hole only accepts it standing perfectly on end.

That single rule generates surprising depth. Lying flat, the block covers two tiles; standing, it covers one. Narrow bridges only support the block when it's upright; certain tiles are fragile and collapse if the block stands on them with its full weight. Getting the block from the start to the goal means planning a sequence of rolls that keeps it on solid ground, over gaps, and arriving at the hole in exactly the right orientation. Overshoot a roll and the block tumbles off the edge, resetting the level.

Later stages add switches — heavy X switches that need the block's full standing weight, and lighter O switches triggered by any contact — which open bridges and toggle platforms. Some levels even split the block into two smaller cubes you control separately, multiplying the spatial reasoning required. It's the kind of puzzle where you'll stare at a layout, "see" the solution as a chain of rolls, and feel genuinely clever executing it.

With 33 escalating levels and a password system to resume where you left off, Bloxorz is a compact, complete puzzle experience that respects your intelligence. It's a school-computer staple precisely because it's quiet, thoughtful, and endlessly satisfying to solve.

Bloxorz was made by Damien Clarke. Play it unblocked at UBGHyper free in your browser. For more puzzle brain-teasers, try Tetris, 2048 and Mini Metro.`,
    controls: `<strong>Arrow keys</strong> roll the block in each direction. The block tips end-over-end, so plan each roll — it lies flat across two tiles or stands upright on one. Land it standing perfectly on the square hole to finish. Roll it off an edge and the level resets.`,
    tips: [
      'Think in orientations, not just directions — track whether the block will be standing or lying after each roll.',
      'The block must be standing upright to drop into the goal hole; plan your final rolls to arrive on end.',
      'Fragile (orange) tiles collapse under the block\'s full standing weight — cross them lying flat, never standing.',
      'Note the level password so you can resume later without replaying from level one.',
    ],
    faqs: [
      { q: 'How do you play Bloxorz?', a: 'You roll a 1×2 block around suspended platforms using the arrow keys, aiming to drop it standing upright into the square hole. The block\'s footprint changes as it tips, which is the heart of every puzzle.' },
      { q: 'Who made Bloxorz?', a: 'Bloxorz was created by Damien Clarke. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'How many levels does Bloxorz have?', a: 'Bloxorz has 33 levels that escalate from simple rolls to complex layouts with switches, fragile tiles, and split blocks. A password system lets you resume where you left off.' },
      { q: 'What do the switches do in Bloxorz?', a: 'Heavy (X) switches need the block standing on them with full weight, while light (O) switches trigger from any contact. They open bridges and toggle platforms to reach the goal.' },
      { q: 'Is Bloxorz free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'House-of-Hazards': {
    longdesc: `House of Hazards is a local multiplayer party game about doing ordinary household chores while your friends try to kill you with the house itself. Each round hands every player a simple task — brush your teeth, water the plant, grab the newspaper, use the treadmill — but the catch is that everyone else can trigger the room's hazards to stop you: slamming doors, swinging golf clubs, banana peels, a firing hairdryer, a rogue vacuum. First to finish their tasks wins the round.

The comedy comes from the tug-of-war between offence and defence. On your turn to act you're rushing to complete a chore; a beat later you're yanking a lever to launch a hazard at whoever's mid-task. Because everyone shares the same cramped house, every round is a chaotic scramble of half-finished chores, sudden traps, and characters getting bonked across the room at the worst possible moment.

It's built for couch play. You can take on the CPU solo, but House of Hazards shines with two, three, or four people crowded around one keyboard, each on their own set of keys, trash-talking as they sabotage each other. Rounds are short and the tasks rotate, so no two matches play out the same way, and the low-stakes silliness makes it easy for anyone to pick up instantly.

The whole thing runs in the browser with nothing to install, which makes it a go-to for a quick multiplayer laugh on a school or library computer where you just need to hand a friend the other keys.

House of Hazards was made by New Eich Games. Play it unblocked at UBGHyper free in your browser. For more couch multiplayer, try Getaway Shootout, Rooftop Snipers and Basket Random.`,
    controls: `<strong>Player 1:</strong> arrow keys to move, <strong>M</strong> to act/interact. <strong>Player 2:</strong> <strong>WASD</strong> to move, <strong>Space</strong> to act. Players 3 and 4 get their own key sets on the character-select screen. Use your action key to complete tasks — and to trigger hazards on everyone else.`,
    tips: [
      'Balance offence and defence — sabotaging rivals is useless if you never finish your own chores.',
      'Learn each room\'s hazards so you know which trap to spring the instant an opponent commits to a task.',
      'Time your task attempts for when opponents are busy triggering or recovering from hazards.',
      'It\'s best with friends — hand out the extra key sets and play three or four locally.',
    ],
    faqs: [
      { q: 'How many players can play House of Hazards?', a: 'Up to four players locally on one keyboard, each with their own keys. You can also play solo against the CPU, but it\'s built for couch multiplayer.' },
      { q: 'Who made House of Hazards?', a: 'House of Hazards was made by New Eich Games. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'What\'s the goal in House of Hazards?', a: 'Complete your assigned household tasks before the other players complete theirs, while triggering the room\'s hazards to knock rivals off their tasks. First to finish wins the round.' },
      { q: 'Can you play House of Hazards with one person?', a: 'Yes — there\'s a single-player mode against the CPU, though the chaos and comedy really come alive with two to four people on one keyboard.' },
      { q: 'Is House of Hazards free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Getaway-Shootout': {
    longdesc: `Getaway Shootout is a chaotic race-to-the-extraction party game where the joke is that your characters can barely walk. Instead of running normally, each fighter moves by hopping — you tap one button to lunge up-left and another to lunge up-right — so getting anywhere is a clumsy, physics-driven flail. Two or three players scramble across side-scrolling obstacle courses toward a getaway point (a helicopter, a car), and the first to reach it wins the round.

The twist is that it's not just a race — it's a brawl. Weapons and power-ups spawn along the course: pistols, shotguns, grenades, jetpacks, boxing gloves, and stranger gadgets. Grab one and you can blast, knock, or launch your rivals backward, turning a simple sprint into a slapstick shootout. Because movement is so awkward, every firefight is unpredictable comedy — characters ragdoll off ledges, overshoot jumps, and get flung across the screen at the worst moments.

Getaway Shootout is made for local multiplayer. You can play solo against CPU opponents, but it's at its best with a friend or two sharing the keyboard, each on a two-button setup, laughing at how badly everyone controls. Rounds are quick and you play a best-of series, so there's always a "one more round" rematch energy.

The deliberately terrible controls are the entire point — mastering the hop-and-shoot movement just enough to beat a friend is deeply satisfying, and losing is just as funny.

Getaway Shootout was made by New Eich Games. Play it unblocked at UBGHyper free in your browser. For more two-button couch chaos, try Rooftop Snipers, Rooftop Snipers 2 and House of Hazards.`,
    controls: `<strong>Player 1:</strong> <strong>W</strong> hop left, <strong>E</strong> hop right, <strong>R</strong> use item/shoot. <strong>Player 2:</strong> arrow keys <strong>Up</strong> and <strong>Down</strong> (or the mapped hop keys) plus a shoot key shown on the select screen. Movement is all hopping — you lunge diagonally with each press.`,
    tips: [
      'Master the two-hop rhythm before worrying about weapons — controlled movement wins more rounds than firepower.',
      'Grab every weapon and power-up you pass; a well-timed shot or grenade can knock a leading rival off the course.',
      'Use the environment — knock opponents into pits and off ledges instead of just shooting them.',
      'It\'s funniest and most competitive with a friend on the other keys, so play local multiplayer when you can.',
    ],
    faqs: [
      { q: 'How do you move in Getaway Shootout?', a: 'You hop instead of walk — one button lunges you up-left, another up-right. The deliberately awkward, physics-driven movement is the core joke and challenge of the game.' },
      { q: 'Who made Getaway Shootout?', a: 'Getaway Shootout was made by New Eich Games. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Can you play Getaway Shootout with friends?', a: 'Yes — it supports local multiplayer for two to three players on one keyboard, and that\'s how it\'s best played. There\'s also a single-player mode against the CPU.' },
      { q: 'What\'s the goal in Getaway Shootout?', a: 'Race across the obstacle course to the getaway point before your opponents, using weapons and power-ups to knock them back along the way. It\'s played as a best-of series.' },
      { q: 'Is Getaway Shootout free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Rooftop-Snipers-2': {
    longdesc: `Rooftop Snipers 2 is the sequel to the beloved two-button dueling game, and it keeps everything that made the original a couch-multiplayer staple while adding new arenas and characters. Two stiff-legged fighters stand on a rooftop, each with a single gun, and the goal is exactly as simple and chaotic as before: use your shots to knock your opponent off the edge. First to five wins.

You still have only two inputs — one to jump, one to shoot — and every shot delivers recoil that shoves both players backward. So "sniping" is really a physics shoving match: you fire to push your rival toward the edge, jump to keep yourself from being knocked off, and try to time both against a character that lurches around like a puppet. The result is pure slapstick, where duels are decided by lucky bounces and mistimed jumps as much as by skill.

The sequel expands the roster and the stages, swapping the plain rooftop for new precarious arenas with their own layouts and hazards that change the shoving dynamics. But the core loop is untouched: instantly learnable, endlessly rematchable, and funniest with a friend on the other set of keys.

Like the original, it's the definitive "grab whoever's nearby" game — no learning curve, so a second player is competitive in a single round. You can also duel the CPU when you're on your own, though the real fun is the human-versus-human trash talk of a best-of-five.

Rooftop Snipers 2 was made by New Eich Games, the studio behind the original. Play it unblocked at UBGHyper free in your browser. For more two-button mayhem, try Rooftop Snipers, Getaway Shootout and House of Hazards.`,
    controls: `<strong>Player 1:</strong> <strong>W</strong> to jump, <strong>E</strong> to shoot. <strong>Player 2:</strong> <strong>I</strong> to jump, <strong>O</strong> to shoot. Two buttons each — the recoil from firing shoves both players, so shooting is how you push your opponent off the rooftop. First to five points wins.`,
    tips: [
      'Fire when your opponent is near the edge — it\'s the recoil push, not a "hit," that knocks them off.',
      'Jump the instant you shoot so your own recoil (or their return fire) doesn\'t send you over the side.',
      'Bait rivals toward the middle, then push hard toward the edge with two quick shots.',
      'It\'s physics, not precision — play the rebounds and expect chaos rather than trying to aim carefully.',
    ],
    faqs: [
      { q: 'How is Rooftop Snipers 2 different from the first game?', a: 'It keeps the same two-button, knock-them-off-the-roof gameplay but adds new characters and arenas with fresh layouts and hazards. If you liked the original, the sequel is more of the same chaos with variety.' },
      { q: 'Who made Rooftop Snipers 2?', a: 'Rooftop Snipers 2 was made by New Eich Games, the same studio as the original. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Can you play Rooftop Snipers 2 solo?', a: 'Yes — there\'s a CPU opponent for single players, but it\'s designed as a two-player game on one keyboard.' },
      { q: 'How do you win in Rooftop Snipers 2?', a: 'Knock your opponent off the rooftop using the recoil from your shots. The first player to reach five points wins the match.' },
      { q: 'Is Rooftop Snipers 2 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks for two-player play.' },
    ],
  },

  'Learn-To-Fly-2': {
    longdesc: `Learn to Fly 2 is the sequel to the cult launch-and-upgrade game about a penguin with a dream: to fly. Penguins can't fly, of course, which is the entire premise — you launch your penguin off a ramp, glide and boost as far as you can, cash in the distance and altitude you achieve, and spend it on better gliders, boosters, ramps and payloads. Then you do it again, further each time, in an addictive loop of incremental progress.

The genius is how each run funds the next. A pitiful first hop earns a little money; you buy a slightly better glider or a small rocket, and your next launch goes noticeably further. Soon you're stacking multiple boosters, gliding on upgraded wings, and smashing through obstacles that used to stop you cold. The sense of steady, tangible progression — from flopping into the snow to rocketing across the sky — is what keeps you launching "just one more time."

Learn to Fly 2 expands the original with multiple modes: a Story mode with objectives to chase, a Classic mode focused on pure distance, and a sandbox-style mode for experimenting with builds. There are also hidden goals, achievements, and secret payloads to discover, giving completionists plenty to hunt for beyond the main goal.

It's a physics-and-upgrade game at heart, so success is about the right combination of equipment and a good launch angle, not twitch reflexes. That makes it a relaxing, goal-driven time-sink — perfect for chipping away at over several sessions.

Learn to Fly 2 was made by Light Bringer Games. Play it unblocked at UBGHyper free in your browser. If you like launch-and-upgrade games, try Burrito Bison 3 and Getting Over It.`,
    controls: `<strong>Left / Right arrows</strong> tilt the penguin in the air to control your angle and glide. <strong>Up arrow</strong> or <strong>Space</strong> fires boosters and rockets. Between runs, use the <strong>mouse</strong> to buy and equip upgrades in the shop. The launch is automatic — your job is angle and boost timing.`,
    tips: [
      'Reinvest every run\'s earnings into upgrades before launching again — progress compounds fast.',
      'Control your tilt to keep a shallow glide angle; nose-diving kills your distance.',
      'Save boosters for when you\'re losing altitude rather than firing them all at launch.',
      'Chase the Story-mode objectives and achievements — they unlock bonus cash and better gear.',
    ],
    faqs: [
      { q: 'Who made Learn to Fly 2?', a: 'Learn to Fly 2 was developed by Light Bringer Games. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'What\'s the goal of Learn to Fly 2?', a: 'Launch your penguin as far and high as possible, earn money from each run, and spend it on gliders, boosters and ramps to fly even further next time. Story mode adds specific objectives to complete.' },
      { q: 'What modes does Learn to Fly 2 have?', a: 'A Story mode with objectives, a Classic distance mode, and a sandbox-style mode for experimenting with equipment, plus achievements and hidden payloads to discover.' },
      { q: 'How do you fly further in Learn to Fly 2?', a: 'Buy and combine better gliders, boosters and ramps between runs, then keep a shallow glide angle and save your boosters for when you start losing altitude.' },
      { q: 'Is Learn to Fly 2 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Burrito-Bison-3': {
    longdesc: `Burrito Bison 3 (also known as Burrito Bison: Launcha Libre) is the third entry in the beloved launch-and-bounce series, where a luchador bison escapes a world of sentient gummy bears by being flung across it at high speed. You launch the Bison from a giant rubber band, then bounce, slam, and rocket across a candy landscape, popping gummy bears for coins and distance. Cash your earnings into upgrades, and launch again — a little further, a little faster, every time.

The core loop is pure momentum-chasing satisfaction. Slamming down onto gummy bears bounces you back up and builds speed; chaining slams keeps you airborne and racing forward; special gummies and pickups launch you into bursts of velocity. Manage it well and a single run turns into a gloriously long, coin-showering flight across the map. Manage it badly and you fizzle out early — but a fresh, upgraded launch is only a click away.

Launcha Libre adds depth over the earlier games: collectible gummy bears with special abilities you can equip, more varied upgrades, boss encounters, and events that shake up runs. That gives the classic "launch, spend, repeat" formula extra layers to optimise, so you're not just buying raw distance but building a loadout that suits your style.

It's the ideal idle-adjacent arcade game — short bursts of active bouncing punctuating a steady upgrade grind, easy to dip into for a few runs and hard to put down once the numbers start climbing.

Burrito Bison 3 was made by Juicy Beast. Play it unblocked at UBGHyper free in your browser. If you like the launch-and-upgrade loop, try Learn to Fly 2 next.`,
    controls: `<strong>Mouse or Space</strong> to slam: while airborne, click (or press Space) to slam down onto gummy bears for a bounce and a speed boost. Timing your slams to hit bears keeps your momentum going. Between runs, use the <strong>mouse</strong> to buy upgrades and equip special gummy bears.`,
    tips: [
      'Slam onto gummy bears, not empty ground — each hit bounces you higher and faster.',
      'Chain slams to stay airborne and keep your speed climbing across the map.',
      'Spend every run\'s coins on upgrades before relaunching; distance compounds quickly.',
      'Equip special gummy bears that match your run style — some boost launch speed, others extend flight.',
    ],
    faqs: [
      { q: 'Who made Burrito Bison 3?', a: 'Burrito Bison 3 (Launcha Libre) was developed by Juicy Beast. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'How do you play Burrito Bison 3?', a: 'Launch the Bison from a rubber band, then slam onto gummy bears to bounce and build speed, collecting coins over distance. Spend the coins on upgrades and relaunch to go further each time.' },
      { q: 'What\'s new in Burrito Bison 3 versus the earlier games?', a: 'Launcha Libre adds collectible gummy bears with special abilities, more varied upgrades, boss encounters, and events, giving the launch-and-upgrade loop extra layers to optimise.' },
      { q: 'How do you get further in Burrito Bison 3?', a: 'Keep chaining slams onto gummy bears to hold your momentum, reinvest coins into upgrades every run, and equip special gummies that boost launch speed or flight time.' },
      { q: 'Is Burrito Bison 3 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Duck-Life': {
    longdesc: `Duck Life is the classic raise-and-race game where you train a duckling into a champion racer. Your duck starts hopeless — slow, weak, unable to swim or fly — and it's your job to build it up through a series of simple training mini-games, then enter races to win prize money that funds better food, upgrades, and access to tougher competitions. It's a compact, satisfying loop of train, race, improve, repeat.

Training is split by discipline. Running practice has your duck leaping obstacles to build speed; flying practice drills its air stat; swimming practice raises its water ability. Each mini-game is quick and score-based, and the points you earn convert directly into stat gains. Because races include running, flying, and swimming sections, you have to develop your duck across all of them — neglect swimming and you'll drown your lead in the water stretch of a race.

The progression is the hook. Early races are gentle and cheap to enter; win them and you unlock harder circuits with bigger purses and stiffer rivals. You spend winnings on food (which boosts training efficiency) and eventually take on the championship. Watching your once-useless duckling grow into an unbeatable all-rounder is genuinely rewarding, and the simple presentation keeps the focus on that steady climb.

Duck Life is easy to pick up, forgiving, and paced perfectly for short sessions — a few training runs and a race fit neatly between classes, and the "just one more race" pull is strong.

Play Duck Life unblocked at UBGHyper free in your browser. If you enjoy raise-and-progress games, the later Duck Life sequels add climbing and new skills to master.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> during training and racing: in running, jump obstacles; in flying, steer up and down; in swimming, dodge hazards. Use the <strong>mouse</strong> in menus to enter races, buy food, and manage your duck. Each discipline\'s mini-game controls are shown before you start.`,
    tips: [
      'Train all three skills — running, flying and swimming — since races test each in turn.',
      'Buy food with your winnings; better food makes every training session raise stats faster.',
      'Grind the training mini-games before entering a race so your stats comfortably clear the field.',
      'Reinvest prize money early; a small stat lead compounds into easy wins on later circuits.',
    ],
    faqs: [
      { q: 'How do you play Duck Life?', a: 'You train a duckling in running, flying and swimming mini-games to raise its stats, then enter races to win prize money. Spend winnings on food and upgrades and work up to the championship.' },
      { q: 'What\'s the goal of Duck Life?', a: 'Turn your weak starting duck into a champion racer by training all its skills and winning increasingly difficult races, ultimately taking the championship title.' },
      { q: 'Why does my duck keep losing races?', a: 'Races include running, flying and swimming sections, so a weakness in any one skill loses you the race. Train the discipline you\'ve been neglecting and buy food to speed up stat gains.' },
      { q: 'Are there sequels to Duck Life?', a: 'Yes — the Duck Life series continues with sequels that add new skills like climbing and fresh training mini-games, building on the same train-and-race loop.' },
      { q: 'Is Duck Life free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Vex-3': {
    longdesc: `Vex 3 is the entry that carried the Vex stickman platformer series into its modern, browser-native era, and it's still one of the most-played in the whole run. You steer a stick figure through side-scrolling Acts crammed with buzzsaws, spikes, crushers, water sections and precise timing gates, using the full Vex movement kit — run, jump, wall-slide, wall-jump, swim and slide — to thread each hazard by a whisker.

The reason Vex games hook people is the control quality. Movement is tight and utterly consistent, so every death reads as a solvable problem rather than an unfair one — and that fairness is the engine of the endless "one more try" loop. Frequent checkpoints keep the punishment light: a mistake costs you seconds, not the whole Act, so even the hardest stretches stay motivating instead of rage-inducing.

Vex 3 refined the formula with clean, readable levels where you can scan an obstacle sequence before committing, then learn its pattern and smooth out your timing until you flow straight through. It leans on momentum and verticality — long runs where you chain a slide into a jump into a wall-climb, and shafts you scale with rapid alternating wall-jumps.

Beyond the main Acts, Vex 3 keeps the series' brutal optional Challenge stages: standalone levels with sparse checkpoints and merciless timing, built to test complete mastery of the movement. Clearing them is a real badge of skill and the reason speedrunners keep coming back.

Vex 3 was made by Amazing Adam, the creator of the series. Play it unblocked at UBGHyper free in your browser. If you want more, Vex 5, Vex 7, Vex 8 and OvO deliver the same precision-platformer challenge.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong>: Up/W jump, Left/Right run, Down/S slide and drop through thin platforms. Fall against a wall to wall-slide, then jump to wall-jump. Tap jump to swim upward through water. It\'s all keyboard — no mouse needed.`,
    tips: [
      'Drill the wall-jump rhythm — many Acts are vertical shafts cleared with fast alternating wall-jumps.',
      'Carry momentum into gaps; a running or sliding start clears jumps a standing leap falls short of.',
      'Slide (Down) under saws and low ceilings — standing through them is an instant death.',
      'Save the Challenge stages for after the Acts; they assume you\'ve mastered every movement the game taught you.',
    ],
    faqs: [
      { q: 'Who made Vex 3?', a: 'Vex 3 was made by Amazing Adam, the developer of the Vex platformer series. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Is Vex 3 a good place to start the series?', a: 'Yes — Vex 3 is one of the most popular entries and teaches the movement clearly. The controls are identical across the series, so skill carries straight into Vex 5, 7 and 8.' },
      { q: 'What are the Challenge stages in Vex 3?', a: 'Challenges are optional levels separate from the main Acts, with few checkpoints and tough timing. They\'re a mastery test for experienced players and a favourite of speedrunners.' },
      { q: 'Why do I keep failing wall-jumps in Vex 3?', a: 'Wall-jumping needs you to hold toward the wall to cling, then tap jump. Pressing away too early drops you — keep the direction held into the wall until the instant you jump.' },
      { q: 'Is Vex 3 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Death-Run-3D': {
    longdesc: `Death Run 3D is a first-person endless runner set inside a hurtling neon corridor, and it's one of the purest reflex tests in the browser. You race forward automatically down a glowing sci-fi track, and a relentless stream of obstacles — barriers, gaps, spinning hazards, closing walls — rushes at you. Your job is to jump, slide, and switch across the track fast enough to survive, as the speed climbs relentlessly and the corridor becomes a strobing blur.

It sits in the same reflex-arcade family as Slope and Tunnel Rush: no shop, no upgrades, no story — just you against your reaction time. The retro-futuristic aesthetic, all neon lines and synth pulse, gives it a distinctive vibe, and the escalating tempo does the rest. Early seconds are a manageable glide; a minute in, you're pattern-matching hazards by instinct alone, hands tight on the keys, reading the track a beat ahead of where you actually are.

The challenge is fair but unforgiving. Every obstacle is telegraphed just far enough ahead that a sharp player can react, so deaths feel earned rather than cheap — which is exactly what fuels the "one more run" compulsion. There's real skill in learning to read the track's rhythm and to commit to lane-switches early instead of flinching late.

Runs are short and restarts are instant, making Death Run 3D a perfect quick-session game: easy to start, brutal to master, and endlessly re-runnable on a school Chromebook where you just want to beat your last distance.

Play Death Run 3D unblocked at UBGHyper free in your browser. If it clicks, Tunnel Rush, Slope and Run 3 deliver the same reflex-arcade high.`,
    controls: `<strong>Left / Right arrows</strong> or <strong>A / D</strong> to move across the track. <strong>Up arrow</strong>, <strong>W</strong> or <strong>Space</strong> to jump; <strong>Down</strong> or <strong>S</strong> to slide under obstacles. There\'s no brake — the track auto-scrolls and speeds up. Everything is about reading hazards early and reacting fast.`,
    tips: [
      'Look far down the corridor, not at the obstacle right in front of you — reacting late is already too late.',
      'Commit to lane-switches early and decisively; hesitating mid-track is the most common death.',
      'Learn the difference between jump hazards and slide hazards on sight so you pick the right move instantly.',
      'The speed only rises, so treat each run as a fresh reflex test and focus on beating your last distance.',
    ],
    faqs: [
      { q: 'How do you play Death Run 3D?', a: 'You race automatically down a neon corridor, dodging obstacles by moving left and right, jumping, and sliding. The track speeds up continuously, so it\'s a pure reflex-and-reaction survival game.' },
      { q: 'Does Death Run 3D ever end?', a: 'No — it\'s an endless runner that keeps accelerating until an obstacle gets you. The goal is to survive as long as possible and beat your previous distance.' },
      { q: 'Is Death Run 3D like Slope or Tunnel Rush?', a: 'Yes — all three are endless, speed-scaling reflex games with minimal controls. Death Run 3D adds jumping and sliding to the dodging, inside a neon sci-fi corridor.' },
      { q: 'How do you get better at Death Run 3D?', a: 'Focus your eyes far down the track so you read hazards early, commit to lane-switches decisively, and learn to tell jump obstacles from slide obstacles on sight.' },
      { q: 'Is Death Run 3D free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Cut-The-Rope': {
    longdesc: `Cut the Rope is the physics puzzle that turned a hungry little green monster named Om Nom into a mobile-era icon. Each level dangles a piece of candy from ropes, and your job is to slice those ropes in the right order, at the right moment, so the candy swings, drops, and lands in Om Nom's waiting mouth. Simple to grasp, genuinely clever to master.

The brilliance is how much depth the designers wring from one action — cutting a rope. Levels layer in air cushions that puff the candy sideways, bubbles that float it upward, spikes that destroy it on contact, spiders that crawl down to steal it, and pulleys and moving anchors that keep everything in motion. Solving a stage is about reading the physics and timing your cuts, often chaining several in a fraction of a second.

There's a scoring layer on top of just feeding Om Nom: three stars float in each level, and collecting all of them while still delivering the candy turns a simple puzzle into an optimisation challenge. Grabbing every star often means a completely different, riskier solution than just getting the candy home — which is exactly what gives the game its replay value and its "aha!" moments.

The presentation is warm and charming, with Om Nom reacting adorably to your successes and failures, but underneath is a rigorous physics engine and hundreds of hand-crafted puzzles across themed boxes that steadily introduce new mechanics. It's approachable for kids and satisfying for adults.

Cut the Rope was created by ZeptoLab. Play it unblocked at UBGHyper free in your browser. For more physics puzzling, try Bad Ice Cream and Bloxorz.`,
    controls: `<strong>Mouse or touch:</strong> click and drag (or swipe) across a rope to slice it. Tap bubbles to pop them and tap air cushions to blow the candy in a direction. That\'s it — every puzzle is solved by cutting ropes and nudging the candy at the right moment.`,
    tips: [
      'Watch the swing before you cut — timing the slice at the top or bottom of an arc sends the candy in very different directions.',
      'Going for all three stars often needs a completely different solution than just feeding Om Nom — plan for the stars first.',
      'Use air cushions in short taps to steer the candy rather than one big push.',
      'Pop bubbles at the last second to drop the candy exactly where you need it.',
    ],
    faqs: [
      { q: 'Who made Cut the Rope?', a: 'Cut the Rope was created by ZeptoLab. UBGHyper hosts a free browser version, playable unblocked with no download.' },
      { q: 'What is the goal of Cut the Rope?', a: 'Cut the ropes so the candy lands in Om Nom\'s mouth. For a perfect level, also collect all three stars on the way down.' },
      { q: 'Who is the green monster in Cut the Rope?', a: 'That\'s Om Nom, the candy-loving creature you\'re feeding. He\'s become ZeptoLab\'s mascot across the whole series.' },
      { q: 'How do you get three stars in Cut the Rope?', a: 'Collect all three stars in a level while still delivering the candy. It usually requires a riskier or more precise solution than simply feeding Om Nom, which is the real challenge of each stage.' },
      { q: 'Is Cut the Rope free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Wheely': {
    longdesc: `Wheely is a charming point-and-click puzzle-adventure starring a little red car with a big personality. Unlike a racing game, Wheely isn't about speed — it's about solving the environment. Each level is a side-on scene full of levers, buttons, platforms, and obstacles, and you progress by clicking things in the right order to clear Wheely's path to the exit. It's a gentle, clever brain-teaser wrapped in a wordless, expressive cartoon.

The puzzles work because everything is interactive and logical. Click a lever to raise a bridge, a button to move a platform, a sign to flip it into a ramp — but do it in the wrong order and Wheely gets stuck, or a hazard blocks the way. Working out the correct sequence, and spotting the one interactive element you missed, is the whole satisfying loop. There's no time pressure and no fail-state stress; you just experiment until the scene clicks into place.

What gives Wheely its warmth is the storytelling without words. Wheely emotes — excitement, worry, determination — and each game in the series tells a little narrative through pure animation, whether he's chasing a love interest or getting caught up in an adventure. It's the kind of game that's genuinely funny and endearing while still making you think.

The series spans multiple entries, each with new mechanics and scenes, but all sharing the same click-to-solve heart. It's perfect for a relaxed puzzle session where you want to use your brain without any pressure.

Wheely was made by Pegas Games. Play it unblocked at UBGHyper free in your browser. For more click-and-solve puzzling, explore the rest of the Wheely series and Riddle School.`,
    controls: `<strong>Mouse only:</strong> click on interactive objects in the scene — levers, buttons, platforms, signs — to activate them. The goal is to work out the correct order of clicks that clears a safe path for Wheely to roll to the exit. No keyboard needed.`,
    tips: [
      'Scan the whole scene first and note every object that looks clickable before you touch anything.',
      'Order matters — the same set of actions in a different sequence often fails, so think before you click.',
      'If Wheely gets stuck, look for the one element you haven\'t interacted with yet.',
      'There\'s no timer, so experiment freely; you can always reset a level and try a new sequence.',
    ],
    faqs: [
      { q: 'How do you play Wheely?', a: 'Wheely is a point-and-click puzzle game. You click objects in the scene — levers, buttons, platforms — in the right order to clear a path for the little red car to reach the exit.' },
      { q: 'Who made Wheely?', a: 'Wheely was developed by Pegas Games. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Is Wheely a racing game?', a: 'No — despite starring a car, Wheely is a puzzle-adventure. It\'s about solving each scene by clicking things in the correct sequence, not about speed.' },
      { q: 'How many Wheely games are there?', a: 'The series has several entries, each with new scenes and mechanics but the same click-to-solve gameplay and wordless storytelling.' },
      { q: 'Is Wheely free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Riddle-School-1': {
    longdesc: `Riddle School is the point-and-click adventure that a whole generation played instead of doing classwork — which is fitting, because the entire game is about escaping class. You play Phil Eggtree, a bored student determined to break out of school, and you do it the classic adventure-game way: clicking around each room, picking up items, combining them, and using them on the environment and on hilariously oblivious teachers to solve your way to freedom.

The charm is in its dry humour and clever, self-contained puzzles. You'll swipe a hall pass, distract a teacher, rig up an unlikely contraption from a paperclip and a piece of gum, and generally outwit an adult world that never quite notices what you're up to. Every puzzle has that satisfying "of course!" logic once you spot it, and the writing keeps a knowing, comedic tone throughout.

As a browser point-and-click, it's beautifully approachable: no reflexes, no timers, just observation and lateral thinking. You examine everything, talk to everyone, and try items in unexpected places until the path forward clicks. Getting stuck is part of the fun — the solution is usually hiding in something you already clicked past.

Riddle School kicked off a beloved series (Riddle School 1 through 5, plus Riddle Transfer) with recurring characters and escalating, increasingly absurd escape scenarios. This first entry is where Phil's break-out saga begins, and it's the perfect gateway into old-school Flash adventure gaming, preserved and playable in the browser.

Riddle School was created by Jonochrome (Jonoahmedeh). Play it unblocked at UBGHyper free in your browser. If you enjoy it, the sequels and Wheely offer more click-to-solve puzzling.`,
    controls: `<strong>Mouse only:</strong> click to move Phil, examine objects, and pick up items. Open your inventory and click an item to select it, then click where you want to use it. Talk to characters by clicking them. Puzzles are solved by combining and using items in the right places.`,
    tips: [
      'Click on everything — items and clues are often hidden in objects that look like background.',
      'Try using inventory items in unexpected places; the solution is usually a creative combination.',
      'Talk to every character; their reactions frequently hint at what you need to do next.',
      'If you\'re stuck, revisit rooms you\'ve already cleared — a new item may open up an old spot.',
    ],
    faqs: [
      { q: 'What is Riddle School?', a: 'Riddle School is a point-and-click adventure where you play Phil, a student trying to escape school by solving item-based puzzles and outwitting teachers. It\'s the first in a popular series.' },
      { q: 'Who made Riddle School?', a: 'Riddle School was created by Jonochrome. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'How many Riddle School games are there?', a: 'Five main entries (Riddle School 1–5) plus the Riddle Transfer follow-ups, with recurring characters and increasingly elaborate escape scenarios.' },
      { q: 'How do I get past a puzzle I\'m stuck on?', a: 'Re-examine every object, try combining inventory items, and talk to characters for hints. Most solutions involve using an item you already have in a place you haven\'t tried yet.' },
      { q: 'Is Riddle School free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Rolling-Sky': {
    longdesc: `Rolling Sky is a fast, rhythm-driven 3D reflex game where you guide a rolling ball down a twisting neon platform suspended in space. The track weaves, drops away, and bristles with obstacles — spinning hammers, sliding walls, laser gates, and sudden gaps — all synced to a driving soundtrack. Slide left and right to stay on the path and dodge everything, because a single hit or a single misstep off the edge ends the run instantly.

What makes Rolling Sky so gripping is the marriage of music and motion. Obstacles and jumps are timed to the beat, so once you learn a level you start to feel the rhythm of the hazards as much as see them. Early attempts are chaotic — you're reacting to threats you didn't know were coming — but with each run you memorise a little more of the track, pushing your checkpoint further until the whole level flows like a choreographed routine.

It's punishing in the best way. Levels are long and dense, and progress is measured in percentage complete, so beating your previous best by even a few percent feels like a win. Diamonds and crystals scattered along the track give you optional collectibles to chase, rewarding riskier lines for players who want more than just survival.

The clean, glowing art style and pulsing music make it hypnotic, and the instant-restart loop makes it dangerously moreish — you'll tell yourself "one more try" a dozen times chasing that next checkpoint.

Play Rolling Sky unblocked at UBGHyper free in your browser. If you like rhythm-reflex challenges, try Tomb of the Mask and Death Run 3D.`,
    controls: `<strong>Left / Right arrows</strong>, <strong>A / D</strong>, or drag with the <strong>mouse</strong> to slide the ball across the track. Some obstacles require jumping, triggered automatically on ramps. There\'s no brake — the ball rolls forward continuously and the whole game is about steering and timing to the music.`,
    tips: [
      'Learn the track through repetition — Rolling Sky rewards memorisation more than raw reaction.',
      'Move in small, precise slides; over-steering flings you off the narrow platform.',
      'Listen to the music — obstacles are timed to the beat, so the rhythm cues your dodges.',
      'Don\'t chase every diamond on early runs; prioritise survival and grab collectibles once you know the level.',
    ],
    faqs: [
      { q: 'How do you play Rolling Sky?', a: 'You slide a rolling ball left and right down a twisting musical track, dodging obstacles and gaps. One hit or fall ends the run, so it\'s a memorisation-and-timing challenge synced to the soundtrack.' },
      { q: 'Why is Rolling Sky so hard?', a: 'Levels are long and dense with beat-timed hazards you can\'t fully see coming on a first run. It\'s designed around learning the track through repeated attempts and pushing your checkpoint a little further each time.' },
      { q: 'What are the diamonds in Rolling Sky?', a: 'Optional collectibles scattered along the track. Grabbing them often means taking a riskier line, so they reward players who\'ve mastered a level.' },
      { q: 'How is progress measured in Rolling Sky?', a: 'By percentage of the level completed. Beating your previous best percentage is the core goal on each stage.' },
      { q: 'Is Rolling Sky free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Vex-6': {
    longdesc: `Vex 6 is another entry in the acclaimed Vex stickman platformer series, delivering the razor-precise movement and deadly obstacle courses the series is known for. You run a stick figure through side-scrolling Acts studded with buzzsaws, spikes, crushers, water pools and split-second timing gates, using the full Vex kit — run, jump, wall-slide, wall-jump, swim and slide — to slip through each trap by a hair's breadth.

The series' signature is the quality of its controls. Movement is tight and perfectly consistent, so every death feels fair — a puzzle you can solve rather than a cheap shot — and that fairness is what fuels the relentless "one more try" loop. Frequent checkpoints keep the pain manageable: a mistake sets you back a few seconds, not the whole Act, so even the hardest stretches stay motivating.

Vex 6 chains its mechanics aggressively, stringing slides into jumps into wall-climbs in sequences that demand you switch techniques without breaking rhythm. The clean, readable art lets you scan an obstacle run before committing, so mastering a stage becomes about learning the pattern and refining your timing until you flow straight through what once looked impossible.

As always, the main Acts are only half the game. Vex 6 keeps the series' brutal optional Challenge stages — standalone levels with sparse checkpoints and merciless timing built to test total command of the movement. Clearing them is a genuine badge of skill and a favourite pursuit of speedrunners.

Vex 6 comes from Amazing Adam, the creator of the series. Play it unblocked at UBGHyper free in your browser. For more, Vex 3, Vex 5, Vex 7, Vex 8 and OvO deliver the same precision-platformer thrill.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong>: Up/W jump, Left/Right run, Down/S slide and drop through thin platforms. Fall against a wall to wall-slide, then jump to wall-jump. Tap jump to swim upward through water. It\'s all keyboard — no mouse needed.`,
    tips: [
      'Drill the wall-jump rhythm — the toughest Acts are vertical shafts cleared with fast alternating wall-jumps.',
      'Carry momentum into gaps; a running or sliding start clears jumps a standing leap falls short of.',
      'Slide (Down) under saws and low ceilings — standing through them is an instant death.',
      'Save the Challenge stages for after the Acts; they assume total command of every movement.',
    ],
    faqs: [
      { q: 'Who made Vex 6?', a: 'Vex 6 comes from Amazing Adam, the developer of the Vex platformer series. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Do I need to play the earlier Vex games first?', a: 'No — Vex 6 stands alone and teaches its mechanics as you go. Prior entries just mean you already know the tight, consistent controls.' },
      { q: 'What are the Challenge stages in Vex 6?', a: 'Optional levels separate from the main Acts, with few checkpoints and tough timing. They\'re a mastery test for experienced players and speedrunners.' },
      { q: 'Why do I keep failing wall-jumps?', a: 'Hold toward the wall to cling, then tap jump. Pressing away too early drops you — keep the direction held into the wall until the instant you jump.' },
      { q: 'Is Vex 6 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Bad-Ice-Cream': {
    longdesc: `Bad Ice Cream is a top-down arcade maze game about a determined little ice cream cone with a mission: collect all the fruit on each level without getting caught by roaming enemies. Its clever twist is that you can create and destroy ice blocks to shape the maze itself — freezing walls to trap or block foes, then smashing them to open new paths. It's Pac-Man crossed with a puzzle, and it's endlessly moreish.

The core loop is beautifully simple. Each level scatters fruit across a grid patrolled by enemies with different movement patterns. You glide around gathering fruit, but the enemies force you to think ahead: do you wall off a threatening pursuer with a line of ice, or clear a block to make a shortcut? Getting greedy and cornering yourself is the classic Bad Ice Cream death, so smart block management is everything.

Its real magic is co-op. Bad Ice Cream supports two players on one keyboard, and playing with a friend turns it into a genuine teamwork puzzle — coordinating who blocks the enemies and who grabs the fruit, and occasionally trapping each other for a laugh. Solo play is a satisfying single-player puzzle; two-player is where it becomes a couch classic.

Levels ramp up steadily, introducing tougher enemy types, trickier fruit placements, and mazes that demand careful planning. It's approachable for kids and quietly strategic for everyone, which is why it's stayed a school-computer staple for years and spawned several sequels.

Bad Ice Cream was made by Nitrome. Play it unblocked at UBGHyper free in your browser — solo or two-player. For more arcade puzzling, try Fireboy and Watergirl and Cut the Rope.`,
    controls: `<strong>Player 1:</strong> <strong>arrow keys</strong> to move; the ice cream automatically makes or breaks ice in the direction you\'re facing (press toward a block to break it, or into empty space to build). <strong>Player 2:</strong> <strong>WASD</strong>. Collect all the fruit on a level while avoiding enemies to advance.`,
    tips: [
      'Use ice walls to box in or block enemies before grabbing fruit in a dangerous corner.',
      'Never wall yourself into a dead end — always leave an escape route when you build.',
      'Learn each enemy\'s movement pattern so you can predict where it\'s safe to go.',
      'Play two-player and split roles: one person manages enemies while the other collects fruit.',
    ],
    faqs: [
      { q: 'How do you play Bad Ice Cream?', a: 'You move an ice cream around a maze collecting all the fruit while avoiding enemies. You can build and break ice blocks to block foes and open paths, which is the key strategic mechanic.' },
      { q: 'Who made Bad Ice Cream?', a: 'Bad Ice Cream was made by Nitrome. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Can you play Bad Ice Cream with two players?', a: 'Yes — it supports two players on one keyboard (arrow keys and WASD), and co-op teamwork is where the game really shines.' },
      { q: 'What\'s the goal in Bad Ice Cream?', a: 'Collect every piece of fruit on each level without being caught by the enemies. Managing your ice blocks to control the maze is how you survive the harder stages.' },
      { q: 'Is Bad Ice Cream free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, runs in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Duck-Life-4': {
    longdesc: `Duck Life 4 is the polished, expanded sequel in the beloved raise-and-race series, where you train a humble duckling into an all-conquering champion. The formula that made the series a hit is all here — train your duck's skills through quick mini-games, then enter races to win prize money and climb toward the championship — but Duck Life 4 refines it with smoother presentation, new content, and the series' signature climbing skill alongside running, flying and swimming.

Training is the heart of it. Each discipline has its own score-based mini-game: dodge obstacles while running, weave through the air while flying, avoid hazards while swimming, and scale walls while climbing. The points you rack up convert straight into stat gains, and because races test every skill in sequence, you have to develop your duck across all of them — a weakness in one discipline will cost you the race in that section.

The progression hook is as strong as ever. Early races are cheap and gentle; win them and you unlock tougher circuits with bigger purses and stiffer competition. You spend your winnings on food that boosts training efficiency and on upgrades, steadily transforming your once-hopeless duckling into an unbeatable racer. Watching that growth curve — from flailing beginner to champion — is deeply satisfying.

Duck Life 4 keeps everything approachable and forgiving, with quick sessions that fit neatly between classes and a "just one more race" pull that's hard to resist. It's the ideal entry point for the series and a comfort-food classic of browser gaming.

Duck Life 4 was made by MoFunZone. Play it unblocked at UBGHyper free in your browser. If you enjoy it, the original Duck Life offers the same train-and-race loop.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong> during the training mini-games and races: jump or dodge in running, steer up and down in flying, avoid hazards in swimming, and climb in the climbing game. Use the <strong>mouse</strong> in menus to enter races, buy food, and manage upgrades.`,
    tips: [
      'Train all four skills — running, flying, swimming and climbing — because races test each in turn.',
      'Buy food with your winnings; better food makes every training session raise stats faster.',
      'Grind training until your stats comfortably clear a circuit before entering its races.',
      'Reinvest prize money early; a small stat lead snowballs into easy wins on later tracks.',
    ],
    faqs: [
      { q: 'Who made Duck Life 4?', a: 'Duck Life 4 was developed by MoFunZone. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'What\'s new in Duck Life 4?', a: 'It refines the series with smoother presentation and new content, and features the full set of skills — running, flying, swimming and climbing — that races test in sequence.' },
      { q: 'How do you win races in Duck Life 4?', a: 'Train every skill so your duck is strong across running, flying, swimming and climbing, since a weakness in any one loses you that section of the race. Buy food to speed up training.' },
      { q: 'Do I need to play the earlier Duck Life games first?', a: 'No — Duck Life 4 stands alone and is a great starting point. The train-and-race loop is easy to pick up from scratch.' },
      { q: 'Is Duck Life 4 free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },

  'Jelly-Truck': {
    longdesc: `Jelly Truck is a physics-driving game with one delightfully silly gimmick: everything, including your truck, is made of jelly. Your wobbly vehicle squishes, stretches, and bounces its way through a series of obstacle courses set in a soft, deformable world, and getting to the finish line means wrestling with physics that never quite behave the way a solid truck would. It's part driving challenge, part comedy.

The jelly physics are the whole appeal. Your truck deforms on every bump and landing, its floppy body absorbing impacts and flopping over obstacles, so control is a constant, funny negotiation between throttle and balance. Push too hard up a slope and your truck folds like a rubber toy; take a jump wrong and it lands in a jiggling heap. Learning to drive a vehicle with no rigidity — timing your acceleration so the wobble works for you rather than against you — is a genuinely novel skill.

Levels string together ramps, gaps, hills, and hazards that escalate in difficulty, demanding more precise control of your bouncy truck as you go. Flip over or fall into a pit and you restart from a checkpoint, so the game stays about experimentation rather than frustration. There's a real sense of accomplishment in smoothly guiding a blob of jelly across a course that kept flipping you a few tries ago.

It's short-session friendly, instantly restartable, and consistently amusing — the kind of physics toy you dip into for a few laughs and end up playing far longer than intended.

Jelly Truck was made by Gametornado. Play it unblocked at UBGHyper free in your browser. For more physics driving, try Drive Mad and Jelly Drift.`,
    controls: `<strong>Arrow keys</strong> or <strong>WASD</strong>: Up/W to accelerate, Down/S to reverse or brake, Left/Right to lean and balance the truck. The jelly physics mean throttle control and balance matter far more than raw speed — ease into slopes and jumps rather than flooring it.`,
    tips: [
      'Feather the throttle — flooring it makes the jelly truck fold and flip instead of climbing.',
      'Lean with Left/Right in the air to land wheels-down after jumps.',
      'Take slopes with steady, gentle acceleration so the wobble works with you, not against you.',
      'Use checkpoints as a cue to slow down; the hardest bits usually follow right after one.',
    ],
    faqs: [
      { q: 'How do you play Jelly Truck?', a: 'You drive a wobbly, jelly-physics truck through obstacle courses, reaching the finish without flipping over or falling. The deformable truck makes throttle control and balance the core challenge.' },
      { q: 'Who made Jelly Truck?', a: 'Jelly Truck was developed by Gametornado. UBGHyper hosts the free browser version, playable unblocked with no download.' },
      { q: 'Why does my truck keep flipping in Jelly Truck?', a: 'Because it\'s made of jelly, hard acceleration makes it fold and roll. Ease into slopes and jumps with gentle throttle and lean to keep it upright.' },
      { q: 'What games are like Jelly Truck?', a: 'Drive Mad (physics driving puzzles) and Jelly Drift are close cousins — same physics-driving fun with their own twists.' },
      { q: 'Is Jelly Truck free and unblocked at school?', a: 'Yes — it\'s free at UBGHyper, plays in the browser with no install, and works on school Chromebooks.' },
    ],
  },


  // -- batch 2026-10-17: most-viewed pages that only had auto-generated text --

  'Geometry-Dash-Lite': {
    longdesc: `Geometry Dash Lite is the free version of RobTop Games' rhythm platformer, and it is one of the most-played games on UBGHyper. You guide a small square through levels built to the beat of their soundtrack: spikes, pits, moving blocks and portals come at you in time with the music, and one touch ends the attempt.

The whole game runs on a single input. Tap to jump, hold to keep jumping, and learn each level until the rhythm is in your hands. Portals change the rules mid-level: your cube can turn into a ship that flies while you hold, a ball that flips gravity, or other forms with their own movement, and speed portals push the pace up or down without warning.

What keeps players coming back is how fair it feels. Every death is visible and every section can be learned, so a level that looked impossible on attempt one becomes a run you can do on attempt fifty. Practice mode lets you place checkpoints and drill a hard section before trying it clean.

Geometry Dash Lite starts with Stereo Madness and gets harder level by level. Play it unblocked at UBGHyper, free in your browser with no download, and try Space Waves or OvO next if you like precise one-button games.`,
    controls: `<strong>Click</strong>, <strong>Space</strong> or <strong>Up arrow</strong>: jump (hold to keep jumping, or to fly as the ship). That is the only control. Use <strong>Practice mode</strong> to place checkpoints while you learn a level.`,
    tips: [
      'Listen to the music: most jumps land on the beat, so the song tells you when to press.',
      'Use Practice mode to learn the hardest section of a level before attempting a full run.',
      'In ship sections, use small taps rather than holding, so you do not overshoot into the ceiling.',
      'Watch for speed portals: the timing you learned before one is wrong after it.',
    ],
    faqs: [
      { q: 'Is Geometry Dash Lite free?', a: 'Yes. Geometry Dash Lite is the free version of Geometry Dash by RobTop Games, and it is free to play on UBGHyper with no download or sign-up.' },
      { q: 'What are the controls in Geometry Dash Lite?', a: 'One button. Click, press Space or press the Up arrow to jump, and hold it to keep jumping or to fly in ship sections.' },
      { q: 'What is Practice mode?', a: 'Practice mode lets you place checkpoints, so you can respawn partway through a level and practise the hard parts before trying it in one go.' },
      { q: 'Who made Geometry Dash?', a: 'Geometry Dash was made by RobTop Games (Robert Topala). Geometry Dash Lite is its free edition.' },
      { q: 'What games are like Geometry Dash Lite?', a: 'Try Space Waves, OvO, Slope and The World\'s Hardest Game on UBGHyper if you like fast, precise one-button challenges.' },
    ],
  },

  'Ragdoll-Archers': {
    longdesc: `Ragdoll Archers is a physics archery duel from Ericetto, the developer of Ragdoll Hit and Ragdoll Drop. Two floppy stick figures stand apart with bows, and you take turns firing arrows until one of you goes down. The ragdoll physics are the joke and the challenge: hits knock your archer around, limbs flail, and a well-placed arrow can end a round on its own.

Aiming is all about angle and power. Pull back to set how hard you shoot, adjust the angle, and account for the arc of the arrow over the distance. Headshots hit harder than body shots, so a careful aim beats firing quickly. Between rounds you can improve your archer, so a long run gets steadily stronger.

You can play against the computer or against a friend on the same device, which makes it one of the go-to two-player games on UBGHyper. Rounds are short, so it is easy to play a few between classes.

Play Ragdoll Archers unblocked at UBGHyper, free with no download, then try Ragdoll Hit for close-up ragdoll fights.`,
    controls: `<strong>Click/tap and drag</strong> to aim and set the power, then <strong>release</strong> to shoot. In two-player mode, players take turns on the same device.`,
    tips: [
      'Aim slightly above the target at long range: arrows drop over distance.',
      'Go for the head when you can; it does more damage than a body hit.',
      'Do not rush your shot. A slower, steadier aim wins more rounds than fast shooting.',
      'Spend your upgrades between rounds instead of saving them.',
    ],
    faqs: [
      { q: 'Who made Ragdoll Archers?', a: 'Ragdoll Archers was made by Ericetto, the same developer behind Ragdoll Hit and Ragdoll Drop.' },
      { q: 'Can you play Ragdoll Archers with two players?', a: 'Yes. Ragdoll Archers has a two-player mode where you and a friend take turns on the same device, as well as a mode against the computer.' },
      { q: 'How do you aim in Ragdoll Archers?', a: 'Drag to set the angle and power of your shot, then release. Longer shots need a higher angle because arrows fall over distance.' },
      { q: 'Is Ragdoll Archers free on UBGHyper?', a: 'Yes, it is free to play in your browser with no download or account.' },
      { q: 'What games are like Ragdoll Archers?', a: 'Try Ragdoll Hit, Ragdoll Drop, Stickman Duel and Rooftop Snipers on UBGHyper.' },
    ],
  },

  'Magic-Tiles-3': {
    longdesc: `Magic Tiles 3 is AmaNotes' piano rhythm game. Black tiles scroll down the screen in time with a song, and you tap each one as it reaches you. Tap a white space or let a black tile slip past and the song stops.

It starts gently and speeds up as the song goes on, so the real test is staying accurate as the tempo climbs. Long tiles have to be held for their full length rather than tapped, and songs mix single notes with fast runs that need two fingers or two keys.

The song library ranges from classical pieces to modern pop, and finishing a song well earns stars and crowns. Because each attempt is one song long, it is easy to pick up for a few minutes.

Play Magic Tiles 3 unblocked at UBGHyper, free in your browser with no download. This copy has had its third-party ads removed. If you like rhythm games, try Friday Night Funkin and A Dance of Fire and Ice next.`,
    controls: `<strong>Click</strong> or <strong>tap</strong> each black tile as it reaches the bottom. <strong>Hold</strong> long tiles until they end. Never tap the white spaces.`,
    tips: [
      'Watch the bottom of the screen, not the top: react to tiles as they arrive.',
      'Hold long tiles all the way through; letting go early counts as a miss.',
      'Use two fingers (or two keys) for fast runs instead of one finger jumping between lanes.',
      'Learn a song at its start; the second half is faster but uses the same rhythm.',
    ],
    faqs: [
      { q: 'Who made Magic Tiles 3?', a: 'Magic Tiles 3 was made by AmaNotes.' },
      { q: 'How do you play Magic Tiles 3?', a: 'Tap the black tiles as they scroll down, hold the long ones, and never tap a white space. Missing a tile ends the song.' },
      { q: 'Is Magic Tiles 3 free on UBGHyper?', a: 'Yes. It is free in your browser with no download, and this version has had its third-party ads removed.' },
      { q: 'Does Magic Tiles 3 work on a Chromebook?', a: 'Yes. It runs in the browser on Chromebooks, and you can play with the mouse, the touchpad or a touchscreen.' },
      { q: 'What games are like Magic Tiles 3?', a: 'Try Friday Night Funkin, A Dance of Fire and Ice and Geometry Dash Lite on UBGHyper.' },
    ],
  },

  'Brotato': {
    longdesc: `Brotato is a top-down arena shooter roguelite by Blobfish. You play a potato holding up to six weapons at once, fighting off waves of aliens in a small arena. Your weapons fire on their own, so your job is movement: dodge, kite enemies into your line of fire, and pick up the materials they drop.

Each wave lasts a set time, and between waves you visit a shop. Materials buy new weapons, upgrades and items, and you choose stat upgrades when you level up. Combining weapons of the same type upgrades them to a higher tier. A run is 20 waves, ending in a boss fight, and every run plays differently depending on what the shop offers.

Characters change everything. Each potato has its own traits, strengths and drawbacks, which push you towards different builds: melee brawlers, ranged turrets, glass cannons and odd challenge characters. Finding a build that works for each one is most of the fun.

Brotato is a web port of the full game, free to play unblocked at UBGHyper with no download.`,
    controls: `<strong>WASD</strong> or <strong>arrow keys</strong>: move. Weapons aim and fire automatically. Use the <strong>mouse</strong> in the shop and level-up screens.`,
    tips: [
      'Keep moving in wide circles; standing still is how runs end.',
      'Collect materials before a wave ends: anything left on the ground at the end of the wave is lost.',
      'Combine duplicate weapons to raise their tier instead of filling every slot with different ones.',
      'Pick a direction for your build (melee, ranged, elemental) and shop for it.',
    ],
    faqs: [
      { q: 'Who made Brotato?', a: 'Brotato was made by Blobfish. The version on UBGHyper is a web port.' },
      { q: 'How many waves are in a Brotato run?', a: 'A normal run is 20 waves, with a boss at the end.' },
      { q: 'Do you aim in Brotato?', a: 'No. Your weapons aim and fire automatically; you only control movement and what you buy between waves.' },
      { q: 'How many weapons can you hold in Brotato?', a: 'Most characters can hold up to six weapons at once.' },
      { q: 'What games are like Brotato?', a: 'Try 10 Minutes Till Dawn, Boxhead and Zombotron on UBGHyper.' },
    ],
  },

  'Golf-Orbit': {
    longdesc: `Golf Orbit is a one-button distance golf game from Pinpin Team. You time your swing to hit the ball as far as you possibly can, and a good shot keeps flying over hills, water and eventually into space.

The game is about timing. Stop the power meter in the right spot and the ball takes off; mistime it and it dribbles away. Coins from each shot buy upgrades to your golfer's strength, speed and bounce, so every round goes further than the last. Hit a hole far enough and you unlock a new golfer.

It is quick to learn and hard to put down, because the next upgrade is always one shot away.

Play Golf Orbit unblocked at UBGHyper, free in your browser with no download. This copy has had its third-party ad SDK removed. For more golf, try Golf Battle.`,
    controls: `<strong>Click</strong> or <strong>tap</strong> to swing, timing it to stop the power meter in the best spot. Use the <strong>mouse</strong> to buy upgrades.`,
    tips: [
      'Spend coins after every few shots; small upgrades add up quickly.',
      'Raise strength and speed first for distance, then bounce to keep the ball rolling.',
      'Aim for consistent timing rather than perfect timing; a steady good shot beats a risky perfect one.',
      'Watch the distance needed to unlock the next golfer and save upgrades to reach it.',
    ],
    faqs: [
      { q: 'Who made Golf Orbit?', a: 'Golf Orbit was made by Pinpin Team.' },
      { q: 'How do you play Golf Orbit?', a: 'Time your swing to hit the ball as far as possible, then spend the coins you earn on strength, speed and bounce upgrades.' },
      { q: 'How do you unlock new golfers in Golf Orbit?', a: 'Hitting a hole far enough unlocks a new golfer; the game shows the distance you need.' },
      { q: 'Is Golf Orbit free on UBGHyper?', a: 'Yes. It is free in your browser with no download, and its third-party ad SDK has been removed.' },
      { q: 'What games are like Golf Orbit?', a: 'Try Golf Battle, Learn to Fly and Burrito Bison on UBGHyper.' },
    ],
  },

  'Angry-Birds-2': {
    longdesc: `Angry Birds 2 is Rovio Entertainment's sequel to its slingshot classic. Fling birds at structures built by the pigs, bring the towers down and pop every pig in the level.

The sequel's big change is multi-stage levels: most levels have several rooms in a row, and you carry your birds from one stage to the next, so wasting a bird early can leave you short later. You choose which bird to fire next from a hand of cards, so you can match the right bird to each structure: some split, some speed up, some explode.

Spells add another option, from extra damage to effects that change the whole stage, and boss pigs appear at key points. The physics are what make it work: hitting the weak point of a tower can bring the whole thing down with one shot.

Play Angry Birds 2 unblocked at UBGHyper as a free web port with no download.`,
    controls: `<strong>Click and drag</strong> the slingshot back to aim, <strong>release</strong> to fire. <strong>Click again</strong> while a bird is flying to use its ability. Choose your next bird from the cards.`,
    tips: [
      'Look for the support beams and weak points; a toppled tower does more than a direct hit.',
      'Save your strongest birds for the later stages of a level.',
      'Use each bird\'s ability at the right moment, usually just before impact.',
      'Spells are best for the final stage, where you might otherwise run out of birds.',
    ],
    faqs: [
      { q: 'Who made Angry Birds 2?', a: 'Angry Birds 2 was made by Rovio Entertainment. The version on UBGHyper is a web port.' },
      { q: 'What is different about Angry Birds 2?', a: 'Levels have several stages in a row, you choose which bird to fire from a hand of cards, and spells add special effects.' },
      { q: 'How do you use a bird\'s ability?', a: 'Click or tap again while the bird is in the air.' },
      { q: 'Is Angry Birds 2 free on UBGHyper?', a: 'Yes. It plays free in your browser with no download or account.' },
      { q: 'What games are like Angry Birds 2?', a: 'Try Angry Birds Epic, Crush the Castle and Cut the Rope on UBGHyper.' },
    ],
  },

  'Ragdoll-Hit': {
    longdesc: `Ragdoll Hit is a physics fighting game from Ericetto. Two stick figures face off and swing at each other with ragdoll physics, so every punch, kick and weapon hit sends limbs flying in unpredictable directions.

Fights are short and chaotic. You move, attack and try to land the hit that knocks your opponent down, while their wild swings come right back at you. Winning earns coins, and the shop has weapons and skins to unlock, from bats to blades, which changes how each fight plays.

You can fight the computer or a friend on the same device, which makes it one of the best quick two-player games on UBGHyper.

Play Ragdoll Hit unblocked at UBGHyper, free in your browser with no download. If you like it, Ericetto also made Ragdoll Archers and Ragdoll Drop.`,
    controls: `Use the on-screen buttons or the <strong>keys shown in the game</strong> to move and attack. In two-player mode, each player gets their own controls on the same device.`,
    tips: [
      'Attack when your opponent is off balance after a swing.',
      'Try each weapon: reach and weight change how fights play.',
      'Do not spam attacks; well-timed hits land harder than flailing.',
      'Spend coins on a weapon you like rather than saving them.',
    ],
    faqs: [
      { q: 'Who made Ragdoll Hit?', a: 'Ragdoll Hit was made by Ericetto, who also made Ragdoll Archers and Ragdoll Drop.' },
      { q: 'Can you play Ragdoll Hit with two players?', a: 'Yes. Ragdoll Hit has a two-player mode on the same device as well as fights against the computer.' },
      { q: 'How do you unlock weapons in Ragdoll Hit?', a: 'Win fights to earn coins, then buy weapons and skins in the shop.' },
      { q: 'Is Ragdoll Hit free on UBGHyper?', a: 'Yes. It plays free in your browser with no download, and its third-party ad SDK has been removed.' },
      { q: 'What games are like Ragdoll Hit?', a: 'Try Ragdoll Archers, Ragdoll Drop, Stickman Duel and Karate Bros on UBGHyper.' },
    ],
  },

  'Mob-control': {
    longdesc: `Mob Control is a crowd-shooting strategy game from Voodoo. A cannon at the bottom of the screen fires a stream of little figures up the field, and your goal is to overwhelm the enemy base at the top before their crowd overwhelms you.

The trick is the gates. Sending your crowd through a multiplier gate turns a handful into dozens, so aiming the stream through the right gates is what wins. Moving obstacles and enemy crowds thin your numbers on the way, and some levels put the gates where they are hard to reach.

Between levels you upgrade your cannon and unlock stronger units, including big champions that soak up damage and break through defences.

Play Mob Control unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Hold</strong> the mouse button (or your finger) to fire and <strong>drag left and right</strong> to aim the stream of units through the gates.`,
    tips: [
      'Always aim through multiplier gates; they matter more than raw firing time.',
      'Sweep the stream across the field to hit several gates in one pass.',
      'Use champion units to push through heavy defences.',
      'Upgrade the cannon\'s firing rate early; everything else builds on it.',
    ],
    faqs: [
      { q: 'Who made Mob Control?', a: 'Mob Control was made by Voodoo.' },
      { q: 'How do you play Mob Control?', a: 'Fire a stream of units from your cannon, steer them through multiplier gates to grow the crowd, and overrun the enemy base.' },
      { q: 'What do the gates do in Mob Control?', a: 'Gates multiply the units that pass through them, so aiming through them is the key to winning.' },
      { q: 'Is Mob Control free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
      { q: 'What games are like Mob Control?', a: 'Try Count Masters, Bloons TD 5 and Age of War on UBGHyper.' },
    ],
  },

  'Uno': {
    longdesc: `Uno is the classic colour-and-number card game, playable in your browser against computer opponents. The goal is simple: be the first player to get rid of every card in your hand.

On your turn, play a card that matches the top card of the pile by colour or by number. If you cannot, draw a card. Action cards change the game: Skip makes the next player miss a turn, Reverse changes the direction of play, Draw Two forces the next player to pick up two cards, and Wild cards let you choose the colour, with Wild Draw Four also making the next player draw four.

When you are down to one card, you have to call "Uno", or you risk being caught and drawing extra cards. Games are quick, easy to learn and easy to play in a short break.

Play Uno unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Click</strong> a card to play it, or click the <strong>draw pile</strong> if you have nothing to play. Click the <strong>Uno</strong> button when you have one card left.`,
    tips: [
      'Hold on to Wild cards for when you have no other move.',
      'Save Draw Two and Skip cards for when the next player is close to winning.',
      'Change the colour to one the next player does not seem to have.',
      'Do not forget to call Uno on your second-to-last card.',
    ],
    faqs: [
      { q: 'How do you win at Uno?', a: 'Be the first player to play every card in your hand.' },
      { q: 'What do the Uno action cards do?', a: 'Skip skips the next player, Reverse changes direction, Draw Two makes the next player draw two, Wild lets you pick the colour, and Wild Draw Four also makes the next player draw four.' },
      { q: 'When do you say Uno?', a: 'When you have one card left. If you forget and get caught, you have to draw extra cards.' },
      { q: 'Is Uno free on UBGHyper?', a: 'Yes. You can play Uno free in your browser with no download.' },
      { q: 'What other card games are on UBGHyper?', a: 'Try Blackjack and Chess Classic on UBGHyper.' },
    ],
  },

  'FNAF-4': {
    longdesc: `Five Nights at Freddy's 4 is the fourth game in Scott Cawthon's horror series, and it moves the scares out of the pizzeria and into a child's bedroom. There are no security cameras this time. You have a flashlight, two doors, a closet and the bed behind you, and you have to survive each night until 6 AM.

Nightmare versions of the animatronics creep towards you from the hallways, the closet and the bed. Sound is your most important tool: before you shine the flashlight down a hallway, hold the door and listen for breathing. If something is there, shining the light gives you away, so you close the door and wait instead. The closet and the bed have their own threats to check.

Between nights, short minigames tell part of the series' story.

Play Five Nights at Freddy's 4 unblocked at UBGHyper, free in your browser with no download. Headphones help, because so much of the game depends on hearing.`,
    controls: `<strong>Click</strong> to move to the doors, closet and bed. At a door, <strong>hold</strong> to close it and <strong>use the flashlight</strong> to check the hallway. Use the <strong>mouse</strong> to look around the room.`,
    tips: [
      'Play with headphones and the sound up; breathing at a door means do not use the light.',
      'At a door, listen first, then close the door if you hear breathing, before using the light.',
      'Check the bed and the closet regularly.',
      'Stay calm and keep a routine: doors, closet, bed, repeat.',
    ],
    faqs: [
      { q: 'Who made Five Nights at Freddy\'s 4?', a: 'Five Nights at Freddy\'s 4 was made by Scott Cawthon.' },
      { q: 'How is FNAF 4 different from the other games?', a: 'There are no cameras. You defend a child\'s bedroom with a flashlight, two doors, a closet and the bed, and listening for breathing is the main mechanic.' },
      { q: 'How do you survive in FNAF 4?', a: 'Listen at each door before using the flashlight. If you hear breathing, close the door instead of shining the light, and keep checking the closet and the bed.' },
      { q: 'Is FNAF 4 free on UBGHyper?', a: 'Yes. You can play it free in your browser with no download.' },
      { q: 'What other FNAF games are on UBGHyper?', a: 'UBGHyper also has Five Nights at Freddy\'s 1, 2 and 3, Sister Location, Pizzeria Simulator, Ultimate Custom Night and FNAF World.' },
    ],
  },

  'Friday-Night-Funkin': {
    longdesc: `Friday Night Funkin' is a rhythm game made by ninjamuffin99, PhantomArcade, evilsk8r and kawaisprite. You play as Boyfriend, who has to win singing battles against a string of opponents, starting with his girlfriend's father, to keep dating her.

Each song is a battle. Arrows scroll up the screen, and you hit the matching arrow key as each one reaches the top. Hold notes have to be held to the end, and missing too many notes loses you the song. The story is split into weeks, each with its own opponent and songs, and Freeplay lets you replay any song you have unlocked. You can raise the difficulty for faster, denser charts.

Its open-source code led to a huge modding scene, which is why so many FNF mods exist, including several on UBGHyper.

Play Friday Night Funkin' unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong> or <strong>W A S D</strong>: hit the matching notes. <strong>Enter</strong>: confirm and pause.`,
    tips: [
      'Look at the target arrows at the top, not the notes coming up.',
      'Use WASD and the arrow keys at the same time to split the work between two hands.',
      'Practise a hard song in Freeplay before the story week.',
      'Hold notes until the trail ends; letting go early is a miss.',
    ],
    faqs: [
      { q: 'Who made Friday Night Funkin\'?', a: 'Friday Night Funkin\' was made by ninjamuffin99, PhantomArcade, evilsk8r and kawaisprite.' },
      { q: 'How do you play Friday Night Funkin\'?', a: 'Press the matching arrow (or WASD) key as each note reaches the top of the screen. Missing too many notes loses the song.' },
      { q: 'What are weeks in FNF?', a: 'The story is split into weeks, each with its own opponent and songs. Freeplay lets you replay any song you have unlocked.' },
      { q: 'Are there FNF mods on UBGHyper?', a: 'Yes. UBGHyper has several, including Indie Cross, FNF vs Shaggy, FNF vs Tricky and Psych Engine.' },
      { q: 'Is Friday Night Funkin\' free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'Football-Bros': {
    longdesc: `Football Bros is an American football game from Blue Wizard Digital, the studio behind Basket Bros and Soccer Bros. Matches are short and arcade-style: big hits, long passes and quick drives instead of a full simulation.

You can play solo against the computer, play a friend on the same computer, or play online. On offence you run, pass and break tackles; on defence you go for the hit that stops the drive. The cartoon players and short matches make it easy to jump in, while timing your passes and reading the defence is what wins games.

Football Bros is one of several Bros sports games on UBGHyper, alongside Basket Bros, Soccer Bros and Baseball Bros.

Play Football Bros unblocked at UBGHyper, free in your browser with no download. This copy has had its third-party ad tag removed.`,
    controls: `Use the <strong>keys shown in the game's controls menu</strong> to move, pass and tackle. In two-player mode on one computer, each player has their own keys.`,
    tips: [
      'Throw to the receiver with space around them, not the closest one.',
      'On defence, time your hits; a missed tackle often means a long gain.',
      'Use short passes to move the ball when long ones are covered.',
      'Learn one play you trust and use it on key downs.',
    ],
    faqs: [
      { q: 'Who made Football Bros?', a: 'Football Bros was made by Blue Wizard Digital, who also made Basket Bros and Soccer Bros.' },
      { q: 'Can you play Football Bros with two players?', a: 'Yes. You can play a friend on the same computer, play against the computer, or play online.' },
      { q: 'Is Football Bros free on UBGHyper?', a: 'Yes. It plays free in your browser with no download, and its third-party ad tag has been removed.' },
      { q: 'Does Football Bros work on a Chromebook?', a: 'Yes. It runs in the browser on Chromebooks.' },
      { q: 'What games are like Football Bros?', a: 'Try Basket Bros, Soccer Bros, Baseball Bros and Retro Bowl on UBGHyper.' },
    ],
  },

  'Thats-Not-My-Neighbor': {
    longdesc: `That's Not My Neighbor is an indie horror game. You work as the doorman of an apartment building, and some of the people asking to come in are not who they say they are. Doppelgangers are trying to get in, disguised as residents.

Your job is to check every visitor before you open the door. Compare their face and details with their documents and the building's records, and look for anything that does not match: a wrong detail on an ID, a name that is not on the list, something slightly off about their face. Let a doppelganger in and things go badly. Turn away too many real residents and you have other problems.

The tension builds as the days go on: more visitors, smaller differences and less time to decide.

Play That's Not My Neighbor unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Click</strong> to look at documents, check records and decide whether to <strong>let the visitor in</strong> or turn them away.`,
    tips: [
      'Check every document, every time, even for visitors you have seen before.',
      'Compare small details: dates, names and anything on the ID that does not match.',
      'Look closely at faces; doppelgangers are often just slightly off.',
      'When unsure, check the records before deciding.',
    ],
    faqs: [
      { q: 'How do you play That\'s Not My Neighbor?', a: 'As the doorman, check each visitor\'s face and documents against the building\'s records, and keep doppelgangers out.' },
      { q: 'How do you spot a doppelganger?', a: 'Look for anything that does not match: details on their documents, names missing from the records, or something unusual about their face.' },
      { q: 'Is That\'s Not My Neighbor scary?', a: 'It is a tense horror game with some jump scares, but most of it is careful checking rather than action.' },
      { q: 'What games are like That\'s Not My Neighbor?', a: 'Try Fears to Fathom, Granny and the other games in the horror category on UBGHyper.' },
    ],
  },

  'Slow-Roads': {
    longdesc: `Slow Roads is a relaxing endless driving game. There is no race, no timer and no score to beat: just a road that is generated as you drive, winding through changing scenery for as long as you want to keep going.

You can drive yourself or switch on auto-drive and simply watch the landscape go by. Settings let you change the vehicle, the scenery, the time of day and the weather, and the soundtrack is built to be calm. It is designed to be a game you play to unwind rather than to win.

Because the road is generated as you go, no two drives are the same.

Play Slow Roads unblocked at UBGHyper, free in your browser with no download. If you want something faster, try Drift Hunters or Madalin Stunt Cars.`,
    controls: `<strong>W A S D</strong> or <strong>arrow keys</strong>: drive and steer. Use the in-game menu to switch on <strong>auto-drive</strong> and change the vehicle, scenery and weather.`,
    tips: [
      'Turn on auto-drive if you just want to relax and look at the scenery.',
      'Try different times of day and weather for a completely different drive.',
      'Lower the graphics settings if your Chromebook struggles.',
      'Use headphones for the soundtrack.',
    ],
    faqs: [
      { q: 'What is Slow Roads?', a: 'Slow Roads is a relaxing endless driving game where the road is generated as you drive. There is no race and no score.' },
      { q: 'Does Slow Roads have auto-drive?', a: 'Yes. You can switch on auto-drive and watch the scenery instead of steering.' },
      { q: 'Does Slow Roads ever end?', a: 'No. The road is generated as you go, so you can drive for as long as you like.' },
      { q: 'Is Slow Roads free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
      { q: 'What games are like Slow Roads?', a: 'Try Drift Hunters, Madalin Stunt Cars and 3D Car Simulator on UBGHyper.' },
    ],
  },
  'PVZ-Fusion': {
    longdesc: `Plants vs. Zombies Fusion is a fan-made mod of Plants vs. Zombies built around one idea: plant one plant on top of another and the two fuse into a hybrid. Each pair makes a new plant that mixes both abilities, and discovering which combinations are strong is most of the fun.

The rest will feel familiar. Collect sun, place plants on the lawn and stop each wave of zombies before they reach the house. Fusion adds its own levels and challenge modes on top of that, so there is plenty to work through even if you have finished the original.

The mod was made by LanPiaoPiao and this version's menus are in Chinese, but if you have played Plants vs. Zombies before, the seed packets, sun and lawn all work the way you expect.

Play Plants vs. Zombies Fusion unblocked at UBGHyper, free in your browser with no download. It is a fan project, not an official release.`,
    controls: `<strong>Mouse</strong>: click sun to collect it, pick a seed packet, then click the lawn to plant. Plant on top of a compatible plant to <strong>fuse</strong> them. Use the <strong>shovel</strong> to dig a plant up.`,
    tips: [
      'Try planting one plant on another: that is how you discover new fusions.',
      'Collect every bit of sun early so you can afford fusions when the big waves arrive.',
      'Hold your front line with a defensive plant before you spend on attackers.',
      'The menus are in Chinese, but levels, seed packets and sun work just like the original.',
    ],
    faqs: [
      { q: 'What is Plants vs. Zombies Fusion?', a: 'A fan-made mod of Plants vs. Zombies by LanPiaoPiao. Its big feature is fusing two plants into a hybrid by planting one on top of the other.' },
      { q: 'How do you fuse plants in PvZ Fusion?', a: 'Plant one plant on top of another compatible plant. If the pair has a fusion, they combine into a new hybrid with both abilities.' },
      { q: 'Is PvZ Fusion in English?', a: 'This version has Chinese menus. The gameplay is the same as Plants vs. Zombies, so it is easy to follow if you know the original.' },
      { q: 'Is Plants vs. Zombies Fusion an official game?', a: 'No. It is a fan-made mod, not an official Plants vs. Zombies release.' },
      { q: 'Is PvZ Fusion free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Among-Us': {
    longdesc: `Among Us is the social deduction game from Innersloth. A crew is keeping their ship running, but one or more of them is an Impostor. Crewmates win by finishing all of their tasks or by voting the Impostors out. Impostors win by sabotaging the ship and picking off the crew without getting caught.

Tasks are quick mini-games spread around the map: fixing wiring, swiping a card, fuelling the engines. When someone finds a body or calls an emergency meeting, everyone discusses what they saw and votes. Saying where you were, who you saw and who you can vouch for is how the crew finds the Impostor, and how a good Impostor talks their way out of it.

This is a web port of the full game. If you would rather play the original 2019 version, Among Us (Legacy) is on UBGHyper too.

Play Among Us unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>W A S D</strong> or <strong>arrow keys</strong>: move. <strong>E</strong> or click: use and do tasks. <strong>Q</strong>: kill (Impostor). <strong>R</strong>: report a body. <strong>Tab</strong>: open the map.`,
    tips: [
      'Do your tasks where other players can see you. It builds trust for later meetings.',
      'Keep an eye on vents: only Impostors can use them.',
      'In meetings, say where you were and who you saw, and listen for stories that do not add up.',
      'As Impostor, use sabotage to split the crew up before you strike.',
    ],
    faqs: [
      { q: 'What is Among Us?', a: 'A social deduction game by Innersloth. Crewmates do tasks and try to find the Impostors, while the Impostors sabotage the ship and try not to get caught.' },
      { q: 'How do Crewmates win in Among Us?', a: 'By finishing every task, or by voting out all of the Impostors in meetings.' },
      { q: 'How do Impostors win?', a: 'By eliminating enough Crewmates or letting a sabotage run out the clock, without being voted out.' },
      { q: 'What is the difference between Among Us and Among Us (Legacy)?', a: 'Among Us (Legacy) is the original 2019 version. This page is the web port of the full game.' },
      { q: 'Is Among Us free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Among-Us-Legacy': {
    longdesc: `Among Us (Legacy) is the original 2019 version of Innersloth's game, the one that became a worldwide hit. A crew is working on their ship, and somewhere among them is an Impostor.

As a Crewmate you move around the map doing small tasks and watching the others. As the Impostor you fake those tasks, slip through vents, sabotage the ship and take out Crewmates when nobody is looking. Whenever a body is reported or a meeting is called, everyone talks it through and votes on who to throw out.

If you want the newer version of the game, Among Us is also on UBGHyper.

Play Among Us (Legacy) unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>W A S D</strong> or <strong>arrow keys</strong>: move. <strong>E</strong> or click: use and do tasks. <strong>Q</strong>: kill (Impostor). <strong>R</strong>: report a body.`,
    tips: [
      'Stick with other players early so someone can vouch for you.',
      'Remember who was near a body when it was found.',
      'As Impostor, fake tasks at the right spots and leave before anyone gets suspicious.',
      'Do not vote too fast: a wrong ejection helps the Impostor.',
    ],
    faqs: [
      { q: 'What is Among Us (Legacy)?', a: 'The original 2019 version of Among Us by Innersloth, playable in your browser.' },
      { q: 'How is it different from the newer Among Us?', a: 'It is the classic version of the game. The newer web port is on UBGHyper as Among Us.' },
      { q: 'What does the Impostor do?', a: 'The Impostor sabotages the ship and eliminates Crewmates while trying not to be voted out.' },
      { q: 'Who made Among Us?', a: 'Innersloth.' },
      { q: 'Is Among Us (Legacy) free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Apotheon': {
    longdesc: `Apotheon is a 2D action game from Alientrap, set in a world drawn like the black-figure art on ancient Greek pottery. The gods of Olympus have abandoned humanity, and you play Nikandreos, a warrior who climbs Mount Olympus to take their powers for himself.

Combat is weighty and physical. You fight with spears, swords, axes, bows and shields, each with its own reach and timing, and weapons wear out as you use them, so you are always looting new ones. Along the way you face gods such as Apollo, Artemis, Ares and Hera, and each victory opens up more of Olympus.

It is a big, hand-crafted adventure with one of the most distinctive art styles of any action game.

Play Apotheon unblocked at UBGHyper, free in your browser with no download.`,
    controls: `Default PC controls: <strong>A / D</strong>: move. <strong>W</strong> or <strong>Space</strong>: jump. <strong>Mouse</strong>: aim. <strong>Left-click</strong>: attack. <strong>Right-click</strong>: block with your shield. Switch weapons with the <strong>number keys</strong> or <strong>mouse wheel</strong>.`,
    tips: [
      'Weapons break, so pick up everything and keep spares of your favourite type.',
      'Block with your shield and counter-attack instead of trading hits.',
      'Thrown spears and javelins are great for softening enemies up before they reach you.',
      'Explore side areas for better gear before you take on a god.',
    ],
    faqs: [
      { q: 'What is Apotheon?', a: 'A 2D action game by Alientrap where you climb Mount Olympus and fight the Greek gods, drawn in the style of ancient Greek pottery.' },
      { q: 'Who do you play as in Apotheon?', a: 'Nikandreos, a warrior who sets out to take the powers of the gods.' },
      { q: 'Do weapons break in Apotheon?', a: 'Yes. Weapons wear out with use, so you keep looting new ones.' },
      { q: 'Is Apotheon based on Greek mythology?', a: 'Yes. You face gods such as Apollo, Artemis, Ares and Hera on Mount Olympus.' },
      { q: 'Is Apotheon free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Baldis-Basics-The-Ultra-Decompile': {
    longdesc: `Baldi's Basics: The Ultra Decompile is a fan rebuild of Baldi's Basics, the cult horror parody of 90s educational games. You are stuck in Baldi's schoolhouse and need to collect seven notebooks to escape. Each notebook asks three maths questions, and as soon as you get one wrong, Baldi grabs his ruler and comes after you, getting faster with every mistake.

The rest of the school is just as strange. Playtime wants you to jump rope, the Principal sends you to detention for running in the halls, and It's a Bully blocks corridors until you hand over an item. Use what you find, like the BSODA, the energy bar and the door locks, to keep Baldi at bay and reach the exit.

The Ultra Decompile is a fan-made version built from the original game, not an official release.

Play Baldi's Basics: The Ultra Decompile unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>W A S D</strong>: move. <strong>Mouse</strong>: look. <strong>Left-click</strong>: open doors, pick up items and notebooks. <strong>Shift</strong>: run (uses stamina). <strong>Space</strong>: look behind you. <strong>Right-click</strong>: use the selected item.`,
    tips: [
      'Listen for the ruler slaps: the louder they are, the closer Baldi is.',
      'Do not run in front of the Principal or you will lose time in detention.',
      'Save your BSODA for when Baldi is right behind you.',
      'Learn the layout so you can plan a route between notebooks and exits.',
    ],
    faqs: [
      { q: 'How many notebooks are in Baldi\'s Basics?', a: 'Seven. Collect them all, then find an exit.' },
      { q: 'What happens if you get a question wrong?', a: 'Baldi starts chasing you, and he speeds up with every wrong answer.' },
      { q: 'What is the Ultra Decompile?', a: 'A fan rebuild of Baldi\'s Basics made from the original game. It is not an official release.' },
      { q: 'How do you look behind you in Baldi\'s Basics?', a: 'Hold Space to look back while you run.' },
      { q: 'Is Baldi\'s Basics free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Indie-Cross': {
    longdesc: `Indie Cross is one of the biggest Friday Night Funkin' mods. Boyfriend takes on characters from three indie games, Cuphead, Sans from Undertale and Bendy from Bendy and the Ink Machine, across three full weeks of original songs.

It is much more than a reskin. Each week adds its own mechanics on top of hitting the arrows: you dodge Cuphead's shots, survive Sans's attacks and deal with the ink in Bendy's week. The art and music are remade in the style of each game.

If you want more Funkin', Friday Night Funkin', FNF vs Tricky and FNF vs Shaggy are on UBGHyper too.

Play Indie Cross unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong> or <strong>D F J K</strong>: hit the notes. <strong>Space</strong>: dodge attacks. <strong>Enter</strong>: confirm. <strong>Esc</strong>: pause.`,
    tips: [
      'Watch for the warning before an attack and press Space to dodge in time.',
      'Learn each week on an easier difficulty before you try the harder charts.',
      'Do not mash: missing notes on purpose costs you health.',
      'Turn the music up. The cues are easier to read when you hear them.',
    ],
    faqs: [
      { q: 'What is Indie Cross?', a: 'A Friday Night Funkin\' mod with three weeks based on Cuphead, Undertale and Bendy and the Ink Machine.' },
      { q: 'How do you dodge in Indie Cross?', a: 'Press Space when an attack is coming.' },
      { q: 'Is Indie Cross an official FNF release?', a: 'No. It is a fan-made mod of Friday Night Funkin\'.' },
      { q: 'What games are like Indie Cross?', a: 'Try Friday Night Funkin\', FNF vs Tricky and FNF vs Shaggy on UBGHyper.' },
      { q: 'Is Indie Cross free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Escape-Road-City': {
    longdesc: `Escape Road City is a police chase game from AzGames. You have stolen a car and the whole city is after you, with police cars and roadblocks trying to box you in. Your goal is simple: stay free for as long as possible.

Drive fast, weave through traffic and cut down side streets to shake off your pursuers. The cash you pick up during a run unlocks new cars, each with its own speed and handling, and the longer you survive, the harder the chase gets.

If you like it, the other games in the series, Escape Road, Escape Road 2 and Escape Road 3, are on UBGHyper too.

Play Escape Road City unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong> or <strong>W A S D</strong>: drive and steer.`,
    tips: [
      'Keep moving. Stopping, even briefly, lets the police surround you.',
      'Use tight turns and alleys: police cars struggle to follow sharp corners.',
      'Grab cash when it is on your route, but do not drive into a roadblock for it.',
      'Try different cars. Faster ones are not always easier to control.',
    ],
    faqs: [
      { q: 'What is Escape Road City?', a: 'A police chase game by AzGames where you drive a stolen car and try to escape the police for as long as you can.' },
      { q: 'How do you unlock new cars?', a: 'Collect cash during your runs and use it to unlock new cars.' },
      { q: 'Is there an end to Escape Road City?', a: 'No. Each run lasts as long as you can stay ahead of the police.' },
      { q: 'What games are like Escape Road City?', a: 'Escape Road, Escape Road 2 and Escape Road 3 on UBGHyper.' },
      { q: 'Is Escape Road City free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Terraria': {
    longdesc: `Terraria is a 2D sandbox adventure from Re-Logic. You start with a few basic tools in a randomly generated world and can go anywhere: dig deep for ore, build a house, fight monsters and explore caves, jungles, deserts and underground lakes.

Progress comes from crafting. Better ore makes better weapons and armour, which let you take on bosses such as the Eye of Cthulhu, and each boss you beat opens up more of the world. Friendly characters move into the houses you build, and some of them sell gear you cannot get anywhere else.

There is no single way to play: some players build huge bases, others chase every boss and item. Either way there is a lot of game here.

Play Terraria unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>A / D</strong>: move. <strong>Space</strong>: jump. <strong>Left-click</strong>: use the held item (mine, attack, place). <strong>Right-click</strong>: interact. <strong>Esc</strong>: inventory. <strong>1-0</strong>: hotbar. <strong>H</strong>: quick heal.`,
    tips: [
      'Build a simple house before your first night: walls, a door, a light and a chair and table.',
      'Mine every ore you find. Better ore means better gear.',
      'Place torches as you dig so you can find your way back.',
      'Read the Guide: he tells you what you can craft from your current items.',
    ],
    faqs: [
      { q: 'What is Terraria?', a: 'A 2D sandbox adventure by Re-Logic about digging, building, crafting and fighting bosses.' },
      { q: 'What is the first boss in Terraria?', a: 'Many players fight the Eye of Cthulhu or King Slime first.' },
      { q: 'How do you open the inventory in Terraria?', a: 'Press Esc.' },
      { q: 'Does Terraria have an ending?', a: 'There is a final boss, but the world stays open afterwards so you can keep building and exploring.' },
      { q: 'Is Terraria free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'FNAF-2': {
    longdesc: `Five Nights at Freddy's 2 moves the night shift to a brand-new Freddy Fazbear's Pizza. This time there are no doors. Instead you have an empty Freddy Fazbear head, a flashlight with a limited battery and a camera system to watch the building.

The new toy animatronics and the battered old ones roam the halls, and each needs a different response. Put on the mask when one gets into the office, flash your light down the hall to send Foxy back, and keep winding the music box in the Prize Corner, because if it runs down the Puppet comes for you.

Survive from midnight to 6 AM each night. Beat the main nights and more challenges open up.

Play Five Nights at Freddy's 2 unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Mouse</strong>: look around the office. Click the bars at the bottom to raise the <strong>camera</strong> or put on the <strong>Freddy mask</strong>. <strong>Ctrl</strong>: flashlight. On the camera, hold <strong>Wind Up Music Box</strong> on CAM 11.`,
    tips: [
      'Check the music box every time you open the camera, even if only for a moment.',
      'Put the mask on fast when an animatronic appears in the office.',
      'Flash your light down the hallway to keep Foxy away. The mask does not work on him.',
      'Do not waste flashlight battery: short flashes are enough.',
    ],
    faqs: [
      { q: 'Are there doors in FNAF 2?', a: 'No. You defend yourself with the Freddy mask, the flashlight and the music box.' },
      { q: 'How do you stop Foxy in FNAF 2?', a: 'Flash your light down the hallway when he is there.' },
      { q: 'What happens if the music box runs out?', a: 'The Puppet leaves the Prize Corner and comes for you, so keep it wound on CAM 11.' },
      { q: 'Who made Five Nights at Freddy\'s 2?', a: 'Scott Cawthon.' },
      { q: 'Is FNAF 2 free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'FNAF-World': {
    longdesc: `FNAF World is a spin-off RPG from Scott Cawthon that swaps the horror for a colourful adventure. You build a party from the cast of Five Nights at Freddy's and explore an overworld starting in Fazbear Hills, battling odd enemies along the way.

You take two teams of four into each fight and can swap between them mid-battle. Every character has their own attacks, and you can equip chips for passive bonuses and bytes that fight alongside you. Unlocking new characters, finding hidden areas and chasing the different endings keeps it going.

It is packed with in-jokes for series fans, but you do not need to know the main games to enjoy it.

Play FNAF World unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong> or <strong>W A S D</strong>: move around the overworld. <strong>Mouse</strong>: choose attacks and menu options in battle.`,
    tips: [
      'Mix characters with different attacks so you are ready for any enemy.',
      'Swap to your second team when the first one is low on health.',
      'Equip chips and bytes. They make a big difference in tough fights.',
      'Explore off the main path for new characters and secrets.',
    ],
    faqs: [
      { q: 'What kind of game is FNAF World?', a: 'An RPG spin-off of Five Nights at Freddy\'s with a colourful overworld and battles, not a horror game.' },
      { q: 'How many characters can be in your party?', a: 'You take two teams of four and can swap between them during battle.' },
      { q: 'What are chips and bytes in FNAF World?', a: 'Chips give passive bonuses. Bytes are helpers that fight alongside your party.' },
      { q: 'Who made FNAF World?', a: 'Scott Cawthon.' },
      { q: 'Is FNAF World free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Worlds-Hardest-Game': {
    longdesc: `The World's Hardest Game is the classic Flash game from Snubby Land, and it earns its name. You are a red square. Each level is a small maze patrolled by blue dots moving in fixed patterns, and you need to collect every yellow coin and reach the green zone without touching a single dot.

There is no luck involved. Every pattern repeats exactly, so the game is about watching, timing and nerve, and a death counter keeps track of every mistake. Green zones along the way act as checkpoints, and there are 30 levels.

This version runs through Ruffle, so the original Flash game plays in your browser without a plugin.

Play The World's Hardest Game unblocked at UBGHyper, free with no download.`,
    controls: `<strong>Arrow keys</strong>: move the red square.`,
    tips: [
      'Watch a full cycle of the dots before you move.',
      'Move in short, deliberate steps rather than holding a key down.',
      'Use the green zones to rest and reset your timing.',
      'Grab the coins in an order that keeps you near a safe zone.',
    ],
    faqs: [
      { q: 'How many levels are in The World\'s Hardest Game?', a: '30.' },
      { q: 'What do you do in The World\'s Hardest Game?', a: 'Move the red square, collect every yellow coin and reach the green zone without touching a blue dot.' },
      { q: 'Who made The World\'s Hardest Game?', a: 'It was released by Snubby Land, by Stevie Critoph.' },
      { q: 'Does it still need Flash?', a: 'No. It runs through Ruffle, a Flash emulator, directly in your browser.' },
      { q: 'Is The World\'s Hardest Game free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'Just-Shapes-and-Beats': {
    longdesc: `Just Shapes & Beats is a bullet-hell rhythm game from Berzerk Studio. You are a small shape, and every level is a song where the screen fills with pulsing lasers, spikes and blocks that move to the beat. You do not attack; you only dodge.

Your one trick is a dash that makes you briefly invulnerable, so you can slip through attacks if you time it right. Learn each song's patterns, read the warnings before an attack lands and survive to the end. The soundtrack is made up of electronic tracks from a long list of artists, and the original game supports co-op for up to four players.

Play Just Shapes & Beats unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong> or <strong>W A S D</strong>: move. <strong>Space</strong>: dash (briefly invulnerable).`,
    tips: [
      'Watch the warning flashes: they show where the next attack will hit.',
      'Save your dash for the moments you cannot dodge any other way.',
      'Stay near the centre of the screen so you have room in every direction.',
      'Learn a song once, then go back. The patterns are always the same.',
    ],
    faqs: [
      { q: 'What is Just Shapes & Beats?', a: 'A bullet-hell rhythm game by Berzerk Studio where you dodge attacks that move to the music.' },
      { q: 'How do you dash in Just Shapes & Beats?', a: 'Press Space. You are briefly invulnerable while dashing.' },
      { q: 'Can you attack in Just Shapes & Beats?', a: 'No. The whole game is about dodging.' },
      { q: 'Is Just Shapes & Beats multiplayer?', a: 'The original game supports co-op for up to four players.' },
      { q: 'Is Just Shapes & Beats free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Unity-Web-Player-MiSide': {
    longdesc: `MiSide starts like a cute mobile game: you look after Mita, an anime girl who lives inside your phone. Then one night you are pulled into the game itself, and it quickly becomes clear that Mita is not quite what she seems.

The game moves between cosy moments, small mini-games and puzzles, and genuinely unsettling horror. You explore different versions of the game's world, meet other versions of Mita and try to work out how to get back to reality.

It was made by AIHASTO and became a big hit for its mix of sweet and sinister.

Play MiSide unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>W A S D</strong>: move. <strong>Mouse</strong>: look around and interact. Follow the on-screen prompts in each mini-game.`,
    tips: [
      'Explore every room: items and clues are easy to miss.',
      'Pay attention to what Mita says. It matters later.',
      'Some scenes are best played with headphones.',
      'If a puzzle stalls you, look again at the objects you can interact with.',
    ],
    faqs: [
      { q: 'What is MiSide about?', a: 'A player is pulled inside a mobile game where Mita lives, and discovers she is not as sweet as she seems.' },
      { q: 'Is MiSide a horror game?', a: 'Yes. It starts cute but turns into psychological horror.' },
      { q: 'Who made MiSide?', a: 'AIHASTO.' },
      { q: 'Is there more than one Mita?', a: 'Yes. You meet different versions of Mita as you explore.' },
      { q: 'Is MiSide free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },

  'Pou': {
    longdesc: `Pou is the virtual pet game where you look after a little brown alien. Keep Pou fed, clean, rested and happy: feed it in the kitchen, wash it in the bathroom, put it to bed and play with it when it gets bored.

Playing the mini-games earns coins, which you spend on food, potions, outfits, hats and new wallpaper for each room. Pou levels up as you take care of it, unlocking more things to buy and more games to play.

It is a relaxed game you can dip in and out of whenever you like.

Play Pou unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Mouse</strong>: tap items and buttons. Drag food to Pou's mouth, and use the arrows to move between rooms.`,
    tips: [
      'Play the mini-games to earn coins quickly.',
      'Keep an eye on the four bars: hunger, health, energy and fun.',
      'Turn the light off when Pou sleeps to restore its energy.',
      'Save up for upgrades instead of spending every coin on food.',
    ],
    faqs: [
      { q: 'What is Pou?', a: 'A virtual pet game where you feed, clean and play with an alien called Pou.' },
      { q: 'How do you earn coins in Pou?', a: 'Play the mini-games in the game room.' },
      { q: 'How do you make Pou sleep?', a: 'Go to the bedroom and turn off the light.' },
      { q: 'Who made Pou?', a: 'Pou was created by Zakeh.' },
      { q: 'Is Pou free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },
  'Steal-A-Brainrot': {
    longdesc: `Steal a Brainrot is a browser game by NagamiGames inspired by the Roblox hit of the same name, so you can play it without Roblox, an account or a download. Your job is to build the most valuable collection of Italian brainrot characters in town and keep the money rolling in.

Brainrots walk past your base along a red carpet: Noobini Pizzanini, Tim Cheese, Tung Tung Tung Sahur, Chimpanzini Bananini, Ballerina Cappuccina, La Vacca Saturno and plenty more. Walk up to one and its name, price, rarity and income pop up. Press E to buy it, and it heads back to your base, where it earns cash every second. Step on the cash pad in your base to collect what they have made, then spend it on rarer, more expensive brainrots.

Every brainrot has a rarity, from Common and Rare up to Legendary, Mythic and Brainrot God, and the rarer ones earn far more per second. Some come in special versions too: the Index tracks every brainrot you have found in its Normal, Gold, Diamond and Candy forms, so there is always another one to chase.

When your base is full and your income is high, Rebirth. You give up your brainrots and cash, but you unlock a cash multiplier, more starting money and extra space for your next run, so each rebirth gets you further, faster.

Play Steal a Brainrot unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>W A S D</strong>: walk. <strong>E</strong>: buy the brainrot in front of you. <strong>Mouse</strong>: open the Index, Rebirth, Shop and Skins menus on the sides of the screen.`,
    tips: [
      'Start with cheap brainrots like Noobini Pizzanini so money starts coming in straight away.',
      'Walk over your cash pad often: brainrots earn while you are away from it, but you have to collect it.',
      'Check the income per second, not just the price. A brainrot that earns more pays for itself faster.',
      'Keep an eye out for Gold, Diamond and Candy versions as they walk past.',
      'Once your base is full of strong brainrots and you can afford it, Rebirth for a permanent multiplier.',
    ],
    faqs: [
      { q: 'Is this the Roblox Steal a Brainrot?', a: 'No. It is a browser game by NagamiGames inspired by the Roblox hit, so you can play it on UBGHyper without Roblox or an account.' },
      { q: 'How do you buy a brainrot?', a: 'Walk up to a brainrot on the red carpet and press E. If you have enough cash, it goes to your base and starts earning money every second.' },
      { q: 'What is the rarest brainrot rarity?', a: 'Rarities go from Common and Rare up to Legendary, Mythic and Brainrot God. Rarer brainrots cost more and earn much more per second.' },
      { q: 'What are Gold, Diamond and Candy brainrots?', a: 'Special versions of brainrots. The Index has a tab for each (Normal, Gold, Diamond and Candy) so you can track which ones you have found.' },
      { q: 'What does Rebirth do in Steal a Brainrot?', a: 'Rebirth resets your brainrots and cash in exchange for a cash multiplier, more starting money and extra base space. The first rebirth needs $1M and two specific brainrots.' },
      { q: 'Is Steal a Brainrot free on UBGHyper?', a: 'Yes. It runs free in your browser with no download.' },
    ],
  },
  'Run-2': {
    longdesc: `Run 2 is the sequel to Run, the Flash game by Joseph Cloutier (Player 03) that started one of the best-known series on unblocked game sites. You play a small grey alien running through tunnels that float in space, and the floor is full of holes.

The trick is that gravity follows you. Step onto a wall and the whole tunnel rotates so that wall becomes your floor, which is how you get past gaps you can't jump. Later levels bring wider holes, narrower tunnels and sections where you switch walls mid-jump, so planning matters as much as reflexes.

When you finish it, Run 3 continues the series with many more tunnels, and the original Run is on UBGHyper too.

Play Run 2 unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Left / Right arrows</strong>: move, and step onto a wall to rotate the tunnel. <strong>Space</strong> or <strong>Up arrow</strong>: jump.`,
    tips: [
      'If a hole covers the whole floor, move onto a wall instead of jumping.',
      'Look ahead and pick the wall you will switch to before you reach a gap.',
      'Small taps on the arrow keys keep you steady on narrow sections.',
      'Jump early rather than late: landing short is easier to fix than overshooting.',
    ],
    faqs: [
      { q: 'Who made Run 2?', a: 'Joseph Cloutier, also known as Player 03, who made the whole Run series.' },
      { q: 'How do you rotate the tunnel in Run 2?', a: 'Walk onto one of the walls. The tunnel turns so that wall becomes the floor.' },
      { q: 'What are the controls for Run 2?', a: 'Left and right arrows to move, and Space or the up arrow to jump.' },
      { q: 'Is there a Run 3?', a: 'Yes. Run 3 continues the series and is on UBGHyper, along with the original Run.' },
      { q: 'Is Run 2 free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'Swords-And-Souls': {
    longdesc: `Swords & Souls is an RPG from SoulGame Studio built around training. You start out weak, and the way you get stronger is by practising in the training camp: quick mini-games for attack, block, dodge, archery and more, each one raising a stat the more you play it.

When you feel ready, head out on an adventure. You fight your way through waves of enemies across a series of areas, and the gold you win buys better weapons, armour and skills from the shops back home. That loop of train, fight and upgrade is easy to pick up and very hard to put down.

Play Swords & Souls unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong>: hit and block in the training mini-games. <strong>Mouse</strong>: archery training and the menus.`,
    tips: [
      'Train a little in every mini-game: a balanced fighter survives adventures far better.',
      'Go back to training whenever an area feels too hard.',
      'Spend gold on gear as soon as you can afford an upgrade.',
      'Archery pays off against enemies you would rather not fight up close.',
    ],
    faqs: [
      { q: 'Who made Swords & Souls?', a: 'SoulGame Studio.' },
      { q: 'How do you get stronger in Swords & Souls?', a: 'Play the training mini-games to raise your stats, then spend the gold from adventures on weapons, armour and skills.' },
      { q: 'What kind of game is Swords & Souls?', a: 'An RPG that mixes skill-based training mini-games with adventures against waves of enemies.' },
      { q: 'What are the controls?', a: 'Arrow keys in the training mini-games, and the mouse for archery and menus.' },
      { q: 'Is Swords & Souls free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'The-Binding-Of-Isaac': {
    longdesc: `The Binding of Isaac is the original Flash roguelike by Edmund McMillen and Florian Himsl. Isaac's mother, convinced she has heard a voice from above, comes after him, and Isaac escapes through a trapdoor into the basement. From there it is a dungeon crawl through floor after floor of rooms full of monsters.

You fight by firing tears. Every run lays the floors out differently and hands you different items, and items change both how Isaac looks and how he plays, so no two runs are the same. Each floor ends in a boss, and dying means starting again from the top.

It is dark, strange and very replayable, and it became one of the most influential indie games of its era.

Play The Binding of Isaac unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>W A S D</strong>: move. <strong>Arrow keys</strong>: shoot tears. <strong>E</strong>: drop a bomb. <strong>Space</strong>: use your active item.`,
    tips: [
      'Keep moving while you shoot: standing still is how you get cornered.',
      'Bomb suspicious walls; secret rooms hide some of the best items.',
      'Pick up everything at first and learn what each item does.',
      'Explore every room on a floor before the boss so you are as strong as possible.',
    ],
    faqs: [
      { q: 'Who made The Binding of Isaac?', a: 'Edmund McMillen and Florian Himsl made the original Flash game.' },
      { q: 'What kind of game is The Binding of Isaac?', a: 'A roguelike dungeon crawler: randomly arranged floors, random items, a boss on every floor and no second chances.' },
      { q: 'What are the controls?', a: 'WASD to move, the arrow keys to shoot, E to drop a bomb and Space to use your active item.' },
      { q: 'Is every run different?', a: 'Yes. Floors and items change each time you play.' },
      { q: 'Is The Binding of Isaac free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'Earn-To-Die': {
    longdesc: `Earn to Die is a zombie driving game from Toffee Games. The world has ended, the rescue point is far away across the desert, and the only way there is to drive straight through the undead.

You will not make it on your first try. Each run you drive as far as your car will take you, smashing zombies and clearing obstacles, and the distance you cover and the zombies you hit earn money. Back in the garage you spend it on upgrades like a stronger engine, better wheels and armour, and eventually new vehicles, then try again and get a little further.

That slow climb from barely moving to ploughing through the horde is what makes it so satisfying.

Play Earn to Die unblocked at UBGHyper, free in your browser with no download. When you finish, Earn to Die 2 is on the site too.`,
    controls: `<strong>Up</strong> or <strong>W</strong>: accelerate. <strong>Left / Right</strong> or <strong>A / D</strong>: tilt the car in the air. The other controls are shown in the game.`,
    tips: [
      'Upgrade the engine and fuel early: distance is where most of the money comes from.',
      'Keep the car level when you land to avoid losing speed or flipping.',
      'Do not try to dodge every zombie; armour lets you drive straight through.',
      'Save up for a new vehicle when upgrades to your current one stop helping.',
    ],
    faqs: [
      { q: 'Who made Earn to Die?', a: 'Toffee Games.' },
      { q: 'What is the goal in Earn to Die?', a: 'Drive across a zombie-filled desert to reach the rescue point, upgrading your car between runs.' },
      { q: 'How do you earn money in Earn to Die?', a: 'By the distance you drive and the zombies you smash on each run.' },
      { q: 'Is there an Earn to Die 2?', a: 'Yes. Earn to Die 2 is also on UBGHyper.' },
      { q: 'Is Earn to Die free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'qwop': {
    longdesc: `QWOP is Bennett Foddy's famously difficult running game. You are an Olympic sprinter, the goal is a 100 metre race, and you control each of the runner's legs muscle by muscle with four keys: Q and W for the thighs, O and P for the calves.

Getting the rhythm right is the whole game. Most players fall flat on their face in the first few metres, and a lot of the fun is watching the ragdoll athlete collapse in increasingly ridiculous ways. Learning a stable shuffle is an achievement; actually finishing the race is something most players never manage.

If you like it, Getting Over It with Bennett Foddy, from the same creator, is on UBGHyper too.

Play QWOP unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Q</strong> and <strong>W</strong>: move the runner's thighs. <strong>O</strong> and <strong>P</strong>: move the calves. Press <strong>Space</strong> to restart after a fall.`,
    tips: [
      'Try a slow shuffle first: alternate Q and W with O and P in a steady rhythm.',
      'Small, deliberate presses work far better than mashing.',
      'If you start tipping backwards, lean forward with your next step.',
      'Distance counts, so a slow, stable stride beats a fast fall.',
    ],
    faqs: [
      { q: 'Who made QWOP?', a: 'Bennett Foddy, who later made Getting Over It.' },
      { q: 'How do you play QWOP?', a: 'Q and W move the thighs, O and P move the calves. Combine them to make the runner walk or run.' },
      { q: 'How far is the race in QWOP?', a: '100 metres.' },
      { q: 'Why is QWOP so hard?', a: 'You control individual muscles rather than the whole runner, so even a single step takes coordination.' },
      { q: 'Is QWOP free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'Papas-Sushi': {
    longdesc: `Papa's Sushiria is one of Flipline Studios' Papa's restaurant games. You take over a sushi restaurant and have to keep every customer happy by making exactly what they ordered.

Each order goes through several stations. You take the order, make the sushi with the rice, wrap, fillings and toppings the customer asked for, cut it, and mix their bubble tea. Every step is scored on how closely it matches the ticket and how long it took, and the better the score, the bigger the tip.

As the days go by you unlock new ingredients, more customers and holiday seasons, and you can spend tips on upgrades and decorations for the shop.

Play Papa's Sushiria unblocked at UBGHyper, free in your browser with no download. Papa's Pizzeria is on the site too.`,
    controls: `<strong>Mouse</strong>: everything. Click the station tabs to move between stations, and drag ingredients into place.`,
    tips: [
      'Read each ticket carefully: wrong ingredients cost more points than slow ones.',
      'Keep several orders moving at once once you know the stations.',
      'Spend tips on upgrades that make the slow stations faster.',
      'Watch the customer you are serving; regulars can be very particular.',
    ],
    faqs: [
      { q: 'Who made Papa\'s Sushiria?', a: 'Flipline Studios, the makers of the Papa\'s restaurant series.' },
      { q: 'What do you do in Papa\'s Sushiria?', a: 'Run a sushi restaurant: take orders, make and cut each sushi roll exactly as asked, and mix bubble tea.' },
      { q: 'How are you scored?', a: 'Each station is scored on accuracy and speed, and better scores earn bigger tips.' },
      { q: 'What other Papa\'s games are on UBGHyper?', a: 'Papa\'s Pizzeria is also on the site.' },
      { q: 'Is Papa\'s Sushiria free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'Learn-To-Fly-3': {
    longdesc: `Learn to Fly 3 is the third game in Light Bringer Games' series about a penguin who refuses to accept that penguins cannot fly. This time the goal is space, and the penguin is going to get there by rocket.

You design and build your own launcher from parts, send the penguin off, and see how far, how high and how fast it goes. Every flight earns money and progress toward goals, which unlock better parts, so each launch can go a little further than the last. Working out a design that actually holds together is half the fun.

If you like it, Learn to Fly 2 is on UBGHyper as well.

Play Learn to Fly 3 unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Mouse</strong>: build and upgrade your rocket and use the menus. <strong>Arrow keys</strong>: steer the penguin in flight.`,
    tips: [
      'Check the goals list: it tells you what to aim for and pays out well.',
      'Balance your design; a lopsided rocket wastes thrust spinning.',
      'Upgrade a little after every launch rather than saving everything.',
      'Try different shapes. Some designs fly far better than they look.',
    ],
    faqs: [
      { q: 'Who made Learn to Fly 3?', a: 'Light Bringer Games, who made the whole Learn to Fly series.' },
      { q: 'What is the goal in Learn to Fly 3?', a: 'To get the penguin into space by building better and better rockets.' },
      { q: 'How do you get better parts?', a: 'Each launch earns money and progress toward goals, which unlock new parts and upgrades.' },
      { q: 'Is Learn to Fly 2 on UBGHyper?', a: 'Yes, Learn to Fly 2 is on the site too.' },
      { q: 'Is Learn to Fly 3 free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },

  'This-Is-The-Only-Level': {
    longdesc: `This Is The Only Level is a puzzle platformer by John Cooney for Armor Games, and the title is the joke: there is only one level. You guide a little blue elephant to the exit pipe, past spikes and a button that opens the way.

What changes is everything else. Each stage replays the same level with a new rule: the controls might be reversed, the elephant might be invisible, the level might react to how you play. The stage name is the hint, and working out what it means is the puzzle.

It is short, clever and full of the kind of twists that make you laugh when they finally click. Achievement Unlocked, by the same creator, is also on UBGHyper.

Play This Is The Only Level unblocked at UBGHyper, free in your browser with no download.`,
    controls: `<strong>Arrow keys</strong>: move and jump, unless the stage has changed the rules.`,
    tips: [
      'Read the stage name every time: it is the clue to that stage\'s twist.',
      'If nothing works, try something that seems wrong.',
      'Watch what happens when you press each key; the rules often change the controls.',
      'The level never changes, so learn where the spikes are.',
    ],
    faqs: [
      { q: 'Who made This Is The Only Level?', a: 'John Cooney, for Armor Games.' },
      { q: 'Is there really only one level?', a: 'Yes. Every stage reuses the same level, but each one adds a new twist to how it works.' },
      { q: 'How do I solve a stage?', a: 'Read the stage name. It hints at the rule that has changed.' },
      { q: 'What games are like This Is The Only Level?', a: 'Achievement Unlocked, by the same creator, is also on UBGHyper.' },
      { q: 'Is This Is The Only Level free on UBGHyper?', a: 'Yes. It plays free in your browser with no download.' },
    ],
  },
};

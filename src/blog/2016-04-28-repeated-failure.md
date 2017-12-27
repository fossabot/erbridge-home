---
title: Repeated Failure
date: 2016-04-28
categories:
  - nordic-game-jam
  - game-jams
  - gamedev
image: /assets/blog/repeated-failure/hackers-movie.jpg
---

Lately I have been thinking about introductions to games, particularly learning
to play through repeated failure. Most games make every effort to make sure the
player is completely comfortable with how to play before they start. They go
through tutorials, are eased into puzzles or enemy encounters, guided by level
design or pop-up advice. Some games stand out as doing things differently. The
most obvious examples are the Dark Souls games, where a player is expected to
repeatedly throw themselves against a bone wall, as they learn the tricks to
defeating encounters.

![You Died!](/assets/blog/repeated-failure/dark-souls-you-died.jpg)

However, I still think there's room to explore this space. When
[ADR1FT](http://www.adr1ft.com/) came out, a game about being the sole survivor
of a catastrophe in space with a missing memory, I hoped its opening would just
drop you into a leaking spacesuit floating around a wrecked space station with
your air leaking out into the void and no instructions, and forced you to
experiment to survive. I haven't played it, but I doubt that's how they do it.

At [Nordic Game Jam 2016](http://nordicgamejam.org/), I decided to try
experimenting with the idea of learning through hard failure. At GDC, a friend
of mine, [Denman Rooke](http://denmanrooke.com/), showed me an adaptation he had
made of Dark Souls as a card game, where the crawl through the game is simulated
with a stack of enemies that you work through one at a time, but when you die,
the stack is reconstructed in the same order as it started. This means that on
each run, you learn how to be more effective and get further through the deck.

![Dark Souls](/assets/blog/repeated-failure/denman-dark-souls.jpg)

I wanted to explore this mechanic further, and I came up with a card game based
on Hackers (the movie). The game didn't work, but I still think some of the
design ideas were interesting.

![Hackers](/assets/blog/repeated-failure/hackers-movie.jpg)

## Hackers

The theme for the jam was "Leak!" which, like many others, I interpreted as a
data leak. From the outset, I wanted to focus on this idea of learning through
failure. I also wanted to work on a physical game for a change. I was massively
inspired by Denman's game, but I wanted to create a more social experience,
rather than a solitaire game, so I took the core deck crawl, added two players
and some bluffing mechanics (the beginning of the game's downfall).

The premise of the game is that you were a group of rival hackers in the early
90s, trying to break into a corporate data store and steal their shit. However,
you can't do it alone. You want to be the hacker to take the scoop, but you need
the others to help you break through the firewalls and other defences. Being the
90s, you're armed with floppy disks loaded with kilobytes of software, running
over 56k modems to attack corporate mainframes and steal megabytes(!) of
sensitive data from them. You have a supply of energy drinks to fuel you, and a
reputation to keep you honest (or at least not openly treacherous).

### Design

The game starts with a draft phase, where the hackers load up their decks from a
shared supply. Each hacker is dealt four floppy disks, which they pick one of,
and pass the rest on. The intention here is to give each hacker an idea of what
the others might have, which gives them a head start against the bluffing that
comes later. With three players, they each see their first draft twice, and
everyone learns about the definite location of one card outside their own deck.

Once the hackers are kitted out, they make their first run at the corp's
mainframe. To do this, they load up one of their disks in secret (by playing the
card face down), and then all reveal together. Each disk has a load time, which
determines the execution order. The first hacker looks at the top card from the
mainframe stack in secret. The revealed mainframe has two of three possible
layers of defences, with consequences for failure, and each disk has two hacking
capabilities, of which the hacker must choose one to execute.

The first hacker must run the mainframe, and the results of that run are public.
Each other hacker then takes it in turn to choose whether to execute their code
or pull out of the current round and lose some reputation. If the mainframe's
defences are defeated, the card is placed face up, the disks return to the
hackers' decks and the process repeats. If not, the hackers become locked out
and come closer to being detected, the mainframe stack is restored (although
some of the mainframe failure actions result in rearranging the stack), and the
hackers must start again from the top.

In amongst the mainframes are databases, which only have a single defence, and
the first hacker to break the defence claims the data. Data is how the game is
scored, and so this gives hackers an incentive to risk going first into the
unknown, which is a potentially harmful action for them.

The hackers, therefore, need to make sure they have all the defences covered in
the correct order so the group can succeed and progress, but also need to avoid
taking penalties as individuals. This results in a drive to be later in the
execution order, so as to avoid responsibility for taking the deck, but that
drive should be balanced out by the fact that late execution pretty much
guarantees that the hacker will never get any data.

The game continues until the hackers are detected, any of them run out of energy
drinks, or any one of their reputations runs dry, giving them incentives to work
together. At the end of the game, assuming they didn't run out of reputation
(which disqualifies them), each hacker tallies up how much data they managed to
steal, and the one with the most to brag about wins.

### Issues

At some point I added checkpoints in the form of back doors, to try and make the
game less punishing after a long run. Playtests showed that people were put off
by the idea of having to repeat the process of going through the entire stack
again from the beginning.

The fact that hackers' decks are fixed from the beginning of the game means that
I found that players wanted to always play the same disks every round, since
they knew what the outcome would likely be. Changing up the disks every round
would have been too slow, so instead, I added a penalty, so if a hacker plays
the same card twice in a row, they take a hit to their reputation for
unoriginality. This worked to an extent, but added an extra layer of mental
bookkeeping in a game crammed full of hidden information to remember, and it
relied on players being honest, which in a game that encourages secrecy and
lying, isn't a good thing to rely on.

Overall, the game is just trying to do too many things. The bluffing mechanic is
at odds with what is essentially a memory game. It adds a layer of
competitiveness that isn't really supported by the rest of the design, and turns
out to be fairly dull due the lack of depth of player actions. Combining that
with the need for players to remember the order of the mainframe stack, meant
that players basically ignored the bluffing aspects and just focused on breaking
through the defences.

The game would have been better as a more cooperative experience, with all the
players working together to plan their actions to make the best progress through
the corp's mainframe stack. If I revisit the game, I would definitely try to
make it a cooperative game, rather than a secretive competitive one, though
perhaps with a mole, or some sort of faction mechanic to add a competitive edge
to keep things interesting.

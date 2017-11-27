---
title: "Skald - Episode #1: Once Upon A Time"
slug: skald-episode-1
date: 2016-02-26
categories:
  - skald
  - gamedev
---

[Luke](http://www.luketovee.com/) and I spent a recent weekend jamming on
[_Skald_](/blog/skald/), to give it a kick start and build some momentum. It
went really well!

![Landscape](/assets/blog/skald-episode-1/landscape.gif)

We decided to use Unreal Engine 4, and after some teething pains, I'm growing to
really like it. Blueprints are fun to work with, and they mean Luke can work on
visual aspects from end to end without much input from me, which means the game
already looks a lot prettier than it is functional!

![Waves](/assets/blog/skald-episode-1/waves.gif)

After a few hours consolidating conversations we'd had over the past few months
into a rough outline for a prototype, we got stuck in. Luke had already done
some magic with the landscape and created a material that textures it based on
its normals. He's also modelled a character and a boat, so we slotted it all
into a new project and set sail.

![Textures](/assets/blog/skald-episode-1/textures.png)

A core feature of the game will be navigation of the world's waterways. We
thought about what the best way to control that would be. We could make the
player control the boat directly with WASD or arrow keys, but we felt that would
be at odds with the aesthetic of routine travel that we wanted to capture, as
well as presenting challenges with combining that with a conversation interface
during the journey. On the other hand, it would give the player something to do
other than read and write.

An alternative would be to put the boat on rails and give the player more of a
high level control over the route taken. This would allow the player to move
around on the boat, talk to passengers or just watch the scenery go by. However,
this puts more pressure on making the conversations capture the player's
attention for the duration of the journey.

In the end we decided to go with the high level approach, so I started to look
at how to create routes and navigate along them. This involved my first real run
in with game AI to do the movement. We already had a nav mesh set up, so I
started looking at behaviour trees, and after a few too many hours of reading,
re-reading (but the words this time) and experimenting, I finally got the boat
moving to clicked route nodes, which we hand placed in the world. The next step
was to allow the user to create routes, which was a lot easier now that I had a
better idea of what I was doing. Luke added a lick of paint, and we had a basic
routing system.

![Routing](/assets/blog/skald-episode-1/routing.gif)

Overall we didn't make a huge amount of progress on the gameplay (although it
already looks really pretty), but we both have a better understanding of how to
work with the engine, so we should be able to go a bit faster in the future.

Next up, the meat of the game: in game conversations. Arguably, we should have
started work on that before anything else, but the call of the visual stuff was
too strong!

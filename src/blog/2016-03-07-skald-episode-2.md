---
title: "Skald - Episode #2: The Story Unfolds"
slug: skald-episode-2
date: 2016-03-07
categories:
  - skald
  - gamedev
---

Over the weekend, I began looking into the storytelling aspects of _Skald_. I
consider this to be the most ambitious aspect of the project, or at least the
most risky. What we want to do involves _Natural Language Processing_ (NLP) used
in a way, that as far as I can tell from my limited research, hasn't been done
before. And I have no idea how any of it works.

Time to start learning.

Before that, though, I needed to decide where I would be doing the processing.
Obviously, if we wanted to do it all on the player's machine, we'd need some way
to interface with Unreal Engine (since that's what we're using), which means
C/C++, or something that can pretend to be C/C++. However, we had already
decided that we would need a server to support sharing stories between players,
so could we also use that server to evaluate them? This would open up the
possibility space of languages (and therefore, libraries) that we could use.

It seems like the common languages used by the machine learning (or is that
_Machine Learning_?) community are Java and Python. I'm reluctant to touch Java
with a barge pole, but Python is something I'm fairly comfortable with.

On the other hand, I have been led to believe that NLP is a fairly
computationally intensive process, and combining processing time with network
latency (and the requirement for an always on internet connection) would mean
the game flow would need to hide that delay from the player, and given we want
to give "instant" feedback on their writing, that seems like a hard problem to
solve. There's also the matter of the cost of running such a server when we
could just be using our players' computers to do the heavy lifting for free.

In the end, I let my inexperience guide me. Given that Python seems to be one of
the de facto language for this kind of thing (and not C++), and so has a lot of
support, I decided to prototype a Python server. That way I could work out how
to even do the thing using appropriate libraries, tutorials, etc., and then port
it over to something client-side if necessary in the future when I understand it
all a bit better.

So after picking [Gensim](https://radimrehurek.com/gensim/) as the library to
work with, based on some keywords that I'd come across already appeared in its
docs (_information retrieval_, _Latent Semantic Analysis_, _Latent Dirichlet
Allocation_ - did I mention I don't know what I'm doing?), I built a quick
[Flask](http://flask.pocoo.org/) app and set to work learning about NLP.

It turns out that it's sorcery.

After spending a few hours following
[Gensim's tutorials](https://radimrehurek.com/gensim/tutorial.html), I had less
than 100 (verbose) lines of code that would tell me how similar a line of text
is to a bunch of other lines of text (documents). Using a thing called _Latent
Semantic Analysis_, we can do this by looking at the semantic similarity between
the two. In other words, we can look at the "meaning" of the documents (or some
statistical approximation of it - I have yet to look behind the curtain) to work
out if the two are similar. And with the example data, this even found that the
most similar document was one that had _no common words_ with the test document.
Sorcery!

I quickly modified this to find one of the most similar documents in the data
set (randomly selected from those above a certain threshold) and return that,
and so, we have a simple server we can use to simulate the flow of an exchange
of related stories, which is half of what we want. What we really want to do is
the reverse of this; we want to compare a story from our collection (that we had
previously shown to the player) with one they wrote in response to see how
similar the two are, and whether the player's writing would feel like a relevant
response or not. But this is a step in the right direction, and might even be
useful itself if we decide to make the "conversation" longer than two steps.

I still need to put some real data into the thing and see how well it works. I'm
probably going to borrow a bunch of books from
[Project Gutenberg](https://www.gutenberg.org/) to use as the data set for now,
run some of my own prose through it, and see how that goes. Then I think I
should probably get the game communicating with the server and hook up some UI
to interact with the thing to see how if feels. But I might keep poking around
with the NLP instead. We'll see. Sorcery...

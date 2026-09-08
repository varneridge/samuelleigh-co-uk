---
title: Poker Bot
period: 'June 2026'
order: 10
org: 'Fullhouse Poker Bot Hackathon, sponsored by Quadrature Capital, London'
logo: /images/placeholder-fullhouse.png
summary: "Finalist in the UK's first inter-university poker bot competition. The hard part was the testing."
stack: 'Monte Carlo equity estimation, Bayesian opponent modelling'
status: Complete
bullets:
  - "Reached the finals of the UK's first poker bot competition, top 64 of around 190 entrants after two Swiss qualifier rounds."
  - 'Validated each change on roughly 100,000 simulated matches using variance-reduced paired-seed A/B tests, with decision rules fixed before results were seen.'
---

Fullhouse Poker Bot Hackathon, June 2026, sponsored by Quadrature Capital. I reached the finals,
finishing in the top 64 of around 190 entrants after two Swiss qualifier rounds, against teams
from Oxford, Cambridge, Imperial, UCL and KCL.

## What it does

A six-max No-Limit Hold'em bot built around Monte Carlo equity estimation, with a live Bayesian
opponent-modelling layer that adjusted its decision thresholds within a single match rather than
between matches.

## The part that mattered

Poker has enough variance that a worse bot beats a better one over a short run perfectly often.
So the interesting problem was not the strategy but knowing whether a change had helped.

I validated each change on roughly 100,000 simulated matches using variance-reduced paired-seed
A/B tests, with the decision rules fixed before results were seen. Paired seeds mean both
versions face identical card sequences, which strips out most of the luck. Fixing the rules
first stops you rationalising a result after the fact.

## What I would do differently

[Write two or three sentences. Something you got wrong, or an assumption that did not hold.]

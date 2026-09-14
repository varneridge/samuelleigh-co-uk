---
title: Lifeboat Crew Training App
period: '2025'
order: 50
summary: vkbfddvodfvj
org: ''
logo: ''
bullets: []
stack: Claude
status: Complete
thumbnail: ''
image: ''
imageCaption: ''
draft: false
date:
  - ADD DATE
subtitle: Putting a scattered training syllabus in one place, in two formats, built without knowing how to code
tags:
  - project
  - software
  - RNLI
---

# Atlantic 85 Crew Training Application

Every volunteer on an inshore lifeboat works through the same competence framework, from the
induction modules you complete before you are allowed near the boat, through to the command
qualifications for Helm and Head Launcher. The framework is long and it is examined. The material you need to work through it is not in one place.

It is in a crew handbook, a boat manual, the training standards, a set of standard operating
procedures, a separate set of local operating procedures, and assorted PDFs. All of it is accurate. None of it is joined up. Revising a single module meant knowing which document held the
procedure and which held the theory, then holding them together in your head. The effort was
going into finding the material rather than learning it.

I built this for myself, to stop doing that. I cannot write code; the application was built with
Claude, and what that actually involved is further down. Other crew saw me using it and asked for a copy, so I spent longer on it than I had intended to, and circulated it. Several members of the crew have since told me they use it as their main revision resource, which is the only measure of the thing I actually care about.

![The pathway on one screen. Shore crew and boat crew tracks, sharing a common induction stage.](/images/01-pathway.png "The pathway on one screen. Shore crew and boat crew tracks, sharing a common induction stage.")

## One place, two formats

Two tracks, shore crew and boat crew, sharing a common induction stage and running up to Head
Launcher on one side and Navigator and Helm Command on the other. Ten roles, seventy-seven
modules, 1,797 questions across 75 of them, and roughly 48,000 words of notes across 62. Every
module offers the same material two ways: notes to read and learn from, and questions to be
tested on, one click apart.

The bulk of the work was not the software. It was reading across the source material for each
module and deciding what a crew member actually needs to hold in their head, then reducing it to
notes that can be read in a sitting and questions that test the thing rather than the wording.
Almost every module's notes open with what you will learn. Procedures are set out as numbered
steps in the order they happen, and the points where getting it wrong matters are flagged as
warnings rather than left in the body of the text.

![The notes format. Demonstration content, not training material.](/images/02-study-notes.png "The notes format. Demonstration content, not training material.")

Testing works two ways, because checking and learning are different activities. Assessment gives
you a fixed set, marked at the end, with a review screen filtered to the ones you got wrong.
Continuous practice is an endless shuffled loop that reveals the answer immediately, which is the
mode you want while you are still learning the material. Every one of the 1,797 questions carries
a written explanation of why the right answer is right, because a score on its own teaches
nothing.

![Assessment mode. Demonstration questions, not training material.](/images/03-assessment.png "Assessment mode. Demonstration questions, not training material.")![Continuous practice reveals the reasoning on every answer, right or wrong.](/images/04-practice-feedback.png "Continuous practice reveals the reasoning on every answer, right or wrong.")

## The choices that shaped it

**The same structure as the framework itself.** Modules keep their numbering and sit under the
roles and stages they belong to. You find something by where it sits in your training rather than
by remembering which document it was in, which was the whole problem.

**Randomising the answers, not just the questions.** Both the question order and the lettering of
the options are reshuffled on every attempt. Fix the options and after three passes you remember
that the answer to question twelve is C, which is not the same as knowing it. The app marks 80%
as a pass, a threshold I set to give myself a target rather than something drawn from any formal
standard.

![Every wrong answer comes back with the correct one and the reasoning.](/images/05-results-review.png "Every wrong answer comes back with the correct one and the reasoning.")

**Separating content from code.** Questions, notes and the pathway definitions sit in three plain
data files. Anyone who can edit a text file can correct a question and refresh the browser. That
was deliberate: a tool only I can update is a tool that stops being accurate the moment I stop
maintaining it.

**No data collection at all.** No account, no server, no analytics. Progress is written to the
browser on the device and nowhere else, and there is a page that says so plainly and offers to
export or erase it. For something passed around volunteers inside a charity with real data
protection obligations, the simplest defensible position was to collect nothing, so that there is
nothing to lose.

![Progress stays on the device, and can be exported or erased from one page.](/images/06-progress-and-data.png "Progress stays on the device, and can be exported or erased from one page.")

## Built without writing code

The interesting part of this project is what the work consisted of once the code stopped being
the constraint. It was deciding what to build and for whom, specifying behaviour precisely enough
that it could be implemented, reading output I had not written and judging whether it was right,
and rejecting it when it was not.

The domain knowledge was mine and could not have come from anywhere else. I knew the pathway
because I was working through it. I knew that the problem was fragmentation rather than a lack of
material. I knew what a crew member needs at each module, because I needed it. And I knew that a
revision tool which fixes the answer positions teaches people the position rather than the
content. The useful skill turned out to be specification and verification, not syntax.

## Testing the claim, not the code

Which is why, before publishing this, I went back and checked whether the app did everything I
had been telling people it did. It did not. One feature had never worked at all, and had been
failing silently since the day it was written: no error, no warning, nothing visible from reading
the code and deciding it looked correct. It was found by testing the claim from the outside
instead, and it is now fixed.

That is the discipline the project taught me. When you have not written something yourself, you
cannot audit it by reading it. You check whether it does what you say it does, and you assume it
does not until it demonstrably does.

## What it does not do

Thirteen modules on the pathway have questions but no notes written for them, and two have
neither. Progress does not sync between devices, by design. There is no spaced repetition, only a
pool of the questions you keep getting wrong, which you can drill directly.

***

\*Circulated to crew at my own station while data protection policies allowed it. The repository
is private. This is an independent project: not affiliated with, endorsed by, or produced by the
RNLI, and no substitute for supervised training, station assessment, or the current official
documentation. Screenshots use placeholder content drawn from public sources rather than training
material.\*

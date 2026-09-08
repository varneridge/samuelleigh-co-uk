---
title: Rightmove Property Analysis Tool
period: '2025'
order: 20
org: 'A prototype rather than an enterprise tool'
summary: 'A scraper and weighted scoring engine for the fields buried in the small print.'
stack: 'Python, TfL API, Excel output'
status: Prototype
bullets:
  - 'Scrapes fields the Rightmove interface does not surface: square footage, service charges, ground rent, lease years, EPC rating and council tax band.'
  - 'Scores each property from 0 to 100 against weighted criteria, with a settings interface for adjusting the weights without touching code and TfL API integration for commute times.'
---

A prototype rather than an enterprise tool, built to solve an actual problem: the numbers that
decide whether a flat is a good idea are rarely the ones on the listing page.

## What it does

Scrapes the fields Rightmove does not surface in its interface, including square footage,
service charges, ground rent, remaining lease years, EPC rating and council tax band. Each
property is then scored from 0 to 100 against weighted criteria, with a settings interface for
adjusting the weights without touching code, and TfL API integration for commute times. Output
goes to Excel, and the ranking tracks changes over time.

## What I learned

[Write this out. The interesting part is probably the weighting: any scoring system encodes a
view about what matters, and the settings interface exists because that view is contestable.]

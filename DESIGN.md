---
version: alpha
name: Mellanrum Höglund
description: Anna Höglund's practice site. Values mirror :root in src/styles/global.css, which follows Anna's ChatGPT mockup (fran-anna-2026-10-22).
colors:
  paper: "#f6f3ed"
  white: "#fffdf8"
  card: "#fffefa"
  ink: "#29352f"
  lead: "#4f5d53"
  muted: "#616e65"
  sage: "#dce3d8"
  sage-dark: "#526657"
  clay: "#b8755c"
  clay-text: "#9a5a42"
  line: "#deded4"
  field: "#8f8f86"
  pricing-bg: "#e8e8df"
  quote-text: "#35483a"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: 5rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: 3.15rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: 1.55rem
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "'Avenir Next', Avenir, 'Segoe UI', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  eyebrow:
    fontFamily: "'Avenir Next', Avenir, 'Segoe UI', sans-serif"
    fontSize: 0.72rem
    fontWeight: 700
    letterSpacing: "0.16em"
rounded:
  button: 2px
  hero-arch: 999px
spacing:
  gutter: 20px
  container: 1120px
  section: 78px
  section-mobile: 55px
  card-gap: 18px
components:
  button-primary:
    backgroundColor: "{colors.sage-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "12px 19px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px 19px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    padding: "28px 25px"
  price-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    padding: 25px
  quote:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.quote-text}"
    padding: 35px
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.sage-dark}"
    padding: "7px 11px"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    padding: 12px
---

# Mellanrum Höglund design system

The tokens live in `:root` in `src/styles/global.css`. Anna approved the job on the condition that the site looks as close to her mockup as possible, so the mockup is the spec. Change code and this file in the same commit.

## Overview

A calm, paper-toned single page for a licensed psychotherapist in Stockholm. Muted sage greens, one terracotta accent, a serif for headings and a humanist sans for text. The hero uses a CSS-drawn arch illustration from the mockup, no photo.

## Design Principles

1. The mockup wins. Deviate only for accessibility, mobile or performance, and log the deviation below.
2. System fonts only (Georgia, Avenir Next, Segoe UI). No web fonts, so text renders on first paint.
3. One accent color. Terracotta marks numbers and hover, nothing else.
4. Square corners everywhere except the hero arch.

## Color

| Token | Value | Use |
|---|---|---|
| paper | #f6f3ed | Page background |
| white | #fffdf8 | Services band, price cards, contact panel |
| ink | #29352f | Headings and body text |
| muted | #616e65 | Secondary text, nav, footer (4.6:1 on paper) |
| sage / sage-dark | #dce3d8 / #526657 | Quote block, eyebrows, primary button |
| clay | #b8755c | Decorative only |
| clay-text | #9a5a42 | Card numbers, nav hover, focus ring (5.3:1 on card) |
| field | #8f8f86 | Input borders (3.2:1 on card) |

## Typography

Georgia at weight 400 for h1 to h3 with negative tracking. Avenir Next for body at 16px and line-height 1.65. Eyebrows are 0.72rem uppercase bold with 0.16em tracking.

## Spacing & Layout

Container is min(1120px, 100% minus 40px). Sections are 78px top and bottom, 55px under 760px. Grids collapse to one column under 760px.

## Components

Buttons are 2px radius with a 1px sage-dark border; primary is filled. Service cards have a 1px line border. Price cards have a 3px sage-dark top border. The about section stacks the portrait (4:5, AVIF and WebP) above the quote block.

## Accessibility

Focus is a 2px clay-text outline with 3px offset. A skip link appears on focus. Smooth scrolling and button lift are off under prefers-reduced-motion. Form fields are required, labeled and length-limited.

## Deviations from the mockup

1. muted #66736a became #616e65: the original measured 4.49:1 on paper, under the 4.5:1 minimum.
2. Card numbers and nav hover use clay-text #9a5a42: the original clay measured 3.63:1.
3. Input borders #c9cec5 became #8f8f86: the original measured 1.59:1, under the 3:1 minimum for form fields.
4. Portrait added above the quote in "Om mig": Anna sent three photos and the mockup has no image.
5. The e-mail line with a placeholder address is removed: the form sends to Anna, and she chose not to show an address.
6. The template notice above the form is replaced with a line saying the message goes straight to her and is not stored.
7. The health-data notice mentions the form as well as e-mail.
8. Footer links to a new privacy page (/integritet/), which the mockup left as a placeholder.
9. Added a Turnstile spam check above the submit button, a thank-you page and error messages.
10. Credentials are a list and the quote is a blockquote, which looks the same and reads better in screen readers.
11. The tagline under the name grew from 0.66rem (10.6px) to 0.72rem (11.5px), above the 11px floor for readable text.

The Impeccable detector also flags the eyebrow kickers above every heading and the cream background. Both come from the mockup and stay, because Anna made the mockup the condition for the order.

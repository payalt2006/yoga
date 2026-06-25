# Yoga Centre — Design System & Build Spec
### Concept: The Arc of Light

The throughline is now literal: a single thin line traces the arc of the sun's path across the entire site, dawn at the hero, dusk at the closing section, with a small glowing mark traveling along it as the page scrolls. The palette shifts gently with it, pale and cool at the top, warming through midday, settling into deep olive dusk at the close. That arc is also the answer to "the site shouldn't look empty," it gives every section a reason to exist in sequence rather than being interchangeable beige blocks.

Logo stays as-is: the sun-mark plus "Yoga Centre" wordmark, same nav structure (Practice, Philosophy, Discipline, Community, Begin Journey).

---

## 1. Creative direction

The message is the practice itself, breath, presence, stillness, not a demonstration of poses. Every section should read like a page from a calm, well-edited print magazine that happens to move. Photography and a looping video carry the human warmth that the character used to carry. The sun-arc carries the structure that the pose sequence used to carry.

Signature element: the arc. One continuous SVG path, drawn progressively as the user scrolls the entire document (not per-section), with a small glowing sun-mark traveling along it. The path's vertical position roughly tracks a sunrise-to-sunset curve, low at the hero, rising through the philosophy and practice sections, peaking around the midday horizontal-scroll section, descending through the afternoon and community sections, and settling low and warm at the closing section. The eyebrow label on each section names its place in that arc, dawn, morning, midday, afternoon, dusk, which is genuinely informative here, it tells the reader where they are in the day and in the page, not a decorative 01/02/03.

---

## 2. Color tokens

The palette is time-of-day driven, it shifts gradually down the page rather than staying flat. Every value below is a CSS custom property, interpolate between adjacent section tokens with a slow background-color tween as each section enters.

```
--dawn-bg:        #F4EFE6   /* hero, palest, cool-warm porcelain cream */
--morning-bg:      #EFE8DC   /* philosophy section */
--midday-bg:       #E6DCC9   /* horizontal scroll section, deepest sand */
--afternoon-tint:  #D98E5A   /* used as overlay/gradient tint over photography, not a flat bg */
--dusk-bg:         #2C3325   /* closing CTA + footer, deep olive */
--dusk-bg-2:       #1C2216   /* footer, one shade deeper than the closing CTA */

--ink:             #242420   /* headline text on light sections */
--ink-soft:        #5B5854   /* body text on light sections */
--ink-on-dusk:     #F4EFE6   /* text on dusk sections */
--ink-on-dusk-soft: #B9B9AC

--accent:          #B8623F   /* terracotta, the one accent on light sections, buttons/eyebrows/dividers */
--accent-tint:     #E7CDBC   /* hover states, soft fills */
--accent-glow:     #EBA85E   /* the sun-mark traveling on the arc, brighter/warmer than the accent so it reads as light, not just brand color */

--line:            rgba(36,36,32,0.12)   /* hairline dividers on light sections */
--line-on-dusk:    rgba(244,239,230,0.16)
```

Do not introduce a second unrelated accent color anywhere (the old build had a stray brick-red top hairline competing with the terracotta CTA color, drop that entirely here, the only warm accent in the system is the terracotta/glow pair above).

---

## 3. Typography

```
Display serif:   Fraunces (warm, slightly organic curves, avoids the over-used
                  Playfair Display look while staying in the editorial-serif family)
Body / UI sans:   General Sans (clean, humanist, pairs quietly with Fraunces)
Pull-quote face:  Fraunces Italic, light weight, for testimonials and the
                  afternoon-section teaching line
```

| Role | Spec |
|---|---|
| Eyebrow (DAWN / MORNING / MIDDAY / AFTERNOON / DUSK) | sans, 12-13px, uppercase, letter-spacing 0.16em, accent color |
| H1 (hero) | Fraunces, clamp(56px, 8vw, 128px), line-height 0.95, weight 480-560 |
| H2 (section) | Fraunces, clamp(40px, 5vw, 72px), line-height 1.05 |
| Pull-quote | Fraunces Italic, clamp(28px, 3.5vw, 44px), line-height 1.2 |
| Body | General Sans, 18-19px, line-height 1.65-1.7, max-width 38-42ch |
| Nav / labels | General Sans, 13-14px, letter-spacing 0.08em |
| Stat numbers | Fraunces, 40-56px, tabular if available |

Kinetic type, used in exactly two places, per the rule of spending boldness once: the hero H1 (letters settle in from a slight blur/scale/weight-shift as the page loads and again subtly as the user starts scrolling away), and the closing CTA H2 at dusk (a slow weight increase on a variable-font axis as it enters, giving it a sense of gravity/arrival). Nowhere else. Every other headline is a simple, well-eased fade-up, motion restraint is part of the premium feeling, not a missed opportunity for more animation.

---

## 4. Site structure, section by section

### Nav (sticky, unchanged)
Sun-mark + "Yoga Centre" wordmark, left. Practice / Philosophy / Discipline / Community, center. "Begin Journey" outlined button, right. Background goes from fully transparent over the hero video to a subtle frosted glass (backdrop-blur, 70% opacity dusk-bg tint) once scrolled past the hero, so it stays legible against every section without ever becoming a hard bar.

### Hero — Dawn
Full-bleed looping background video: slow, breath-paced footage, morning light through a studio window, steam off a tea cup, a single candle, hands settling into a fold, anything textural and human, no fast cuts, 10-15 second loop shot to cycle seamlessly. Muted, autoplay, `playsinline`, `loop`, an actual poster frame for slow connections, and swapped for a static image entirely under `prefers-reduced-motion`. A soft gradient overlay (dawn-bg, transparent to ~40% opaque) at the bottom third keeps the headline legible without flattening the footage.

Copy:
- Eyebrow: `DAWN`
- H1: **"Stillness, Before the World Wakes"**
- Subhead: "A practice built around breath, light, and the hour before everything else begins."
- Primary CTA: "Begin Your Practice" · Secondary: "View Schedule"
- Scroll cue: thin vertical line + "BREATHE & SCROLL", same device as before, it's a good detail, keep it

The arc begins here as a small glowing point low in the left margin, barely visible, the first sign of the device the rest of the page will pay off.

### Section 2 — Morning: The Practice
Eyebrow: `MORNING`. H2: **"Movement as Meditation"**. Short intro paragraph (2-3 sentences) on what the practice means here, followed by three bento-style value cards, not stock icons-on-white, give each a subtle textured background and a one-line description:

- **Breath** — "Every pose begins and ends with it. It is the practice beneath the practice."
- **Presence** — "No mirrors, no performance. Just attention, returned to the body."
- **Strength** — "The quiet kind. Built slowly, held with patience."

One supporting photo anchors the right or left column (real studio photography, candid, not posed-for-stock). The arc continues rising through this section, label ticks past as it crosses the midline.

### Section 3 — Midday: horizontal scroll
This is the one explicitly horizontal-scrolling section, pinned, panels move left as the user scrolls down.

Eyebrow: `MIDDAY`. H2 sits fixed at the top-left of the pinned viewport: **"A Practice for Every Body"**. Five or six panels scroll through underneath/beside it, each a class type with a photo, name, one-line description, and a level/duration tag:

1. Vinyasa Flow — "Breath-led movement, building heat." · All levels · 60 min
2. Yin & Restorative — "Long holds, deep release." · All levels · 75 min
3. Breathwork — "Pranayama as its own practice." · Beginner friendly · 30 min
4. Prenatal — "Gentle, supported, made for this season." · All trimesters · 45 min
5. Beginners' Foundations — "Where everyone starts." · New students · 60 min
6. Private Sessions — "One-on-one, paced to you." · By appointment

The arc runs along the top edge of this section as a near-horizontal line at its highest point, visually reading as midday's high sun, and the small glow mark sits at its peak here.

### Section 4 — Afternoon: editorial pause
One large, atmospheric photograph (full width or near-full width), a teaching line set over or beside it in the pull-quote italic style, color overlay warms toward the afternoon terracotta tint. This is the calmest, least busy section on the page, deliberately, it's the "breath" of the layout after the horizontal section's density.

Pull-quote: **"The pose is not the point. What you find inside it is."**

Subtle parallax only, the photo drifts at roughly 0.3-0.4x scroll speed behind the text, the text itself stays still once revealed.

### Section 5 — Late afternoon: community
Eyebrow: `COMMUNITY`. H2: **"Held by More Than a Room"**. A small stat row (placeholders, swap for real numbers): "12 years teaching" · "2,400+ students" · "30 classes a week". Below it, a bento-style grid of 3-4 short member quotes (placeholders, replace with real testimonials, do not fabricate attributed quotes for production):

- "I came for flexibility. I stayed for the stillness." — placeholder, member since 2022
- "The only hour of my week where my phone doesn't matter." — placeholder, member since 2023

### Section 6 — Dusk: closing CTA, studio promotion
Full-bleed `--dusk-bg`, this is the second darkest moment on the page and the most important conversion point, the studio's actual promotion lives here.

Eyebrow: `DUSK`. H2 (kinetic, the second of the two deliberate kinetic moments): **"Come As You Are"**. Short inviting paragraph, then the practical promotion content: studio address, hours, and two CTAs, "Book Your First Class" (primary, accent-glow fill) and "View Schedule" (secondary, outline). The arc completes here, the glow mark settles low and brightens slightly before fading, like the sun actually setting, then the line ends a clean 40-60px above the footer boundary, never bleeding into it.

### Footer (unchanged structure, refined)
`--dusk-bg-2`, one shade deeper than the closing CTA so the two dark sections still feel distinct. Same three-column structure as before, Studio / Explore / Connect, copyright line, social links.

---

## 5. The arc, technical spec

One persistent SVG path spans the full document height, positioned in a fixed-width margin column (works well pinned to one side on desktop, collapses to a simple vertical progress line on mobile, see section 8). It is drawn progressively and carries a traveling glyph, both driven by a single master ScrollTrigger over the whole page, this is the one element on the page that's allowed to scrub continuously with raw scroll position, it's a smooth vector path, not a discrete frame set, so it can't jitter the way a sprite sequence would.

```js
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
  },
})
  .from("#arc-path", { drawSVG: "0%", ease: "none" }, 0)
  .to("#arc-glyph", {
    motionPath: {
      path: "#arc-path",
      align: "#arc-path",
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
    },
    ease: "none",
  }, 0)
  .to("#arc-glyph", {
    filter: "drop-shadow(0 0 12px var(--accent-glow))",
    ease: "none",
  }, 0); // glow intensifies slightly toward the dusk end of the path

// background color shift, tied to the same scroll range, interpolating
// through the section tokens as each one's trigger fires
sections.forEach((section) => {
  gsap.to(section, {
    backgroundColor: section.dataset.bg,
    scrollTrigger: { trigger: section, start: "top center", end: "bottom center", scrub: true },
  });
});
```

The path itself should be drawn as a real, gentle arc, not a generic zigzag, build it as 2-3 smooth cubic-bezier segments rising from the hero, crowning near the horizontal-scroll section, and descending into the closing section, recalculated on resize (`invalidateOnRefresh: true`) so it stays proportional to the actual rendered section heights rather than a fixed pixel path.

---

## 6. Horizontal scroll section, technical spec

```js
const track = document.querySelector("#midday-track");
const panels = gsap.utils.toArray("#midday-track .panel");

gsap.to(track, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#midday-section",
    pin: true,
    scrub: 1,
    end: () => "+=" + track.offsetWidth,
    invalidateOnRefresh: true,
  },
});
```

Give the panels a small internal depth cue, the photo inside each panel can drift at a slightly different x-speed than the panel's text/tag (photo at 1x the track's movement, text and tag pinned to the panel itself), it's a small touch but it keeps the section from feeling like a flat slideshow.

---

## 7. Section pacing and reveal pattern

No character to desynchronize from scroll anymore, so the strict pin-and-hold discipline from the previous build matters less, but the "settle and breathe" pacing is still what makes a scroll feel premium rather than busy. Use scroll-snap between major sections so the page settles fully into one before allowing the next:

```js
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom top",
  snap: { snapTo: 1, duration: 0.6, ease: "power1.inOut" },
});
```

Within each section, content reveals once on enter, staggered fade-up (y: 24px, stagger 0.08s, ease power2.out), not scrubbed, scrubbing text in and out while someone is mid-read is exactly the choppy feeling the previous build had, don't reintroduce it here just because the character is gone.

Parallax speed reference for everything else allowed to move continuously:
```
ambient grain / arc glow trail   : ~0.05-0.1x scroll
hero video                        : slow ambient zoom (scale 1 -> 1.08), time-based not scroll-based
section photography               : ~0.3-0.4x scroll
horizontal-section internal photo : track speed (1x of the horizontal tween, see section 6)
text blocks                       : reveal once on enter, then static
the arc + glyph                   : continuous, tied to total page scroll (see section 5)
```

---

## 8. Components

- **Buttons**: pill-shaped, accent border + transparent fill as default (matches existing "Begin Journey"), accent-glow solid fill for the one primary conversion CTA at dusk, that's the only solid-fill button on the page, reserve it.
- **Value/bento cards**: soft rounded corners (16-20px), subtle 1px border in `--line`, faint grain texture, no heavy shadow, these should look like cards cut from warm paper, not floating glass.
- **Glassmorphism**, used in exactly two places: the sticky nav once scrolled (frosted, 70% opacity), and the eyebrow/tag chips inside the horizontal-scroll panels. Subtle blur, gradient border, no heavy frosted-glass everywhere, the 2026 version of this effect is restrained, not the early heavy-blur look.
- **Quote cards**: no border, just generous whitespace and the italic pull-quote face, a thin accent-colored quotation mark, nothing else decorating them.
- **Dividers**: 1px hairline, `--line` or `--line-on-dusk`, used sparingly between stacked content blocks within a section, not as full-width section separators.
- **Stat row**: large Fraunces numerals, small uppercase label beneath, no card/border around them, they should read like a pull-quote, not a dashboard widget.

---

## 9. Imagery and texture direction

Photography brief: candid, available light, real studio and real practice, avoid the stock-photo tell of a model mid-pose staring at the camera. Wide shots of the room, hands, feet, fabric, breath made visible (steam, light through dust), close detail shots mixed with one or two wider environmental shots per section.

Video brief (hero): see section 4, short seamless loop, textural and slow, never a literal demonstration reel, this is atmosphere, not instruction.

Grain: a very subtle film-grain overlay (2-3% opacity noise texture) across light sections, this single touch does a lot of the "feels premium, not flat" work cheaply, confirmed as a recurring device on the higher-end yoga sites referenced for this brief.

Iconography: replace the character entirely with the sun-mark already in the logo as the one recurring motif, the arc glyph, small sun-ray dividers if a section genuinely needs a graphic accent, nothing else, no generic wellness clip art (lotus silhouettes, zen circles), the brand already has its symbol.

---

## 10. Accessibility and responsive notes

- `prefers-reduced-motion`: hero video becomes a static poster frame, the arc still draws but without the glow pulse, all scrub animations fall back to simple opacity fades, the horizontal-scroll section becomes a normal vertical stack of panels.
- The arc collapses to a simple vertical accent line with a moving dot on mobile, full curved-path geometry is a desktop flourish, not a mobile requirement.
- Horizontal scroll section on touch devices: either keep native horizontal swipe within the pinned track, or stack panels vertically below a certain breakpoint, test both, pinned-horizontal-via-vertical-scroll can feel disorienting on a touchscreen.
- All interactive targets minimum 44x44px, visible keyboard focus on every button/link, contrast-check `--ink-soft` on every background token it appears against, especially the afternoon terracotta overlay.

---

## 11. Asset manifest, all assets are final, not placeholders

Every photo, video, and icon for this build has already been shot/sourced. Use the real files directly, do not generate, mock, or placeholder any of the items below, just wire each one into the component/section it's named for. Place the collected files into this structure and naming convention (rename to match, or update the paths below to match whatever you actually named them, either is fine, just keep the mapping consistent):

```
/assets/
  video/
    hero-loop-desktop.mp4
    hero-loop-desktop.webm
    hero-loop-mobile.mp4
  photos/
    hero-poster.jpg                 -> hero section, video poster + reduced-motion fallback
    hero-poster-mobile.jpg          -> 4:5 crop for small screens
    morning-practice.jpg            -> section 2, supporting photo
    class-vinyasa-flow.jpg          -> section 3, panel 1
    class-yin-restorative.jpg       -> section 3, panel 2
    class-breathwork.jpg            -> section 3, panel 3
    class-prenatal.jpg              -> section 3, panel 4
    class-beginners.jpg             -> section 3, panel 5
    class-private-sessions.jpg      -> section 3, panel 6
    afternoon-pause.jpg             -> section 4, full-bleed editorial photo
    afternoon-pause-mobile.jpg      -> 4:5 crop for small screens
    testimonial-avatar-01.jpg       -> section 5 (only if real member photos were collected)
    testimonial-avatar-02.jpg
    testimonial-avatar-03.jpg
    dusk-cta-bg.jpg                 -> section 6 background (only if shot, otherwise leave unset and use --dusk-bg flat color, that's the default, not a fallback)
    og-share.jpg                    -> 1200x630, social link previews
  icons/
    sun-mark.svg                    -> existing logo, nav + footer
    arc-glyph.svg                   -> traveling mark on the scroll arc
    mark-breath.svg                 -> value card 1
    mark-presence.svg               -> value card 2
    mark-strength.svg               -> value card 3
    arrow-left.svg                  -> horizontal scroll section nav
    arrow-right.svg
  favicon/
    favicon.ico
    apple-touch-icon.png
    icon-512.png
```

If any optional asset wasn't collected (dusk background photo, one or more testimonial avatars), the build must degrade cleanly: skip that section's photo entirely and fall back to the flat color or text-only treatment already specified for it in sections 1 and 4 of this doc, never leave a broken image reference or an empty gray box.

Preload `hero-loop-desktop.mp4`/`.webm` and `hero-poster.jpg` before first paint so the hero never flashes unstyled. Lazy-load everything below the fold (`class-*.jpg`, `afternoon-pause.jpg`, avatars), they don't need to block initial render.

---

## 12. Deliverable

Updated section markup/components, a stylesheet implementing the token system in section 2, the GSAP/ScrollTrigger implementation described in sections 5-7, and the real asset files from section 11 wired into their named components: one master document-level arc animation, one pinned horizontal-scroll section, per-section snap and staggered reveal, all respecting reduced-motion. No character assets are referenced anywhere in this build.

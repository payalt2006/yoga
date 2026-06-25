/* ═══════════════════════════════════════════════════
   YOGA CENTRE — App.js
   GSAP ScrollTrigger + MotionPath + Lenis Smooth Scroll
   "The Arc of Light" scroll-driven experience
   ═══════════════════════════════════════════════════ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isDesktop = () => window.matchMedia("(min-width: 901px)").matches;

  /* ═══════ 1. LENIS SMOOTH SCROLL ═══════ */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ticker for perfect sync
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* ═══════ 2. REGISTER GSAP PLUGINS ═══════ */
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  /* ═══════ 3. NAV STATE ═══════ */
  const header = document.getElementById("site-header");
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "18% top",
    onLeave: () => header.classList.add("is-scrolled"),
    onEnterBack: () => header.classList.remove("is-scrolled"),
  });

  /* ═══════ 4. HERO KINETIC TITLE ═══════ */
  const heroTitle = document.querySelector(".kinetic-title");
  if (heroTitle && !prefersReducedMotion) {
    // Split text into words wrapped in spans for natural line breaks
    const text = heroTitle.textContent.trim();
    const words = text.split(/\s+/);
    heroTitle.innerHTML = "";
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = word;
      heroTitle.appendChild(span);
      if (i < words.length - 1) {
        heroTitle.appendChild(document.createTextNode(" "));
      }
    });

    // Animate characters in with stagger
    gsap.to(".kinetic-title .char", {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: { amount: 0.6, from: "start" },
      delay: 0.3,
    });

    // Subtle parallax on hero title as user scrolls away
    gsap.to(".kinetic-title", {
      yPercent: -15,
      opacity: 0.3,
      scrollTrigger: {
        trigger: "#hero",
        start: "60% top",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  }

  // Hero copy + buttons fade-up
  if (!prefersReducedMotion) {
    gsap.from(".hero-copy", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.9,
    });
    gsap.from(".hero .button-row", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.1,
    });
    gsap.from(".scroll-cue", {
      opacity: 0,
      duration: 0.6,
      delay: 1.5,
    });
    gsap.from(".hero .eyebrow", {
      opacity: 0,
      y: 10,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2,
    });
  }

  /* ═══════ 5. SECTION REVEAL ANIMATIONS ═══════ */
  // Reveal groups: each group triggers its children to animate in
  if (!prefersReducedMotion) {
    document.querySelectorAll(".reveal-group").forEach((group) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 82%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.set(group, { visibility: "visible" });

      // Find all direct children that should animate
      const eyebrow = group.querySelector(".eyebrow");
      const h2 = group.querySelector("h2");
      const p = group.querySelector(":scope > p:not(.eyebrow)");
      const blockquote = group.querySelector("blockquote");

      if (eyebrow) {
        tl.from(
          eyebrow,
          { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" },
          0
        );
      }
      if (h2) {
        tl.from(
          h2,
          { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" },
          0.1
        );
      }
      if (p) {
        tl.from(
          p,
          { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" },
          0.2
        );
      }
      if (blockquote) {
        tl.from(
          blockquote,
          { opacity: 0, y: 30, duration: 0.9, ease: "power2.out" },
          0.15
        );
      }
    });

    // Reveal individual items with stagger
    document.querySelectorAll(".reveal-item").forEach((item) => {
      gsap.set(item, { visibility: "visible", opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        },
        once: true,
      });
    });

    // Stats — count up animation
    document.querySelectorAll(".stat-item strong").forEach((el) => {
      const finalText = el.textContent;
      const num = parseInt(finalText.replace(/[^0-9]/g, ""));
      const suffix = finalText.replace(/[0-9,]/g, "");

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          gsap.from(el, {
            textContent: 0,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              const val = Math.round(
                gsap.getProperty(el, "textContent")
              );
              el.textContent =
                val.toLocaleString() + suffix;
            },
            onComplete: () => {
              el.textContent = finalText;
            },
          });
        },
        once: true,
      });
    });
  } else {
    // Reduced motion: make everything visible
    document
      .querySelectorAll(".reveal-group, .reveal-item")
      .forEach((el) => {
        el.style.visibility = "visible";
      });
  }

  /* ═══════ 6. HORIZONTAL SCROLL — MIDDAY ═══════ */
  if (isDesktop() && !prefersReducedMotion) {
    const track = document.getElementById("midday-track");
    if (track) {
      const setupHorizontalScroll = () => {
        // Kill existing ScrollTriggers for this section on resize
        ScrollTrigger.getAll()
          .filter((st) => st.vars.trigger === "#discipline" || st.vars.trigger === ".midday-section")
          .forEach((st) => st.kill());

        const totalScrollWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = totalScrollWidth - viewportWidth + 100;

        gsap.to(track, {
          x: () => -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: ".midday-section",
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => "+=" + scrollDistance,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Internal parallax on panel images
        track.querySelectorAll(".class-panel img").forEach((img) => {
          gsap.to(img, {
            xPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: ".midday-section",
              start: "center center",
              end: () => "+=" + scrollDistance,
              scrub: 1,
            },
          });
        });
      };

      setupHorizontalScroll();

      // Rebuild on resize
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (isDesktop()) {
            setupHorizontalScroll();
          }
        }, 250);
      });
    }
  } else {
    // Mobile: ensure panels are visible
    const track = document.getElementById("midday-track");
    if (track) {
      track.style.transform = "none";
    }
  }

  /* ═══════ 7. AFTERNOON PARALLAX ═══════ */
  const afternoonImg = document.querySelector(".afternoon-image img");
  if (afternoonImg && !prefersReducedMotion) {
    gsap.fromTo(
      afternoonImg,
      { scale: 1.12, yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".afternoon",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      }
    );
  }

  /* ═══════ 8. CLOSING TITLE — VARIABLE FONT WEIGHT ═══════ */
  const closingTitle = document.querySelector(".closing-title");
  if (closingTitle && !prefersReducedMotion) {
    gsap.fromTo(
      closingTitle,
      { fontWeight: 380 },
      {
        fontWeight: 680,
        ease: "power2.out",
        scrollTrigger: {
          trigger: closingTitle,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.8,
        },
      }
    );
  }

  /* ═══════ 9. BACKGROUND COLOR INTERPOLATION ═══════ */
  const sectionColors = [
    { selector: "#hero", bg: "#F4EFE6", text: "#242420" },
    { selector: "#practice", bg: "#EFE8DC", text: "#242420" },
    { selector: "#discipline", bg: "#E6DCC9", text: "#242420" },
    { selector: "#philosophy", bg: "#E6DCC9", text: "#242420" },
    { selector: "#community", bg: "#EFE8DC", text: "#242420" },
    { selector: "#begin", bg: "#2C3325", text: "#F4EFE6" },
  ];

  sectionColors.forEach(({ selector, bg, text }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(document.documentElement, {
          "--active-bg": bg,
          "--active-text": text,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
      onEnterBack: () => {
        gsap.to(document.documentElement, {
          "--active-bg": bg,
          "--active-text": text,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });
  });

  /* ═══════ 10. THE ARC OF LIGHT ═══════ */
  const arcLayer = document.querySelector(".arc-layer");
  const arcSvg = document.getElementById("arc-svg");
  const arcPath = document.getElementById("arc-path");
  const arcPathBase = document.getElementById("arc-path-base");
  const arcGlyph = document.getElementById("arc-glyph");

  function buildArc() {
    if (!arcPath || !arcSvg) return;

    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );
    const desktop = isDesktop();
    const width = desktop ? document.documentElement.clientWidth : 40;

    // Set container dimensions
    arcLayer.style.width = desktop ? `${width}px` : "40px";
    arcLayer.style.left = desktop ? "0" : "18px";
    arcLayer.style.height = `${docHeight}px`;
    arcSvg.setAttribute("viewBox", `0 0 ${width} ${docHeight}`);

    // Create the dynamic arc path
    const startY = Math.round(docHeight * 0.02);

    if (desktop) {
      // Find the exact vertical scroll range of the Midday horizontal pin
      let midStart = docHeight * 0.3;
      let scrollDist = docHeight * 0.2;

      const middaySt = ScrollTrigger.getAll().find(st => st.vars.trigger === ".midday-section" && st.vars.pin);
      if (middaySt) {
        midStart = middaySt.start;
        scrollDist = middaySt.end - middaySt.start;
      }

      const viewportH = window.innerHeight;
      // The crossing should stay at a CONSTANT vertical position (like the sun at zenith)
      // instead of going down. The pin freezes the viewport, so the path must
      // span the scroll distance vertically but appear horizontal in the viewport.
      const crossY = midStart + viewportH * 0.22; // fixed Y for the center of the crossing, positioned above images
      const crossStartY = crossY; // start of crossing
      const crossEndY = crossY + scrollDist; // end of crossing (in page-space, since page gets taller due to pin)

      const practice = document.querySelector('.practice');
      const morningY = practice ? practice.getBoundingClientRect().top + window.scrollY + (viewportH * 0.4) : docHeight * 0.2;

      const endY = docHeight - viewportH * 0.1;

      const leftX = Math.max(100, width * 0.12);
      const rightX = width - leftX;
      const midX = width * 0.5;
      const amplitude = 50;

      // ═══════ KEY MATH FOR THE CROSSING ═══════
      // The straight diagonal from (leftX, crossStartY) to (rightX, crossEndY)
      // appears as a perfectly HORIZONTAL line in the viewport during the pin.
      // 
      // Proof: viewport_Y = page_Y - scroll_position
      // On the diagonal: page_Y(t) = crossStartY + t × scrollDist
      //                  scroll(t) = midStart + t × scrollDist
      //                  viewport_Y = crossStartY - midStart = constant
      //
      // To make the arc appear to RISE (like the sun going up), we offset
      // ABOVE the diagonal (subtract from Y → smaller page Y → smaller viewport Y = higher).
      // To make it FALL, we offset BELOW (add to Y).

      // Helper: Y value on the straight diagonal at a given X position
      const diagSlope = scrollDist / (rightX - leftX);
      const diagY = (x) => crossStartY + (x - leftX) * diagSlope;

      // Arc height: how many viewport pixels the wave dips/rises
      const waveAmplitude = viewportH * 0.27;

      const centerCrossX = midX;
      const centerCrossY = diagY(midX);

      // Control points computed as offsets from the diagonal
      // First half: Valley (dips down under Vinyasa/Yin cards)
      // To dip DOWN in viewport, we ADD to the diagonal Y
      const cp1x = leftX + (midX - leftX) * 0.35;
      const cp1y = diagY(cp1x) + waveAmplitude * 1.3;
      const cp2x = midX - (midX - leftX) * 0.35;
      const cp2y = diagY(cp2x) + waveAmplitude * 1.3;

      // Second half: Hill (arches up over Breathwork/Prenatal cards)
      // To arch UP in viewport, we SUBTRACT from the diagonal Y
      const cp3x = midX + (rightX - midX) * 0.35;
      const cp3y = diagY(cp3x) - waveAmplitude * 1.3;
      const cp4x = rightX - (rightX - midX) * 0.35;
      const cp4y = diagY(cp4x) - waveAmplitude * 1.3;

      // Build dynamic path
      const d = [
        `M ${leftX - amplitude * 0.3} ${startY}`,
        // 1. Drop to Morning with deep S-sweep
        `C ${leftX - amplitude} ${startY + (morningY - startY) * 0.35},`,
        `  ${leftX + amplitude * 0.7} ${morningY - (morningY - startY) * 0.35},`,
        `  ${leftX + amplitude * 0.2} ${morningY}`,
        // 2. S-curve from morning to crossing start
        `C ${leftX - amplitude * 0.8} ${morningY + (crossStartY - morningY) * 0.45},`,
        `  ${leftX + amplitude * 0.8} ${crossStartY - (crossStartY - morningY) * 0.25},`,
        `  ${leftX} ${crossStartY}`,
        // 3. The Crossing — valley then hill
        //    First half: Valley (dips down)
        `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${centerCrossX} ${centerCrossY}`,
        //    Second half: Hill (arches up)
        `C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${rightX} ${crossEndY}`,
        // 4. Settle on right side with double sweeping descent
        // First curve: down to 50% mark
        `C ${rightX + leftX * 0.5} ${crossEndY + (endY - crossEndY) * 0.15},`,
        `  ${rightX - leftX * 0.8} ${crossEndY + (endY - crossEndY) * 0.35},`,
        `  ${rightX - leftX * 0.2} ${crossEndY + (endY - crossEndY) * 0.5},`,
        // Second curve: from 50% mark to the end
        `C ${rightX + leftX * 0.4} ${crossEndY + (endY - crossEndY) * 0.65},`,
        `  ${rightX - leftX * 1.0} ${crossEndY + (endY - crossEndY) * 0.85},`,
        `  ${rightX - leftX * 0.3} ${endY}`
      ].join(" ");

      arcPath.setAttribute("d", d);
      arcPathBase.setAttribute("d", d);
    } else {
      // Mobile: simple vertical line with subtle wave
      const cx = 20;
      const mobileEndY = docHeight - 100;
      const mobileMidY = docHeight * 0.5;
      const d = `M ${cx} ${startY} C ${cx + 8} ${mobileMidY * 0.6}, ${cx - 8} ${mobileMidY * 1.2}, ${cx} ${mobileEndY}`;
      arcPath.setAttribute("d", d);
      arcPathBase.setAttribute("d", d);
    }

    // Setup progressive draw
    const pathLength = arcPath.getTotalLength();
    if (!pathLength) return;

    // Set dasharray for progressive draw without mask
    arcPath.style.strokeDasharray = pathLength;
    arcPath.style.strokeDashoffset = pathLength;

    // Initial glyph position
    arcGlyph.style.opacity = "0.6";
    updateArcPosition(ScrollTrigger.getAll().find(st => st.vars.trigger === "body")?.progress || 0);
  }

  function updateArcPosition(progress) {
    if (!arcPath) return;
    const pathLength = arcPath.getTotalLength();
    if (!pathLength) return;

    const point = arcPath.getPointAtLength(pathLength * progress);

    // Progressive draw via stroke-dashoffset
    arcPath.style.strokeDashoffset = pathLength - (pathLength * progress);

    // Position glyph using translate for better performance
    arcGlyph.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
    arcGlyph.style.opacity = `${0.5 + progress * 0.5}`;

    if (!prefersReducedMotion) {
      const glowIntensity = 8 + progress * 14;
      const glowOpacity = 0.6 + progress * 0.3;
      arcGlyph.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(235,168,94,${glowOpacity}))`;
    }
  }

  // Master arc ScrollTrigger — tied to full document scroll
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      updateArcPosition(self.progress);
    },
  });

  /* ═══════ 11. BUILD & RESIZE ═══════ */
  function init() {
    ScrollTrigger.refresh();
    buildArc();
    ScrollTrigger.refresh();
  }

  // Build on load
  window.addEventListener("load", () => {
    requestAnimationFrame(init);
  });

  // Rebuild arc on resize
  let resizeArcTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeArcTimer);
    resizeArcTimer = setTimeout(() => {
      buildArc();
      ScrollTrigger.refresh();
    }, 200);
  });

  // Initial build
  requestAnimationFrame(init);
})();

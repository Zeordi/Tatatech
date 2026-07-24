# Year 3000 Animation System

Futuristic cinematic motion upgrade for TATATECH (Part C of the UI design prompt).

## Stack additions

- `lenis` — smooth scroll
- `framer-motion` — transitions, reveals, layout
- `@react-three/fiber` + `@react-three/drei` + `three` — hero WebGL orb (lazy-loaded)

## Motion layer

All primitives live in `src/presentation/motion/`:

| Primitive | Role |
|-----------|------|
| `SmoothScroll` | Lenis engine (lerp 0.08) |
| `PageTransition` | 8-panel route wipe |
| `SplitTextReveal` / `ScrambleText` | Headline + badge reveals |
| `MagneticButton` | Magnetic + liquid CTA feel |
| `CustomCursor` | Desktop-only cursor HUD |
| `ParallaxLayer` | Depth parallax |
| `ParticleField` | Dark-mode constellation canvas |
| `ScrollProgressHUD` | Top beam + circular % ring |
| `SectionEntrance` | Choreographed section reveals |
| `HeroBoot` / `HeroScene` | Hero intro + 3D centerpiece |
| `CinematicTimeline` / `Odometer` | About documentary timeline |

## Accessibility

`prefers-reduced-motion` disables smooth scroll, particles, custom cursor, magnetic effects, boot sequence, and 3D tilt — falling back to simple fades.

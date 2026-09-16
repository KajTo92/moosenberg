# AUREL · Moosenberg 12

Phase-one interactive residential showroom. Fictional Space Code portfolio concept; no real developer, location claims, rental inventory, or enquiry backend.

## Run

Node.js 22.18+ (or Node.js 24+) and pnpm 11+ recommended.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. The development server uses `.next-dev`; production uses `.next`, so build checks can run beside the preview.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
```

## Assets

- Video: `public/video/moosenberg-experience.mp4` (already supplied, approximately 18.73 seconds, 1920×1080).
- Poster: `public/images/moosenberg-poster.webp` (extracted from the supplied film).
- Elevator background: `public/images/buttons.jpg` (1672 x 941).
- Illuminated elevator overlays: `public/images/button1.png` through `button4.png`, plus `buttonug.png`.
- Floor plan currently available: `public/images/stock3.jpg`, mapped to level `03`.
- Browser paths omit `public`: `/video/moosenberg-experience.mp4` and `/images/moosenberg-poster.webp`.

Keep the MP4 seek-friendly, with frequent keyframes and fast-start metadata. Serve byte-range requests and the correct MIME type. Replacing the film does not require changing duration constants: the controller waits for loaded metadata. Re-tune story timing against any replacement film. The original video is unchanged.

## Cinematic controls

`src/features/cinematic-experience/config/story.ts` owns copy, normalized beat intervals, asset paths, and scroll parameters.

- `desktopScrollScreens: 5.5`: 550vh of scroll travel plus the 100svh stage.
- `mobileScrollScreens: 3.2`: 320vh of travel plus the stage.
- `filmEnd: 0.82`: the film finishes at 82% of scroll travel. The remainder holds the last decoded frame.
- `elevatorStart` / `elevatorInteractive`: interface fade and interaction thresholds in overall scroll progress.
- Beat `start` / `end` refer to normalized **film** progress; they remain independent of scroll length and video duration.

`useVideoScrub` owns GSAP ScrollTrigger, metadata readiness, seek coalescing, frame scheduling and cleanup. CSS sticky owns the stage geometry. This deliberately avoids JavaScript pin spacers and layout jumps while using ScrollTrigger for progress and resize handling. Video time, opacity and progress-line transforms are direct DOM/ref updates; React state changes only for readiness and interaction thresholds. Only one seek is issued at a time. rAF sleeps once the target is reached and while the document is hidden.

The film crossfades to `buttons.jpg` over the final scroll interval. Elevator overlay positions live in `src/features/elevator/config/hotspots.ts` as percentages of the 1672 x 941 source image. Adjust `x` and `y` there to retune alignment. The CSS projection uses the same source aspect ratio and focal point as `background-size: cover`, so the overlays remain attached to the photographed controls across viewport sizes. PNG overlays appear on hover/focus and remain visible for the selected floor.

Touch-width layouts shorten travel and limit seeking frequency. Media errors, metadata timeout and stalled seeks retain the decoded image/poster and offer direct access. Reduced motion loads no video source, collapses the long journey and retains the poster and residence access. Skip does not require metadata to finish loading.

## Residence architecture

- `src/data/property.ts`: project details and all 15 fictional apartments, CHF formatting, exact elevator ordering.
- `src/types/property.ts`: level, apartment and renderer-independent building-selection types.
- `src/components/layout/Showroom.tsx`: discrete selection and interest-dialog orchestration. No per-frame React state, Redux or global store.
- `src/features/elevator`: tactile, keyboard-operable native floor buttons, separated from video positioning.
- `src/features/floor-selector`: floor switching and replaceable schematic SVG presentation. The region coordinates live only in `FloorPlanViewer`; no selection logic depends on them.
- `src/features/apartment-selector`: data-driven detail panel.
- `src/app/residences/[unit]/page.tsx`: prerendered preview pages for every unit, with proper 404 handling.
- `src/components/layout/InterestDialog.tsx`: lazily loaded native dialog with browser validation, focus containment and Escape dismissal. Form submission is a local preview; it sends and stores nothing.

The location content is server-rendered and passed into the client showroom as children. All routes are statically prerendered. Web-safe Helvetica/Arial avoids font requests. Both light and dark color schemes use semantic tokens.

## Placeholder boundaries

Plans are explicitly labelled conceptual arrangements, not architectural documentation. Apartments, sizes, prices, status and garage amenities are fictional. Apartment exploration routes and the contact form are prepared previews. The exact location remains unspecified. No fake travel times, photography or generated video have been added.

## Next phase: interactive GLB building + exploded floors

`src/features/building-3d/model-contract.ts` defines `Building_Base`, `Roof`, `UG`, and `Floor_01` through `Floor_04`. `BuildingExperience3D.tsx` is a prepared renderer placeholder, intentionally absent from the initial bundle.

Add Three.js / React Three Fiber / Drei when a real GLB is supplied. Dynamically import the renderer only on entry to building exploration, consume `BuildingSelection`, and map GLB nodes to the same level and apartment IDs. Keep the accessible schematic renderer as fallback. Then implement floor hover, exploded floors and camera transitions. No 3D runtime or model is included now.

## Verification

- Strict TypeScript, ESLint, Node unit tests, and Next.js production build.
- Browser: forward/reverse scrubbing, sticky stage, final frame, skip, keyboard floor/unit selection, UG, top-floor count, unit details, availability filter, demo form.
- Mobile: 390×844 viewport, zero page overflow, intentional detail scrolling, large floor controls.
- Reduced-motion and light-theme branches were exercised by temporarily forcing their media conditions during development; normal system preference detection was restored.
- Browser testing is on the available in-app browser. Real iPhone Safari and Chrome hardware/performance profiling remain recommended before public launch. No Lighthouse score or Core Web Vitals guarantee is claimed.

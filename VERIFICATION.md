# Verification procedure

1. `npm ci` then `npm run build` and `npm run typecheck`.
2. Serve the generated `out/` directory with a static HTTP server.
3. Inspect 480, 768, 1024 and 1440 pixel viewports for horizontal overflow and keyboard focus.
4. Select each capability by keyboard and touch; its description and connected paths must change.
5. Check reduced-motion before load and while open: stop the lattice, unpin scenarios, show all content.
6. Hide the tab and scroll canvases offscreen: animation must stop.
7. Canvas `data-render-ms` reports CPU submission time only, not GPU time or full frame time. Do not present it as a 60fps guarantee.
8. Form navigation opens a prefilled GitHub issue. It does not store or submit a lead automatically.
9. Lighthouse measurements must use a production build and record device, throttling and date. Real-user INP requires production traffic.

## 2024-05-11 - [Bento Flow Accessibility]
**Learning:** High-density modular dashboards (Bento grids) with frequent state updates can be overwhelming for screen readers if not properly managed. Relying purely on visual flow indicators (flashes/flows) excludes non-visual users.
**Action:** Implement ARIA labels that describe both the agent role and its current state (e.g., "Scripting Agent: Working"). Use `motion.button` instead of `motion.div` for tiles to ensure native keyboard focus and "Enter" key support.

## 2024-05-11 - [Contextual Overlays & Focus]
**Learning:** Large overlays in modular dashboards need explicit focus management and keyboard shortcuts (ESC) to avoid trapping users.
**Action:** Added global 'Escape' key listener to the `AgentDetailOverlay` and ensured all modal triggers (Bento Tiles, Minimap dots) are accessible buttons.

## 2024-05-11 - [Thematic Consistency]
**Learning:** Brand identity (Brand Kit) should be deeply integrated into the UX, not just a skin.
**Action:** Implemented a `BrandKit` module that synchronizes colors across "Flow Indicators," "Master Previewer," and "Agent Tiles" to reinforce brand ownership throughout the automated process.

## 2026-06-22 - [Keyboard Accessible Hover Overlays]
**Learning:** Overlays that only appear on `:hover` (like video controls) are inaccessible to keyboard and screen reader users unless they are also triggered by focus. Using `group-focus-within` allows these hidden controls to become visible when any internal button receives focus via Tabbing.
**Action:** Refactored `MasterPreviewer` controls to use `group-focus-within:translate-y-0` and semantic buttons, ensuring full keyboard navigability for the preview experience.

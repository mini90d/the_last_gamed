## 2024-05-11 - [Bento Flow Accessibility]
**Learning:** High-density modular dashboards (Bento grids) with frequent state updates can be overwhelming for screen readers if not properly managed. Relying purely on visual flow indicators (flashes/flows) excludes non-visual users.
**Action:** Implement ARIA labels that describe both the agent role and its current state (e.g., "Scripting Agent: Working"). Use `motion.button` instead of `motion.div` for tiles to ensure native keyboard focus and "Enter" key support.

## 2024-05-11 - [Contextual Overlays & Focus]
**Learning:** Large overlays in modular dashboards need explicit focus management and keyboard shortcuts (ESC) to avoid trapping users.
**Action:** Added global 'Escape' key listener to the `AgentDetailOverlay` and ensured all modal triggers (Bento Tiles, Minimap dots) are accessible buttons.

## 2024-05-11 - [Thematic Consistency]
**Learning:** Brand identity (Brand Kit) should be deeply integrated into the UX, not just a skin.
**Action:** Implemented a `BrandKit` module that synchronizes colors across "Flow Indicators," "Master Previewer," and "Agent Tiles" to reinforce brand ownership throughout the automated process.

## 2024-05-11 - [Hidden Overlays & Keyboard Navigation]
**Learning:** Overlays that only appear on hover (like video controls) are invisible to keyboard users. Relying purely on `aria-label` for screen readers is not enough if the interactive elements aren't visually accessible during navigation.
**Action:** Used `group-focus-within:translate-y-0` (paired with `group-hover`) in `MasterPreviewer.tsx` to ensure controls are revealed when tabbed into. Always pair `aria-label` with `title` for compact interactive status dots to provide both screen reader support and mouse tooltips without redundant text.

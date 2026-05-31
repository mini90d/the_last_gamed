## 2024-05-11 - [Bento Flow Accessibility]
**Learning:** High-density modular dashboards (Bento grids) with frequent state updates can be overwhelming for screen readers if not properly managed. Relying purely on visual flow indicators (flashes/flows) excludes non-visual users.
**Action:** Implement ARIA labels that describe both the agent role and its current state (e.g., "Scripting Agent: Working"). Use `motion.button` instead of `motion.div` for tiles to ensure native keyboard focus and "Enter" key support.

## 2024-05-11 - [Contextual Overlays & Focus]
**Learning:** Large overlays in modular dashboards need explicit focus management and keyboard shortcuts (ESC) to avoid trapping users.
**Action:** Added global 'Escape' key listener to the `AgentDetailOverlay` and ensured all modal triggers (Bento Tiles, Minimap dots) are accessible buttons.

## 2024-05-11 - [Thematic Consistency]
**Learning:** Brand identity (Brand Kit) should be deeply integrated into the UX, not just a skin.
**Action:** Implemented a `BrandKit` module that synchronizes colors across "Flow Indicators," "Master Previewer," and "Agent Tiles" to reinforce brand ownership throughout the automated process.

## 2024-05-11 - [Focus-Within for Interaction]
**Learning:** Hover-triggered overlays (like video controls) are inaccessible to keyboard users unless they can also be triggered via focus.
**Action:** Used `group-focus-within` on the parent container and converted raw icons to semantic `<button>` elements to ensure controls remain visible and interactive during keyboard navigation.

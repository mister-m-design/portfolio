# Private CMS Editor Guide

## Current editor version
- **Version:** `v2.2.0`
- **File:** `editor.html`
- **Updated:** 2026-02-12

## How to verify you are on the latest editor
1. Open `/editor.html`.
2. Unlock with your key.
3. In the CMS dock, confirm you see: **Editor version: v2.2.0**.
4. If not, hard refresh (`Cmd/Ctrl + Shift + R`).

## Card editing behavior (important)
When **Card edit mode: On**:
- Rollover interactions are disabled for work cards.
- Cards show a cyan outline.
- Each card shows an **Edit card** badge.
- Clicking a card (or the badge) opens the project inspector instead of opening modal video playback.

When **Card edit mode: Off**:
- Normal site hover/rollover behavior is restored.
- Card click behaves like the public site.

## Publish workflow
- **Save state**: stores local browser edits and pushes live preview updates.
- **Apply to index.html**: writes changes directly to a selected local file (supported browsers).
- **Download index.html**: fallback export of updated site file.

## Troubleshooting
- If cards still feel non-clickable, ensure **Card edit mode: On**.
- If the version label is old/missing, hard refresh and reopen editor.
- If overlays block UI, drag or hide the CMS/Inspector panels.

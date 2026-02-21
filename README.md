# Color Inverter Extension

A simple Chrome extension that inverts the colors of all websites you visit to provide a dark-mode like experience.

## How to Install

1. Open Google Chrome or any Chromium-based browser (e.g., Brave, Edge).
2. Navigate to `chrome://extensions/` in your address bar.
3. Enable **Developer mode** by clicking the toggle switch in the top right corner.
4. Click the **Load unpacked** button in the top left.
5. Select the directory containing this extension (`/home/user/code/foxreymann/invert` or the folder you downloaded it to).
6. The extension is now installed and active! It will automatically invert colors on all websites.

## Development

Currently, this extension uses a very simple content script mechanism to inject CSS into every page.
The core of the logic is in `content.css`:
```css
html {
  filter: invert(1) !important;
}
```
No build steps are required. Simply edit the files, and click the "Reload" icon on the extension card in `chrome://extensions/` to apply updates.

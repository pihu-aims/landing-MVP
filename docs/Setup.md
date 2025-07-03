# Software Setup

This page describes how to set up each tool used for this project

> [!IMPORTANT]  
> Feel free to edit this markdown document for corrections. If you have tested an unverified
> setup guide and it works, remove the warning tag in the section.

## Figma

Instructions for how to log into to the Figma design document.

1. Log in to your Figma account using your ``@aims.team`` email account. Do this by the "sign in to Google" option on Figma.
2. Join the following link : https://www.figma.com/design/p3MsQvOFT6EFndGbYYWn3d/AIMS?node-id=0-1&p=f&t=OQSWwSatH6ILXEVi-0

## React/Next.js

> [!WARNING]  
> Instructions not yet verified by another user.

> [!WARNING]  
> This section is most likely not complete

1. Install dependencies
```bash
npm install
```
2. Run the development Server
```bash
npm run dev
```
## Lighthouse

For further information, the `lighthouse` source repository can be found [here](https://github.com/GoogleChrome/lighthouse).

> [!NOTE]  
> Lighthouse is already included in ``InvestorWebsite/package.json``, so these instructions are mostly used as a contingency.

> [!WARNING]  
> Instructions not yet verified by another user.

> [!WARNING]  
> This section is most likely not complete

1. Install dependencies
```bash
npm install -g lighthouse
```
2. Use
```bash
lighthouse [website name]
```
such as
```bash
lighthouse http://localhost:[PORT] --view
```
This generates a full report and opens it in your browser

### Using lighthouse in programs

> [!WARNING]  
> This section is not yet verified by another user. Made using ChatGPT.

Run
```bash
npm install --save-dev lighthouse
```

Then use
```js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
const options = { port: chrome.port };
const runnerResult = await lighthouse('http://localhost:5173', options);

console.log(runnerResult.lhr.categories.performance.score);
await chrome.kill();
})();
```

### Output Options
- HTML (default)
- JSON (--output json)
- CSV (--output csv)

Example usage:
```bash
lighthouse http://localhost:[PORT] --output html --output-path report.html
```
Where this command prints the output in an `.html` file.

## Axe core

> [!NOTE]  
> Axecore is already included in ``InvestorWebsite/package.json``, so these instructions are mostly used as a contingency.

> [!WARNING]  
> Instructions not yet verified by another user. THe code snippet was made using chatGPT.

> [!WARNING]  
> This section is most likely not complete

1. Install dependencies
```bash
npm install -g aze-core
npm install -g @axe-core/react
```

Add consitionally during development

```js
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  const React = require('react');
  const ReactDOM = require('react-dom');

  axe(React, ReactDOM, 1000);
}
```

## Jest

## Playwright

## Tailwind CSS

## Supabase

## GitHub Actions

## JWT

## ReactFlow

## Zustland

## ffmpeg
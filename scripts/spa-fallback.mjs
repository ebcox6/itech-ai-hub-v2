// GitHub Pages has no SPA rewrites. Serving index.html as 404.html lets deep links like
// /prompts/msp-qbr-agenda load the app, which then routes on the client.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
console.log('Copied dist/index.html to dist/404.html');

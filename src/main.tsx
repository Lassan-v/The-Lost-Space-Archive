import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppShell } from './components/layout/AppShell';
import './styles/main.css';
import missionSprite from './assets/sprites/mission-character-poses.svg?raw';
import sparkSprite from './assets/sprites/spark-poses.svg?raw';

// Character art lives in two SVG sprites. They are inlined into the page once
// so <use href="#id"> works from any host, including opening index.html directly.
const spriteHost = document.createElement('div');
spriteHost.setAttribute('aria-hidden', 'true');
spriteHost.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
spriteHost.innerHTML = missionSprite + sparkSprite;
spriteHost.querySelectorAll('svg').forEach((svg) => {
  svg.removeAttribute('role');
  svg.removeAttribute('aria-labelledby');
  svg.setAttribute('focusable', 'false');
});
document.body.prepend(spriteHost);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
);
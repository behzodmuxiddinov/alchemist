import './style.css';
import { setupCounter } from './counter.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <p>alchemist</p>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

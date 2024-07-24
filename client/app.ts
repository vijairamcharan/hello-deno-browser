import { emojify } from "https://cdn.jsdelivr.net/npm/node-emoji@2/+esm";
import * as react from "https://cdn.jsdelivr.net/npm/react/+esm";
import * as reactDom from "https://cdn.jsdelivr.net/npm/react-dom/+esm";
import Greeting from "./Greeting.tsx";

export function greet(name: string): string {
  return `Hello, ${name} ${emojify(":t-rex: :heart: NPM")}!`;
}

export function render() {
  document.body.innerHTML = '<div id="app"></div>';
  const root = reactDom.createRoot(document.getElementById("app"));
  const element = react.createElement("div", null, greet("Deno"));
  // root.render(element);
  root.render(react.createElement(Greeting));

  // reactDom.render(element, document.getElementById("root"));
}

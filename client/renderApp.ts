import * as react from "https://cdn.jsdelivr.net/npm/react/+esm";
import * as reactDom from "https://cdn.jsdelivr.net/npm/react-dom/+esm";
import App from "./App.tsx";

export function render() {
  document.body.innerHTML = '<div id="app"></div>';
  const root = reactDom.createRoot(document.getElementById("app"));
  root.render(react.createElement(App));
}

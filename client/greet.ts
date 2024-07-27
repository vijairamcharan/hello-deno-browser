import { emojify } from "https://cdn.jsdelivr.net/npm/node-emoji@2/+esm";

export function greet(name: string): string {
  return `Hello, ${name} ${emojify(":t-rex: :heart: NPM")}!`;
}

import { emojify } from "https://esm.run/node-emoji@2";

export function greet(name: string): string {
  return `Hello, ${name} ${emojify(":t-rex: :heart: NPM")}!`;
}

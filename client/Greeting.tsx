import React from "https://cdn.jsdelivr.net/npm/react/+esm";
import { greet } from "./app.ts";

const Greeting = () => {
  return <h1>{greet("TSX!!!")}</h1>;
};

export default Greeting;

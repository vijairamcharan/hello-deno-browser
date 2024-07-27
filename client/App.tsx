import React from "https://cdn.jsdelivr.net/npm/react/+esm";
import { greet } from "./greet.ts";

const App = () => {
  return (
    <div style={{ padding: 16 }}>
      <h1>{greet("TSX!!!")}</h1>
    </div>
  );
};

export default App;

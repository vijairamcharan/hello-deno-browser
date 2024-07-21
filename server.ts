import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { extname } from "https://deno.land/std@0.192.0/path/mod.ts";
import { transpile } from "https://deno.land/x/emit/mod.ts";
import { emojify } from "npm:node-emoji@2";

// Define MIME types for various file extensions
const mimeTypes: { [key: string]: string } = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".ts": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".wasm": "application/wasm",
};

// Create Oak application and router
const app = new Application();
const router = new Router();

router.get("/api/:path*", async (context) => {
  const apiPath = `./api/${context.params.path}.ts`;
  try {
    const { get } = await import(apiPath);
    if (get) {
      const response = await get();
      context.response.status = 200;
      context.response.headers.set("Content-Type", "application/json");
      context.response.body = JSON.stringify(response);
    } else {
      context.response.status = 405;
      context.response.body = "Method Not Allowed";
    }
  } catch (err) {
    console.error(err);
    context.response.status = 404;
    context.response.body = "API handler not found";
  }
});

router.post("/api/:path*", async (context) => {
  const apiPath = `./api/${context.params.path}.ts`;
  try {
    const { post } = await import(apiPath);
    if (post) {
      const body = await context.request.body({ type: "json" }).value;
      const response = await post(body);
      context.response.status = 200;
      context.response.headers.set("Content-Type", "application/json");
      context.response.body = JSON.stringify(response);
    } else {
      context.response.status = 405;
      context.response.body = "Method Not Allowed";
    }
  } catch (err) {
    console.error(err);
    context.response.status = 404;
    context.response.body = "API handler not found";
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Serve static files
app.use(async (context) => {
  console.log(emojify(":t-rex: :heart: NPM SERVER"));

  const filePath = `./client${context.request.url.pathname}`;
  const fileExt = extname(filePath);
  const contentType = mimeTypes[fileExt] || "application/octet-stream";

  try {
    let fileContent;
    if (fileExt === ".ts") {
      console.log("Transpiling TypeScript file:", filePath);
      const url = new URL(filePath, import.meta.url);
      const result = await transpile(url);
      fileContent = await result.get(url.href);
    } else {
      fileContent = await Deno.readFile(filePath);
    }

    context.response.status = 200;
    context.response.headers.set("Content-Type", contentType);
    context.response.body = fileContent;
  } catch (err) {
    console.error(err);
    context.response.status = 404;
    context.response.body = "File not found";
  }
});

console.log(
  "HTTP server running. Access it at: http://localhost:8000/index.html"
);
await app.listen({ port: 8000 });

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { extname } from "https://deno.land/std@0.192.0/path/mod.ts";
import { transpile } from "https://deno.land/x/emit/mod.ts";
import { emojify } from "npm:node-emoji@2";

const mimeTypes: { [key: string]: string } = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".ts": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".wasm": "application/wasm",
};

async function handler(req: Request): Promise<Response> {
  console.log(emojify(":t-rex: :heart: NPM SERVER"));

  const url = new URL(req.url);
  const filePath = `.${url.pathname}`;
  const fileExt = extname(filePath);
  const contentType = getContentType(fileExt);

  try {
    const fileContent = await getFileContent(filePath, fileExt);
    return new Response(fileContent, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error(err);
    return new Response("File not found", { status: 404 });
  }
}

function getContentType(fileExt: string): string {
  return mimeTypes[fileExt] || "application/octet-stream";
}

async function getFileContent(
  filePath: string,
  fileExt: string
): Promise<Uint8Array | string> {
  if (fileExt === ".ts") {
    console.log("Transpiling TypeScript file:", filePath);
    const url = new URL(filePath, import.meta.url);
    const result = await transpile(url);
    console.log("Transpiled result");
    return await result.get(url.href);
  } else {
    return await Deno.readFile(filePath);
  }
}

console.log(
  "HTTP server running. Access it at: http://localhost:8000/index.html"
);
serve(handler, { port: 8000 });

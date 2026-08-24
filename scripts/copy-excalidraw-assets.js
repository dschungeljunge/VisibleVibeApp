const fs = require("fs");
const path = require("path");

const source = path.join("node_modules", "@excalidraw", "excalidraw", "dist");
const publicDir = "public";

for (const folder of ["excalidraw-assets", "excalidraw-assets-dev"]) {
  const from = path.join(source, folder);
  const to = path.join(publicDir, folder);
  if (!fs.existsSync(from)) continue;
  fs.cpSync(from, to, { recursive: true });
}

console.log("Excalidraw-Assets kopiert.");

const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/handlers/*"],
    bundle: true,
    outdir: "resources/dist/",
    loader: { ".node": "file" },
    sourcemap: "inline",
    outbase: "src/",
    platform: "node",
    treeShaking: true,
    minify: true,
    target: "node22",
    format: "cjs",
    legalComments: "none",
    tsconfig: "tsconfig.json",
  })
  .then((res) => console.log(res))
  .catch((err) => {
    console.log("ERROR ESBUILD: ", err);
    process.exit(1);
  });

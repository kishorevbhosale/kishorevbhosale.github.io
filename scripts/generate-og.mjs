// Generates public/opengraph-image.png (1200x630) and public/apple-icon.png (180x180).
// Run with: node scripts/generate-og.mjs
import { writeFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const shield = (size) =>
  h(
    "svg",
    { viewBox: "0 0 48 56", width: size, height: (size * 56) / 48 },
    h("path", { d: "M24 2 4 9v16c0 13.2 8.4 24.6 20 29 11.6-4.4 20-15.8 20-29V9L24 2Z", fill: "#0b2150", stroke: "#fff", strokeWidth: 3, strokeLinejoin: "round" }),
    h("rect", { x: 14, y: 13, width: 17, height: 22, rx: 2, fill: "#fff" }),
    h("path", { d: "M17.5 19h10M17.5 23.5h10M17.5 28h6", stroke: "#0f2a5c", strokeWidth: 2, strokeLinecap: "round" }),
    h("path", { d: "M13 37.5c6.5 1.5 12-1 16-7.5 2.6-4.2 5.8-6.8 9.5-7.8-1.6 8.8-7 16.6-14.5 19.8-4 1.7-8 .5-11-4.5Z", fill: "#3fae49" }),
    h("path", { d: "m18 36 3.6 3.4L33 27.5", fill: "none", stroke: "#fff", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" }),
  );

const chip = (text) =>
  h("div", { style: { display: "flex", padding: "10px 20px", borderRadius: 10, background: "#fff", color: "#0f2a5c", fontSize: 24, fontWeight: 700 } }, text);

const og = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(120deg, #0b2150 0%, #0f2a5c 55%, #183a78 100%)",
      color: "#fff",
      padding: "70px 80px",
      position: "relative",
    },
  },
  h("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 14, background: "#f26b1d" } }),
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 20 } },
    shield(70),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h("div", { style: { fontSize: 46, fontWeight: 700 } }, "Aaradhya"),
      h("div", { style: { fontSize: 18, opacity: 0.8 } }, "Management System Consultancy Services"),
    ),
  ),
  h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        marginTop: 50,
        padding: "10px 20px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.08)",
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 3,
        alignSelf: "flex-start",
      },
    },
    h("div", { style: { width: 12, height: 12, borderRadius: 99, background: "#f26b1d", marginRight: 12 } }),
    "FSSAI COMPLIANCE EXPERTS",
  ),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column", marginTop: 26, fontSize: 64, fontWeight: 800, lineHeight: 1.08 } },
    h("span", null, "Your FSSAI Compliance Partner"),
    h("span", { style: { color: "#f68a4b" } }, "— Pan India"),
  ),
  h("div", { style: { display: "flex", gap: 14, marginTop: 32 } }, chip("18+ Years"), chip("500+ Licenses"), chip("FSSC 22000 · BRCGS · HACCP")),
  h(
    "div",
    { style: { position: "absolute", bottom: 36, left: 80, right: 80, display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.85 } },
    h("span", null, "Licensing · Audits · FoSTaC · Certification"),
    h("span", null, "aaradhyaconsultancy.com"),
  ),
);

const apple = h(
  "div",
  { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f2a5c" } },
  shield(112),
);

const save = async (el, w, hgt, file) => {
  const res = new ImageResponse(el, { width: w, height: hgt });
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log("wrote", file);
};

await save(og, 1200, 630, "public/opengraph-image.png");
await save(apple, 180, 180, "public/apple-icon.png");

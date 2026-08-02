import { globalStyle } from "@vanilla-extract/css";

// Adapted from https://github.com/csstools/sanitize.css and https://github.com/twbs/bootstrap

globalStyle("*, ::before, ::after", {
  appearance: "none",

  boxSizing: "border-box",
  margin: 0,
  padding: 0,

  backgroundRepeat: "no-repeat",
});

globalStyle("::before, ::after", {
  verticalAlign: "inherit",
  textDecoration: "inherit",
});

globalStyle(":root", {
  overflowWrap: "break-word",
  scrollBehavior: "auto",

  cursor: "default",

  WebkitTapHighlightColor: "transparent",
  lineHeight: 1.5,
  WebkitTextSizeAdjust: "100%",
  textSizeAdjust: "100%",
  tabSize: 4,
});

globalStyle("html", {
  fontFamily: `
    "-apple-system",
    "Segoe UI",
    "system-ui",
    "Roboto",
    "Ubuntu",
    "Cantarell",
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji"
  `,
});

globalStyle("button, input", {
  color: "inherit",
  font: "inherit",
  lineHeight: "inherit",
  letterSpacing: "inherit",
});

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { configurePds } from "./config";

// Install step — this showcase installs PDS with the design system defaults (no flags).
// A product can pin its own values here, e.g. configurePds({ lightBrand: "#0B5FFF", font: "inter" });
configurePds();

createRoot(document.getElementById("root")!).render(<App />);

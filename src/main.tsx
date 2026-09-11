import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { configurePds } from "./config";

configurePds();

createRoot(document.getElementById("root")!).render(<App />);

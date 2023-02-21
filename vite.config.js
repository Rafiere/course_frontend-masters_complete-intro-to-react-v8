import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Nesse arquivo, temos a configuração do Vite. */

export default defineConfig({
  plugins: [react()],
  root: "src",
});

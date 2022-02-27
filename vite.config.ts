import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    define: {
      "process.env": { ...process.env, ...loadEnv(mode, process.cwd(), "") },
    },
    plugins: [react()],
  });
};

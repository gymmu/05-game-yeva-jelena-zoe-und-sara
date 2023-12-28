import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "docs",
  },
  base: "/04-game-project/",
  // assetsInclude: ["**/*.html"]
})

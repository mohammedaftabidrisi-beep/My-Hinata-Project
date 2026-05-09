import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ai.hinata.app",
  appName: "Hinata AI",
  webDir: "dist/public",
  server: {
    // Uses the live hosted app URL so you can test without a local build.
    // Remove this `server` block when shipping a production APK
    // and replace with the built `dist/public` assets only.
    url: "https://748228f8-5b61-4002-b0e0-4464ae022290-00-3kvdqtlzt3nop.pike.replit.dev",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#070c18",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
  },
};

export default config;

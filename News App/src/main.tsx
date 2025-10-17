import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

const initApp = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
      await StatusBar.setOverlaysWebView({ overlay: false });
    } catch (e) {
      console.log('StatusBar not available');
    }
  }
};

initApp();
createRoot(document.getElementById("root")!).render(<App />);

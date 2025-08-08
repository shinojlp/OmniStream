import AppNavigation from "./navigation/appNavigation";
import LoginProvider from "./api/src/context/LoginProvider";
import React from "react";
export default function App() {
  return (
    <LoginProvider>
      <AppNavigation />
    </LoginProvider>
  );
}

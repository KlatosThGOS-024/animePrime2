"use client";

import store, { persistor } from "@/store/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}> {children}</Provider>;
}

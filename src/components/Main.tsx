"use client";

import React from "react";
import Header from "./Header";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const Mapa = dynamic(() => import("../components/Mapa"), { ssr: false });

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Header />
      <main className="flex flex-col items-center w-screen lg:flex-row lg:items-stretch justify-between p-3">
        <div className="w-11/12 lg:w-screen">
          <Mapa />
        </div>
        <div className="p-3 my-2 mx-0 lg:mx-3 lg:my-0 border rounded h-full w-11/12 lg:w-1/2 text-gray-800 shadow">
          {children}
        </div>
      </main>
    </Provider>
  );
}

export default Main;

import React from "react";
import Header from "../header";
import { Sidebar } from "../sidebar";
import ShirtPartsList from "@/app/views/playground/components/controls";
import { useFabricCanvas } from "@/app/views/playground/useCanvas";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <Header />
      <Sidebar />
      <main className="ml-16 mt-16 flex-1 overflow-y-auto bg-gray-200 ">
        {children}
      </main>
    </div>
  );
};

export default Layout;

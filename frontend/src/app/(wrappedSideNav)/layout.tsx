import type { ReactNode } from "react";
import { Background } from "@/components/layout/background";
import { Sidebar } from "@/components/layout/sidebar";

export default function WrappedSideNavLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen relative">
      <Background />
      <div className="relative z-10 flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Background } from "@/components/layout/background";
import { Sidebar } from "@/components/layout/sidebar";

interface WrappedSideNavLayoutProps {
  children: ReactNode;
}

export default function WrappedSideNavLayout({
  children,
}: WrappedSideNavLayoutProps): React.JSX.Element {
  return (
    <div className="relative flex min-h-screen">
      <Background />
      <div className="relative z-10 flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

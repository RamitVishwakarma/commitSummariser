import { TopBar } from "@/components/layout/top-bar";
import { ExportForm } from "./ExportForm";

export default function ExportPage() {
  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Export" />
      <ExportForm />
    </div>
  );
}

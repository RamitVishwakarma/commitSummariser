import { TopBar } from "@/components/layout/TopBar";
import { ExportForm } from "@/components/features/export/ExportForm";

export default function ExportPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Export" />
      <ExportForm />
    </div>
  );
}

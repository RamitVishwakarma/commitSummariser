import { TopBar } from "@/components/layout/top-bar";
import { SettingsClient } from "@/components/features/settings/SettingsClient";

export default function SettingsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Settings" />
      <SettingsClient />
    </div>
  );
}

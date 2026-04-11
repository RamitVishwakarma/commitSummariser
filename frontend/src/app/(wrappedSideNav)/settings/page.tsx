import { TopBar } from "@/components/layout/TopBar";
import { SettingsClient } from "@/components/features/settings/SettingsClient";
import { repos } from "@/lib/mock";

export default function SettingsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Settings" />
      <SettingsClient repos={repos} />
    </div>
  );
}

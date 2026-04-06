interface CommitTooltipPayloadEntry {
  value?: number | string;
}

interface CommitTooltipProps {
  active?: boolean;
  label?: string;
  payload?: CommitTooltipPayloadEntry[];
}

export function CommitTooltip({
  active,
  label,
  payload,
}: CommitTooltipProps): React.JSX.Element | null {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="text-text-primary rounded-lg border border-[rgba(45,212,191,0.15)] bg-[rgba(10,18,20,0.95)] px-3 py-2 text-[12px]">
      <div className="text-text-secondary">{label}</div>
      <div className="font-semibold">{payload[0]?.value} commits</div>
    </div>
  );
}

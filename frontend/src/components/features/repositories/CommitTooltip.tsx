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
    <div className="text-text-primary rounded-lg border border-border-teal-medium bg-bg-deep-strong px-3 py-2 text-xs">
      <div className="text-text-secondary">{label}</div>
      <div className="font-semibold">{payload[0]?.value} commits</div>
    </div>
  );
}

import { formatCurrency } from "../../utils/formatCurrency";

export default function SwapValueBadge({ value, compact }) {
  return (
    <span className="inline-flex items-center rounded-full bg-forest text-sand px-3 py-1 text-xs font-medium">
      {compact
        ? formatCurrency(value)
        : `Est. swap value ${formatCurrency(value)}`}
    </span>
  );
}

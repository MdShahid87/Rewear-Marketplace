import { ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatRelativeTime } from "../../utils/formatCurrency";
import { compareSwapValues } from "../../utils/swapValue";
import Button from "../common/Button";
import SwapStatusBadge from "./SwapStatusBadge";

export default function SwapRequestCard({ swap, currentUserId, onStatus }) {
  const incoming = swap.toUserId === currentUserId;
  const offered = swap.offeredItem;
  const requested = swap.requestedItem;
  const comparison = compareSwapValues(
    offered?.estimatedValue || 0,
    requested?.estimatedValue || 0,
  );

  return (
    <article className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted">
          {incoming ? `From ${swap.fromUser?.name}` : `To ${swap.toUser?.name}`}{" "}
          · {formatRelativeTime(swap.updatedAt)}
        </div>
        <SwapStatusBadge status={swap.status} />
      </div>
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <Piece item={offered} caption="Offered" />
        <ArrowLeftRight className="mx-auto text-sage" size={20} />
        <Piece item={requested} caption="Requested" />
      </div>
      <p className="mt-3 text-sm text-muted">
        Value gap {formatCurrency(Math.abs(comparison.diff))} ·{" "}
        {comparison.fairness === "balanced"
          ? "fair match"
          : `${comparison.fairness}-valued offer`}{" "}
        · {swap.meetingType === "courier" ? "Courier" : "Local meetup"}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to={`/chat/${swap.id}`}>
          <Button variant="secondary">Open chat</Button>
        </Link>
        {incoming && swap.status === "pending" && (
          <>
            <Button onClick={() => onStatus(swap.id, "accepted")}>
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => onStatus(swap.id, "rejected")}
            >
              Reject
            </Button>
          </>
        )}
        {swap.status === "accepted" && (
          <Button onClick={() => onStatus(swap.id, "shipped")}>
            Mark shipped / handed over
          </Button>
        )}
        {swap.status === "shipped" && (
          <Button onClick={() => onStatus(swap.id, "completed")}>
            Confirm completed
          </Button>
        )}
      </div>
    </article>
  );
}

function Piece({ item, caption }) {
  if (!item) return <div className="text-sm text-muted">Item removed</div>;
  return (
    <Link
      to={`/items/${item.id}`}
      className="flex gap-3 rounded-2xl bg-sand p-2"
    >
      <img
        src={item.imageUrl}
        alt=""
        className="h-16 w-16 rounded-xl object-cover"
      />
      <div>
        <p className="text-[11px] uppercase tracking-widest text-muted">
          {caption}
        </p>
        <p className="text-sm font-medium text-forest">{item.title}</p>
        <p className="text-xs text-muted">
          {formatCurrency(item.estimatedValue)}
        </p>
      </div>
    </Link>
  );
}

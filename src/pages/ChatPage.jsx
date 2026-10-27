import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import SwapStatusBadge from "../components/swap/SwapStatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useSwapRequests } from "../hooks/useSwapRequests";
import { listMessages, sendMessage } from "../services/chatService";
import { formatRelativeTime } from "../utils/formatCurrency";
export default function ChatPage() {
  const { swapId } = useParams();
  const { user } = useAuth();
  const { swaps, loading } = useSwapRequests();
  const activeId = swapId || swaps[0]?.id;
  const active = swaps.find((swap) => swap.id === activeId);

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!activeId) return undefined;
    let live = true;
    listMessages(activeId).then((data) => {
      if (live) setMessages(data);
    });
    return () => {
      live = false;
    };
  }, [activeId, swaps]);

  const other = useMemo(() => {
    if (!active) return null;
    return active.fromUserId === user.id ? active.toUser : active.fromUser;
  }, [active, user]);

  const submit = async (event) => {
    event.preventDefault();
    if (!draft.trim() || !activeId) return;
    setSending(true);
    try {
      const message = await sendMessage(activeId, user.id, draft);
      setMessages((prev) => [...prev, message]);
      setDraft("");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Loader label="Opening conversations…" />;

  return (
    <div className="page-enter mx-auto grid max-w-6xl gap-4 px-4 py-8 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl bg-white p-3">
        <h1 className="px-2 pb-3 font-display text-2xl text-forest">
          Messages
        </h1>
        {swaps.length === 0 && (
          <p className="px-2 text-sm text-muted">No swap chats yet.</p>
        )}
        <div className="space-y-1">
          {swaps.map((swap) => {
            const peer =
              swap.fromUserId === user.id ? swap.toUser : swap.fromUser;
            return (
              <Link
                key={swap.id}
                to={`/chat/${swap.id}`}
                className={`flex items-center gap-3 rounded-2xl px-2 py-2 ${
                  swap.id === activeId ? "bg-sand" : "hover:bg-cream"
                }`}
              >
                <img
                  src={peer?.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{peer?.name}</p>
                  <p className="truncate text-xs text-muted">
                    {swap.requestedItem?.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      <section className="flex min-h-[70vh] flex-col rounded-3xl bg-white">
        {!active ? (
          <p className="m-auto text-sm text-muted">
            Select a swap conversation.
          </p>
        ) : (
          <>
            <header className="flex items-center justify-between gap-3 border-b border-sand px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={other?.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{other?.name}</p>
                  <p className="text-xs text-muted">
                    {active.offeredItem?.title} ↔ {active.requestedItem?.title}
                  </p>
                </div>
              </div>
              <SwapStatusBadge status={active.status} />
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((message) => {
                const mine = message.senderId === user.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-3xl px-4 py-2 text-sm ${mine ? "bg-forest text-sand" : "bg-sand"}`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${mine ? "text-sand/70" : "text-muted"}`}
                      >
                        {formatRelativeTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {["rejected", "completed"].includes(active.status) ? (
              <p className="px-5 py-4 text-sm text-muted">
                This swap is closed.
              </p>
            ) : (
              <form
                onSubmit={submit}
                className="flex gap-2 border-t border-sand p-4"
              >
                <input
                  className="flex-1 rounded-full border border-stone-200 px-4 py-2.5 text-sm"
                  placeholder="Negotiate sizes, meetup, or courier details…"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <Button type="submit" disabled={sending}>
                  Send
                </Button>
              </form>
            )}
          </>
        )}
      </section>
    </div>
  );
}

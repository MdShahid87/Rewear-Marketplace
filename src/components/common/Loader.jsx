export default function Loader({ label = "Loading wardrobe…" }) {
  return (
    <div className="flex min-h-[30vh] flex-col items-center justify-center gap-3 text-forest">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-sage/30 border-t-forest" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

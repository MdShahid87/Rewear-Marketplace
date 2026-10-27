export default function Input({
  label,
  error,
  as = "input",
  className = "",
  id,
  ...props
}) {
  const Field = as;
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {label && (
        <span className="text-sm font-medium text-ink/80">{label}</span>
      )}
      <Field
        id={id}
        className={`w-full rounded-2xl border bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-forest ${
          error ? "border-red-400" : "border-stone-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

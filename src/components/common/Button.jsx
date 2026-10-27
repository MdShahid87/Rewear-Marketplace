export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled,
  ...props
}) {
  const styles = {
    primary: "bg-forest text-sand hover:bg-forest-dark disabled:opacity-50",
    secondary:
      "bg-white text-forest border border-forest/20 hover:border-forest/40",
    clay: "bg-clay text-white hover:bg-[#a84c1e]",
    ghost: "bg-transparent text-forest hover:bg-forest/8",
    danger: "bg-red-700 text-white hover:bg-red-800",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

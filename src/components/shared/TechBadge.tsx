import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  variant?: "default" | "ai" | "outline";
  size?: "sm" | "md";
}

export function TechBadge({ label, variant = "default", size = "sm" }: TechBadgeProps) {
  // Compute inline styles based on size and variant
  const paddingStyle = size === "sm" ? "5px 12px" : "8px 16px";
  const fontSizeStyle = size === "sm" ? "11px" : "13px";
  const borderRadiusStyle = size === "sm" ? "6px" : "8px";

  let colorStyle = "#94A3B8";
  let bgStyle = "#131b38";
  let borderStyle = "1px solid rgba(148,163,184,0.08)";

  if (variant === "outline") {
    colorStyle = "#3B82F6";
    bgStyle = "rgba(59, 130, 246, 0.06)";
    borderStyle = "1px solid rgba(59, 130, 246, 0.35)";
  } else if (variant === "ai") {
    colorStyle = "#A78BFA";
    bgStyle = "rgba(139, 92, 246, 0.06)";
    borderStyle = "1px solid rgba(139, 92, 246, 0.35)";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono transition-all duration-300 hover:scale-[1.03]"
      )}
      style={{
        padding: paddingStyle,
        fontSize: fontSizeStyle,
        borderRadius: borderRadiusStyle,
        color: colorStyle,
        backgroundColor: bgStyle,
        border: borderStyle,
        whiteSpace: "nowrap",
        letterSpacing: "0.2px",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

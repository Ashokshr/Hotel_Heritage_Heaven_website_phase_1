import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn("mt-3 text-3xl sm:text-4xl", light ? "text-white" : "text-charcoal")}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-white/75" : "text-charcoal/70")}>
          {description}
        </p>
      )}
    </div>
  );
}

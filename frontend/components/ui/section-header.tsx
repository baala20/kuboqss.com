import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title mt-2">{title}</h2>
      {description ? (
        <p className={cn("section-desc mt-3", align === "center" && "mx-auto")}>{description}</p>
      ) : null}
    </div>
  );
}

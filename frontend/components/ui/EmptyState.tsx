import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-20 text-center",
        className
      )}
    >
      <div className="text-apple-tertiary">{icon}</div>
      <div className="flex flex-col gap-1">
        <p className="text-[17px] font-semibold text-apple-text">{title}</p>
        {description && (
          <p className="text-[15px] text-apple-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

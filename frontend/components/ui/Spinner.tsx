import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "size-5 rounded-full border-2 border-apple-fill4 border-t-apple-accent animate-spin inline-block",
        className
      )}
    />
  );
}

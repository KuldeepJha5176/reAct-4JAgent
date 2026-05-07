import { Button } from "./Button";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-apple border border-apple-danger/20 px-4 py-3" style={{ backgroundColor: "var(--apple-danger-tint)" }}>
      <p className="text-[15px] text-apple-danger">{message}</p>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

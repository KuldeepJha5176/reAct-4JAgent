interface TopBarProps {
  title: string;
  action?: React.ReactNode;
}

export function TopBar({ title, action }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-apple-border bg-apple-card/80 px-6 backdrop-blur-sm">
      <h1 className="text-[17px] font-semibold text-apple-text">{title}</h1>
      {action && <div>{action}</div>}
    </header>
  );
}

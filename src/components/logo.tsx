const BudgieIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 13.5c-1.2 1.2-3.1 1.2-4.2 0-1-1-1.5-2.5-.9-3.8l-4.5-4.5c-.6-.6-.5-1.5.1-2.1s1.5-.7 2.1-.1l4.5 4.5c1.2-.6 2.8-.2 3.8.9 1.2 1.1 1.2 2.9 0 4.1z" />
    <path d="M12 11.5c.6-.6 1.5-.6 2.1 0" />
    <path d="M16 16c-1.5 1.5-4.1 1.5-5.6 0" />
    <path d="M20 20c-2 2-5 2-7 0" />
    <path d="M18 18c-1.5 1.5-4.1 1.5-5.6 0" />
    <path d="M22 22c-2.5 2.5-6.6 2.5-9.2 0" />
    <path d="M11 11l-6-6" />
    <path d="M9.5 12.5l-3-3" />
  </svg>
);


export function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold text-sidebar-foreground">
      <BudgieIcon className="h-6 w-6" />
      <span>Budgie</span>
    </div>
  );
}

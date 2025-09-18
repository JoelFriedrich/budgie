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
    <path d="M12.5 8.5c-1.1.8-2.6.8-3.7 0" />
    <path d="M14.2 4.1c.3 1 .2 2.2-.5 3.1-1.1 1.4-3.1 1.5-4.4.4-1.3-1.1-1.4-3.1-.4-4.4.9-1.2 2.5-1.6 3.9-1.1" />
    <path d="M20.5 10.2c-1-2.1-3-3.7-5.3-4.1" />
    <path d="M3.5 10.2c1-2.1 3-3.7 5.3-4.1" />
    <path d="M7 11c-2.8 0-5 2.2-5 5s2.2 5 5 5h10c2.8 0 5-2.2 5-5s-2.2-5-5-5" />
    <path d="M7 11v5h10v-5" />
    <path d="M9 16v-2" />
    <path d="M15 16v-2" />
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

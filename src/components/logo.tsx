const BudgieIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    shapeRendering="crispEdges"
    {...props}
  >
    <path
      stroke="currentColor"
      d="M5 4h5M4 5h7M3 6h9M3 7h10M3 8h10M3 9h9M4 10h7M5 11h5M6 12h3"
    />
    <path stroke="currentColor" d="M10 7v1M12 7v1" />
    <path stroke="#000" d="M12 7h1" />
  </svg>
);

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold text-sidebar-foreground">
      <BudgieIcon className="h-7 w-7" />
      <span>Budgie</span>
    </div>
  );
}

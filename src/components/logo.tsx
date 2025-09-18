import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold text-sidebar-foreground">
      <Image src="/budgie.png" alt="Budgie Logo" width={36} height={36} />
      <span>Budgie</span>
    </div>
  );
}

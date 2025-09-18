import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold text-sidebar-foreground">
      <Image src="/icon.png" alt="Budgie Logo" width={28} height={28} />
      <span>Budgie</span>
    </div>
  );
}

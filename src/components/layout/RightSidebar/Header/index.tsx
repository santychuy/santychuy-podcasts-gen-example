/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header = ({ title, className }: HeaderProps) => {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      {title ? (
        <h1 className="text-18 font-bold text-white-1">{title}</h1>
      ) : (
        <span />
      )}

      <Link href="/discover" className="text-16 font-semibold text-orange-1">
        See all
      </Link>
    </header>
  );
};

export default Header;

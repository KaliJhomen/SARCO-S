'use client'
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function NavbarController() {
  const pathname = usePathname() || '';
  if (pathname.startsWith('/admin')) return null;
  if (pathname.startsWith('/auth')) return null;

  return <Navbar />;
}
'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { usePathname } from '@/src/navigation';

export default function projectsAddPage() {
  const pathname = usePathname()
  useEffect(() => {
    redirect(`${pathname}/description`);
  }, []);
}
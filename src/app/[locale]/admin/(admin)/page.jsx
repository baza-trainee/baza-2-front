'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    redirect('/admin/slider');
  }, []);
}
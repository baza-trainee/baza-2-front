'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function projectsAddPage() {
  useEffect(() => {
    redirect('/admin/projects/add/description');
  }, []);
}
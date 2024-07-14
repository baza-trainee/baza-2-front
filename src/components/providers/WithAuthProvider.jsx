'use client';

import { useRouter } from '@/src/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

export default function WithAuthProvider({
  children,
}) {
  const router = useRouter();
  const [isShow, setIsShow] = useState();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
      } else setIsShow(true);
    };
    getUser();
  }, [router]);

  return <>{isShow && children}</>;
};
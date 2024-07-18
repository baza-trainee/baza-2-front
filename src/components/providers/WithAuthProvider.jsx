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
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        // Тільки під час розробки
        router.replace('/admin/login');
      } else setIsShow(true);
    };
    getUser();
  }, [router]);
  // Тільки під час розробки
  //return <>{ children }</>
  return <>{isShow && children}</>;
};
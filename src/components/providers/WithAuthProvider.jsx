'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/src/navigation';

export default function WithAuthProvider({
  children,
}) {


  const router = useRouter();
  const [isShow, setIsShow] = useState();
    // Розкоментувати під час розробки
    return <>{ children }</>

  useEffect(() => {
    const getUser = async () => {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        router.replace('/admin/login');
      } else setIsShow(true);
    };
    getUser();
  }, [router]);
  return <>{isShow && children}</>;
};
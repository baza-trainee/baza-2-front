'use client';
import { useEffect, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { token } from '@/src/api/auth';

export default function WithAuthProvider({
  children,
}) {


  const router = useRouter();
  const [isShow, setIsShow] = useState();
    // Розкоментувати під час розробки
   // return <>{ children }</>

  useEffect(() => {
    const getAdmin = () => {
      if (!token.get()) {
        router.replace('/admin/login');
      } else setIsShow(true);
    };
    getAdmin();
  }, [router]);

  return <>{isShow && children}</>;
};
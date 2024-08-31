'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/src/navigation';
import { token } from '@/src/api/auth';
import Loader from '../shared/loader/Loader';

export default function WithAuthProvider({
  children,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isShow, setIsShow] = useState();

    // Розкоментувати під час розробки
    //return <>{ children }</>

  useEffect(() => {
    const  getAdmin = async () => {
      if (!token.get()) {
        setIsShow(false)
        router.replace('/admin/login')
      } else {
        setIsShow(true)
      };
    };
    getAdmin();
  }, [pathname]);

  return <>{isShow ? children : <Loader/>}</>;
};
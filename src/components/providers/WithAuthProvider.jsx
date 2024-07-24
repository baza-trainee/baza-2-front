'use client';
import { useEffect, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { getInfoUser, token } from '@/src/api/auth';
import { useQuery } from '@tanstack/react-query';

export default function WithAuthProvider({
  children,
}) {

  const router = useRouter();
  const [isShow, setIsShow] = useState();

    // Розкоментувати під час розробки
    //return <>{ children }</>
    const isAuth = useQuery({ 
      queryKey: ['InfoUser'], 
      queryFn: getInfoUser 
    });
    console.log(isAuth)
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
"use client";

//import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import styles from "./ExampleProjects.module.scss";
import { getAllProjects } from "@/src/api/projects";
import { useState } from "react";

import { createImageUrlBaza1 } from "@/src/lib/hooks/createImageUrl";
import { createKey } from "@/src/lib/utils/createKey";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import InputSearch from "@/src/components/shared/inputs/InputSearch/InputSearch";
import Loader from "@/src/components/shared/loader/Loader";
import ProjectCard from "@/src/components/projects-page/ProjectCard/ProjectCard";
import { QueryClient, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
//import React, { useState } from 'react';
//import { useInfiniteQuery } from 'react-query';
//import { getAllProjects } from './api'; // Імпортуємо вашу функцію


export default function ExampleProjects() {
  const [searchQuery, setSearchQuery] = useState(''); // Стан для пошуку
  const [limit, setLimit] = useState(6); // Обмеження кількості елементів на сторінку
  const [queryKey, setQueryKey] = useState(['projects', '']);
  // const queryClient = useQueryClient(); // Ініціалізуємо queryClient для керування кешем

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    reset,
  } = useInfiniteQuery({
    queryKey: queryKey, // Передаємо ключ запиту та пошук
    queryFn: ({ pageParam = 1 }) => getAllProjects({ page: pageParam, search: searchQuery, limit }), // Використовуємо вашу функцію з параметрами
    getNextPageParam: (lastPage, allPages) => {
      // Логіка для визначення наступної сторінки
    
      const morePagesExist = lastPage?.results?.length === limit;
    
       // Якщо кількість проектів дорівнює ліміту, значить є ще сторінки
      return morePagesExist ? allPages.length + 1 : undefined; 
    },
    keepPreviousData: false,
    //enabled: false, // Автоматичне завантаження вимкнене
  });

  // const handleSearch = () => {
  //   refetch(); // Оновлюємо запит при натисканні на кнопку
  // };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setQueryKey(['projects', value]);
    data.pages.length = 1
    refetch(); 
    //data.pages.length
    // Інвалідовуємо запит, щоб очистити кешовані сторінки
    // queryClient.invalidateQueries(['projects',searchQuery]);

    // refetch()
    // Якщо поле очищене, скидаємо всі дані і перезапускаємо запит
    // if (value === '') {
    //   //queryClient.invalidateQueries({ queryKey: ["projects"] })
    //   //reset(); // Очищуємо кеш запиту
    //   refetch(); // Повторно завантажуємо дані з першої сторінки
    // } else {
    //   refetch(); // Виконуємо пошук з новим запитом
    // }
  };

  return (
    <div className={styles.wrapper}>
      {/* Поле для введення пошукового запиту */}
      {/* <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Пошук проектів..."
      />
      <button onClick={handleSearch}>Знайти</button> */}
      <InputSearch onSubmit={handleSearchChange} />
      {/* Обробка статусів */}
      {status === 'loading' && <Loader />}
      {status === 'error' && <div>Сталася помилка</div>}

      {/* Відображення проектів */}
      {data?.pages.map((page, i) => (
  
        <div key={i} className={styles.content}>

          {page.results.map((el) => (
  
              <ProjectCard
                project={el}
                coverImgUrl={createImageUrlBaza1(el.imageUrl)}
                key={createKey()}
              />
          ))}
        </div>
      ))}

      {/* Кнопка для завантаження більше проектів */}
      {hasNextPage && (
        <MainButton
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        >
         {isFetchingNextPage ? 'Завантаження...' : 'Завантажити ще'}
        </MainButton>
      )}
    </div>
  );
};
  

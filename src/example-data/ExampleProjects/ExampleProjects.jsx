"use client";

import styles from "./ExampleProjects.module.scss";
import { getAllProjects } from "@/src/api/projects";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { createImageUrlBaza1 } from "@/src/lib/hooks/createImageUrl";
import { createKey } from "@/src/lib/utils/createKey";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import InputSearch from "@/src/components/shared/inputs/InputSearch/InputSearch";
import Loader from "@/src/components/shared/loader/Loader";
import ProjectCard from "@/src/components/projects-page/ProjectCard/ProjectCard";
import stateSorryModal from "@/src/state/stateSorryModal";
import SorryModal from "@/src/components/modals/SorryModal/SorryModal";

export default function ExampleProjects() {
  const [searchQuery, setSearchQuery] = useState(''); // Стан для пошуку

  const queryClient = useQueryClient(); // Ініціалізуємо queryClient для керування кешем
  const open = stateSorryModal(state => state.open);// Керування модалкою

// Функція useInfiniteQuery нескінченних запитів
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['projects', searchQuery ], // Передаємо ключ запиту та пошук

    queryFn: ({ pageParam = 1 }) => getAllProjects({ page: pageParam, search: searchQuery,limit:6 }), // Використовуємо функцію з параметрами

    getNextPageParam: (lastPage, allPages) => {
      // Логіка для визначення наступної сторінки
      const morePagesExist = lastPage?.pagination.currentPage < lastPage?.pagination.totalPages 
      return morePagesExist ? allPages.length + 1 : undefined; 
    },
  });

 // Управління пошуком
  const handleSearchChange = (value='') => {
    setSearchQuery(value);
    // Інвалідовуємо запит, щоб очистити кешовані сторінки
    // Як що не робити після очищення пошуку виведе всі попередні сторінки
    if (value === '') {
      queryClient.resetQueries(['projects'], { exact: true });
    }
  };

// Як що нічого не знайдено відкриваємо модалку
  useEffect(()=>{
    if(data?.pages[0].results.length === 0){
      open()
    }
  },[data])


  return (
    <div className={styles.wrapper}>
      {/* Поле для введення пошукового запиту */}
      <InputSearch onSubmit={handleSearchChange} defaultValue={searchQuery}/>

      {/* Обробка статусів */}
      {isLoading && <Loader />}
      {isError && <p>Сталася помилка</p>}

      {/* Відображення проектів */}
      <div className={styles.content_wrapper}>
         {/*data.pages - завантажені сторінки*/}
        {data?.pages.map((page, i) => (
    
          <div key={i} className={styles.content}>
            {/* page.results - кожна окрема сторінка*/}
            {page.results.map((el) => (
              <ProjectCard
                project={el}
                coverImgUrl={createImageUrlBaza1(el.imageUrl)}
                key={createKey()}
              />
            ))}
          </div>
        ))}
    
        {/* Кнопка для завантаження більше проектів hasNextPage- чи є наступна сторінка*/}
        {hasNextPage && (
          <MainButton
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
          {'Більше проектів'}
          </MainButton>
        )}
      </div>
      {/* Модалка - як що нічого не знайдено */}
      <SorryModal handleCallback={handleSearchChange}/>
    </div>
  );
};
  

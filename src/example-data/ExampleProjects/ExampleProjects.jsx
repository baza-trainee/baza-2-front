"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./ExampleProjects.module.scss";
import { getAllProjects } from "@/src/api/projects";
import { useState } from "react";

import { createImageUrlBaza1 } from "@/src/lib/hooks/createImageUrl";
import { createKey } from "@/src/lib/utils/createKey";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import InputSearch from "@/src/components/shared/inputs/InputSearch/InputSearch";
import stateSorryModal from "@/src/state/stateSorryModal";
import SorryModal from "@/src/components/modals/SorryModal/SorryModal";
import Loader from "@/src/components/shared/loader/Loader";
import ProjectCard from "@/src/components/projects-page/ProjectCard/ProjectCard";

export default function ExampleProjects() {
  const open = stateSorryModal((state) => state.open);

  //const [page,setPage]=useState(1)
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(9);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["projects", limit, search],
    queryFn: () => {
      return getAllProjects({ search, limit });
    },
    keepPreviousData: true,
  });
  //console.log(data)

  const setSearchParams = (value) => {
    setSearch(value);
    setLimit(9);
  };

  //if(isLoading){return}

  if (isError) {
    return <h1>{"Error"}</h1>;
  }

  //if(!data){return null}
  // if(data){
  //   const {results,pagination} = data;
  // }

  //console.log(pagination)
  if (data) {
    !data?.results.length && open();
  }

  return (
    <div className={styles.wrapper}>
      <InputSearch onSubmit={setSearchParams} />
      <div className={styles.content}>
        {data?.results.length &&
          data?.results.map((el) => {
            return (
              <ProjectCard
                project={el}
                coverImgUrl={createImageUrlBaza1(el.imageUrl)}
                key={createKey()}
              />
            );
          })}
      </div>

      {data?.pagination.totalResults > limit && (
        <MainButton
          onClick={() => {
            setLimit(limit + 3);
          }}
        >
          More...
        </MainButton>
      )}

      <SorryModal
        handleCallback={() => {
          setSearch("");
          setLimit(9);
        }}
      />
      {isLoading && <Loader />}
    </div>
  );
}

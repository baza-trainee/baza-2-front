"use client";

import { useQuery } from '@tanstack/react-query';
import styles from './ExampleProjects.module.scss'
import { getAllProjects } from '@/src/api/projects';
import { useState } from 'react';

import { createImageUrlBaza1 } from '@/src/lib/hooks/createImageUrl';
import { createKey } from '@/src/lib/utils/createKey';
import ProjectCard from '@/src/components/Projects/ProjectCard/ProjectCard';
import MainButton from '@/src/components/shared/MainButton/MainButton';
import InputSearch from '@/src/components/shared/InputSearch/InputSearch';
import stateSorryModal from '@/src/state/stateSorryModal';
import SorryModal from '@/src/components/modals/SorryModal/SorryModal';

export default function ExampleProjects() {
  const open = stateSorryModal(state => state.open);

  const [page,setPage]=useState(1)
  const [search,setSearch]=useState('')
  const [limit,setLimit]=useState(6)

  const { isLoading, isError, data, error} = useQuery({ 
    queryKey: ['projects',page,limit,search], 
    queryFn:()=> {return getAllProjects({page,search,limit})} , keepPreviousData: true, 
  });
    //console.log(data)

  if(isLoading){return <h1>{'Loading...'}</h1>}

  if(isError){return <h1>{'Error'}</h1>}

  if(!data){return null}

  const {results} = data;

  if(!results.length ){open()}

  return(
    <div className={styles.wrapper}>
      <InputSearch onSubmit={setSearch}/>
     <div className={styles.content}>
        {results.length && results.map((el)=>{
          return (
            <ProjectCard data={{...el,imageUrl:createImageUrlBaza1(el.imageUrl)}} key={createKey()}/>
          )
        })}
      </div>
 
      <MainButton onClick={()=>{
        setSearch('')
        setLimit(limit + 3)
        //setPage(page + 1)
      }
        }>More...</MainButton>

      <SorryModal handleCallback={()=>{setSearch('')}}/> 
    </div> 
  )
}
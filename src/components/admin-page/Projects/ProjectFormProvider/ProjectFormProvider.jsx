'use client';

import { createContext, useContext, useEffect, useState } from 'react';
//import useSWR from 'swr';
//import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ProjectDefaultValues, ProjectScheme } from './projectFormScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/src/navigation';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';

// import { defaultValues, emptyLngs } from './initFormData';
// import { extractMembersId, prepareProject } from './projectUtils';
// import { IFormContext, TFormInput, TProvider } from './types';
// import { AxiosError } from 'axios';

// import {
//   TMemberBioResp,
//   TMemberResp,
//   TMemberRoleResp,
//   TProjectReq,
//   TProjectResp,
// } from '@/types';

// import { useProjectsSWR } from '@/hooks/SWR/useProjectsSWR';
// import { useTranslator } from '@/hooks/SWR/useTranslatorSWR';

// import { convertDate } from '@/utils/formatDate';
// import { useRequestNotifiers } from '@/hooks/SWR/useRequestNotifiers';
// import { projectsApi } from '@/utils/API/projects';

const ProjectFormContext = createContext();

export const useProjectFormContext = () => useContext(ProjectFormContext);

export const ProjectFormProvider = ({hendleMutate, children, data}) => {
  const dataMembers = [
    {
      teamMember: {
        id: "6471fa06933513f26024a990",
        name: {
          en: "John Doe",
          pl: "Jan Kowalski",
          ua: "Іван Петрович"
        },
        profileUrl: "https://www.linkedin.com/in/johndoe"
      },
      teamMemberRole: {
        _id: "6471f9a29c17ac2190eb8791",
        name: {
          en: "Developer",
          pl: "Programista",
          ua: "Розробник"
        }
      }
    }
  ]
  const router = useRouter();
  const[ prevUrl, setPrevUrl ] = useState(null)
  const [ teamMemberData, setTeamMemberData ] = useState(dataMembers);
  const emptyLngs={
    ua:'',
    en:'',
    pl:''
  }
  const addTeamMember = (newMember) => {
    const updatedTeamMembers = [
      ...teamMemberData,
      { teamMember: newMember, teamMemberRole: { _id: '', name: emptyLngs } },
    ];
    setTeamMemberData(updatedTeamMembers);
  };

  const updTeamMemberRole = (
    memberId,
    oldRoleId,
    newRole
  ) => {
    const updatedTeamMembers = teamMemberData.map((item) =>
      item.teamMember._id === memberId && item.teamMemberRole._id === oldRoleId
        ? { ...item, teamMemberRole: newRole }
        : item
    );
    setTeamMemberData(updatedTeamMembers);
  };

  const deleteMember = (memberId) => {
    const updatedTeamMembers = teamMemberData.filter(
      (item) => item.teamMember._id !== memberId
    );
    setTeamMemberData(updatedTeamMembers);
  };
;

  const {
    handleSubmit,
    getValues,
    setFocus,
    setValue,
    reset,
    control,
    trigger,
    register,
    formState: { errors, isValid, isError, isDirty },
  } = useForm({ defaultValues:{...ProjectDefaultValues},  resolver: zodResolver(ProjectScheme), mode: 'onChange'});


  const resetForm = () => {
    router.replace('/admin/projects')
    reset();
  }

  const getStatusName=(isTeamRequired, launchDate)=>{
    if(isTeamRequired){ return 'teamFormation' }
    if(launchDate){ return 'done' }
    return 'inDevelopment'
  }

  useEffect(()=>{
    if(data && Object.keys(data).length){
      const{title, imageUrl,file, isTeamRequired, creationDate, launchDate,   complexity, deployUrl, teamMembers} = data
      setValue('title_ua',title.ua )
      setValue('title_en',title.en )
      setValue('title_pl',title.pl )
      if(imageUrl){setPrevUrl(imageUrl)}
      if(file){
        setValue('file',file )
        setPrevUrl(URL.createObjectURL(file))
      }

      setValue('isTeamRequired',  getStatusName(isTeamRequired, launchDate))
      setValue('deployUrl', deployUrl)
      //setValueStateProject(getStatusName(isTeamRequired, launchDate))
      setValue('creationDate',formatDateToNumericInputDate({timestamp:creationDate}))
      setValue('launchDate',launchDate ? formatDateToNumericInputDate({timestamp:launchDate}):'')

      setValue('complexity', +complexity)

      setValue('file', '')

      if(teamMembers){setTeamMemberData(teamMembers)}
      //trigger()
    }else {
      setValue('creationDate',formatDateToNumericInputDate({timestamp:Date.now()}))
    }
    
  },[data])

  const prepareData = (data) => {
    const newData = {
      title:{
        en: data.title_en,
        pl: data.title_pl,
        ua: data.title_ua,
      },
      
      isTeamRequired: data.isTeamRequired === 'teamFormation',
      creationDate: data.creationDate,
      complexity: data.complexity,
      deployUrl:data.deployUrl ? data.deployUrl : undefined
    }
    if(data.file){newData.file = data.file}

    if(data.launchDate){ newData.launchDate = formatDateToNumericInputDate({dateString:data.launchDate})}else newData.launchDate = 0

    if(teamMemberData){ newData.teamMembers = teamMemberData }

  
   hendleMutate(newData)
   //return newData
  };
  const onSubmit = handleSubmit(prepareData);


  const contextValue = {
    teamMemberData,
    onSubmit,
    addTeamMember,
    updTeamMemberRole,
    deleteMember,
    register,
    control,
    isError,
    isValid,
    isDirty,
    errors,
    trigger,
    setValue,
    getValues,
    prevUrl, 
    setPrevUrl,
    resetForm
  };

  return (
    <ProjectFormContext.Provider value={contextValue}>
      {children}
    </ProjectFormContext.Provider>
  );
};

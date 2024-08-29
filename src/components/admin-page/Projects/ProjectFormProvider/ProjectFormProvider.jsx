'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectDefaultValues, ProjectScheme } from './projectFormScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/src/navigation';
import { formatDateToNumericInputDate } from '@/src/lib/utils/formatData';

const ProjectFormContext = createContext();

export const useProjectFormContext = () => useContext(ProjectFormContext);

export const ProjectFormProvider = ({hendleMutate, children, data}) => {
  const router = useRouter();
  const[ prevUrl, setPrevUrl ] = useState(null)
  const [ teamMemberData, setTeamMemberData ] = useState([]);

  // Додавання учасника та спеціальності.
  const addTeamMember = (newMember) => {
    const updatedTeamMembers = [
      ...teamMemberData, newMember
    ];
    setTeamMemberData(updatedTeamMembers);
  };

  // Зміна спеціальності учасника
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

  // Видалення учасника
  const deleteMember = (memberId, roleId) => {
    const updatedTeamMembers = teamMemberData.filter(
      (item) => `${item.teamMember._id}${item.teamMemberRole._id}` !== `${memberId}${roleId}`
    );
    setTeamMemberData(updatedTeamMembers);
  };

  // Форма додавання та валідації проєкту
  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    control,
    trigger,
    register,
    formState: { errors, isValid, isError, isDirty },
  } = useForm({ defaultValues:{...ProjectDefaultValues},  resolver: zodResolver(ProjectScheme), mode: 'onChange'});

  // Очищення форми
  const resetForm = () => {
    router.replace('/admin/projects')
    reset();
  }

  // Статус проєкту
  const getStatusName=(isTeamRequired, launchDate)=>{
    if(isTeamRequired){ return 'teamFormation' }
    if(launchDate){ return 'done' }
    return 'inDevelopment'
  }

  // Перевірка чи є користувач та його роль
  const prepareTeamMembers=(data)=>{
    return data.filter((el) => el.teamMember && el.teamMemberRole)
  }

  // Заповнення полів данними проєкту який редагується.
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
      setValue('creationDate',formatDateToNumericInputDate({timestamp:creationDate}))
      setValue('launchDate',launchDate ? formatDateToNumericInputDate({timestamp:launchDate}):'')

      setValue('complexity', +complexity)

      setValue('file', '')

      if(teamMembers){setTeamMemberData(prepareTeamMembers(teamMembers))}
    }else {
      setValue('creationDate',formatDateToNumericInputDate({timestamp:Date.now()}))
    }
  },[data])

// Модифікація об'єкту перед відправкою
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
      deployUrl:data.deployUrl ? data.deployUrl : undefined,
      teamMembers: prepareTeamMembers(teamMemberData)
    }

    if(data.file){newData.file = data.file}
  
    if(data.launchDate){ newData.launchDate = formatDateToNumericInputDate({dateString:data.launchDate})}else newData.launchDate = 0


   hendleMutate(newData)
  };
  // Функція Submit 
  const onSubmit = handleSubmit(prepareData);
  
  // Контекст форми 
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

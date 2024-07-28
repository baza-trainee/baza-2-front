"use client";

import SectionAdmin from '../SectionAdmin/SectionAdmin';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import SettingsForm from './SettingsForm/SettingsForm'

export default function Settings({variant='settings'}) {
const title = variant==='settings'&&'Налаштування'||variant==='edit'&&'Змінити пароль'
  return (
    <SectionAdmin title={title}>
     {variant==='settings' && <SettingsForm/>}
     {variant==='edit' && <ChangePasswordForm/>}
    </SectionAdmin>
  )
}
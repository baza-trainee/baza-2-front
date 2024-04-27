import ExampleButtons from '@/src/components/MainButton/ExampleButtons/ExampleButtons';
import style from './page.module.scss'

import {useTranslations} from 'next-intl';
import NavLinks from '@/src/components/NavLinks/NavLinks';
import LangDropdown from '@/src/components/LangDropdown/LangDropdown';

 
export default function Home() {
  const t = useTranslations('Index');
  return <main>
    <NavLinks/>
    <LangDropdown/>
    <ExampleButtons />
    
    <h1>{t('title')}</h1>;
    </main> 
}
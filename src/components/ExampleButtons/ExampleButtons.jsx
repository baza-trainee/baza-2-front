'use client';
import styles from './exampleButtons.module.scss';
import { useState } from 'react';
import MainButton from '../shared/MainButton/MainButton';
import {useTranslations} from 'next-intl';
// !!! Видалити після тестування
export default function ExampleButtons() {
	const [res1, setRes1] = useState(false);
	 const t = useTranslations('main');
	//const t = useTranslations('Index');
	return (
		<ul className={styles.list}>
			<li>
				<MainButton ariaLabel={'Підтримати проєкт'}
					onClick={() => {
						setRes1(!res1);
					}}
				>
					{t('headerButton')}
				</MainButton>
				<h3>{res1 ? 'open' : 'cloced'}</h3>
			</li>
			<li>
				<MainButton ariaLabel={'Стати ментором'}>
					Стати ментором
				</MainButton>
			</li>
			<li>
				<MainButton type='submit' ariaLabel={'Відправити'}>
					Відправити
				</MainButton>
				<h3>type submit</h3>
			</li>			
			<li>
				<MainButton
					ariaLabel={'Відправити'}
					disabled={true}
					type='submit'
				>
					Відправити
				</MainButton>
				<h3>disabled</h3>
			</li>
		</ul>
	);
}

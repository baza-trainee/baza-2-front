import { createKey } from "@/src/lib/utils/createKey";
import styles from "./ReplaceLinks.module.scss";

export const ReplaceLinks = (text) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g;

	// Разбиваем текст на части: до первой ссылки, сама ссылка и после ссылки
	const parts = text.split(urlRegex);

	// Проходим по всем частям текста
	return parts.map((part) => {
		// Если часть — это ссылка, оборачиваем её в тег <a>
		if (part.match(urlRegex)) {
			return (
				<a
					key={createKey()}
					href={part}
					target="_blank"
					className={styles.link}
				>
					посилання
				</a>
			);
		}

		// Если это не ссылка, просто возвращаем текст
		return <span key={createKey()}>{part}</span>;
	});
};

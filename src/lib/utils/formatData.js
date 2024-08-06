import { useFormatter } from "next-intl";

export const formatDate = (timestamp, locale) => {
	const date = new Date(timestamp);

	const currentLocale = locale === 'ua' ? 'uk-UA' : locale

	const formattedDate = new Intl.DateTimeFormat(currentLocale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(date);

	if (currentLocale === 'uk-UA') return formattedDate.replace(/ р\./, '')
	return formattedDate
}

export const formatDateToNumeric = (timestamp) => {
	const format = useFormatter();
	const dateTime = new Date(timestamp);

	const formattedDate = format.dateTime(dateTime, {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});

	return formattedDate
}
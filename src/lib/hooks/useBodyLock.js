import { useEffect } from "react"

export function useBodyLock(locked = false) {
	useEffect(() => {
		if (!locked) {
			return
		}

		const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

		document.body.style.paddingRight = `${scrollBarWidth}px`

		document.body.classList.add("lock")

		return () => {
			document.body.classList.remove("lock")

			document.body.style.paddingRight = "0px"
		}
	}, [locked])
}
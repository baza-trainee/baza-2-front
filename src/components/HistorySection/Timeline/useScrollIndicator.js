import { useEffect } from "react";

export const useScrollIndicator = (timelineRef, timelineDrawRef) => {
	useEffect(() => {
		const timeline = timelineRef.current;
		const timelineDraw = timelineDrawRef.current;

		if (!timeline || !timelineDraw) {
			return;
		}

		const bodyRect = document.body.getBoundingClientRect();
		const timelineOffset = timeline.getBoundingClientRect().top - bodyRect.top;

		const moveIndicator = () => {
			const viewportHeight = window.innerHeight;
			const hasScrolled = window.scrollY;
			const scrolledFurther =
				hasScrolled - timelineOffset + viewportHeight / 1.1;

			if (scrolledFurther && scrolledFurther > 0) {
				if (scrolledFurther > timeline.clientHeight) {
					timelineDraw.style.height = `${timeline.clientHeight}px`;
					return;
				}

				timelineDraw.style.height = `${scrolledFurther}px`;
				return;
			}

			timelineDraw.style.height = "0px";
		};

		window.addEventListener("scroll", moveIndicator);
		window.addEventListener("resize", moveIndicator);

		return () => {
			window.removeEventListener("scroll", moveIndicator);
			window.removeEventListener("resize", moveIndicator);
		};
	}, [timelineRef, timelineDrawRef]);
};

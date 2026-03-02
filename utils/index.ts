export const isDarkMode = () => {
	if (typeof window !== "undefined") {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	}

	return false;
};

export const defaultColor = "var(--anatomical-default)";
export const defaultFaceColor = "var(--anatomical-face)";
export const defaultHairColor = "var(--anatomical-hair)";
export const defaultBorder = "var(--anatomical-border)";

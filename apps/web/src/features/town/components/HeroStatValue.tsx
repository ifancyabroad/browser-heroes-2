import type { StatPresentation } from "../../../game/statDisplay";

type HeroStatValueProps = {
	stat: StatPresentation;
	signed?: boolean;
};

export function HeroStatValue({ stat, signed = false }: HeroStatValueProps) {
	return (
		<span className={getDerivedValueClassName(stat)}>
			{formatStatNumber(stat.value, signed)}
		</span>
	);
}

export function formatStatNumber(value: number, signed = false) {
	if (!signed || value < 0) {
		return String(value);
	}

	return `+${value}`;
}

function getDerivedValueClassName(stat: StatPresentation) {
	if (stat.value > stat.referenceValue) {
		return "text-success";
	}

	if (stat.value < stat.referenceValue) {
		return "text-error";
	}

	return "text-text-bright";
}

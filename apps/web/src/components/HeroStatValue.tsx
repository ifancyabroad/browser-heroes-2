import { formatStatValue, type StatPresentation } from "../presentation/stats";

type HeroStatValueProps = {
	stat: StatPresentation;
	signed?: boolean;
};

export function HeroStatValue({ stat, signed = false }: HeroStatValueProps) {
	return (
		<span className={getDerivedValueClassName(stat)}>
			{formatStatValue(stat.value, signed)}
		</span>
	);
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

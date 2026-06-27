import type { Attribute } from "@app/content";
import type { HeroView } from "@app/engine";

export type HeroDerivedValue = HeroView["attributes"][Attribute];

type HeroStatValueProps = {
	stat: HeroDerivedValue;
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

function getDerivedValueClassName(stat: HeroDerivedValue) {
	if (stat.value > stat.baseValue) {
		return "text-success";
	}

	if (stat.value < stat.baseValue) {
		return "text-error";
	}

	return "text-text-bright";
}

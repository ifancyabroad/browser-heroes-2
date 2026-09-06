import { SelectField } from "./FormFields";

type SeasonSelectProps = {
	season: number;
	currentSeason: number;
	onChange: (season: number) => void;
};

export function SeasonSelect({ season, currentSeason, onChange }: SeasonSelectProps) {
	const options = Array.from({ length: currentSeason }, (_, index) => {
		const value = index + 1;
		return { label: `Season ${value}`, value: String(value) };
	});

	return (
		<SelectField
			label="SEASON"
			value={String(season)}
			options={options}
			className="min-w-32"
			onChange={(value) => onChange(Number(value))}
		/>
	);
}

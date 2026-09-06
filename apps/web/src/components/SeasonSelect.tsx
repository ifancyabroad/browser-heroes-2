import { SelectField } from "./FormFields";

type SeasonSelectProps = {
	season: number;
	currentSeason: number;
	onChange: (season: number) => void;
};

export function SeasonSelect({ season, currentSeason, onChange }: SeasonSelectProps) {
	const options = Array.from({ length: currentSeason }, (_, index) => {
		const optionSeason = index + 1;
		return { label: `Season ${optionSeason}`, value: String(optionSeason) };
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

export function UnavailableSeasonSelect() {
	return (
		<SelectField
			label="SEASON"
			value=""
			options={[{ label: "—", value: "" }]}
			className="min-w-32"
			onChange={() => undefined}
			disabled
		/>
	);
}

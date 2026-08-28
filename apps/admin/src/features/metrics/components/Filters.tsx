import { presetRange, type DatePreset } from "../../../lib/dates";
import type { MetricsFilters } from "../types";

export function Filters(props: {
	filters: MetricsFilters;
	preset: DatePreset;
	onChange: (filters: MetricsFilters, preset: DatePreset) => void;
}) {
	const { filters, preset, onChange } = props;
	return (
		<div className="filters" aria-label="Metrics filters">
			<div className="presets" aria-label="Date presets">
				{([7, 30, 90] as const).map((days) => (
					<button
						key={days}
						className={preset === days ? "selected" : ""}
						onClick={() => onChange({ ...filters, ...presetRange(days) }, days)}
					>
						{days}d
					</button>
				))}
			</div>
			<label>
				<span>From</span>
				<input
					type="date"
					value={filters.from}
					max={filters.to}
					onChange={(event) =>
						onChange({ ...filters, from: event.target.value }, "custom")
					}
				/>
			</label>
			<label>
				<span>To</span>
				<input
					type="date"
					value={filters.to}
					min={filters.from}
					onChange={(event) => onChange({ ...filters, to: event.target.value }, "custom")}
				/>
			</label>
			<label>
				<span>Mode</span>
				<select
					value={filters.mode}
					onChange={(event) =>
						onChange(
							{ ...filters, mode: event.target.value as MetricsFilters["mode"] },
							preset,
						)
					}
				>
					<option value="all">All runs</option>
					<option value="normal">Normal</option>
					<option value="dailyChallenge">Daily challenge</option>
				</select>
			</label>
		</div>
	);
}

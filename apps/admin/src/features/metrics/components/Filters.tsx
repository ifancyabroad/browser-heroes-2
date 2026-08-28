import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { presetRange, type DatePreset } from "../../../lib/dates";
import type { MetricsFilters } from "../types";

export function Filters(props: {
	filters: MetricsFilters;
	preset: DatePreset;
	onChange: (filters: MetricsFilters, preset: DatePreset) => void;
}) {
	const { filters, preset, onChange } = props;
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="filters" aria-label="Metrics filters">
			<div className="filter-summary">
				<span>Reporting window</span>
				<strong>{formatDateRange(filters.from, filters.to)}</strong>
			</div>
			<button
				className="filter-toggle"
				aria-expanded={isOpen}
				aria-controls="metrics-filter-controls"
				onClick={() => setIsOpen((open) => !open)}
			>
				<SlidersHorizontal aria-hidden="true" /> Filters
				<ChevronDown aria-hidden="true" className={isOpen ? "open" : ""} />
			</button>
			<div id="metrics-filter-controls" className={`filter-controls ${isOpen ? "open" : ""}`}>
				<div className="presets" aria-label="Date presets">
					{([7, 30, 90] as const).map((days) => (
						<button
							key={days}
							className={preset === days ? "selected" : ""}
							aria-pressed={preset === days}
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
						onChange={(event) =>
							onChange({ ...filters, to: event.target.value }, "custom")
						}
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
		</div>
	);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "short",
	timeZone: "UTC",
});

function formatDateRange(from: string, to: string): string {
	const fromDate = new Date(`${from}T00:00:00Z`);
	const toDate = new Date(`${to}T00:00:00Z`);
	const fromYear = fromDate.getUTCFullYear();
	const toYear = toDate.getUTCFullYear();

	if (fromYear !== toYear) {
		return `${dateFormatter.format(fromDate)} ${fromYear} – ${dateFormatter.format(toDate)} ${toYear}`;
	}

	return `${dateFormatter.format(fromDate)} – ${dateFormatter.format(toDate)} ${toYear}`;
}

import { CLASSES_BY_ID, classIds } from "@app/content";
import { ADMIN_ENEMY_METRICS_MAX_MIN_COMBATS } from "@app/shared";
import { enemyBattleBands, type EnemyMetricsFilters as EnemyFilterValues } from "../types";

export function EnemyFilters(props: {
	values: EnemyFilterValues;
	onChange: (values: EnemyFilterValues) => void;
}) {
	const { values, onChange } = props;
	const update = <Key extends keyof EnemyFilterValues>(
		key: Key,
		value: EnemyFilterValues[Key],
	) => {
		onChange({ ...values, [key]: value });
	};

	return (
		<section className="panel metric-filters" aria-label="Enemy filters">
			<label>
				<span>Class</span>
				<select
					value={values.classId}
					onChange={(event) =>
						update("classId", event.target.value as EnemyFilterValues["classId"])
					}
				>
					<option value="">All classes</option>
					{classIds.map((classId) => (
						<option key={classId} value={classId}>
							{CLASSES_BY_ID[classId].name}
						</option>
					))}
				</select>
			</label>
			<label>
				<span>Encounter</span>
				<select
					value={values.encounterType}
					onChange={(event) =>
						update(
							"encounterType",
							event.target.value as EnemyFilterValues["encounterType"],
						)
					}
				>
					<option value="all">All types</option>
					<option value="standard">Standard</option>
					<option value="boss">Boss</option>
					<option value="ghost">Ghost</option>
				</select>
			</label>
			<label>
				<span>Battle</span>
				<select
					value={values.battleBand}
					onChange={(event) =>
						update("battleBand", event.target.value as EnemyFilterValues["battleBand"])
					}
				>
					{enemyBattleBands.map((band) => (
						<option key={band.value} value={band.value}>
							{band.label}
						</option>
					))}
				</select>
			</label>
			<label>
				<span>Minimum combats</span>
				<input
					type="number"
					min="1"
					max={ADMIN_ENEMY_METRICS_MAX_MIN_COMBATS}
					value={values.minCombats}
					onChange={(event) =>
						update(
							"minCombats",
							Math.min(
								ADMIN_ENEMY_METRICS_MAX_MIN_COMBATS,
								Math.max(1, Number(event.target.value) || 1),
							),
						)
					}
				/>
			</label>
		</section>
	);
}

import { CLASSES_BY_ID, classIds } from "@app/content";
import type { SkillMetricsFilters } from "../types";

export function SkillFilters(props: {
	values: SkillMetricsFilters;
	onChange: (values: SkillMetricsFilters) => void;
}) {
	const { values, onChange } = props;

	return (
		<section className="panel metric-filters" aria-label="Skill filters">
			<label>
				<span>Class</span>
				<select
					value={values.classId}
					onChange={(event) =>
						onChange({
							classId: event.target.value as SkillMetricsFilters["classId"],
						})
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
		</section>
	);
}

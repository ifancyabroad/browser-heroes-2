import type { SkillMetricsQuery } from "../types";
import { toMetricsSearchParams } from "./toMetricsSearchParams";

export function toSkillMetricsSearchParams(query: SkillMetricsQuery) {
	return {
		...toMetricsSearchParams(query),
		...(query.classId ? { classId: query.classId } : {}),
	};
}

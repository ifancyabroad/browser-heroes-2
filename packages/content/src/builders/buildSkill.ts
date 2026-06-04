import type { ISkill } from "../types/skill";
import { SkillSchema } from "../schemas/skill.schema";

export const buildSkill = (skill: ISkill) => {
	const parsed = SkillSchema.parse(skill);
	return parsed;
};

export default buildSkill;

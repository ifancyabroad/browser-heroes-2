import type { ISkill } from "../types/skill";
import { skillSchema } from "../schemas/skill.schema";

export const buildSkill = (skill: ISkill) => {
	const parsed = skillSchema.parse(skill);
	return parsed;
};

export default buildSkill;

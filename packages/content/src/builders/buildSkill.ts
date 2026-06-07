import type { SkillDefinition } from "../schemas/skill.schema";
import { skillSchema } from "../schemas/skill.schema";

export const buildSkill = (skill: SkillDefinition) => {
	const parsed = skillSchema.parse(skill);
	return parsed;
};

export default buildSkill;

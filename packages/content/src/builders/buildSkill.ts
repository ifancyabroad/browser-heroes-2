import type { SkillDefinition, SkillDefinitionInput } from "../schemas/skill.schema";
import { skillSchema } from "../schemas/skill.schema";

export const buildSkill = (skill: SkillDefinitionInput): SkillDefinition => {
	const parsed = skillSchema.parse(skill);
	return parsed;
};

export default buildSkill;

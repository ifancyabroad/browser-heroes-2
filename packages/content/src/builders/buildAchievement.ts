import {
	achievementSchema,
	type AchievementDefinition,
	type AchievementDefinitionInput,
} from "../schemas/achievement.schema";

export const buildAchievement = (achievement: AchievementDefinitionInput): AchievementDefinition =>
	achievementSchema.parse(achievement);

export default buildAchievement;

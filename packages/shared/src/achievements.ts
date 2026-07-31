import type { AchievementId } from "@app/content";

export interface AchievementUnlockView {
	achievementId: AchievementId;
	unlockedAt: string;
}

export interface GetAchievementsResponse {
	unlocks: AchievementUnlockView[];
}

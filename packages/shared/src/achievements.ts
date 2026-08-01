import type { AchievementId } from "@app/content";

export interface AchievementUnlockView {
	achievementId: AchievementId;
	unlockedAt: string;
}

export interface AchievementProgressView {
	achievementId: AchievementId;
	current: number;
	target: number;
}

export interface GetAchievementsResponse {
	unlocks: AchievementUnlockView[];
	progress: AchievementProgressView[];
}

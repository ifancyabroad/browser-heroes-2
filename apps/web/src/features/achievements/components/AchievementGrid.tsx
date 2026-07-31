import { achievements, type Achievement } from "@app/content";
import type { AchievementUnlockView } from "@app/shared";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import { resolveImageUrl } from "../../../utils/image";

type AchievementGridProps = {
	unlocks: AchievementUnlockView[];
};

export function AchievementGrid({ unlocks }: AchievementGridProps) {
	const unlocksById = new Map(unlocks.map((unlock) => [unlock.achievementId, unlock]));

	return (
		<ul
			className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
			aria-label="Achievements"
		>
			{achievements.map((achievement) => {
				const unlock = unlocksById.get(achievement.id);

				return (
					<li key={achievement.id} className="min-w-0">
						<Tooltip
							className="!block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							content={
								<AchievementTooltipContent
									achievement={achievement}
									unlockedAt={unlock?.unlockedAt}
								/>
							}
							placement="bottom"
						>
							<span
								className={clsx(
									"relative grid aspect-square w-full place-items-center overflow-hidden border-2 bg-bg-base p-2",
									unlock ? "border-primary" : "border-border",
								)}
							>
								<img
									src={resolveImageUrl(achievement.icon)}
									alt=""
									className={clsx(
										"h-full w-full object-contain",
										!unlock && "grayscale opacity-30",
									)}
								/>
								{!unlock && (
									<span
										aria-hidden="true"
										className="absolute inset-x-1 bottom-1 border border-border bg-bg-elevated/95 px-1 text-center text-text-muted"
									>
										LOCKED
									</span>
								)}
								<span className="sr-only">
									{achievement.name}: {unlock ? "Unlocked" : "Locked"}
								</span>
							</span>
						</Tooltip>
					</li>
				);
			})}
		</ul>
	);
}

function AchievementTooltipContent({
	achievement,
	unlockedAt,
}: {
	achievement: Achievement;
	unlockedAt?: string;
}) {
	return (
		<div className="grid gap-2">
			<p className="text-primary">{achievement.name}</p>
			<p className="text-text">{achievement.description}</p>
			<p className={unlockedAt ? "text-success" : "text-text-muted"}>
				{unlockedAt ? `Unlocked ${formatUnlockDate(unlockedAt)}` : "Locked"}
			</p>
		</div>
	);
}

function formatUnlockDate(value: string) {
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

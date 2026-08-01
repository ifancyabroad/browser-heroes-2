import { achievements, type Achievement } from "@app/content";
import type { AchievementProgressView, AchievementUnlockView } from "@app/shared";
import clsx from "clsx";
import { LockSharp } from "pixelarticons/react/LockSharp";
import { Tooltip } from "../../../components/Tooltip";
import { resolveImageUrl } from "../../../utils/image";

type AchievementGridProps = {
	unlocks: AchievementUnlockView[];
	progress: AchievementProgressView[];
};

const orderedAchievements = [...achievements].sort((a, b) => a.order - b.order);

export function AchievementGrid({ unlocks, progress }: AchievementGridProps) {
	const unlocksById = new Map(unlocks.map((unlock) => [unlock.achievementId, unlock]));
	const progressById = new Map(progress.map((entry) => [entry.achievementId, entry]));

	return (
		<ul
			className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12"
			aria-label="Achievements"
		>
			{orderedAchievements.map((achievement) => {
				const unlock = unlocksById.get(achievement.id);
				const achievementProgress = progressById.get(achievement.id);

				return (
					<li key={achievement.id} className="min-w-0">
						<Tooltip
							className="!block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							content={
								<AchievementTooltipContent
									achievement={achievement}
									unlockedAt={unlock?.unlockedAt}
									progress={achievementProgress}
								/>
							}
							placement="bottom"
						>
							<span
								className={clsx(
									"relative grid aspect-square w-full place-items-center overflow-hidden border-2 bg-bg-base p-1.5 sm:p-2",
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
									<LockSharp
										aria-hidden="true"
										className="absolute h-6 w-6 text-text-muted drop-shadow-[2px_2px_0_var(--color-bg-base)] sm:h-8 sm:w-8"
									/>
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
	progress,
}: {
	achievement: Achievement;
	unlockedAt?: string;
	progress?: AchievementProgressView;
}) {
	return (
		<div className="grid gap-2">
			<p className="text-primary">{achievement.name}</p>
			<p className="text-text">{achievement.description}</p>
			{!unlockedAt && progress && (
				<p className="text-text-muted tabular-nums">
					Progress: {formatProgressValue(progress.current)} /{" "}
					{formatProgressValue(progress.target)}
				</p>
			)}
			<p className={unlockedAt ? "text-success" : "text-text-muted"}>
				{unlockedAt ? `Unlocked ${formatUnlockDate(unlockedAt)}` : "Locked"}
			</p>
		</div>
	);
}

function formatProgressValue(value: number) {
	return new Intl.NumberFormat().format(value);
}

function formatUnlockDate(value: string) {
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

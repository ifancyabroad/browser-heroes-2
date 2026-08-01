import { ACHIEVEMENTS_BY_ID } from "@app/content";
import type { AchievementUnlockView } from "@app/shared";
import { Close } from "pixelarticons/react/Close";
import { Toast } from "radix-ui";
import { useEffect, useState } from "react";
import { Card } from "../../../components/Card";
import { resolveImageUrl } from "../../../utils/image";
import { useAchievementToastStore } from "../stores/achievementToastStore";
import styles from "./AchievementToasts.module.css";

const TOAST_DURATION_MS = 6_000;
const TOAST_EXIT_FALLBACK_MS = 200;

export function AchievementToasts() {
	const toasts = useAchievementToastStore((state) => state.toasts);
	const dismissAchievementUnlock = useAchievementToastStore(
		(state) => state.dismissAchievementUnlock,
	);

	return (
		<Toast.Provider duration={TOAST_DURATION_MS} swipeDirection="right">
			{toasts.map(({ id, unlock }) => (
				<AchievementToastItem
					key={id}
					id={id}
					unlock={unlock}
					onExited={dismissAchievementUnlock}
				/>
			))}
			<Toast.Viewport className="fixed bottom-4 right-4 z-[60] m-0 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md list-none flex-col justify-end gap-2 outline-none" />
		</Toast.Provider>
	);
}

function AchievementToastItem({
	id,
	unlock,
	onExited,
}: {
	id: number;
	unlock: AchievementUnlockView;
	onExited: (id: number) => void;
}) {
	const [open, setOpen] = useState(true);
	const achievement = ACHIEVEMENTS_BY_ID[unlock.achievementId];

	useEffect(() => {
		if (open) return;

		const timeoutId = window.setTimeout(() => onExited(id), TOAST_EXIT_FALLBACK_MS);
		return () => window.clearTimeout(timeoutId);
	}, [id, onExited, open]);

	return (
		<Toast.Root
			open={open}
			onOpenChange={setOpen}
			onAnimationEnd={(event) => {
				if (!open && event.target === event.currentTarget) onExited(id);
			}}
			type="background"
			className={styles.toast}
		>
			<Card
				className="shadow-[4px_4px_0_var(--color-bg-base)]"
				contentClassName="grid grid-cols-[4rem_minmax(0,1fr)_auto] gap-3 p-3 text-text"
			>
				<img
					src={resolveImageUrl(achievement.icon)}
					alt=""
					className="h-16 w-16 border-2 border-border bg-bg-base p-1 object-contain"
				/>
				<div className="min-w-0 self-center">
					<Toast.Title className="text-primary">ACHIEVEMENT UNLOCKED</Toast.Title>
					<p className="text-text-bright">{achievement.name}</p>
					<Toast.Description className="text-text-muted">
						{achievement.description}
					</Toast.Description>
				</div>
				<Toast.Close
					aria-label={`Dismiss ${achievement.name} notification`}
					onClick={(event) => event.currentTarget.blur()}
					className="p-1 text-text-muted hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				>
					<Close aria-hidden="true" className="h-5 w-5" />
				</Toast.Close>
			</Card>
		</Toast.Root>
	);
}

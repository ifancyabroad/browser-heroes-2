import { CLASSES_BY_ID, type ClassId } from "@app/content";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useAuth, useCreateGuestSession } from "../../auth";
import { HeroNameModal } from "../../createCharacter";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { useStartDailyChallenge } from "../hooks/useStartDailyChallenge";

export function DailyChallengeStartButton(props: { classId: ClassId; label?: string }) {
	const navigate = useNavigate();
	const { hasSession } = useAuth();
	const createGuest = useCreateGuestSession();
	const startChallenge = useStartDailyChallenge();
	const showError = useErrorModalStore((state) => state.showError);
	const [isNaming, setIsNaming] = useState(false);

	async function handleStart(heroName: string) {
		try {
			if (!hasSession) {
				await createGuest.mutateAsync();
			}

			await startChallenge.mutateAsync({ heroName });

			navigate("/game");
		} catch {
			showError("Unable to start today's challenge. Please try again.");
		}
	}

	return (
		<>
			<Button variant="primary" onClick={() => setIsNaming(true)}>
				{props.label ?? "START DAILY CHALLENGE"}
			</Button>

			{isNaming && (
				<HeroNameModal
					heroClassName={CLASSES_BY_ID[props.classId].name}
					isSubmitting={createGuest.isPending || startChallenge.isPending}
					onClose={() => setIsNaming(false)}
					onConfirm={handleStart}
				/>
			)}
		</>
	);
}

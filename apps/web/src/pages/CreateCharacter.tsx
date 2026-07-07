import { classes, type ClassId } from "@app/content";
import { useState } from "react";
import { ClassCard, HeroNameModal } from "../features/createCharacter";
import { useNavigate } from "react-router-dom";
import { useCreateGuestSession, useCurrentUser } from "../features/auth";
import { useCreateRun } from "../features/runs";
import { useErrorModalStore } from "../stores/errorModalStore";
import { Layout } from "../components/Layout";

export default function CreateCharacter() {
	const navigate = useNavigate();
	const showError = useErrorModalStore((state) => state.showError);
	const { data: currentUser } = useCurrentUser();
	const createGuestSession = useCreateGuestSession();
	const createRun = useCreateRun();
	const [selectedClassId, setSelectedClassId] = useState<ClassId | null>(null);

	function handleSelect(classId: ClassId) {
		setSelectedClassId(classId);
	}

	function handleClose() {
		setSelectedClassId(null);
	}

	async function handleConfirm(heroName: string) {
		if (!selectedClassId) {
			return;
		}

		try {
			if (!currentUser?.user) {
				await createGuestSession.mutateAsync();
			}

			await createRun.mutateAsync({
				classId: selectedClassId,
				heroName,
			});

			navigate("/game");
		} catch {
			showError("Unable to create your hero. Please try again.");
		}
	}

	return (
		<Layout>
			<div className="flex-1 flex items-center justify-center">
				<div className="mx-auto w-full max-w-4xl px-4">
					<h1 className="text-center mb-4">Select a class to begin</h1>
					<div className="grid gap-4 md:grid-cols-2">
						{classes.map((gameClass) => (
							<ClassCard
								key={gameClass.id}
								gameClass={gameClass}
								onSelect={handleSelect}
							/>
						))}
					</div>

					<HeroNameModal
						open={Boolean(selectedClassId)}
						onClose={handleClose}
						onConfirm={handleConfirm}
					/>
				</div>
			</div>
		</Layout>
	);
}

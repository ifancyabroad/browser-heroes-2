import { classes, CLASSES_BY_ID, type ClassId } from "@app/content";
import { useState } from "react";
import { ClassCard, HeroNameModal } from "../features/createCharacter";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
	const selectedClass = selectedClassId ? CLASSES_BY_ID[selectedClassId] : null;

	function handleChoose(classId: ClassId) {
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
			<div className="flex flex-1 bg-bg-base">
				<div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8">
					<RouterLink
						to="/"
						className="mb-4 inline-flex text-text-bright hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						← BACK
					</RouterLink>

					<header className="mb-5 grid gap-2">
						<h1 className="text-primary">CHOOSE YOUR CALLING</h1>
						<p className="max-w-2xl text-text">
							Your class determines your starting strengths, equipment, and skills.
							Your build will evolve as the journey continues.
						</p>
					</header>

					<div className="grid gap-3 md:grid-cols-2">
						{classes.map((gameClass) => (
							<ClassCard
								key={gameClass.id}
								gameClass={gameClass}
								onChoose={handleChoose}
							/>
						))}
					</div>

					{selectedClass && (
						<HeroNameModal
							heroClassName={selectedClass.name}
							isSubmitting={createGuestSession.isPending || createRun.isPending}
							onClose={handleClose}
							onConfirm={handleConfirm}
						/>
					)}
				</div>
			</div>
		</Layout>
	);
}

import { classes, type ClassId } from "@app/content";
import { useState } from "react";
import { ClassCard, HeroNameModal } from "../features/createCharacter";

export default function CreateCharacter() {
	const [selectedClassId, setSelectedClassId] = useState<ClassId | null>(null);

	function handleSelect(classId: ClassId) {
		setSelectedClassId(classId);
	}

	function handleClose() {
		setSelectedClassId(null);
	}

	function handleConfirm(heroName: string) {
		console.log({
			classId: selectedClassId,
			heroName,
		});
	}

	return (
		<div className="min-h-screen flex flex-col overflow-hidden">
			<div className="flex-1 flex items-center justify-center">
				<div className="container mx-auto px-4">
					<h1 className="text-text-bright text-center mb-4">Select a class to begin</h1>
					<div className="grid gap-4 grid-cols-2">
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
		</div>
	);
}

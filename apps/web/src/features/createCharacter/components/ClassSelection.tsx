import type { ClassId } from "@app/content";
import { classes } from "@app/content";

type ClassSelectionProps = {
	selectedClassId: ClassId | null;
	onSelect: (classId: ClassId) => void;
};

export function ClassSelection({ selectedClassId, onSelect }: ClassSelectionProps) {
	return (
		<div>
			{classes.map((gameClass) => (
				<button
					key={gameClass.id}
					type="button"
					onClick={() => onSelect(gameClass.id)}
					aria-pressed={selectedClassId === gameClass.id}
				>
					<h2>{gameClass.name}</h2>

					{gameClass.description && <p>{gameClass.description}</p>}
				</button>
			))}
		</div>
	);
}

import type { Class, ClassId } from "@app/content";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";

type ClassCardProps = {
	gameClass: Class;
	onSelect: (classId: ClassId) => void;
};

export function ClassCard({ gameClass, onSelect }: ClassCardProps) {
	function handleSelect() {
		onSelect(gameClass.id);
	}

	return (
		<Card className="min-w-0 bg-bg-panel" contentClassName="grid min-w-0 gap-2 p-2">
			<div className="flex min-w-0 items-center gap-3">
				<img
					src={gameClass.icon}
					alt={gameClass.name}
					width="40"
					className="border-2 border-bg-elevated bg-bg-base"
				/>
				<h5 className="truncate text-text-bright">{gameClass.name}</h5>
			</div>
			<div className="flex flex-wrap gap-2">
				<Button variant="primary" onClick={handleSelect}>
					Select
				</Button>
				<Button variant="info">Details</Button>
			</div>
		</Card>
	);
}

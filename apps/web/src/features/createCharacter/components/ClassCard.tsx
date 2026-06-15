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
		<Card className="flex items-center justify-between gap-2 p-2">
			<div className="flex items-center gap-4">
				<img src={gameClass.icon} alt={gameClass.name} width="40" />
				<h5 className="text-text-bright">{gameClass.name}</h5>
			</div>
			<div className="flex items-center gap-4">
				<Button className="text-info">Details</Button>
				<Button className="text-primary" onClick={handleSelect}>
					Select
				</Button>
			</div>
		</Card>
	);
}

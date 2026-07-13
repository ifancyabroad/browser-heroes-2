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
		<Card className="bg-bg-panel" contentClassName="grid gap-2 p-2">
			<div className="flex items-center justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<img
						src={gameClass.icon}
						alt={gameClass.name}
						width="40"
						className="border border-border bg-bg-base"
					/>
					<h5 className="truncate text-text-bright">{gameClass.name}</h5>
				</div>
				<Button variant="primary" onClick={handleSelect}>
					Select
				</Button>
			</div>
			<Button className="w-fit" variant="info">
				Details
			</Button>
		</Card>
	);
}

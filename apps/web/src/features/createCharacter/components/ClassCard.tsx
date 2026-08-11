import { type Class, type ClassId } from "@app/content";
import { resolveImageUrl } from "../../../utils/image";
import { ArrowRight } from "pixelarticons/react/ArrowRight";
import { Button } from "../../../components/Button";

type ClassCardProps = {
	gameClass: Class;
	onChoose: (classId: ClassId) => void;
	onViewDetails: (classId: ClassId) => void;
};

export function ClassCard({ gameClass, onChoose, onViewDetails }: ClassCardProps) {
	return (
		<article className="grid min-w-0 gap-2 border-2 border-border-secondary bg-bg-panel p-3">
			<div className="flex min-w-0 items-start gap-3">
				<img
					src={resolveImageUrl(gameClass.icon)}
					alt=""
					width="56"
					height="56"
					loading="lazy"
					className="shrink-0 border-2 border-bg-elevated bg-bg-base"
				/>
				<div className="grid min-w-0 flex-1 content-start gap-1">
					<h2 className="min-w-0 truncate text-text-bright">{gameClass.name}</h2>
					{gameClass.description && (
						<p className="line-clamp-2 text-text">{gameClass.description.trim()}</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<Button
					className="w-full"
					type="button"
					onClick={() => onViewDetails(gameClass.id)}
				>
					DETAILS
				</Button>
				<Button
					type="button"
					variant="primary"
					onClick={() => onChoose(gameClass.id)}
					className="w-full"
				>
					<span>CHOOSE</span>
					<ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 shrink-0" />
				</Button>
			</div>
		</article>
	);
}

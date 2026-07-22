import { SKILLS_BY_ID, type Class, type ClassId } from "@app/content";
import { resolveImageUrl } from "../../../utils/image";

type ClassCardProps = {
	gameClass: Class;
	onChoose: (classId: ClassId) => void;
};

export function ClassCard({ gameClass, onChoose }: ClassCardProps) {
	const startingSkillId = gameClass.combat.skillIds[0];
	const startingSkill = startingSkillId ? SKILLS_BY_ID[startingSkillId] : null;

	function handleChoose() {
		onChoose(gameClass.id);
	}

	return (
		<button
			type="button"
			aria-label={`Choose ${gameClass.name}`}
			onClick={handleChoose}
			className="flex min-w-0 cursor-pointer flex-col border-2 border-border-secondary bg-bg-panel p-3 text-left hover:border-border-bright focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
		>
			<span className="flex min-w-0 items-start gap-3">
				<img
					src={resolveImageUrl(gameClass.icon)}
					alt=""
					width="56"
					height="56"
					loading="lazy"
					className="shrink-0 border-2 border-bg-elevated bg-bg-base"
				/>
				<span className="grid min-w-0 gap-1">
					<span className="flex min-w-0 items-center justify-between gap-3">
						<span className="truncate text-text-bright">{gameClass.name}</span>
						<span className="shrink-0 text-primary">CHOOSE →</span>
					</span>
					{gameClass.description && (
						<span className="line-clamp-2 text-text">
							{gameClass.description.trim()}
						</span>
					)}
				</span>
			</span>

			<span className="mt-auto flex flex-wrap gap-x-1 pt-2">
				<span className="text-text-label">Starts with</span>
				<span className="text-text-bright">
					{startingSkill?.name ?? "No starting skill"}
				</span>
			</span>
		</button>
	);
}

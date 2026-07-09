import { type Skill, type SkillId } from "@app/content";
import { skillCategoryLabels, skillPoolLabels } from "../../game/displayLabels";
import { formatSkillEffect } from "../../game/effectDisplay";
import {
	TooltipDetailList,
	type TooltipDetailRow,
	TooltipSection,
} from "./TooltipContentPrimitives";
import { AttackRiderTooltipList } from "./AttackRiderTooltipList";

type SkillTooltipContentProps = {
	skill: {
		skillId: SkillId;
		chargesRemaining?: number;
	};
	definition: Skill;
};

export function SkillTooltipContent({ definition }: SkillTooltipContentProps) {
	const detailRows: TooltipDetailRow[] = [
		{ label: "Category", value: skillCategoryLabels[definition.category] },
		{ label: "Pool", value: skillPoolLabels[definition.pool] },
	];
	const maxUsesLabel = getMaxUsesLabel(definition.maxUses);

	return (
		<div className="grid gap-3">
			<header className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3">
				<span className="h-14 w-14 overflow-hidden border border-border bg-bg-base">
					<img
						src={definition.icon}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>

				<div className="grid min-w-0 content-center gap-1">
					<p className="break-words text-text-bright">{definition.name}</p>
					<p className="text-text">{maxUsesLabel}</p>
				</div>
			</header>

			{definition.description && (
				<p className="border-t border-border pt-2 text-text">{definition.description}</p>
			)}

			<TooltipDetailList rows={detailRows} />

			<TooltipSection title="Effects">
				<ul className="grid gap-1">
					{definition.effects.map((effect, index) => (
						<li key={`${effect.type}-${index}`} className="grid gap-1 break-words">
							<p>{formatSkillEffect(effect)}</p>
							{effect.type === "attackDamage" && effect.attackRiders.length > 0 && (
								<AttackRiderTooltipList riders={effect.attackRiders} />
							)}
						</li>
					))}
				</ul>
			</TooltipSection>
		</div>
	);
}

function getMaxUsesLabel(maxUses: number | undefined) {
	if (!maxUses) {
		return "Unlimited uses";
	}

	return `Max uses: ${maxUses}`;
}

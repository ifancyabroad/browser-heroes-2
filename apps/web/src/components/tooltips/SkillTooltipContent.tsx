import { type Skill, type SkillId, type SkillRankValue } from "@app/content";
import { skillCategoryLabels, skillPoolLabels } from "../../game/displayLabels";
import { formatSkillEffect } from "../../game/effectDisplay";
import {
	TooltipDetailList,
	type TooltipDetailRow,
	TooltipSection,
} from "./TooltipContentPrimitives";

type SkillTooltipContentProps = {
	skill: {
		skillId: SkillId;
		rank: SkillRankValue;
		chargesRemaining?: number;
	};
	definition: Skill;
};

export function SkillTooltipContent({ skill, definition }: SkillTooltipContentProps) {
	const rank = definition.ranks[skill.rank - 1];
	const usesLabel = getUsesLabel(skill, definition.maxUses);
	const detailRows: TooltipDetailRow[] = [
		{ label: "Rank", value: `R${skill.rank}` },
		{ label: "Category", value: skillCategoryLabels[definition.category] },
		{ label: "Pool", value: skillPoolLabels[definition.pool] },
		...(usesLabel ? [{ label: "Uses", value: usesLabel }] : []),
	];

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
					<p className="text-text-label">
						{skillCategoryLabels[definition.category]} /{" "}
						{skillPoolLabels[definition.pool]}
					</p>
				</div>
			</header>

			{definition.description && (
				<p className="border-t border-border pt-2 text-text">{definition.description}</p>
			)}

			<TooltipDetailList rows={detailRows} />

			{rank.description && (
				<TooltipSection title={`Rank ${rank.rank}`}>
					<p className="text-text">{rank.description}</p>
				</TooltipSection>
			)}

			<TooltipSection title="Effects">
				<ul className="grid gap-1">
					{rank.effects.map((effect, index) => (
						<li
							key={`${effect.type}-${index}`}
							className="break-words text-text-bright"
						>
							{formatSkillEffect(effect)}
						</li>
					))}
				</ul>
			</TooltipSection>
		</div>
	);
}

function getUsesLabel(skill: { chargesRemaining?: number }, maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${skill.chargesRemaining ?? maxUses}/${maxUses}`;
}

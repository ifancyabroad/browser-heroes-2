import clsx from "clsx";
import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import type { LevelUpOption } from "@app/engine";
import { Badge } from "../../../components/Badge";
import { RadioCard } from "../../../components/RadioCard";
import { Tooltip } from "../../../components/Tooltip";
import { FeatTooltipContent } from "../../../components/tooltips/FeatTooltipContent";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import { featCategoryLabels, skillCategoryLabels } from "../../../presentation/labels";
import { resolveImageUrl } from "../../../utils/image";

type LevelUpOptionCardProps = {
	option: LevelUpOption;
	value: string;
	selected: boolean;
	disabled: boolean;
};

export function LevelUpOptionCard({ option, value, selected, disabled }: LevelUpOptionCardProps) {
	const content = getOptionContent(option);
	const tooltipContent = getOptionTooltipContent(option);

	return (
		<RadioCard
			value={value}
			selected={selected}
			selectionLabel={`Select ${content.name}`}
			disabled={disabled}
			className={clsx(
				"w-full gap-3",
				content.metaLabel
					? "grid-cols-[3rem_minmax(0,1fr)_auto]"
					: "grid-cols-[3rem_minmax(0,1fr)]",
			)}
		>
			<span className="h-12 w-12 overflow-hidden border-2 border-bg-elevated bg-bg-base">
				<img
					src={resolveImageUrl(content.icon)}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
					aria-hidden
				/>
			</span>

			<span className="grid min-w-0 gap-1 self-center">
				<Tooltip
					content={tooltipContent}
					contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
					className="w-fit max-w-full break-words text-text-bright underline decoration-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				>
					{content.name}
				</Tooltip>
				<span>{content.category}</span>
			</span>

			{content.metaLabel && (
				<Badge
					label={content.metaLabel}
					className="self-center whitespace-nowrap text-primary"
				/>
			)}
		</RadioCard>
	);
}

function getOptionContent(option: LevelUpOption) {
	if (option.type === "skill") {
		const skill = SKILLS_BY_ID[option.skillId];

		return {
			icon: skill.icon,
			name: skill.name,
			category: skillCategoryLabels[skill.category],
			metaLabel: getMaxUsesLabel(skill.maxUses),
		};
	}

	const feat = FEATS_BY_ID[option.featId];

	return {
		icon: feat.icon,
		name: feat.name,
		category: featCategoryLabels[feat.category],
		metaLabel: null,
	};
}

function getOptionTooltipContent(option: LevelUpOption) {
	if (option.type === "skill") {
		const skill = SKILLS_BY_ID[option.skillId];

		return <SkillTooltipContent skill={{ skillId: option.skillId }} definition={skill} />;
	}

	return <FeatTooltipContent feat={FEATS_BY_ID[option.featId]} />;
}

function getMaxUsesLabel(maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${maxUses}/${maxUses}`;
}

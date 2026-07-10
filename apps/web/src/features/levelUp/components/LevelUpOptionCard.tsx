import clsx from "clsx";
import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import type { LevelUpOption } from "@app/engine";
import { Tooltip } from "../../../components/Tooltip";
import { FeatTooltipContent } from "../../../components/tooltips/FeatTooltipContent";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import { featCategoryLabels, skillCategoryLabels } from "../../../game/displayLabels";

type LevelUpOptionCardProps = {
	option: LevelUpOption;
	selected: boolean;
	disabled: boolean;
	onSelect: () => void;
};

export function LevelUpOptionCard({
	option,
	selected,
	disabled,
	onSelect,
}: LevelUpOptionCardProps) {
	const content = getOptionContent(option);
	const tooltipContent = getOptionTooltipContent(option);

	return (
		<Tooltip
			content={tooltipContent}
			placement="right"
			className="!block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
		>
			<button
				type="button"
				role="radio"
				aria-checked={selected}
				disabled={disabled}
				onClick={onSelect}
				className={clsx(
					"grid w-full gap-3 border bg-bg-elevated p-3 text-left text-base",
					content.metaLabel
						? "grid-cols-[3rem_minmax(0,1fr)_auto]"
						: "grid-cols-[3rem_minmax(0,1fr)]",
					selected
						? "border-info"
						: "border-transparent hover:border-info focus-visible:border-info",
					disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
				)}
			>
				<span className="h-12 w-12 overflow-hidden">
					<img
						src={content.icon}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>

				<span className="grid min-w-0 gap-1 self-center">
					<span className="break-words text-text-bright">{content.name}</span>
					<span>{content.category}</span>
				</span>

				{content.metaLabel && <BracketBadge>{content.metaLabel}</BracketBadge>}
			</button>
		</Tooltip>
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

function BracketBadge({ children }: { children: string }) {
	return (
		<span className="self-start whitespace-nowrap text-primary before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']">
			<span className="px-1">{children}</span>
		</span>
	);
}

function getMaxUsesLabel(maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${maxUses}/${maxUses}`;
}

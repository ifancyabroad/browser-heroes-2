import clsx from "clsx";
import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import type { LevelUpOption } from "@app/engine";

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

	return (
		<button
			type="button"
			role="radio"
			aria-checked={selected}
			disabled={disabled}
			onClick={onSelect}
			className={clsx(
				"grid gap-3 border-2 bg-bg-elevated p-3 text-left text-base transition-colors",
				content.metaLabel
					? "grid-cols-[3rem_minmax(0,1fr)_auto]"
					: "grid-cols-[3rem_minmax(0,1fr)]",
				selected
					? "border-primary"
					: "border-border hover:border-primary focus-visible:border-primary",
				disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
			)}
		>
			<span className="h-12 w-12 overflow-hidden border border-border bg-bg-base">
				<img
					src={content.icon}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
					aria-hidden
				/>
			</span>

			<span className="grid min-w-0 gap-1 self-center">
				<span className="flex flex-wrap items-baseline gap-x-2">
					<span>{content.name}</span>
					{content.typeLabel && (
						<span className="text-text-label">{content.typeLabel}</span>
					)}
				</span>
				{content.description && <span className="text-text">{content.description}</span>}
			</span>

			{content.metaLabel && (
				<span className="self-start whitespace-nowrap text-primary">
					{content.metaLabel}
				</span>
			)}
		</button>
	);
}

function getOptionContent(option: LevelUpOption) {
	if (option.type === "skill") {
		const skill = SKILLS_BY_ID[option.skillId];

		return {
			icon: skill.icon,
			name: skill.name,
			typeLabel: null,
			metaLabel: "New skill",
			description: `${formatLabel(skill.category)} - ${formatLabel(skill.pool)}`,
		};
	}

	const feat = FEATS_BY_ID[option.featId];

	return {
		icon: feat.icon,
		name: feat.name,
		typeLabel: null,
		metaLabel: null,
		description: formatLabel(feat.category),
	};
}

function formatLabel(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

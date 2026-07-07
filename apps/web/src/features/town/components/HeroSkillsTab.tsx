import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import { EmptySidebarText, HeroSidebarSection } from "./HeroSidebarPrimitives";
import {
	featCategoryLabels,
	skillCategoryLabels,
	skillPoolLabels,
} from "../../../game/displayLabels";

type HeroSkillsTabProps = {
	skills: HeroView["skills"];
	featIds: HeroView["featIds"];
};

export function HeroSkillsTab({ skills, featIds }: HeroSkillsTabProps) {
	return (
		<div className="grid gap-4">
			<HeroSidebarSection title="Skills">
				{skills.length > 0 ? (
					<ul className="grid gap-2">
						{skills.map((skill) => {
							const definition = SKILLS_BY_ID[skill.skillId];
							const usesLabel = getUsesLabel(skill, definition.maxUses);

							return (
								<li key={skill.skillId}>
									<Tooltip
										content={
											<SkillTooltipContent
												skill={skill}
												definition={definition}
											/>
										}
										placement="right"
										className="group !block w-full min-w-0 max-w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
										contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
									>
										<AbilityRow
											icon={definition.icon}
											name={definition.name}
											meta={`${skillCategoryLabels[definition.category]} / ${skillPoolLabels[definition.pool]}`}
											badges={
												usesLabel
													? [`R${skill.rank}`, usesLabel]
													: [`R${skill.rank}`]
											}
										/>
									</Tooltip>
								</li>
							);
						})}
					</ul>
				) : (
					<EmptySidebarText>No skills</EmptySidebarText>
				)}
			</HeroSidebarSection>

			<HeroSidebarSection title="Feats">
				{featIds.length > 0 ? (
					<ul className="grid gap-2">
						{featIds.map((featId) => {
							const feat = FEATS_BY_ID[featId];

							return (
								<li key={featId}>
									<AbilityRow
										icon={feat.icon}
										name={feat.name}
										meta={featCategoryLabels[feat.category]}
										badges={[]}
									/>
								</li>
							);
						})}
					</ul>
				) : (
					<EmptySidebarText>No feats</EmptySidebarText>
				)}
			</HeroSidebarSection>
		</div>
	);
}

type AbilityRowProps = {
	icon: string;
	name: string;
	meta: string;
	badges: readonly string[];
};

function AbilityRow({ icon, name, meta, badges }: AbilityRowProps) {
	return (
		<div
			className={clsx(
				"grid gap-3 py-1",
				badges.length > 0
					? "grid-cols-[3rem_minmax(0,1fr)_3.5rem]"
					: "grid-cols-[3rem_minmax(0,1fr)]",
			)}
		>
			<span className="h-12 w-12 overflow-hidden">
				<img
					src={icon}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
					aria-hidden
				/>
			</span>

			<span className="grid min-w-0 content-center gap-1">
				<span className="break-words">{name}</span>
				<span className="text-text-muted">{meta}</span>
			</span>

			{badges.length > 0 && (
				<span className="grid shrink-0 content-start justify-items-end gap-1">
					{badges.map((badge) => (
						<span
							key={badge}
							className="text-primary before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']"
						>
							<span className="px-1">{badge}</span>
						</span>
					))}
				</span>
			)}
		</div>
	);
}

function getUsesLabel(skill: HeroView["skills"][number], maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${skill.chargesRemaining ?? maxUses}/${maxUses}`;
}

import { FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import { selectHeroView, type HeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { Tooltip } from "../../../components/Tooltip";
import { Badge } from "../../../components/Badge";
import { FeatTooltipContent } from "../../../components/tooltips/FeatTooltipContent";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import { featCategoryLabels, skillCategoryLabels } from "../../../presentation/labels";
import { resolveImageUrl } from "../../../utils/image";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useGameModalStore } from "../../../stores/gameModalStore";

export function HeroSkillsModal({ run }: { run: RunView }) {
	const isOpen = useGameModalStore((state) => state.modal === "skills");
	const close = useGameModalStore((state) => state.close);
	if (!isOpen) {
		return null;
	}
	const heroView = selectHeroView(run.state.hero);
	const skills = run.state.combat?.player.skills ?? heroView.skills;
	const featIds = run.state.combat?.player.featIds ?? heroView.featIds;
	return (
		<Modal
			open
			title="Skills and feats"
			size="sm"
			onClose={close}
			footer={
				<Button type="button" onClick={close}>
					Close
				</Button>
			}
		>
			<div className="grid gap-4">
				{skills.length > 0 && (
					<ul className="grid gap-2" aria-label="Skills">
						{skills.map((skill) => {
							const definition = SKILLS_BY_ID[skill.skillId];
							const usesLabel = getUsesLabel(skill, definition.maxUses);

							return (
								<li key={skill.skillId} className="grid">
									<Tooltip
										content={
											<SkillTooltipContent
												skill={skill}
												definition={definition}
											/>
										}
										placement="right"
										className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
										contentClassName="w-80 sm:w-96"
									>
										<AbilityRow
											icon={definition.icon}
											name={definition.name}
											meta={skillCategoryLabels[definition.category]}
											badge={usesLabel}
										/>
									</Tooltip>
								</li>
							);
						})}
					</ul>
				)}

				{featIds.length > 0 && (
					<section className="grid gap-2" aria-label="Feats">
						<h2 className="text-text-bright">Feats</h2>
						<ul className="grid gap-2">
							{featIds.map((featId) => {
								const feat = FEATS_BY_ID[featId];

								return (
									<li key={featId} className="grid">
										<Tooltip
											content={<FeatTooltipContent feat={feat} />}
											placement="right"
											className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
											contentClassName="w-80 sm:w-96"
										>
											<AbilityRow
												icon={feat.icon}
												name={feat.name}
												meta={featCategoryLabels[feat.category]}
												badge="Passive"
											/>
										</Tooltip>
									</li>
								);
							})}
						</ul>
					</section>
				)}

				{skills.length === 0 && featIds.length === 0 && (
					<p className="text-text-muted">No skills</p>
				)}
			</div>
		</Modal>
	);
}

type AbilityRowProps = {
	icon: string;
	name: string;
	meta: string;
	badge: string | null;
};

function AbilityRow({ icon, name, meta, badge }: AbilityRowProps) {
	return (
		<div className="flex gap-3 py-1">
			<span className="size-12 shrink-0">
				<img
					src={resolveImageUrl(icon)}
					alt=""
					loading="lazy"
					className="size-full object-cover"
					aria-hidden
				/>
			</span>

			<span className="grid min-w-0 flex-1 content-center gap-1">
				<span className="text-text-bright">{name}</span>
				<span>{meta}</span>
			</span>

			{badge && <Badge label={badge} className="shrink-0 self-start text-primary" />}
		</div>
	);
}

function getUsesLabel(skill: HeroView["skills"][number], maxUses: number | undefined) {
	if (!maxUses) {
		return null;
	}

	return `${skill.chargesRemaining ?? maxUses}/${maxUses}`;
}

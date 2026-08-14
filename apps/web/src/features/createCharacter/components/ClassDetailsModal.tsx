import {
	attributes,
	ITEMBASES_BY_ID,
	SKILLS_BY_ID,
	type Class,
	type SkillPool,
} from "@app/content";
import { ArrowRight } from "pixelarticons/react/ArrowRight";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import {
	armourTypeLabels,
	attributeShortLabels,
	equipmentSlotLabels,
	skillPoolLabels,
	weaponTypeLabels,
} from "../../../presentation/labels";
import { resolveImageUrl } from "../../../utils/image";

type ClassDetailsModalProps = {
	gameClass: Class;
	onChoose: () => void;
	onClose: () => void;
};

const skillPoolBadgeClassNames: Record<SkillPool, string> = {
	assassin: "border-skill-pool-assassin text-skill-pool-assassin",
	barbarian: "border-skill-pool-barbarian text-skill-pool-barbarian",
	cleric: "border-skill-pool-cleric text-skill-pool-cleric",
	common: "border-skill-pool-common text-skill-pool-common",
	fighter: "border-skill-pool-fighter text-skill-pool-fighter",
	occultist: "border-skill-pool-occultist text-skill-pool-occultist",
	thief: "border-skill-pool-thief text-skill-pool-thief",
	unique: "border-skill-pool-unique text-skill-pool-unique",
	warlock: "border-skill-pool-warlock text-skill-pool-warlock",
	wizard: "border-skill-pool-wizard text-skill-pool-wizard",
};

export function ClassDetailsModal({ gameClass, onChoose, onClose }: ClassDetailsModalProps) {
	const startingSkills = gameClass.combat.skillIds.map((skillId) => SKILLS_BY_ID[skillId]);
	const startingEquipment = Object.entries(gameClass.startingEquipment ?? {}).flatMap(
		([slot, itemBaseId]) => (itemBaseId ? [{ slot, item: ITEMBASES_BY_ID[itemBaseId] }] : []),
	);
	const highestAttribute = Math.max(
		...attributes.map((attribute) => gameClass.attributes[attribute]),
	);

	return (
		<Modal
			open
			title={gameClass.name.toUpperCase()}
			onClose={onClose}
			size="4xl"
			footer={
				<>
					<Button type="button" onClick={onClose}>
						CLOSE
					</Button>
					<Button type="button" variant="primary" onClick={onChoose}>
						<span>CHOOSE {gameClass.name.toUpperCase()}</span>
						<ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 shrink-0" />
					</Button>
				</>
			}
		>
			<article className="grid gap-6 md:grid-cols-[minmax(14rem,2fr)_minmax(0,3fr)] md:gap-0">
				<div className="flex h-64 items-end justify-center overflow-hidden bg-bg-base md:h-[32rem] md:pr-6">
					<img
						src={resolveImageUrl(gameClass.portrait)}
						alt={`${gameClass.name} class portrait`}
						className="h-full w-auto max-w-none shrink-0"
					/>
				</div>

				<div className="grid content-start gap-6 md:border-l-2 md:border-border-secondary md:pl-8">
					{startingSkills.length > 0 && (
						<DetailSection
							title={
								startingSkills.length === 1 ? "Starting Skill" : "Starting Skills"
							}
						>
							<div className="grid gap-3">
								{startingSkills.map((skill) => (
									<div key={skill.id} className="flex items-start gap-3">
										<img
											src={resolveImageUrl(skill.icon)}
											alt=""
											width="56"
											height="56"
											className="shrink-0 bg-bg-base"
										/>
										<div className="grid gap-1">
											<h3 className="text-primary">{skill.name}</h3>
											{skill.description && (
												<p className="text-text">{skill.description}</p>
											)}
										</div>
									</div>
								))}
							</div>
						</DetailSection>
					)}

					<DetailSection title="Skill Paths">
						<div className="flex flex-wrap gap-2">
							{gameClass.skillPoolIds.map((pool) => (
								<Badge
									key={pool}
									label={skillPoolLabels[pool]}
									className={skillPoolBadgeClassNames[pool]}
								/>
							))}
						</div>
					</DetailSection>

					<DetailSection title="Core Attributes">
						<ul className="grid grid-cols-3 gap-x-6 gap-y-2">
							{attributes.map((attribute) => {
								const value = gameClass.attributes[attribute];

								return (
									<li
										key={attribute}
										className="flex items-baseline justify-between gap-2"
									>
										<span className="text-text-label">
											{attributeShortLabels[attribute]}
										</span>
										<span
											className={
												value === highestAttribute
													? "text-primary"
													: "text-text"
											}
										>
											{value}
										</span>
									</li>
								);
							})}
						</ul>
					</DetailSection>

					<div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
						<DetailSection title="Starting Loadout">
							<dl className="grid gap-y-2">
								{startingEquipment.map(({ slot, item }) => (
									<DetailRow
										key={slot}
										label={
											equipmentSlotLabels[
												slot as keyof typeof equipmentSlotLabels
											]
										}
										value={item.name}
									/>
								))}
							</dl>
						</DetailSection>

						<DetailSection title="Class Training">
							<dl className="grid gap-y-2">
								<DetailRow label="Hit die" value={gameClass.combat.hitDie} />
								<DetailRow
									label="Saves"
									value={gameClass.proficiencies.savingThrows
										.map((attribute) => attributeShortLabels[attribute])
										.join(", ")}
								/>
							</dl>
						</DetailSection>
					</div>

					<DetailSection title="Proficiencies">
						<dl className="grid gap-2">
							<DetailRow
								label="Armour"
								value={gameClass.proficiencies.armourTypes
									.map((type) => armourTypeLabels[type])
									.join(", ")}
							/>
							<DetailRow
								label="Weapons"
								value={gameClass.proficiencies.weaponTypes
									.map((type) => weaponTypeLabels[type])
									.join(", ")}
							/>
						</dl>
					</DetailSection>
				</div>
			</article>
		</Modal>
	);
}

function DetailSection({ title, children }: React.PropsWithChildren<{ title: string }>) {
	return (
		<section className="grid content-start gap-2">
			<h2 className="text-text-bright">{title}</h2>
			{children}
		</section>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-3">
			<dt className="text-text-label">{label}</dt>
			<dd className="min-w-0 text-text">{value || "None"}</dd>
		</div>
	);
}

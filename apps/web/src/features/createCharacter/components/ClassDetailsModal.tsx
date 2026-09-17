import {
	attributes,
	ITEMBASES_BY_ID,
	SKILLS_BY_ID,
	type Class,
	type SkillPool,
} from "@app/content";
import type { PropsWithChildren } from "react";
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
			title="CLASS DETAILS"
			onClose={onClose}
			size="3xl"
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
			<article className="grid items-start gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] md:grid-rows-[min-content_1fr]">
				<header className="grid min-w-0 gap-2 md:col-start-2">
					<h2 className="break-words text-primary">{gameClass.name}</h2>
					{gameClass.description && <p>{gameClass.description}</p>}
				</header>
				<div className="flex h-56 justify-center overflow-hidden bg-bg-base md:sticky md:top-0 md:col-start-1 md:row-span-2 md:row-start-1 md:h-96">
					<img
						src={resolveImageUrl(gameClass.portrait)}
						alt={gameClass.name + " class portrait"}
						className="h-full w-auto max-w-none shrink-0"
					/>
				</div>
				<div className="grid min-w-0 gap-5 md:col-start-2">
					<DetailSection title="Starting attributes">
						<dl className="grid grid-cols-3 gap-x-2 gap-y-1 xs:grid-cols-6">
							{attributes.map((attribute) => (
								<div key={attribute} className="flex gap-2">
									<dt className="text-text-label">
										{attributeShortLabels[attribute]}
									</dt>
									<dd
										className={
											gameClass.attributes[attribute] === highestAttribute
												? "text-primary"
												: undefined
										}
									>
										{gameClass.attributes[attribute]}
									</dd>
								</div>
							))}
						</dl>
					</DetailSection>
					{startingSkills.length > 0 && (
						<DetailSection
							title={
								startingSkills.length === 1 ? "Starting skill" : "Starting skills"
							}
						>
							<ul className="grid gap-3">
								{startingSkills.map((skill) => (
									<li key={skill.id} className="flex items-start gap-3">
										<img
											src={resolveImageUrl(skill.icon)}
											alt=""
											width={48}
											height={48}
											className="shrink-0"
										/>
										<div className="grid min-w-0 gap-1">
											<h3 className="break-words text-text-bright">
												{skill.name}
											</h3>
											{skill.description && <p>{skill.description}</p>}
										</div>
									</li>
								))}
							</ul>
						</DetailSection>
					)}
					<DetailSection title="Skill paths">
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
					<DetailSection title="Starting equipment">
						<dl className="grid gap-2">
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
					<DetailSection title="Training">
						<dl className="grid gap-2">
							<DetailRow label="Hit die" value={gameClass.combat.hitDie} />
							<DetailRow
								label="Saves"
								value={gameClass.proficiencies.savingThrows
									.map((attribute) => attributeShortLabels[attribute])
									.join(" / ")}
							/>
							<DetailRow
								label="Armour"
								value={gameClass.proficiencies.armourTypes
									.map((type) => armourTypeLabels[type])
									.join(" / ")}
							/>
							<DetailRow
								label="Weapons"
								value={gameClass.proficiencies.weaponTypes
									.map((type) => weaponTypeLabels[type])
									.join(" / ")}
							/>
						</dl>
					</DetailSection>
				</div>
			</article>
		</Modal>
	);
}

function DetailSection({ title, children }: PropsWithChildren<{ title: string }>) {
	return (
		<section className="grid gap-2">
			<h2 className="text-text-bright">{title}</h2>
			{children}
		</section>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-3">
			<dt className="text-text-label">{label}</dt>
			<dd className="min-w-0">{value || "None"}</dd>
		</div>
	);
}

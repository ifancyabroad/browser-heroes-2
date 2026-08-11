import { attributes, ITEMBASES_BY_ID, SKILLS_BY_ID, type Class } from "@app/content";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import {
	armourTypeLabels,
	attributeLabels,
	attributeShortLabels,
	equipmentSlotLabels,
	skillPoolLabels,
	weaponTypeLabels,
} from "../../../presentation/labels";
import { resolveImageUrl } from "../../../utils/image";

type ClassDetailsModalProps = {
	gameClass: Class;
	onClose: () => void;
};

export function ClassDetailsModal({ gameClass, onClose }: ClassDetailsModalProps) {
	const startingSkills = gameClass.combat.skillIds.map((skillId) => SKILLS_BY_ID[skillId]);
	const startingEquipment = Object.entries(gameClass.startingEquipment ?? {}).flatMap(
		([slot, itemBaseId]) => (itemBaseId ? [{ slot, item: ITEMBASES_BY_ID[itemBaseId] }] : []),
	);

	return (
		<Modal
			open
			title="CLASS DETAILS"
			onClose={onClose}
			size="2xl"
			footer={
				<Button type="button" onClick={onClose}>
					CLOSE
				</Button>
			}
		>
			<article className="grid gap-5">
				<header className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-3">
					<img
						src={resolveImageUrl(gameClass.icon)}
						alt=""
						width="72"
						height="72"
						className="border-2 border-bg-elevated bg-bg-base"
					/>
					<div className="grid gap-1">
						<h2 className="text-primary">{gameClass.name}</h2>
						{gameClass.description && (
							<p className="text-text">{gameClass.description}</p>
						)}
					</div>
				</header>

				<div className="grid items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
					<div className="grid content-start gap-6">
						<DetailSection title="Attributes">
							<ul className="grid gap-y-2">
								{attributes.map((attribute) => (
									<li
										key={attribute}
										className="grid grid-cols-[1fr_auto] items-baseline gap-4"
									>
										<span className="text-text-label">
											{attributeLabels[attribute]}
										</span>
										<span className="text-text tabular-nums">
											{gameClass.attributes[attribute]}
										</span>
									</li>
								))}
							</ul>
						</DetailSection>

						<DetailSection title="Class Training">
							<ul className="grid gap-y-2">
								<DetailRow
									label="Hit die"
									value={gameClass.combat.hitDie}
									narrow
									alignRight
								/>
								<DetailRow
									label="Saves"
									narrow
									alignRight
									value={gameClass.proficiencies.savingThrows
										.map((attribute) => attributeShortLabels[attribute])
										.join(", ")}
								/>
								<DetailRow
									label="Paths"
									narrow
									alignRight
									value={gameClass.skillPoolIds
										.map((pool) => skillPoolLabels[pool])
										.join(", ")}
								/>
							</ul>
						</DetailSection>
					</div>

					<div className="grid content-start gap-6">
						<DetailSection title="Starting Loadout">
							<ul className="grid gap-y-2">
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
								{startingSkills.map((skill) => (
									<DetailRow key={skill.id} label="Skill" value={skill.name} />
								))}
							</ul>
						</DetailSection>

						<DetailSection title="Proficiencies">
							<div className="grid gap-3">
								<StackedDetail
									label="Armour"
									value={gameClass.proficiencies.armourTypes
										.map((type) => armourTypeLabels[type])
										.join(", ")}
								/>
								<StackedDetail
									label="Weapons"
									value={gameClass.proficiencies.weaponTypes
										.map((type) => weaponTypeLabels[type])
										.join(", ")}
								/>
							</div>
						</DetailSection>
					</div>
				</div>
			</article>
		</Modal>
	);
}

function DetailSection({ title, children }: React.PropsWithChildren<{ title: string }>) {
	return (
		<section className="grid content-start gap-3">
			<h2 className="text-text-bright">{title}</h2>
			{children}
		</section>
	);
}

function DetailRow({
	label,
	value,
	narrow = false,
	alignRight = false,
}: {
	label: string;
	value: string;
	narrow?: boolean;
	alignRight?: boolean;
}) {
	return (
		<li
			className={`flex items-baseline gap-3 md:grid ${
				narrow ? "md:grid-cols-[4rem_minmax(0,1fr)]" : "md:grid-cols-[7rem_minmax(0,1fr)]"
			}`}
		>
			<span className="shrink-0 whitespace-nowrap text-text-label">{label}</span>
			<span
				className={`min-w-0 flex-1 text-right text-text ${alignRight ? "" : "md:text-left"}`}
			>
				{value || "None"}
			</span>
		</li>
	);
}

function StackedDetail({ label, value }: { label: string; value: string }) {
	return (
		<p className="grid content-start gap-1">
			<span className="text-text-label">{label}</span>
			<span className="text-text">{value || "None"}</span>
		</p>
	);
}

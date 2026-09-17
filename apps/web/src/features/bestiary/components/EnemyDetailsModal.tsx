import { attributes, SKILLS_BY_ID, FEATS_BY_ID, type Enemy, type Zone } from "@app/content";
import type { BestiaryEntryView } from "@app/shared";
import type { PropsWithChildren } from "react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";
import { formatTitle } from "../../../presentation/effects";
import { getDamageTypeBorderClass } from "../../../presentation/damage";
import {
	attributeShortLabels,
	damageClassLabels,
	damageTypeLabels,
} from "../../../presentation/labels";
import { resolveImageUrl } from "../../../utils/image";
import abyss from "../../../assets/images/backgrounds/bg_41.png";
import castle from "../../../assets/images/backgrounds/bg_27.png";
import desert from "../../../assets/images/backgrounds/bg_09.png";
import dungeon from "../../../assets/images/backgrounds/bg_50.png";
import forest from "../../../assets/images/backgrounds/bg_12.png";
import hills from "../../../assets/images/backgrounds/bg_22.png";
import ocean from "../../../assets/images/backgrounds/bg_25.png";
import plains from "../../../assets/images/backgrounds/bg_46.png";
import tower from "../../../assets/images/backgrounds/bg_38.png";
import volcano from "../../../assets/images/backgrounds/bg_16.png";

const backgrounds = {
	abyss,
	castle,
	desert,
	dungeon,
	forest,
	hills,
	ocean,
	plains,
	tower,
	volcano,
} satisfies Record<Zone, string>;

type EnemyDetailsModalProps = {
	enemy: Enemy;
	record: BestiaryEntryView;
	onClose: () => void;
};

export function EnemyDetailsModal({ enemy, record, onClose }: EnemyDetailsModalProps) {
	const completedEncounters = record.victories + record.deaths;
	const winRate =
		completedEncounters > 0
			? `${Math.round((record.victories / completedEncounters) * 100)}%`
			: "—";
	const attack = enemy.combat.basicAttack;
	const affinities = enemy.combat.damageAffinities;
	const skills = enemy.combat.skillIds.map((id) => SKILLS_BY_ID[id]);
	const feats = enemy.combat.featIds.map((id) => FEATS_BY_ID[id]);
	const affinityGroups = [
		{ title: "Resistances", types: affinities.resistances },
		{ title: "Immunities", types: affinities.immunities },
		{ title: "Vulnerabilities", types: affinities.vulnerabilities },
	].filter((group) => group.types.length > 0);

	return (
		<Modal
			open
			title="BESTIARY"
			onClose={onClose}
			size="3xl"
			footer={
				<Button type="button" onClick={onClose}>
					CLOSE
				</Button>
			}
		>
			<article className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:grid-rows-[min-content_1fr]">
				<header className="grid min-w-0 gap-1 md:col-start-2">
					<h2 className="break-words text-primary">{enemy.name}</h2>
					<p className="text-text-muted">
						{formatTitle(enemy.encounter.zone)} / {formatTitle(enemy.rank)}
					</p>
					{enemy.description && <p className="mt-1">{enemy.description}</p>}
				</header>
				<div className="grid gap-4 md:sticky md:top-0 md:col-start-1 md:row-span-2 md:row-start-1">
					<div
						className="h-56 bg-cover bg-bottom md:h-72"
						style={{ backgroundImage: `url(${backgrounds[enemy.encounter.zone]})` }}
					>
						<img
							src={resolveImageUrl(enemy.portrait)}
							alt={enemy.name}
							className="h-full w-full object-contain"
							decoding="async"
						/>
					</div>
					<Section title="Your encounters">
						<dl className="grid gap-1">
							<RecordRow label="Encountered" value={record.encounters} />
							<RecordRow label="Defeated" value={record.victories} />
							<RecordRow label="Win rate" value={winRate} />
						</dl>
					</Section>
				</div>
				<div className="grid min-w-0 gap-5 md:col-start-2">
					<Section title="Base attributes">
						<dl className="grid grid-cols-3 gap-x-2 gap-y-1 xs:grid-cols-6">
							{attributes.map((attribute) => (
								<div key={attribute} className="flex gap-2">
									<dt className="text-text-label">
										{attributeShortLabels[attribute]}
									</dt>
									<dd>{enemy.attributes[attribute]}</dd>
								</div>
							))}
						</dl>
					</Section>

					<Section title="Basic attack">
						<div className="flex items-start gap-3">
							<img
								src={resolveImageUrl(attack.icon)}
								alt=""
								width={48}
								height={48}
								className="shrink-0"
							/>
							<div className="grid min-w-0 gap-1">
								<h3 className="break-words text-text-bright">{attack.name}</h3>
								<dl className="grid gap-1">
									<div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-2">
										<dt className="text-text-label">Damage</dt>
										<dd>
											{attack.damage.dice}
											{attack.damage.attribute &&
												` + ${attributeShortLabels[attack.damage.attribute]} modifier`}
										</dd>
									</div>
									<div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-2">
										<dt className="text-text-label">Type</dt>
										<dd>
											{damageTypeLabels[attack.damage.type]} /{" "}
											{damageClassLabels[attack.damage.damageClass]}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</Section>

					{skills.length > 0 && (
						<Section title="Skills">
							<ul className="grid gap-3">
								{skills.map((skill) => (
									<AbilityRow key={skill.id} ability={skill} />
								))}
							</ul>
						</Section>
					)}
					{feats.length > 0 && (
						<Section title="Feats">
							<ul className="grid gap-3">
								{feats.map((feat) => (
									<AbilityRow key={feat.id} ability={feat} />
								))}
							</ul>
						</Section>
					)}
					{affinityGroups.length > 0 && (
						<Section title="Affinities">
							<dl className="grid gap-2">
								{affinityGroups.map(({ title, types }) => (
									<div
										key={title}
										className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-start gap-2"
									>
										<dt className="text-text-label">{title}</dt>
										<dd className="flex flex-wrap gap-1">
											{types.map((type) => (
												<Badge
													key={type}
													label={damageTypeLabels[type]}
													variant="muted"
													textTone="bright"
													className={getDamageTypeBorderClass(type)}
												/>
											))}
										</dd>
									</div>
								))}
							</dl>
						</Section>
					)}
				</div>
			</article>
		</Modal>
	);
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
	return (
		<section className="grid gap-2">
			<h2 className="text-text-bright">{title}</h2>
			{children}
		</section>
	);
}

function RecordRow({ label, value }: { label: string; value: number | string }) {
	return (
		<div className="flex justify-between gap-3">
			<dt className="text-text-label">{label}</dt>
			<dd>{value}</dd>
		</div>
	);
}

function AbilityRow({
	ability,
}: {
	ability: { name: string; icon: string; description?: string };
}) {
	return (
		<li className="flex items-start gap-3">
			<img
				src={resolveImageUrl(ability.icon)}
				alt=""
				width={48}
				height={48}
				className="shrink-0"
			/>
			<div className="grid min-w-0 gap-1">
				<h3 className="break-words text-text-bright">{ability.name}</h3>
				{ability.description && <p>{ability.description}</p>}
			</div>
		</li>
	);
}

import { SKILLS_BY_ID, FEATS_BY_ID, type Enemy, type Zone } from "@app/content";
import type { BestiaryEntryView } from "@app/shared";
import type { PropsWithChildren } from "react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { formatTitle } from "../../../presentation/effects";
import { formatDamageSelector } from "../../../presentation/damage";
import { damageTypeLabels } from "../../../presentation/labels";
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
			title={enemy.name.toUpperCase()}
			onClose={onClose}
			size="4xl"
			footer={
				<Button type="button" onClick={onClose}>
					CLOSE
				</Button>
			}
		>
			<article className="grid gap-6 md:grid-cols-2">
				<div
					className="h-64 overflow-hidden bg-cover bg-bottom bg-no-repeat md:h-96"
					style={{ backgroundImage: `url(${backgrounds[enemy.encounter.zone]})` }}
				>
					<img
						src={resolveImageUrl(enemy.portrait)}
						alt={enemy.name}
						className="h-full w-full object-contain"
						decoding="async"
					/>
				</div>
				<div className="grid content-start gap-5">
					<p className="text-text-muted">
						{formatTitle(enemy.encounter.zone)} · {formatTitle(enemy.rank)}
					</p>
					{enemy.description && <p>{enemy.description}</p>}
					<Section title="Your encounters">
						<dl className="grid gap-1 tabular-nums">
							<RecordRow label="Encountered" count={record.encounters} />
							<RecordRow label="Defeated" count={record.victories} />
							<RecordRow label="Heroes slain" count={record.deaths} />
						</dl>
					</Section>
					<Section title="Basic attack">
						<p>{attack.name}</p>
						<p className="text-text-muted">
							{formatDamageSelector({
								damageType: attack.damage.type,
								damageClass: attack.damage.damageClass,
								attackRange: attack.attackRange,
							})}
						</p>
					</Section>
					{skills.length > 0 && (
						<Section title="Skills">
							{skills.map((skill) => (
								<div key={skill.id}>
									<h3 className="text-primary">{skill.name}</h3>
									{skill.description && <p>{skill.description}</p>}
								</div>
							))}
						</Section>
					)}
					{feats.length > 0 && (
						<Section title="Feats">
							{feats.map((feat) => (
								<div key={feat.id}>
									<h3 className="text-primary">{feat.name}</h3>
									{feat.description && <p>{feat.description}</p>}
								</div>
							))}
						</Section>
					)}
					{affinityGroups.map(({ title, types }) => (
						<Section key={title} title={title}>
							<p>{types.map((type) => damageTypeLabels[type]).join(", ")}</p>
						</Section>
					))}
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

function RecordRow({ label, count }: { label: string; count: number }) {
	return (
		<div className="flex justify-between gap-3">
			<dt className="text-text-muted">{label}</dt>
			<dd>{count}</dd>
		</div>
	);
}

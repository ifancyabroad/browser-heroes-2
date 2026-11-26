import type { ReactNode } from "react";
import type { AttackRider, Effect, PassiveModifier, SavingThrow } from "@app/content";
import { describeEffect } from "../content/effectDescriptions";
import { formatDuration, formatLabel } from "../content/presentation";
import { modifierSummary } from "../content/summaries";

function AuthoredFields({
	value,
	label = "Authored effect fields",
}: {
	value: unknown;
	label?: string;
}) {
	return (
		<details className="mechanic-fields">
			<summary>{label}</summary>
			<pre>{JSON.stringify(value, null, 2)}</pre>
		</details>
	);
}

function nestedSource(value: unknown, key: string): readonly unknown[] | undefined {
	if (typeof value !== "object" || value === null) {
		return undefined;
	}
	const child = (value as Record<string, unknown>)[key];
	return Array.isArray(child) ? child : undefined;
}

export function EffectFlow({
	effects,
	authored = effects,
	nested = false,
}: {
	effects: readonly Effect[];
	authored?: readonly unknown[];
	nested?: boolean;
}) {
	return (
		<ol
			className={nested ? "effect-flow effect-outcomes" : "effect-flow"}
			aria-label={nested ? "Consequences" : "Effects in authored order"}
		>
			{effects.map((effect, index) => (
				<li className="effect-step" key={index}>
					<EffectStep
						effect={effect}
						authored={authored[index]}
						index={nested ? undefined : index + 1}
					/>
				</li>
			))}
		</ol>
	);
}

function EffectStep({
	effect,
	authored,
	index,
}: {
	effect: Effect;
	authored: unknown;
	index?: number;
}) {
	const { title, description } = describeEffect(effect);
	const save = "save" in effect ? effect.save : undefined;
	const outcome = <p className="effect-description">{description}</p>;
	return (
		<>
			<div className="effect-heading">
				{index !== undefined && (
					<span className="effect-number" aria-hidden="true">
						{index}
					</span>
				)}
				<strong>{title}</strong>
				<span className="effect-meta">
					<span className="effect-target">
						{effect.target === "self" ? "Self" : "Enemy"}
					</span>
					{"duration" in effect && (
						<span className="effect-duration">{formatDuration(effect.duration)}</span>
					)}
				</span>
			</div>
			{save ? (
				<SaveGate save={save} target={effect.target} scope="effect">
					{outcome}
				</SaveGate>
			) : (
				outcome
			)}
			{effect.type === "attackDamage" && effect.attackRiders.length > 0 && (
				<RiderFlow
					riders={effect.attackRiders}
					authored={nestedSource(authored, "attackRiders")}
				/>
			)}
			<AuthoredFields value={authored ?? effect} />
		</>
	);
}

function SaveGate({
	save,
	target,
	scope,
	children,
}: {
	save: SavingThrow;
	target: string;
	scope: "rider" | "effect";
	children: ReactNode;
}) {
	return (
		<section className="save-gate" aria-label={`${formatLabel(save.attribute)} saving throw`}>
			<p className="save-heading">
				{target === "self" ? "Self" : "Enemy"} makes a{" "}
				<strong>{formatLabel(save.attribute)} save</strong>.
			</p>
			<p className="save-scope">
				{scope === "rider"
					? "One save for all consequences below."
					: "Separate save for this effect."}
			</p>
			<div className="save-failure" role="group" aria-label="On failed save">
				<h5>On failed save</h5>
				{children}
			</div>
			<p className="save-success">
				<strong>On successful save</strong>
				<span>
					{save.onSuccess === "halfDamage"
						? "Half damage."
						: scope === "rider"
							? "No effect — prevents all consequences above."
							: "No effect."}
				</span>
			</p>
			<AuthoredFields value={save} label="Saving throw details" />
		</section>
	);
}

export function RiderFlow({
	riders,
	authored = riders,
}: {
	riders: readonly AttackRider[];
	authored?: readonly unknown[];
}) {
	return (
		<div className="rider-flow">
			{riders.map((rider, index) => {
				const effects = (
					<EffectFlow
						effects={rider.effects}
						authored={nestedSource(authored[index], "effects")}
						nested
					/>
				);
				return (
					<section
						className="rider-branch"
						key={index}
						aria-label={formatLabel(rider.timing)}
					>
						<h4>{formatLabel(rider.timing)}</h4>
						{rider.save ? (
							<SaveGate save={rider.save} target="enemy" scope="rider">
								{effects}
							</SaveGate>
						) : (
							effects
						)}
						<AuthoredFields value={authored[index]} label="Authored rider fields" />
					</section>
				);
			})}
		</div>
	);
}

export function ModifierFlow({
	modifiers,
	authored = modifiers,
}: {
	modifiers: readonly PassiveModifier[];
	authored?: readonly unknown[];
}) {
	return (
		<ul className="effect-flow effect-outcomes" aria-label="Passive modifiers">
			{modifiers.map((modifier, index) => (
				<li className="effect-step" key={index}>
					<p className="effect-description">{modifierSummary([modifier])}</p>
					<AuthoredFields value={authored[index]} label="Authored modifier fields" />
				</li>
			))}
		</ul>
	);
}

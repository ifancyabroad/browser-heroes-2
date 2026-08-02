import { useState } from "react";
import { ContentImage } from "../components/ContentImage";
import { catalogByKey, type CategoryKey } from "../content/catalog";
import type { FieldIssue } from "./api";
import { ArtworkPicker } from "./ArtworkPicker";
import { discriminatorDefaults, modifierDefaults, optionsByField } from "./defaults";

type Props = {
	value: unknown;
	path: string;
	field: string;
	category: CategoryKey;
	issues: FieldIssue[];
	immutable?: boolean;
	optional?: boolean;
	onRemove?(): void;
	onChange(value: unknown): void;
};
const artworkFields = new Set(["icon", "portrait", "enemyPortrait"]);
const referenceTargets: Record<string, CategoryKey> = {
	skillIds: "skills",
	featIds: "feats",
	head: "item-bases",
	neck: "item-bases",
	body: "item-bases",
	hands: "item-bases",
	finger1: "item-bases",
	finger2: "item-bases",
	waist: "item-bases",
	feet: "item-bases",
	mainHand: "item-bases",
	offHand: "item-bases",
};

export function StructuredEditor(props: Props) {
	const { value, path, field, onChange, issues } = props;
	const [picker, setPicker] = useState(false);
	const fieldIssues = issues.filter((issue) => issue.path === path);
	if (Array.isArray(value)) {
		return <ArrayEditor {...props} value={value} />;
	}
	if (typeof value === "object" && value !== null) {
		const object = value as Record<string, unknown>;
		const missing = optionalFields(object, path, props.category);
		return (
			<fieldset className="editor-group">
				<legend>{label(field)}</legend>
				{Object.entries(object).map(([key, child]) => (
					<StructuredEditor
						key={key}
						{...props}
						field={key}
						path={path ? `${path}.${key}` : key}
						value={child}
						immutable={key === "id"}
						optional={isOptionalField(object, path, key, props.category)}
						onRemove={() => {
							const next = { ...object };
							delete next[key];
							onChange(next);
						}}
						onChange={(next) => {
							if (key === "type" && typeof next === "object" && next !== null) {
								onChange(next);
							} else if (key === "type" && path === "" && typeof next === "string") {
								onChange(switchItemType(object, next, props.category));
							} else if (key === "slot" && path === "" && typeof next === "string") {
								onChange(switchArmourSlot(object, next));
							} else {
								onChange({ ...object, [key]: next });
							}
						}}
					/>
				))}
				{missing.length > 0 && (
					<div className="optional-add">
						<span>Add optional field</span>
						{missing.map(([key, initial]) => (
							<button
								type="button"
								key={key}
								onClick={() => onChange({ ...object, [key]: initial })}
							>
								{label(key)}
							</button>
						))}
					</div>
				)}
			</fieldset>
		);
	}
	const options =
		field === "type"
			? typeOptions(path)
			: field === "kind"
				? kindOptions(props.category, path)
				: field === "category"
					? categoryOptions(props.category, path)
					: optionsByField[field];
	const reference = referenceTargets[field];
	return (
		<label className={`editor-field ${fieldIssues.length ? "invalid" : ""}`}>
			<span>
				{label(field)}
				{props.immutable && <small>Immutable</small>}
			</span>
			{typeof value === "boolean" ? (
				<input
					type="checkbox"
					checked={value}
					disabled={props.immutable}
					onChange={(event) => onChange(event.target.checked)}
				/>
			) : reference ? (
				<select
					value={String(value ?? "")}
					onChange={(event) => onChange(event.target.value)}
				>
					<option value="">None</option>
					{catalogByKey[reference].entries.map((entry) => (
						<option key={entry.id} value={entry.id}>
							{entry.name} — {entry.id}
						</option>
					))}
				</select>
			) : options ? (
				<select
					value={String(value)}
					disabled={props.immutable}
					onChange={(event) =>
						onChange(
							field === "type"
								? discriminatorValue(path, event.target.value, value)
								: event.target.value,
						)
					}
				>
					{!options.includes(String(value)) && <option>{String(value)}</option>}
					{options.map((option) => (
						<option key={option}>{option}</option>
					))}
				</select>
			) : typeof value === "number" ? (
				<input
					type="number"
					value={value}
					disabled={props.immutable}
					onChange={(event) => onChange(event.target.valueAsNumber)}
				/>
			) : field === "description" ? (
				<textarea
					value={String(value ?? "")}
					disabled={props.immutable}
					onChange={(event) => onChange(event.target.value)}
				/>
			) : (
				<div className="input-action">
					<input
						value={String(value ?? "")}
						disabled={props.immutable}
						onChange={(event) => onChange(event.target.value)}
					/>
					{artworkFields.has(field) && (
						<button type="button" onClick={() => setPicker(true)}>
							Choose artwork
						</button>
					)}
				</div>
			)}
			{artworkFields.has(field) && typeof value === "string" && (
				<ContentImage path={value} label={field} size="table" />
			)}
			{fieldIssues.map((issue) => (
				<em key={issue.message}>{issue.message}</em>
			))}
			{props.optional && props.onRemove && (
				<button className="remove-field" type="button" onClick={props.onRemove}>
					Remove optional field
				</button>
			)}
			{picker && (
				<ArtworkPicker
					onClose={() => setPicker(false)}
					onChoose={(selected) => {
						onChange(selected);
						setPicker(false);
					}}
				/>
			)}
		</label>
	);
}

function ArrayEditor(props: Props & { value: unknown[] }) {
	const { value, field, path, onChange } = props;
	const reference = referenceTargets[field];
	const [picker, setPicker] = useState(false);
	const add = () =>
		onChange([
			...value,
			field === "effects"
				? discriminatorDefaults.damage
				: field === "modifiers"
					? modifierDefaults.modifyStat
					: field === "attackRiders"
						? { timing: "onHit", effects: [discriminatorDefaults.damage] }
						: "",
		]);
	return (
		<fieldset className="editor-group array-editor">
			<legend>
				{label(field)} <small>{value.length}</small>
			</legend>
			{value.map((item, index) => (
				<div className="array-item" key={index}>
					{field === "iconPool" && typeof item === "string" ? (
						<div className="icon-pool-field">
							<ContentImage path={item} label={`Icon ${index + 1}`} size="table" />
							<input
								aria-label={`Icon ${index + 1} path`}
								value={item}
								onChange={(event) => replace(index, event.target.value)}
							/>
						</div>
					) : reference && typeof item === "string" ? (
						<select
							value={item}
							onChange={(event) => replace(index, event.target.value)}
						>
							<option value="">Select a reference…</option>
							{catalogByKey[reference].entries.map((entry) => (
								<option key={entry.id} value={entry.id}>
									{entry.name} — {entry.id}
								</option>
							))}
						</select>
					) : (
						<StructuredEditor
							{...props}
							field={`${field} ${index + 1}`}
							path={`${path}.${index}`}
							value={item}
							onChange={(next) => replace(index, next)}
						/>
					)}
					<div className="array-actions">
						<button
							type="button"
							disabled={index === 0}
							onClick={() => move(index, -1)}
						>
							↑
						</button>
						<button
							type="button"
							disabled={index === value.length - 1}
							onClick={() => move(index, 1)}
						>
							↓
						</button>
						<button
							type="button"
							onClick={() =>
								onChange(value.filter((_, itemIndex) => itemIndex !== index))
							}
						>
							Remove
						</button>
					</div>
				</div>
			))}
			<div className="array-add">
				<button type="button" onClick={add}>
					Add {label(field).replace(/s$/, "")}
				</button>
				{field === "iconPool" && (
					<button type="button" onClick={() => setPicker(true)}>
						Choose artwork
					</button>
				)}
			</div>
			{picker && (
				<ArtworkPicker
					onClose={() => setPicker(false)}
					onChoose={(selected) => {
						onChange([...value, selected]);
						setPicker(false);
					}}
				/>
			)}
		</fieldset>
	);
	function replace(index: number, next: unknown) {
		onChange(value.map((item, itemIndex) => (itemIndex === index ? next : item)));
	}
	function move(index: number, direction: number) {
		const next = [...value];
		[next[index], next[index + direction]] = [next[index + direction], next[index]];
		onChange(next);
	}
}
const label = (value: string) =>
	(value === "save" ? "Saving throw" : value)
		.replace(/ \d+$/, "")
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, (letter) => letter.toUpperCase());

function typeOptions(path: string) {
	if (path.endsWith("damage.type")) {
		return optionsByField.damageType;
	}
	if (path === "type") {
		return ["weapon", "armour"];
	}
	if (path.includes("modifiers")) {
		return Object.keys(modifierDefaults);
	}
	return Object.keys(discriminatorDefaults);
}
function categoryOptions(category: CategoryKey, path: string) {
	if (category === "skills" && path === "category") {
		return ["damage", "heal", "buff", "debuff", "defensive", "utility"];
	}
	if (category === "feats" && path === "category") {
		return ["offensive", "defensive", "utility", "resource"];
	}
	return ["cloth", "light", "medium", "heavy"];
}
function kindOptions(category: CategoryKey, path: string) {
	if (category === "skills" && path === "kind") {
		return ["weaponAttack", "spellAttack", "spell", "technique", "prayer"];
	}
	if (category === "feats" && path === "kind") {
		return ["attribute", "damageMastery", "training", "bargain"];
	}
	return undefined;
}
function discriminatorValue(path: string, next: string, current: unknown) {
	if (path === "type") {
		return next;
	}
	const template = path.includes("modifiers")
		? modifierDefaults[next]
		: discriminatorDefaults[next];
	return template ?? current;
}
function switchItemType(value: Record<string, unknown>, type: string, category: CategoryKey) {
	if (!(["items", "item-bases"] as CategoryKey[]).includes(category)) {
		return { ...value, type };
	}
	const commonKeys =
		category === "items"
			? ["id", "name", "description", "icon", "price", "rarity", "modifiers", "tags"]
			: ["id", "name", "iconPool", "basePrice", "tags"];
	const common = Object.fromEntries(
		commonKeys.filter((key) => key in value).map((key) => [key, value[key]]),
	);
	return type === "weapon"
		? {
				...common,
				type,
				weaponType: "sword",
				handedness: "oneHanded",
				range: "melee",
				damage: { dice: "1d6", type: "slashing", attribute: "strength" },
				...(category === "items" ? { attackRiders: [] } : {}),
			}
		: { ...common, type, slot: "body", category: "light", armourClass: 10 };
}
function switchArmourSlot(value: Record<string, unknown>, slot: string) {
	const common = { ...value };
	delete common.category;
	delete common.armourClass;
	if (slot === "body") {
		return { ...common, slot, category: "light", armourClass: 10 };
	}
	if (slot === "shield") {
		return { ...common, slot, armourClass: 1 };
	}
	return { ...common, slot };
}
function optionalFields(
	value: Record<string, unknown>,
	path: string,
	category: CategoryKey,
): Array<[string, unknown]> {
	return optionalEntries(value, path, category).filter(([key]) => !(key in value));
}
function isOptionalField(
	value: Record<string, unknown>,
	path: string,
	field: string,
	category: CategoryKey,
) {
	return optionalEntries(value, path, category).some(([key]) => key === field);
}
function optionalEntries(
	value: Record<string, unknown>,
	path: string,
	category: CategoryKey,
): Array<[string, unknown]> {
	const candidates: Array<[string, unknown]> = [];
	if (path === "") {
		if (category !== "item-bases" && category !== "affixes" && category !== "achievements") {
			candidates.push(["description", ""]);
		}
		if (category === "skills") {
			candidates.push(["maxUses", 1]);
		}
		if (category === "classes") {
			candidates.push(["startingEquipment", {}]);
		}
	}
	if (path.endsWith("encounter")) {
		candidates.push(["minBattle", 1], ["maxBattle", 1]);
	}
	if (path.endsWith("startingEquipment")) {
		for (const slot of [
			"head",
			"neck",
			"body",
			"hands",
			"finger1",
			"finger2",
			"waist",
			"feet",
			"mainHand",
			"offHand",
		]) {
			candidates.push([slot, ""]);
		}
	}
	if (path.includes("attackRiders") && "timing" in value && "effects" in value) {
		candidates.push([
			"save",
			{
				attribute: "dexterity",
				dc: { base: 8, attribute: "intelligence", includeProficiency: true, bonus: 0 },
				onSuccess: "noEffect",
			},
		]);
	}
	if (typeof value.type === "string" && ["damage", "heal"].includes(value.type)) {
		candidates.push(["attribute", "strength"]);
	}
	if (
		typeof value.type === "string" &&
		["damage", "applyStatus", "damageOverTime"].includes(value.type)
	) {
		candidates.push([
			"save",
			{
				attribute: "dexterity",
				dc: { base: 8, attribute: "intelligence", includeProficiency: true, bonus: 0 },
				onSuccess: "noEffect",
			},
		]);
	}
	if (["modifyDamage", "modifyDamageTaken"].includes(String(value.type))) {
		candidates.push(["damageType", "fire"]);
	}
	if (value.type === "attackDamage") {
		candidates.push(
			["damageTypeOverride", "fire"],
			["extraDice", "1d4"],
			["extraDamageType", "fire"],
		);
	}
	if (path.endsWith("appliesTo")) {
		candidates.push(
			["itemTypes", ["weapon"]],
			["weaponTypes", ["sword"]],
			["armourSlots", ["body"]],
			["armourCategories", ["light"]],
		);
	}
	return candidates;
}

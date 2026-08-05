import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_elements",
	name: "Embrace Elements",
	description: "Fuse with elemental power, greatly amplifying cold, fire, and lightning magic.",
	icon: "skills/wizard/embrace_elements.png",
	pool: "wizard",
	kind: "spell",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "cold",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "lightning",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});

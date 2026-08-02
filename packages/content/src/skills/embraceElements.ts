import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_elements",
	name: "Embrace Elements",
	description: "Fuse with elements, amplifying prowess in elemental warfare.",
	icon: "skills/mage/embrace_elements.png",
	pool: "mage",
	kind: "spell",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "cold",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "lightning",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
	],
	tags: [],
});

import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "swamp_magic",
	name: "Swamp Magic",
	description: "Gain a shield that absorbs incoming damage and increase your acid damage dealt.",
	icon: "skills/common/swamp_magic.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "rare",
	effects: [
		{
			type: "shield",
			target: "self",
			amount: 30,
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "acid",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});

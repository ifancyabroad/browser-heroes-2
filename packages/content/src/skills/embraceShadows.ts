import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_shadows",
	name: "Embrace Shadows",
	description: "Pay a blood price to embrace shadow, greatly empowering necrotic magic.",
	icon: "skills/warlock/embrace_shadows.png",
	pool: "warlock",
	kind: "spell",
	category: "buff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "necrotic",
			operation: "multiply",
			value: 1.75,
			duration: { unit: "turns", value: 8 },
		},
		{
			type: "damageOverTime",
			target: "self",
			damageType: "slashing",
			dice: "1d4",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});

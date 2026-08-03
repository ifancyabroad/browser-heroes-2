import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_coating",
	name: "Acid Coating",
	description: "Prime your acid coating for a brief but devastating burst of corrosive damage.",
	icon: "skills/rogue/acid_coating.png",
	pool: "rogue",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "acid",
			operation: "multiply",
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});

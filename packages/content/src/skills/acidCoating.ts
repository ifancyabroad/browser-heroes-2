import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_coating",
	name: "Acid Coating",
	description:
		"Coat your weapon in acid and immediately strike, empowering further acid attacks.",
	icon: "skills/rogue/acid_coating.png",
	pool: "rogue",
	kind: "technique",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "acid",
			operation: "multiply",
			value: 1.5,
			durationTurns: 3,
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			damageTypeOverride: "acid",
			attackRiders: [],
		},
	],
	tags: [],
});

import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_coating",
	name: "Acid Coating",
	description: "Coat your weapon in corrosive acid to increase acid type damage.",
	icon: "skills/rogue/acid_coating.png",
	pool: "rogue",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "acid",
			operation: "add",
			value: 80,
			durationTurns: 8,
		},
	],
	tags: [],
});

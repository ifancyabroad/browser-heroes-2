import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_shadows",
	name: "Embrace Shadows",
	description: "Imbue yourself with necrotic energy to improve spell power.",
	icon: "skills/warlock/embrace_shadows.png",
	pool: "warlock",
	kind: "spell",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "necrotic",
			operation: "add",
			value: 80,
			durationTurns: 8,
		},
	],
	tags: [],
});

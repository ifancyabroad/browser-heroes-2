import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rebirth",
	name: "Rebirth",
	description: "Rekindle the Dawnflame and restore an immense amount of health once per battle.",
	icon: "skills/unique/rebirth.png",
	pool: "unique",
	kind: "spell",
	category: "heal",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "15d12",
		},
	],
	tags: [],
});

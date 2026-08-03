import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mighty_blow",
	name: "Mighty Blow",
	description: "A devastating strike that delivers heavy damage with overwhelming force.",
	icon: "skills/warrior/mighty_blow.png",
	pool: "warrior",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 3,
			attackRiders: [],
		},
	],
	tags: [],
});

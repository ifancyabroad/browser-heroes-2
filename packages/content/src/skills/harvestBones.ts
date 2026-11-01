import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "harvest_bones",
	name: "Harvest Bones",
	description:
		"Make a weapon attack with increased damage. On hit, gain a shield that absorbs incoming damage for the current battle.",
	icon: "skills/unique/harvest_bones.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "shield",
							target: "self",
							amount: 20,
							duration: { unit: "battles", value: 1 },
						},
					],
				},
			],
		},
	],
	tags: [],
});

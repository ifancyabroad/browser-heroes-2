import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "deepborn_mystic",
	name: "Deepborn Mystic",
	shortName: "Mystic",
	description:
		"A void-born scholar who channels thought into destructive force. The temple's oldest records are preserved in minds like his rather than committed to mortal script.",
	portrait: "enemies/temple/deepborn_mystic.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 11,
		dexterity: 14,
		constitution: 14,
		intelligence: 18,
		wisdom: 16,
		charisma: 16,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Cold Staff",
			icon: "items/weapons/staves/staff_29.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+2",
				type: "cold",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["cursing_bolt", "cone_of_cold", "mana_shield"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});

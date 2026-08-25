import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "flame_shrieker",
	name: "Flame Shrieker",
	portrait: "enemies/volcano/flame_shrieker.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 14,
		intelligence: 3,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["burning_rampage", "deafening_screech", "leap_attack"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});

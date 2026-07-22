import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "vilespawn",
	name: "Vilespawn",
	portrait: "enemies/dungeon/vilespawn.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 6,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "overpower", "toxic_bite"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});

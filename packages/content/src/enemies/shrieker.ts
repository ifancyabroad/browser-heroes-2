import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "shrieker",
	name: "Shrieker",
	portrait: "enemies/forest/shrieker.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 12,
		dexterity: 10,
		constitution: 10,
		intelligence: 2,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d4",
		armourClass: 6,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["deafening_screech"],
		featIds: ["evasion"],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});

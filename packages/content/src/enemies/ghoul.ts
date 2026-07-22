import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ghoul",
	name: "Ghoul",
	portrait: "enemies/hills/ghoul.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 13,
		dexterity: 15,
		constitution: 10,
		intelligence: 7,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["ghoul_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

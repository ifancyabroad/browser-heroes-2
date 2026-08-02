import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton",
	name: "Skeleton",
	portrait: "enemies/hills/skeleton.png",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 10,
		dexterity: 13,
		constitution: 14,
		intelligence: 6,
		wisdom: 8,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

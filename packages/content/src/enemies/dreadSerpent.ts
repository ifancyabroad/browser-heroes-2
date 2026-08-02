import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dread_serpent",
	name: "Dread Serpent",
	portrait: "enemies/hills/dread_serpent.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 16,
		dexterity: 16,
		constitution: 14,
		intelligence: 1,
		wisdom: 13,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["toxic_bite", "acid_spray"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_royal_ballista",
	name: "The Royal Ballista",
	portrait: "enemies/castle/the_royal_ballista.png",
	rank: "boss",
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 12,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Ballista Bolt",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["multi_shot", "reposition", "burning_shot"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});

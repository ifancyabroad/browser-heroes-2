import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_royal_ballista",
	name: "The Royal Ballista",
	description:
		"A royal siege engine that launches heavy bolts into anyone advancing on the gate. Its crew trains for invading armies and welcomes the occasional easier target.",
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
			attackRange: "ranged",
			name: "Ballista Bolt",
			icon: "items/weapons/crossbows/Crossbow_07.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "piercing",
				damageClass: "physical",
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

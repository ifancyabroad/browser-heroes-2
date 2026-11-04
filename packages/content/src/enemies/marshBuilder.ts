import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "marsh_builder",
	name: "Marsh Builder",
	description:
		"A shelled labourer who raises causeways and floodbanks through the marsh. Settlements depend on his clan to keep their roads above the seasonal floods.",
	portrait: "enemies/swamp/marsh_builder.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 15,
		dexterity: 10,
		constitution: 16,
		intelligence: 10,
		wisdom: 12,
		charisma: 8,
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
			name: "Stone Hammer",
			icon: "items/weapons/hammers/Hammer_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["acid_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

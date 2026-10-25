import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "marsh_builder",
	name: "Marsh Builder",
	description:
		"A shelled labourer who raises causeways and floodbanks through the marsh. Settlements depend on his clan to keep their roads above the seasonal floods.",
	portrait: "enemies/swamp/01.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 15,
		dexterity: 10,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
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
		skillIds: ["stand_ground"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

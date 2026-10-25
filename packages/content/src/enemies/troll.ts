import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "troll",
	name: "Troll",
	description:
		"A ravenous swamp giant whose wounds close beneath its thick hide. Nearby settlements leave butchered livestock at the reed beds to divert it from their herds.",
	portrait: "enemies/swamp/05.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 13,
		constitution: 20,
		intelligence: 7,
		wisdom: 9,
		charisma: 7,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Greatclub",
			icon: "items/weapons/hammers/Hammer_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["regeneration", "heavy_strike"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bogwort_the_swamp_troll",
	name: "Bogwort the Swamp Troll",
	description:
		"A ravenous swamp giant whose wounds close beneath its thick hide. Nearby settlements leave butchered livestock at the reed beds to divert it from their herds.",
	portrait: "enemies/swamp/bogwort_the_swamp_troll.png",
	rank: "boss",
	threat: 15,
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
				dice: "1d8+1",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["regeneration", "crushing_blow", "skull_bash"],
		featIds: [],
		tactic: "default",
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

import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "big_boss_griff",
	name: "Big Boss Griff",
	description:
		"A hulking ogre chief who claims tribute from the settlements beneath his stronghold. Rival leaders are invited to dispute his demands before the assembled warband.",
	portrait: "enemies/mountain/big_boss_griff.png",
	rank: "boss",
	threat: 20,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 7,
		wisdom: 10,
		charisma: 12,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Greatclub",
			icon: "items/weapons/clubs/Club_v2_05.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+2",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["powerful_blow", "skull_bash", "knock_down"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});

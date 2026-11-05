import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ogre_warden",
	name: "Ogre Warden",
	shortName: "Warden",
	description:
		"An ogre enforcer who patrols the approaches to the mountain's quarries and prison caves. The keys at his belt have passed through several generations of less durable keepers.",
	portrait: "enemies/mountain/ogre_warden.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 19,
		dexterity: 10,
		constitution: 18,
		intelligence: 5,
		wisdom: 8,
		charisma: 7,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		initiative: 9,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Battleaxe",
			icon: "items/weapons/axes/Axe_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["cleave", "heavy_strike", "stand_ground"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});

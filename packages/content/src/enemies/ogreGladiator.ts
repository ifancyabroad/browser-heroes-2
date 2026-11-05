import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ogre_gladiator",
	name: "Ogre Gladiator",
	shortName: "Gladiator",
	description:
		"An ogre pit fighter trained to press an attack without exposing himself behind his shield. Scars beneath his armour record contests held in the mountain strongholds.",
	portrait: "enemies/mountain/ogre_gladiator.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 19,
		dexterity: 10,
		constitution: 16,
		intelligence: 5,
		wisdom: 7,
		charisma: 7,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		initiative: 9,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Handaxe",
			icon: "items/weapons/axes/Axe_03.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["taunt", "shield_bash", "armour_break"],
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

import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_overseer",
	name: "The Overseer",
	description:
		"A heavily armoured warden who controls passage through the island's ancient works. The toll marks carved into his shield record obligations that outlasted the builders.",
	portrait: "enemies/island/the_overseer.png",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 19,
		dexterity: 10,
		constitution: 20,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 19,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Cleaver",
			icon: "items/weapons/swords/Sword_17.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["shield_wall", "armour_break", "powerful_blow"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});

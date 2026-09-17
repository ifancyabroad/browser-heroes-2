import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "greyhorn_the_caged",
	name: "Greyhorn the Caged",
	description:
		"Captivity taught Greyhorn to watch for an opening. He charges the moment one appears.",
	portrait: "enemies/forest/greyhorn_the_caged.png",
	rank: "boss",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 11,
		constitution: 16,
		intelligence: 6,
		wisdom: 16,
		charisma: 9,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Battleaxe",
			icon: "items/weapons/axes/Axe_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["cleave", "minotaur_charge", "frenzy"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});

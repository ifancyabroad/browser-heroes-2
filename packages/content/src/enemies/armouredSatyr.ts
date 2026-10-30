import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "armoured_satyr",
	name: "Armoured Satyr",
	description:
		"A satyr warrior who defends the mountain trails with curved blade and shield. His company still honours boundary agreements carved into stones above the tree line.",
	portrait: "enemies/mountain/armoured_satyr.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 14,
		dexterity: 16,
		constitution: 14,
		intelligence: 12,
		wisdom: 10,
		charisma: 14,
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
			name: "Fine Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["charge", "armour_break"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});

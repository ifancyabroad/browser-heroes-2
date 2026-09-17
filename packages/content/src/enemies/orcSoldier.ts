import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_soldier",
	name: "Orc Soldier",
	description:
		"Has outlived plenty of louder orcs by knowing when to let the other fighter swing first.",
	portrait: "enemies/plains/orc_soldier.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
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
		skillIds: ["heavy_strike", "rend", "armour_break"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});

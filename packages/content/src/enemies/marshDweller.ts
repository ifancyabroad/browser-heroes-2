import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "marsh_dweller",
	name: "Marsh Dweller",
	description:
		"A reptilian warrior who guards the waterways surrounding his settlement. Families mark their fishing grounds with carved stakes, and trespassers seldom receive a second warning.",
	portrait: "enemies/swamp/03.PNG",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 14,
		intelligence: 7,
		wisdom: 12,
		charisma: 7,
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
			name: "Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["shield_wall", "rend"],
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

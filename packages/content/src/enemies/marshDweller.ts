import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "marsh_dweller",
	name: "Marsh Dweller",
	description:
		"A reptilian warrior who guards the waterways surrounding his settlement. Families mark their fishing grounds with carved stakes, and trespassers seldom receive a second warning.",
	portrait: "enemies/swamp/marsh_dweller.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 14,
		intelligence: 7,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["acid_strike", "shadowmeld"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

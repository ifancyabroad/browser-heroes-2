import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_vanguard",
	name: "Goblin Vanguard",
	description:
		"A goblin soldier who patrols the raised roads with a long-handled halberd. His company collects passage dues for crossings it neither built nor maintains.",
	portrait: "enemies/swamp/goblin_vanguard.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Halberd",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["cleave", "armour_break"],
		featIds: [],
		tactic: "aggressive",
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

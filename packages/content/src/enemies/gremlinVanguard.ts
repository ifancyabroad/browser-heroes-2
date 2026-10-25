import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "gremlin_vanguard",
	name: "Gremlin Vanguard",
	description:
		"A gremlin soldier who patrols the raised roads with a long-handled halberd. His company collects passage dues for crossings it neither built nor maintains.",
	portrait: "enemies/swamp/02.PNG",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 8,
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
			name: "Fine Halberd",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+1",
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

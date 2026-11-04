import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_worker",
	name: "Goblin Worker",
	description:
		"A goblin labourer who digs trenches and repairs the outpost's palisades. When the alarm sounds, he joins the defence with his mining pick.",
	portrait: "enemies/outpost/goblin_worker.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 10,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Mining Pick",
			icon: "items/weapons/hammers/Hammer_21.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});

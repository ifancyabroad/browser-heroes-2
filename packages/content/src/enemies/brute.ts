import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "brute",
	name: "Brute",
	description:
		"A heavily armoured enforcer trusted to hold the castle’s narrow passages. He lets intruders exhaust themselves before bringing his flail to bear.",
	portrait: "enemies/castle/brute.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
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
			name: "Flail",
			icon: "items/weapons/clubs/Club_v2_15.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["stand_ground", "focus_energy"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});

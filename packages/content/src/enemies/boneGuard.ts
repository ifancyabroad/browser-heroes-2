import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bone_guard",
	name: "Bone Guard",
	shortName: "Guard",
	description:
		"The animated remains of a goblin, bound to guard the outpost by tribal necromancy. It patrols without rest or recognition of its former kin.",
	portrait: "enemies/outpost/bone_guard.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 14,
		intelligence: 6,
		wisdom: 8,
		charisma: 5,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		initiative: 8,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bony Fist",
			icon: "skills/common/punch.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: [],
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

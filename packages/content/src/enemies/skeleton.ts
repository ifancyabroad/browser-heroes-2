import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton",
	name: "Skeleton",
	description:
		"Human remains stirred into motion by the dark magic seeping through the hills. Some still follow the paths between their graves and former homes.",
	portrait: "enemies/hills/skeleton.png",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 10,
		dexterity: 13,
		constitution: 14,
		intelligence: 6,
		wisdom: 8,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
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
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

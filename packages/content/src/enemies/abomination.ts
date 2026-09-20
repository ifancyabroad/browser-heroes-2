import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abomination",
	name: "Abomination",
	description:
		"A corpse warped by necromancy into a hulking creature of uncontrolled growth. Its makers abandoned it when it began attacking them too.",
	portrait: "enemies/hills/abomination.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 18,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Slam",
			icon: "skills/common/flame_slam.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "corrupted_arm", "skull_bash"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

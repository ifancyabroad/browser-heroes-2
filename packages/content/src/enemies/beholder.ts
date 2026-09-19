import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "beholder",
	name: "Beholder",
	description:
		"A winged cavern predator that channels destructive magic through its single eye. It claims entire lava tunnels and treats passing through as a challenge to its rule.",
	portrait: "enemies/volcano/beholder.png",
	rank: "normal",
	threat: 22,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 18,
		intelligence: 17,
		wisdom: 15,
		charisma: 17,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["eye_ray"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});

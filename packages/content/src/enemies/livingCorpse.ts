import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_corpse",
	name: "Living Corpse",
	description:
		"A shambling corpse sustained by the citadel's restless magic. Bodies left unclaimed in the lower halls seldom remain where their companions last saw them.",
	portrait: "enemies/citadel/living_corpse.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 13,
		dexterity: 6,
		constitution: 16,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 8,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Slam",
			icon: "skills/common/punch.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
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
		savingThrows: ["wisdom"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});

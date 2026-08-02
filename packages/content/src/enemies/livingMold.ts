import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_mold",
	name: "Living Mold",
	portrait: "enemies/forest/living_mold.png",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 12,
		dexterity: 8,
		constitution: 14,
		intelligence: 5,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d4",
		armourClass: 8,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["regeneration", "poison_bite"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});

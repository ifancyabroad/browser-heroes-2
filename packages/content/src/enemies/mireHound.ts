import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mire_hound",
	name: "Mire Hound",
	description:
		"An undead hunting beast that follows the old paths between drowned settlements. Its former masters are gone, but it still drives strangers towards their ruined gates.",
	portrait: "enemies/swamp/mire_hound.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 15,
		dexterity: 14,
		constitution: 14,
		intelligence: 3,
		wisdom: 12,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "detect_blood"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

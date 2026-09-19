import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crabomination",
	name: "Crabomination",
	description:
		"A hulking crustacean whose pincers crush shell, timber, and armour with equal ease. Shipwrecks provide it with both shelter and packed lunches.",
	portrait: "enemies/ocean/crabomination.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 22,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Pincer",
			icon: "skills/unique/crab_hammer.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["crab_hammer", "powerful_blow", "skull_bash"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});

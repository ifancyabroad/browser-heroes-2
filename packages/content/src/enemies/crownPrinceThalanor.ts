import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crown_prince_thalanor",
	name: "Crown Prince Thalanor",
	description:
		"The grove's crown prince, trained to fight from the saddle of a royal griffon. Their bond began before either was permitted beyond the palace grounds.",
	portrait: "enemies/grove/crown_prince_thalanor.png",
	rank: "boss",
	threat: 24,
	attributes: {
		strength: 20,
		dexterity: 18,
		constitution: 20,
		intelligence: 14,
		wisdom: 16,
		charisma: 20,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 19,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Royal Lance",
			icon: "items/weapons/spears/Spear_v2_10.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "holy_strike", "double_strike", "drop_from_above"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});

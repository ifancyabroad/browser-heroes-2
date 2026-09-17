import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sir_michael_the_conceder",
	name: "Sir Michael the Conceder",
	description:
		"Insists on a proper duel. Has rehearsed his surrender almost as carefully as his charge.",
	portrait: "enemies/castle/sir_michael_the_conceder.png",
	rank: "boss",
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 18,
		intelligence: 10,
		wisdom: 16,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Michael's Lance",
			icon: "items/weapons/spears/Spear_v2_10.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "holy_strike", "thou_hast_bested_me"],
		featIds: [],
		tactic: "conceder",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});

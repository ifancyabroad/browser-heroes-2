import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_shaman",
	name: "Orc Shaman",
	description:
		"An orc spiritual guide who calls storms and tends the wounds of marsh raiders. Clan leaders leave offerings before asking him to bless a crossing.",
	portrait: "enemies/swamp/06.PNG",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 16,
		intelligence: 14,
		wisdom: 16,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Boneclub",
			icon: "items/weapons/clubs/Club_v2_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+1",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["call_lightning", "renew", "bless"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom", "charisma"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

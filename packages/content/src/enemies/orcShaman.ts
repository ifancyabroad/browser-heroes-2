import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_shaman",
	name: "Orc Shaman",
	description:
		"An orc spiritual guide who calls storms and tends the wounds of marsh raiders. Clan leaders leave offerings before asking him to bless a crossing.",
	portrait: "enemies/swamp/orc_shaman.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 16,
		intelligence: 12,
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
			name: "Bone Claw",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["inflict_wounds", "renew", "curse"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});

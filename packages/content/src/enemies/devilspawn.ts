import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "devilspawn",
	name: "Devilspawn",
	description:
		"A plated infernal soldier trained to reap enemies with a hooked scythe. Its warband claims the weapons of defeated companies as tribute to Brutalus.",
	portrait: "enemies/hell/devilspawn.png",
	rank: "normal",
	threat: 24,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 8,
		wisdom: 12,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		initiative: 13,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Scythe",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+4",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["demonic_pact", "maim", "fire_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});

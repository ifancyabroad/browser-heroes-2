import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warchief_zog",
	name: "Orc Warchief Zog",
	description:
		"A veteran warlord who united the plains clans through conquest and promises of glory. He leads from the front, where every warrior can see why he remains in command.",
	portrait: "enemies/plains/orc_warchief_zog.png",
	rank: "boss",
	threat: 20,
	attributes: {
		strength: 20,
		dexterity: 16,
		constitution: 18,
		intelligence: 12,
		wisdom: 14,
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
			name: "Blood Drinker",
			icon: "items/weapons/axes/Axe_v2_24.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "heal",
							target: "self",
							dice: "2d6",
						},
					],
				},
			],
		},
		skillIds: ["berserk", "double_strike", "knock_down", "overpower"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});

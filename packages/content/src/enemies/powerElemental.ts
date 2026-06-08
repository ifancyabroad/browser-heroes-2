import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "power_elemental",
	name: "Power Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SlQ66CiMGqEk6_Mn?alt=media&token=47fb381e-08d2-45fa-8068-a25dda97b2ca",
	rank: "normal",
	level: 19,
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDice: "19d8+114",
		armourClass: 18,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "overcharge",
				rank: 2,
			},
			{
				skillId: "obliterate",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});

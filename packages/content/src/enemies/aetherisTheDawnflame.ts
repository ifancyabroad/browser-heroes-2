import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "aetheris_the_dawnflame",
	name: "Aetheris the Dawnflame",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OCK8vFseTxxM0LU2Ok7?alt=media&token=e0099aa3-ac12-46b8-95cd-9aaa4cf0a2ee",
	rank: "boss",
	threat: 30,
	attributes: {
		strength: 30,
		dexterity: 14,
		constitution: 29,
		intelligence: 18,
		wisdom: 17,
		charisma: 28,
	},
	combat: {
		hitDice: "30d12+445",
		armourClass: 24,
		proficiencyBonus: 9,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"necrotic",
				"piercing",
				"poison",
				"radiant",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d8+12",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "dragon_focus",
				rank: 3,
			},
			{
				skillId: "multi_strike",
				rank: 3,
			},
			{
				skillId: "breath_of_the_dawnflame",
				rank: 3,
			},
			{
				skillId: "boon_of_the_dawnflame",
				rank: 3,
			},
			{
				skillId: "rebirth",
				rank: 3,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});

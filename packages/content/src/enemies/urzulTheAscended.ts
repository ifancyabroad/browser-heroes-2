import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "urzul_the_ascended",
	name: "Urzul the Ascended",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-scXzx5GqPoZZcDX_?alt=media&token=2b04abb9-87ce-492a-89f9-ef0e87361574",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 14,
		dexterity: 12,
		constitution: 18,
		intelligence: 18,
		wisdom: 18,
		charisma: 12,
	},
	combat: {
		hitDice: "19d12+190",
		armourClass: 13,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "cure_major_wounds",
				rank: 3,
			},
			{
				skillId: "flamestrike",
				rank: 3,
			},
			{
				skillId: "lighting_bolt",
				rank: 3,
			},
			{
				skillId: "blessing_of_the_old_gods",
				rank: 3,
			},
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["constitution", "intelligence", "wisdom"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});

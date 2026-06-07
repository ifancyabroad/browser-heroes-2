import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "urzul_the_ascended",
	name: "Urzul the Ascended",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-scXzx5GqPoZZcDX_?alt=media&token=2b04abb9-87ce-492a-89f9-ef0e87361574",
	rank: "boss",
	level: 19,
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
		skillIds: ["cure_major_wounds", "flamestrike", "lighting_bolt", "blessing_of_the_old_gods"],
		featIds: [],
		tactic: "caster",
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});

import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dread_serpent",
	name: "Dread Serpent",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTmEuMs3XJu8TMDs9P?alt=media&token=25a7cb23-8592-4476-b64f-325c4f6aeb4d",
	rank: "normal",
	level: 15,
	threat: 15,
	attributes: {
		strength: 16,
		dexterity: 16,
		constitution: 14,
		intelligence: 1,
		wisdom: 13,
		charisma: 6,
	},
	combat: {
		hitDice: "15d8+47",
		armourClass: 15,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["toxic_bite", "acid_spray"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

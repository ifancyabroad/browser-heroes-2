import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wight",
	name: "Wight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkWbFFsefw7IS2Vxk0?alt=media&token=ed7c16f1-fc4f-475f-85dd-55e16c3da147",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 15,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 13,
		charisma: 15,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: ["crushing", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Withering Touch",
			attackAttribute: "constitution",
			damage: {
				dice: "1d6",
				type: "necrotic",
				attribute: "constitution",
			},
		},
		skillIds: ["corrupting_touch"],
		featIds: ["evasion"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});

import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "air_elemental",
	name: "Air Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9RF0Uh1Wq-FI2kBWZ?alt=media&token=7d2f484c-bf48-4e3f-9c1e-7911fee6bf0e",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 18,
		dexterity: 22,
		constitution: 16,
		intelligence: 8,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDice: "1d8+4",
		armourClass: 16,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Static Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4+2",
				type: "lightning",
				attribute: "dexterity",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "cyclone",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});

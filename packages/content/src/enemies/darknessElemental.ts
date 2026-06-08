import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "darkness_elemental",
	name: "Darkness Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SvOUA7FI47i-QlDd?alt=media&token=159bc302-3d14-4cf3-811c-fdd6077b2131",
	rank: "normal",
	level: 18,
	threat: 18,
	attributes: {
		strength: 16,
		dexterity: 22,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDice: "18d8+91",
		armourClass: 17,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"necrotic",
				"piercing",
				"slashing",
			],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Withering Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4+2",
				type: "necrotic",
				attribute: "dexterity",
			},
		},
		skills: [
			{
				skillId: "nightmares",
				rank: 2,
			},
			{
				skillId: "creeping_darkness",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});

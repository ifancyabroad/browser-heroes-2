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
		maxHp: 172,
		armourClass: 17,
		attackBonus: 0,
		damageBonus: 0,
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
			attackBonus: 12,
			damage: {
				dice: "2d4+2",
				type: "necrotic",
				attribute: "dexterity",
			},
		},
		skillIds: ["nightmares", "creeping_darkness"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});

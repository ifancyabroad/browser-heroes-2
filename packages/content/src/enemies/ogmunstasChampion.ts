import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ogmunstas_champion",
	name: "Og'munsta's Champion",
	description:
		"A Deepborn warrior reshaped by prolonged communion with Og'munsta. The priesthood displays his altered body as proof that their god still answers from beyond the veil.",
	portrait: "enemies/temple/02.PNG",
	rank: "boss",
	threat: 22,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 20,
		intelligence: 16,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Glaive",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "unholy_strike", "drain_energy"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});

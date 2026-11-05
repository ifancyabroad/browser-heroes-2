import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ogmunstas_champion",
	name: "Og'munsta's Champion",
	shortName: "Champion",
	description:
		"A Deepborn warrior reshaped by prolonged communion with Og'munsta. The priesthood displays his altered body as proof that their god still answers from beyond the veil.",
	portrait: "enemies/temple/ogmunstas_champion.png",
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
		initiative: 13,
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
				dice: "1d10+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["call_to_the_void", "ogmunstas_boon", "unholy_strike", "heavy_strike"],
		featIds: [],
		tactic: "default",
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

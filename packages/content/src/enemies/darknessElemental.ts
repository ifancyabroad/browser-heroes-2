import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "darkness_elemental",
	name: "Darkness Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SvOUA7FI47i-QlDd?alt=media&token=159bc302-3d14-4cf3-811c-fdd6077b2131",
	boss: false,
	challenge: 18,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 25,
		piercing: 25,
		poison: 100,
		radiant: -50,
		slashing: 25,
	},
	skills: ["attack", "nightmares", "creeping_darkness"],
	stats: {
		charisma: 6,
		constitution: 18,
		dexterity: 22,
		intelligence: 8,
		strength: 16,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 17,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "necrotic",
});

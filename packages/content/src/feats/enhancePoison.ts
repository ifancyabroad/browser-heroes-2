import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "enhance_poison",
	name: "Venom Craft",
	description: "Practiced toxin handling adds poison damage to your attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh16M9sVTTOKw5g6rO?alt=media&token=c934a0ad-5942-45c9-ada7-02516b04aa9b",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: ["assassin"],
});

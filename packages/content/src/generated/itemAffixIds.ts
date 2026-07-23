// Generated - do not edit by hand

import { z } from "zod";

export const itemAffixIds = ["accurate","acidic","barbed","blessed","bulwark","caustic","charged","concussive","corroding","deadly","deathly","enfeebling","enlightened","flaming","flawless","focused","forceful","frosted","glacial","impervious","keen","majestic","necrotic","nullifying","of_acid_warding","of_agility","of_antidotes","of_blocking","of_defiance","of_deflection","of_devastation","of_fire_warding","of_fortitude","of_grounding","of_guarding","of_impact","of_insight","of_invincibility","of_life_warding","of_mending","of_might","of_presence","of_resolve","of_restoration","of_shadowing","of_stability","of_tempering","of_the_inferno","of_the_venomless","of_warmth","of_wisdom","overwhelming","potent","precise","puncturing","radiant","reinforced","rending","renewing","sagacious","searing","sharp","silencing","storming","stunning","sundering","titanic","toxic","vampiric","venomous","vital","warded","weakening","windborne"] as const;
export const itemAffixIdSchema = z.enum(itemAffixIds);
export type ItemAffixId = z.infer<typeof itemAffixIdSchema>;

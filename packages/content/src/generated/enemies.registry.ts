// Generated - do not edit by hand

import type { EnemyDefinition } from '../schemas';
import type { EnemyId } from './enemyIds';
import type { FeatId } from './featIds';
import type { SkillId } from './skillIds';
import type { WithCombatContentIds, WithGeneratedId } from '../types/contentTypes';
import { enemyIdSchema, enemyIds } from './enemyIds';

import ene_abomination_0 from '../enemies/abomination';
import ene_abyssArmour_1 from '../enemies/abyssArmour';
import ene_abyssRider_2 from '../enemies/abyssRider';
import ene_aetherisTheDawnflame_3 from '../enemies/aetherisTheDawnflame';
import ene_airElemental_4 from '../enemies/airElemental';
import ene_assassinOfRitChi_5 from '../enemies/assassinOfRitChi';
import ene_avatarOfRitChi_6 from '../enemies/avatarOfRitChi';
import ene_basilisk_7 from '../enemies/basilisk';
import ene_beholder_8 from '../enemies/beholder';
import ene_berserker_9 from '../enemies/berserker';
import ene_binkusTheAllKnowing_10 from '../enemies/binkusTheAllKnowing';
import ene_brute_11 from '../enemies/brute';
import ene_carrionStalker_12 from '../enemies/carrionStalker';
import ene_chaosKnight_13 from '../enemies/chaosKnight';
import ene_chaosMauler_14 from '../enemies/chaosMauler';
import ene_chomper_15 from '../enemies/chomper';
import ene_citadel01_16 from '../enemies/citadel01';
import ene_citadel02_17 from '../enemies/citadel02';
import ene_citadel03_18 from '../enemies/citadel03';
import ene_citadel04_19 from '../enemies/citadel04';
import ene_citadel05_20 from '../enemies/citadel05';
import ene_citadel06_21 from '../enemies/citadel06';
import ene_citadel07_22 from '../enemies/citadel07';
import ene_citadel08_23 from '../enemies/citadel08';
import ene_citadel09_24 from '../enemies/citadel09';
import ene_citadel10_25 from '../enemies/citadel10';
import ene_colossalPiranhasaur_26 from '../enemies/colossalPiranhasaur';
import ene_crabomination_27 from '../enemies/crabomination';
import ene_cursedGuardian_28 from '../enemies/cursedGuardian';
import ene_cyclops_29 from '../enemies/cyclops';
import ene_dampHighPriestess_30 from '../enemies/dampHighPriestess';
import ene_darknessElemental_31 from '../enemies/darknessElemental';
import ene_dracolich_32 from '../enemies/dracolich';
import ene_drakusTheAwakened_33 from '../enemies/drakusTheAwakened';
import ene_dreadSerpent_34 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_35 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_36 from '../enemies/earthElemental';
import ene_fireBeetle_37 from '../enemies/fireBeetle';
import ene_fireDrake_38 from '../enemies/fireDrake';
import ene_fireElemental_39 from '../enemies/fireElemental';
import ene_fireSnake_40 from '../enemies/fireSnake';
import ene_flameShrieker_41 from '../enemies/flameShrieker';
import ene_footman_42 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_43 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_44 from '../enemies/ghoul';
import ene_giantYeti_45 from '../enemies/giantYeti';
import ene_glompling_46 from '../enemies/glompling';
import ene_goblinEngineer_47 from '../enemies/goblinEngineer';
import ene_golem_48 from '../enemies/golem';
import ene_gremlinCultist_49 from '../enemies/gremlinCultist';
import ene_greyhornTheCaged_50 from '../enemies/greyhornTheCaged';
import ene_grotesque_51 from '../enemies/grotesque';
import ene_grove01_52 from '../enemies/grove01';
import ene_grove02_53 from '../enemies/grove02';
import ene_grove03_54 from '../enemies/grove03';
import ene_grove04_55 from '../enemies/grove04';
import ene_grove05_56 from '../enemies/grove05';
import ene_grove06_57 from '../enemies/grove06';
import ene_grove07_58 from '../enemies/grove07';
import ene_grove08_59 from '../enemies/grove08';
import ene_grove09_60 from '../enemies/grove09';
import ene_grove10_61 from '../enemies/grove10';
import ene_guard_62 from '../enemies/guard';
import ene_guardCaptain_63 from '../enemies/guardCaptain';
import ene_halfOgre_64 from '../enemies/halfOgre';
import ene_hell01_65 from '../enemies/hell01';
import ene_hell02_66 from '../enemies/hell02';
import ene_hell03_67 from '../enemies/hell03';
import ene_hell04_68 from '../enemies/hell04';
import ene_hell05_69 from '../enemies/hell05';
import ene_hell06_70 from '../enemies/hell06';
import ene_hell07_71 from '../enemies/hell07';
import ene_hell08_72 from '../enemies/hell08';
import ene_hell09_73 from '../enemies/hell09';
import ene_hell10_74 from '../enemies/hell10';
import ene_hellGuard_75 from '../enemies/hellGuard';
import ene_hobgoblin_76 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_77 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_78 from '../enemies/iceElemental';
import ene_knight_79 from '../enemies/knight';
import ene_livingFlame_80 from '../enemies/livingFlame';
import ene_livingMold_81 from '../enemies/livingMold';
import ene_lurker_82 from '../enemies/lurker';
import ene_magmaElemental_83 from '../enemies/magmaElemental';
import ene_monk_84 from '../enemies/monk';
import ene_mountedRatman_85 from '../enemies/mountedRatman';
import ene_munchling_86 from '../enemies/munchling';
import ene_natureElemental_87 from '../enemies/natureElemental';
import ene_necromental_88 from '../enemies/necromental';
import ene_orcCatapult_89 from '../enemies/orcCatapult';
import ene_orcGrunt_90 from '../enemies/orcGrunt';
import ene_orcSoldier_91 from '../enemies/orcSoldier';
import ene_orcTracker_92 from '../enemies/orcTracker';
import ene_orcWarchiefZog_93 from '../enemies/orcWarchiefZog';
import ene_orcWardog_94 from '../enemies/orcWardog';
import ene_orcWarlock_95 from '../enemies/orcWarlock';
import ene_outpost01_96 from '../enemies/outpost01';
import ene_outpost02_97 from '../enemies/outpost02';
import ene_outpost03_98 from '../enemies/outpost03';
import ene_outpost04_99 from '../enemies/outpost04';
import ene_outpost05_100 from '../enemies/outpost05';
import ene_outpost06_101 from '../enemies/outpost06';
import ene_outpost07_102 from '../enemies/outpost07';
import ene_outpost08_103 from '../enemies/outpost08';
import ene_outpost09_104 from '../enemies/outpost09';
import ene_outpost10_105 from '../enemies/outpost10';
import ene_peon_106 from '../enemies/peon';
import ene_piranhasaur_107 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_108 from '../enemies/pitFiendYagamon';
import ene_powerElemental_109 from '../enemies/powerElemental';
import ene_pygmy_110 from '../enemies/pygmy';
import ene_ratOgre_116 from '../enemies/ratOgre';
import ene_ratmanArcher_111 from '../enemies/ratmanArcher';
import ene_ratmanChampion_112 from '../enemies/ratmanChampion';
import ene_ratmanShaman_113 from '../enemies/ratmanShaman';
import ene_ratmanSlave_114 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_115 from '../enemies/ratmanWarlock';
import ene_runtling_117 from '../enemies/runtling';
import ene_sharkman_118 from '../enemies/sharkman';
import ene_shrieker_119 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_120 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_121 from '../enemies/skeleton';
import ene_skeletonWarrior_122 from '../enemies/skeletonWarrior';
import ene_squib_123 from '../enemies/squib';
import ene_stitchedOgre_124 from '../enemies/stitchedOgre';
import ene_swamp01_125 from '../enemies/swamp01';
import ene_swamp02_126 from '../enemies/swamp02';
import ene_swamp03_127 from '../enemies/swamp03';
import ene_swamp04_128 from '../enemies/swamp04';
import ene_swamp05_129 from '../enemies/swamp05';
import ene_swamp06_130 from '../enemies/swamp06';
import ene_swamp07_131 from '../enemies/swamp07';
import ene_swamp08_132 from '../enemies/swamp08';
import ene_swamp09_133 from '../enemies/swamp09';
import ene_swamp10_134 from '../enemies/swamp10';
import ene_theElderSquid_135 from '../enemies/theElderSquid';
import ene_theExecutioner_136 from '../enemies/theExecutioner';
import ene_theForestGuardian_137 from '../enemies/theForestGuardian';
import ene_theHellfireCatapult_138 from '../enemies/theHellfireCatapult';
import ene_theNamelessOne_139 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_140 from '../enemies/theRoyalBallista';
import ene_tundra01_141 from '../enemies/tundra01';
import ene_tundra02_142 from '../enemies/tundra02';
import ene_tundra03_143 from '../enemies/tundra03';
import ene_tundra04_144 from '../enemies/tundra04';
import ene_tundra05_145 from '../enemies/tundra05';
import ene_tundra06_146 from '../enemies/tundra06';
import ene_tundra07_147 from '../enemies/tundra07';
import ene_tundra08_148 from '../enemies/tundra08';
import ene_tundra09_149 from '../enemies/tundra09';
import ene_tundra10_150 from '../enemies/tundra10';
import ene_urzulTheAscended_151 from '../enemies/urzulTheAscended';
import ene_vilespawn_152 from '../enemies/vilespawn';
import ene_void01_153 from '../enemies/void01';
import ene_void02_154 from '../enemies/void02';
import ene_void03_155 from '../enemies/void03';
import ene_void04_156 from '../enemies/void04';
import ene_void05_157 from '../enemies/void05';
import ene_void06_158 from '../enemies/void06';
import ene_void07_159 from '../enemies/void07';
import ene_void08_160 from '../enemies/void08';
import ene_void09_161 from '../enemies/void09';
import ene_void10_162 from '../enemies/void10';
import ene_voidCreeper_163 from '../enemies/voidCreeper';
import ene_waterElemental_164 from '../enemies/waterElemental';
import ene_wight_165 from '../enemies/wight';
import ene_wingedNightmare_166 from '../enemies/wingedNightmare';
import ene_wizard_167 from '../enemies/wizard';
import ene_worg_168 from '../enemies/worg';
import ene_wraithLordMalakar_169 from '../enemies/wraithLordMalakar';
import ene_wretch_170 from '../enemies/wretch';

export { enemyIdSchema, enemyIds };
export type { EnemyId } from './enemyIds';

export type Enemy = Omit<WithGeneratedId<EnemyDefinition, EnemyId>, 'combat'> & {
  combat: WithCombatContentIds<EnemyDefinition['combat'], SkillId, FeatId>;
};

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_assassinOfRitChi_5, ene_avatarOfRitChi_6, ene_basilisk_7, ene_beholder_8, ene_berserker_9, ene_binkusTheAllKnowing_10, ene_brute_11, ene_carrionStalker_12, ene_chaosKnight_13, ene_chaosMauler_14, ene_chomper_15, ene_citadel01_16, ene_citadel02_17, ene_citadel03_18, ene_citadel04_19, ene_citadel05_20, ene_citadel06_21, ene_citadel07_22, ene_citadel08_23, ene_citadel09_24, ene_citadel10_25, ene_colossalPiranhasaur_26, ene_crabomination_27, ene_cursedGuardian_28, ene_cyclops_29, ene_dampHighPriestess_30, ene_darknessElemental_31, ene_dracolich_32, ene_drakusTheAwakened_33, ene_dreadSerpent_34, ene_dunzarakTheDeceived_35, ene_earthElemental_36, ene_fireBeetle_37, ene_fireDrake_38, ene_fireElemental_39, ene_fireSnake_40, ene_flameShrieker_41, ene_footman_42, ene_forsakenBrotherMcinnes_43, ene_ghoul_44, ene_giantYeti_45, ene_glompling_46, ene_goblinEngineer_47, ene_golem_48, ene_gremlinCultist_49, ene_greyhornTheCaged_50, ene_grotesque_51, ene_grove01_52, ene_grove02_53, ene_grove03_54, ene_grove04_55, ene_grove05_56, ene_grove06_57, ene_grove07_58, ene_grove08_59, ene_grove09_60, ene_grove10_61, ene_guard_62, ene_guardCaptain_63, ene_halfOgre_64, ene_hell01_65, ene_hell02_66, ene_hell03_67, ene_hell04_68, ene_hell05_69, ene_hell06_70, ene_hell07_71, ene_hell08_72, ene_hell09_73, ene_hell10_74, ene_hellGuard_75, ene_hobgoblin_76, ene_hydraOfTheDeep_77, ene_iceElemental_78, ene_knight_79, ene_livingFlame_80, ene_livingMold_81, ene_lurker_82, ene_magmaElemental_83, ene_monk_84, ene_mountedRatman_85, ene_munchling_86, ene_natureElemental_87, ene_necromental_88, ene_orcCatapult_89, ene_orcGrunt_90, ene_orcSoldier_91, ene_orcTracker_92, ene_orcWarchiefZog_93, ene_orcWardog_94, ene_orcWarlock_95, ene_outpost01_96, ene_outpost02_97, ene_outpost03_98, ene_outpost04_99, ene_outpost05_100, ene_outpost06_101, ene_outpost07_102, ene_outpost08_103, ene_outpost09_104, ene_outpost10_105, ene_peon_106, ene_piranhasaur_107, ene_pitFiendYagamon_108, ene_powerElemental_109, ene_pygmy_110, ene_ratOgre_116, ene_ratmanArcher_111, ene_ratmanChampion_112, ene_ratmanShaman_113, ene_ratmanSlave_114, ene_ratmanWarlock_115, ene_runtling_117, ene_sharkman_118, ene_shrieker_119, ene_sirMichaelTheConceder_120, ene_skeleton_121, ene_skeletonWarrior_122, ene_squib_123, ene_stitchedOgre_124, ene_swamp01_125, ene_swamp02_126, ene_swamp03_127, ene_swamp04_128, ene_swamp05_129, ene_swamp06_130, ene_swamp07_131, ene_swamp08_132, ene_swamp09_133, ene_swamp10_134, ene_theElderSquid_135, ene_theExecutioner_136, ene_theForestGuardian_137, ene_theHellfireCatapult_138, ene_theNamelessOne_139, ene_theRoyalBallista_140, ene_tundra01_141, ene_tundra02_142, ene_tundra03_143, ene_tundra04_144, ene_tundra05_145, ene_tundra06_146, ene_tundra07_147, ene_tundra08_148, ene_tundra09_149, ene_tundra10_150, ene_urzulTheAscended_151, ene_vilespawn_152, ene_void01_153, ene_void02_154, ene_void03_155, ene_void04_156, ene_void05_157, ene_void06_158, ene_void07_159, ene_void08_160, ene_void09_161, ene_void10_162, ene_voidCreeper_163, ene_waterElemental_164, ene_wight_165, ene_wingedNightmare_166, ene_wizard_167, ene_worg_168, ene_wraithLordMalakar_169, ene_wretch_170] satisfies readonly EnemyDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const enemies = rawEnemies as readonly Enemy[];

const rawEnemiesById = {
  "abomination": ene_abomination_0,
  "abyss_armour": ene_abyssArmour_1,
  "abyss_rider": ene_abyssRider_2,
  "aetheris_the_dawnflame": ene_aetherisTheDawnflame_3,
  "air_elemental": ene_airElemental_4,
  "assassin_of_rit_chi": ene_assassinOfRitChi_5,
  "avatar_of_rit_chi": ene_avatarOfRitChi_6,
  "basilisk": ene_basilisk_7,
  "beholder": ene_beholder_8,
  "berserker": ene_berserker_9,
  "binkus_the_all_knowing": ene_binkusTheAllKnowing_10,
  "brute": ene_brute_11,
  "carrion_stalker": ene_carrionStalker_12,
  "chaos_knight": ene_chaosKnight_13,
  "chaos_mauler": ene_chaosMauler_14,
  "chomper": ene_chomper_15,
  "citadel_01": ene_citadel01_16,
  "citadel_02": ene_citadel02_17,
  "citadel_03": ene_citadel03_18,
  "citadel_04": ene_citadel04_19,
  "citadel_05": ene_citadel05_20,
  "citadel_06": ene_citadel06_21,
  "citadel_07": ene_citadel07_22,
  "citadel_08": ene_citadel08_23,
  "citadel_09": ene_citadel09_24,
  "citadel_10": ene_citadel10_25,
  "colossal_piranhasaur": ene_colossalPiranhasaur_26,
  "crabomination": ene_crabomination_27,
  "cursed_guardian": ene_cursedGuardian_28,
  "cyclops": ene_cyclops_29,
  "damp_high_priestess": ene_dampHighPriestess_30,
  "darkness_elemental": ene_darknessElemental_31,
  "dracolich": ene_dracolich_32,
  "drakus_the_awakened": ene_drakusTheAwakened_33,
  "dread_serpent": ene_dreadSerpent_34,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_35,
  "earth_elemental": ene_earthElemental_36,
  "fire_beetle": ene_fireBeetle_37,
  "fire_drake": ene_fireDrake_38,
  "fire_elemental": ene_fireElemental_39,
  "fire_snake": ene_fireSnake_40,
  "flame_shrieker": ene_flameShrieker_41,
  "footman": ene_footman_42,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_43,
  "ghoul": ene_ghoul_44,
  "giant_yeti": ene_giantYeti_45,
  "glompling": ene_glompling_46,
  "goblin_engineer": ene_goblinEngineer_47,
  "golem": ene_golem_48,
  "gremlin_cultist": ene_gremlinCultist_49,
  "greyhorn_the_caged": ene_greyhornTheCaged_50,
  "grotesque": ene_grotesque_51,
  "grove_01": ene_grove01_52,
  "grove_02": ene_grove02_53,
  "grove_03": ene_grove03_54,
  "grove_04": ene_grove04_55,
  "grove_05": ene_grove05_56,
  "grove_06": ene_grove06_57,
  "grove_07": ene_grove07_58,
  "grove_08": ene_grove08_59,
  "grove_09": ene_grove09_60,
  "grove_10": ene_grove10_61,
  "guard": ene_guard_62,
  "guard_captain": ene_guardCaptain_63,
  "half_ogre": ene_halfOgre_64,
  "hell_01": ene_hell01_65,
  "hell_02": ene_hell02_66,
  "hell_03": ene_hell03_67,
  "hell_04": ene_hell04_68,
  "hell_05": ene_hell05_69,
  "hell_06": ene_hell06_70,
  "hell_07": ene_hell07_71,
  "hell_08": ene_hell08_72,
  "hell_09": ene_hell09_73,
  "hell_10": ene_hell10_74,
  "hell_guard": ene_hellGuard_75,
  "hobgoblin": ene_hobgoblin_76,
  "hydra_of_the_deep": ene_hydraOfTheDeep_77,
  "ice_elemental": ene_iceElemental_78,
  "knight": ene_knight_79,
  "living_flame": ene_livingFlame_80,
  "living_mold": ene_livingMold_81,
  "lurker": ene_lurker_82,
  "magma_elemental": ene_magmaElemental_83,
  "monk": ene_monk_84,
  "mounted_ratman": ene_mountedRatman_85,
  "munchling": ene_munchling_86,
  "nature_elemental": ene_natureElemental_87,
  "necromental": ene_necromental_88,
  "orc_catapult": ene_orcCatapult_89,
  "orc_grunt": ene_orcGrunt_90,
  "orc_soldier": ene_orcSoldier_91,
  "orc_tracker": ene_orcTracker_92,
  "orc_warchief_zog": ene_orcWarchiefZog_93,
  "orc_wardog": ene_orcWardog_94,
  "orc_warlock": ene_orcWarlock_95,
  "outpost_01": ene_outpost01_96,
  "outpost_02": ene_outpost02_97,
  "outpost_03": ene_outpost03_98,
  "outpost_04": ene_outpost04_99,
  "outpost_05": ene_outpost05_100,
  "outpost_06": ene_outpost06_101,
  "outpost_07": ene_outpost07_102,
  "outpost_08": ene_outpost08_103,
  "outpost_09": ene_outpost09_104,
  "outpost_10": ene_outpost10_105,
  "peon": ene_peon_106,
  "piranhasaur": ene_piranhasaur_107,
  "pit_fiend_yagamon": ene_pitFiendYagamon_108,
  "power_elemental": ene_powerElemental_109,
  "pygmy": ene_pygmy_110,
  "rat_ogre": ene_ratOgre_116,
  "ratman_archer": ene_ratmanArcher_111,
  "ratman_champion": ene_ratmanChampion_112,
  "ratman_shaman": ene_ratmanShaman_113,
  "ratman_slave": ene_ratmanSlave_114,
  "ratman_warlock": ene_ratmanWarlock_115,
  "runtling": ene_runtling_117,
  "sharkman": ene_sharkman_118,
  "shrieker": ene_shrieker_119,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_120,
  "skeleton": ene_skeleton_121,
  "skeleton_warrior": ene_skeletonWarrior_122,
  "squib": ene_squib_123,
  "stitched_ogre": ene_stitchedOgre_124,
  "swamp_01": ene_swamp01_125,
  "swamp_02": ene_swamp02_126,
  "swamp_03": ene_swamp03_127,
  "swamp_04": ene_swamp04_128,
  "swamp_05": ene_swamp05_129,
  "swamp_06": ene_swamp06_130,
  "swamp_07": ene_swamp07_131,
  "swamp_08": ene_swamp08_132,
  "swamp_09": ene_swamp09_133,
  "swamp_10": ene_swamp10_134,
  "the_elder_squid": ene_theElderSquid_135,
  "the_executioner": ene_theExecutioner_136,
  "the_forest_guardian": ene_theForestGuardian_137,
  "the_hellfire_catapult": ene_theHellfireCatapult_138,
  "the_nameless_one": ene_theNamelessOne_139,
  "the_royal_ballista": ene_theRoyalBallista_140,
  "tundra_01": ene_tundra01_141,
  "tundra_02": ene_tundra02_142,
  "tundra_03": ene_tundra03_143,
  "tundra_04": ene_tundra04_144,
  "tundra_05": ene_tundra05_145,
  "tundra_06": ene_tundra06_146,
  "tundra_07": ene_tundra07_147,
  "tundra_08": ene_tundra08_148,
  "tundra_09": ene_tundra09_149,
  "tundra_10": ene_tundra10_150,
  "urzul_the_ascended": ene_urzulTheAscended_151,
  "vilespawn": ene_vilespawn_152,
  "void_01": ene_void01_153,
  "void_02": ene_void02_154,
  "void_03": ene_void03_155,
  "void_04": ene_void04_156,
  "void_05": ene_void05_157,
  "void_06": ene_void06_158,
  "void_07": ene_void07_159,
  "void_08": ene_void08_160,
  "void_09": ene_void09_161,
  "void_10": ene_void10_162,
  "void_creeper": ene_voidCreeper_163,
  "water_elemental": ene_waterElemental_164,
  "wight": ene_wight_165,
  "winged_nightmare": ene_wingedNightmare_166,
  "wizard": ene_wizard_167,
  "worg": ene_worg_168,
  "wraith_lord_malakar": ene_wraithLordMalakar_169,
  "wretch": ene_wretch_170,
} satisfies Record<EnemyId, EnemyDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ENEMIES_BY_ID = rawEnemiesById as Record<EnemyId, Enemy>;

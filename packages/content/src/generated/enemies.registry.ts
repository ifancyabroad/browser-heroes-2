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
import ene_ankhegQueen_5 from '../enemies/ankhegQueen';
import ene_assassinOfRitChi_6 from '../enemies/assassinOfRitChi';
import ene_avatarOfRitChi_7 from '../enemies/avatarOfRitChi';
import ene_basilisk_8 from '../enemies/basilisk';
import ene_beholder_9 from '../enemies/beholder';
import ene_berserker_10 from '../enemies/berserker';
import ene_binkusTheAllKnowing_11 from '../enemies/binkusTheAllKnowing';
import ene_bloater_12 from '../enemies/bloater';
import ene_bogWitch_13 from '../enemies/bogWitch';
import ene_boneGuard_14 from '../enemies/boneGuard';
import ene_brute_15 from '../enemies/brute';
import ene_carrionStalker_16 from '../enemies/carrionStalker';
import ene_chaosKnight_17 from '../enemies/chaosKnight';
import ene_chaosMauler_18 from '../enemies/chaosMauler';
import ene_chomper_19 from '../enemies/chomper';
import ene_citadel01_20 from '../enemies/citadel01';
import ene_citadel02_21 from '../enemies/citadel02';
import ene_citadel03_22 from '../enemies/citadel03';
import ene_citadel04_23 from '../enemies/citadel04';
import ene_citadel05_24 from '../enemies/citadel05';
import ene_citadel06_25 from '../enemies/citadel06';
import ene_citadel07_26 from '../enemies/citadel07';
import ene_citadel08_27 from '../enemies/citadel08';
import ene_citadel09_28 from '../enemies/citadel09';
import ene_citadel10_29 from '../enemies/citadel10';
import ene_colossalPiranhasaur_30 from '../enemies/colossalPiranhasaur';
import ene_crabomination_31 from '../enemies/crabomination';
import ene_cursedGuardian_32 from '../enemies/cursedGuardian';
import ene_cyclops_33 from '../enemies/cyclops';
import ene_dampHighPriestess_34 from '../enemies/dampHighPriestess';
import ene_darknessElemental_35 from '../enemies/darknessElemental';
import ene_dracolich_36 from '../enemies/dracolich';
import ene_drakusTheAwakened_37 from '../enemies/drakusTheAwakened';
import ene_dreadSerpent_38 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_39 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_40 from '../enemies/earthElemental';
import ene_fireBeetle_41 from '../enemies/fireBeetle';
import ene_fireDrake_42 from '../enemies/fireDrake';
import ene_fireElemental_43 from '../enemies/fireElemental';
import ene_fireSnake_44 from '../enemies/fireSnake';
import ene_flameShrieker_45 from '../enemies/flameShrieker';
import ene_footman_46 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_47 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_48 from '../enemies/ghoul';
import ene_giantYeti_49 from '../enemies/giantYeti';
import ene_glompling_50 from '../enemies/glompling';
import ene_goblinArcher_51 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_52 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_53 from '../enemies/goblinEngineer';
import ene_goblinFanatic_54 from '../enemies/goblinFanatic';
import ene_goblinHero_55 from '../enemies/goblinHero';
import ene_goblinSeer_56 from '../enemies/goblinSeer';
import ene_goblinWitchDoctor_57 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_58 from '../enemies/goblinWorker';
import ene_golem_59 from '../enemies/golem';
import ene_gremlinCultist_60 from '../enemies/gremlinCultist';
import ene_gremlinVanguard_61 from '../enemies/gremlinVanguard';
import ene_greyhornTheCaged_62 from '../enemies/greyhornTheCaged';
import ene_grotesque_63 from '../enemies/grotesque';
import ene_grove01_64 from '../enemies/grove01';
import ene_grove02_65 from '../enemies/grove02';
import ene_grove03_66 from '../enemies/grove03';
import ene_grove04_67 from '../enemies/grove04';
import ene_grove05_68 from '../enemies/grove05';
import ene_grove06_69 from '../enemies/grove06';
import ene_grove07_70 from '../enemies/grove07';
import ene_grove08_71 from '../enemies/grove08';
import ene_grove09_72 from '../enemies/grove09';
import ene_grove10_73 from '../enemies/grove10';
import ene_guard_74 from '../enemies/guard';
import ene_guardCaptain_75 from '../enemies/guardCaptain';
import ene_halfOgre_76 from '../enemies/halfOgre';
import ene_hell01_77 from '../enemies/hell01';
import ene_hell02_78 from '../enemies/hell02';
import ene_hell03_79 from '../enemies/hell03';
import ene_hell04_80 from '../enemies/hell04';
import ene_hell05_81 from '../enemies/hell05';
import ene_hell06_82 from '../enemies/hell06';
import ene_hell07_83 from '../enemies/hell07';
import ene_hell08_84 from '../enemies/hell08';
import ene_hell09_85 from '../enemies/hell09';
import ene_hell10_86 from '../enemies/hell10';
import ene_hellGuard_87 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_88 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_89 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_90 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_91 from '../enemies/iceElemental';
import ene_knight_92 from '../enemies/knight';
import ene_livingFlame_93 from '../enemies/livingFlame';
import ene_livingMold_94 from '../enemies/livingMold';
import ene_lurker_95 from '../enemies/lurker';
import ene_magmaElemental_96 from '../enemies/magmaElemental';
import ene_marshBuilder_97 from '../enemies/marshBuilder';
import ene_marshDweller_98 from '../enemies/marshDweller';
import ene_mireHound_99 from '../enemies/mireHound';
import ene_monk_100 from '../enemies/monk';
import ene_mountedRatman_101 from '../enemies/mountedRatman';
import ene_munchling_102 from '../enemies/munchling';
import ene_natureElemental_103 from '../enemies/natureElemental';
import ene_necromental_104 from '../enemies/necromental';
import ene_orcCatapult_105 from '../enemies/orcCatapult';
import ene_orcGrunt_106 from '../enemies/orcGrunt';
import ene_orcShaman_107 from '../enemies/orcShaman';
import ene_orcSoldier_108 from '../enemies/orcSoldier';
import ene_orcTracker_109 from '../enemies/orcTracker';
import ene_orcWarchiefZog_110 from '../enemies/orcWarchiefZog';
import ene_orcWardog_111 from '../enemies/orcWardog';
import ene_orcWarlock_112 from '../enemies/orcWarlock';
import ene_peon_113 from '../enemies/peon';
import ene_piranhasaur_114 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_115 from '../enemies/pitFiendYagamon';
import ene_powerElemental_116 from '../enemies/powerElemental';
import ene_pygmy_117 from '../enemies/pygmy';
import ene_ratOgre_123 from '../enemies/ratOgre';
import ene_ratmanArcher_118 from '../enemies/ratmanArcher';
import ene_ratmanChampion_119 from '../enemies/ratmanChampion';
import ene_ratmanShaman_120 from '../enemies/ratmanShaman';
import ene_ratmanSlave_121 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_122 from '../enemies/ratmanWarlock';
import ene_runtling_124 from '../enemies/runtling';
import ene_scuttler_125 from '../enemies/scuttler';
import ene_sharkman_126 from '../enemies/sharkman';
import ene_shrieker_127 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_128 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_129 from '../enemies/skeleton';
import ene_skeletonWarrior_130 from '../enemies/skeletonWarrior';
import ene_squib_131 from '../enemies/squib';
import ene_stitchedOgre_132 from '../enemies/stitchedOgre';
import ene_temple01_133 from '../enemies/temple01';
import ene_temple02_134 from '../enemies/temple02';
import ene_temple03_135 from '../enemies/temple03';
import ene_temple04_136 from '../enemies/temple04';
import ene_temple05_137 from '../enemies/temple05';
import ene_temple06_138 from '../enemies/temple06';
import ene_temple07_139 from '../enemies/temple07';
import ene_temple08_140 from '../enemies/temple08';
import ene_temple09_141 from '../enemies/temple09';
import ene_temple10_142 from '../enemies/temple10';
import ene_theElderSquid_143 from '../enemies/theElderSquid';
import ene_theExecutioner_144 from '../enemies/theExecutioner';
import ene_theForestGuardian_145 from '../enemies/theForestGuardian';
import ene_theGreatFizzletrix_146 from '../enemies/theGreatFizzletrix';
import ene_theHellfireCatapult_147 from '../enemies/theHellfireCatapult';
import ene_theNamelessOne_148 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_149 from '../enemies/theRoyalBallista';
import ene_troll_150 from '../enemies/troll';
import ene_tundra01_151 from '../enemies/tundra01';
import ene_tundra02_152 from '../enemies/tundra02';
import ene_tundra03_153 from '../enemies/tundra03';
import ene_tundra04_154 from '../enemies/tundra04';
import ene_tundra05_155 from '../enemies/tundra05';
import ene_tundra06_156 from '../enemies/tundra06';
import ene_tundra07_157 from '../enemies/tundra07';
import ene_tundra08_158 from '../enemies/tundra08';
import ene_tundra09_159 from '../enemies/tundra09';
import ene_tundra10_160 from '../enemies/tundra10';
import ene_urzulTheAscended_161 from '../enemies/urzulTheAscended';
import ene_vilespawn_162 from '../enemies/vilespawn';
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

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_ankhegQueen_5, ene_assassinOfRitChi_6, ene_avatarOfRitChi_7, ene_basilisk_8, ene_beholder_9, ene_berserker_10, ene_binkusTheAllKnowing_11, ene_bloater_12, ene_bogWitch_13, ene_boneGuard_14, ene_brute_15, ene_carrionStalker_16, ene_chaosKnight_17, ene_chaosMauler_18, ene_chomper_19, ene_citadel01_20, ene_citadel02_21, ene_citadel03_22, ene_citadel04_23, ene_citadel05_24, ene_citadel06_25, ene_citadel07_26, ene_citadel08_27, ene_citadel09_28, ene_citadel10_29, ene_colossalPiranhasaur_30, ene_crabomination_31, ene_cursedGuardian_32, ene_cyclops_33, ene_dampHighPriestess_34, ene_darknessElemental_35, ene_dracolich_36, ene_drakusTheAwakened_37, ene_dreadSerpent_38, ene_dunzarakTheDeceived_39, ene_earthElemental_40, ene_fireBeetle_41, ene_fireDrake_42, ene_fireElemental_43, ene_fireSnake_44, ene_flameShrieker_45, ene_footman_46, ene_forsakenBrotherMcinnes_47, ene_ghoul_48, ene_giantYeti_49, ene_glompling_50, ene_goblinArcher_51, ene_goblinChieftainRotfang_52, ene_goblinEngineer_53, ene_goblinFanatic_54, ene_goblinHero_55, ene_goblinSeer_56, ene_goblinWitchDoctor_57, ene_goblinWorker_58, ene_golem_59, ene_gremlinCultist_60, ene_gremlinVanguard_61, ene_greyhornTheCaged_62, ene_grotesque_63, ene_grove01_64, ene_grove02_65, ene_grove03_66, ene_grove04_67, ene_grove05_68, ene_grove06_69, ene_grove07_70, ene_grove08_71, ene_grove09_72, ene_grove10_73, ene_guard_74, ene_guardCaptain_75, ene_halfOgre_76, ene_hell01_77, ene_hell02_78, ene_hell03_79, ene_hell04_80, ene_hell05_81, ene_hell06_82, ene_hell07_83, ene_hell08_84, ene_hell09_85, ene_hell10_86, ene_hellGuard_87, ene_highExecutionerGrimhook_88, ene_hobgoblin_89, ene_hydraOfTheDeep_90, ene_iceElemental_91, ene_knight_92, ene_livingFlame_93, ene_livingMold_94, ene_lurker_95, ene_magmaElemental_96, ene_marshBuilder_97, ene_marshDweller_98, ene_mireHound_99, ene_monk_100, ene_mountedRatman_101, ene_munchling_102, ene_natureElemental_103, ene_necromental_104, ene_orcCatapult_105, ene_orcGrunt_106, ene_orcShaman_107, ene_orcSoldier_108, ene_orcTracker_109, ene_orcWarchiefZog_110, ene_orcWardog_111, ene_orcWarlock_112, ene_peon_113, ene_piranhasaur_114, ene_pitFiendYagamon_115, ene_powerElemental_116, ene_pygmy_117, ene_ratOgre_123, ene_ratmanArcher_118, ene_ratmanChampion_119, ene_ratmanShaman_120, ene_ratmanSlave_121, ene_ratmanWarlock_122, ene_runtling_124, ene_scuttler_125, ene_sharkman_126, ene_shrieker_127, ene_sirMichaelTheConceder_128, ene_skeleton_129, ene_skeletonWarrior_130, ene_squib_131, ene_stitchedOgre_132, ene_temple01_133, ene_temple02_134, ene_temple03_135, ene_temple04_136, ene_temple05_137, ene_temple06_138, ene_temple07_139, ene_temple08_140, ene_temple09_141, ene_temple10_142, ene_theElderSquid_143, ene_theExecutioner_144, ene_theForestGuardian_145, ene_theGreatFizzletrix_146, ene_theHellfireCatapult_147, ene_theNamelessOne_148, ene_theRoyalBallista_149, ene_troll_150, ene_tundra01_151, ene_tundra02_152, ene_tundra03_153, ene_tundra04_154, ene_tundra05_155, ene_tundra06_156, ene_tundra07_157, ene_tundra08_158, ene_tundra09_159, ene_tundra10_160, ene_urzulTheAscended_161, ene_vilespawn_162, ene_voidCreeper_163, ene_waterElemental_164, ene_wight_165, ene_wingedNightmare_166, ene_wizard_167, ene_worg_168, ene_wraithLordMalakar_169, ene_wretch_170] satisfies readonly EnemyDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const enemies = rawEnemies as readonly Enemy[];

const rawEnemiesById = {
  "abomination": ene_abomination_0,
  "abyss_armour": ene_abyssArmour_1,
  "abyss_rider": ene_abyssRider_2,
  "aetheris_the_dawnflame": ene_aetherisTheDawnflame_3,
  "air_elemental": ene_airElemental_4,
  "ankheg_queen": ene_ankhegQueen_5,
  "assassin_of_rit_chi": ene_assassinOfRitChi_6,
  "avatar_of_rit_chi": ene_avatarOfRitChi_7,
  "basilisk": ene_basilisk_8,
  "beholder": ene_beholder_9,
  "berserker": ene_berserker_10,
  "binkus_the_all_knowing": ene_binkusTheAllKnowing_11,
  "bloater": ene_bloater_12,
  "bog_witch": ene_bogWitch_13,
  "bone_guard": ene_boneGuard_14,
  "brute": ene_brute_15,
  "carrion_stalker": ene_carrionStalker_16,
  "chaos_knight": ene_chaosKnight_17,
  "chaos_mauler": ene_chaosMauler_18,
  "chomper": ene_chomper_19,
  "citadel_01": ene_citadel01_20,
  "citadel_02": ene_citadel02_21,
  "citadel_03": ene_citadel03_22,
  "citadel_04": ene_citadel04_23,
  "citadel_05": ene_citadel05_24,
  "citadel_06": ene_citadel06_25,
  "citadel_07": ene_citadel07_26,
  "citadel_08": ene_citadel08_27,
  "citadel_09": ene_citadel09_28,
  "citadel_10": ene_citadel10_29,
  "colossal_piranhasaur": ene_colossalPiranhasaur_30,
  "crabomination": ene_crabomination_31,
  "cursed_guardian": ene_cursedGuardian_32,
  "cyclops": ene_cyclops_33,
  "damp_high_priestess": ene_dampHighPriestess_34,
  "darkness_elemental": ene_darknessElemental_35,
  "dracolich": ene_dracolich_36,
  "drakus_the_awakened": ene_drakusTheAwakened_37,
  "dread_serpent": ene_dreadSerpent_38,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_39,
  "earth_elemental": ene_earthElemental_40,
  "fire_beetle": ene_fireBeetle_41,
  "fire_drake": ene_fireDrake_42,
  "fire_elemental": ene_fireElemental_43,
  "fire_snake": ene_fireSnake_44,
  "flame_shrieker": ene_flameShrieker_45,
  "footman": ene_footman_46,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_47,
  "ghoul": ene_ghoul_48,
  "giant_yeti": ene_giantYeti_49,
  "glompling": ene_glompling_50,
  "goblin_archer": ene_goblinArcher_51,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_52,
  "goblin_engineer": ene_goblinEngineer_53,
  "goblin_fanatic": ene_goblinFanatic_54,
  "goblin_hero": ene_goblinHero_55,
  "goblin_seer": ene_goblinSeer_56,
  "goblin_witch_doctor": ene_goblinWitchDoctor_57,
  "goblin_worker": ene_goblinWorker_58,
  "golem": ene_golem_59,
  "gremlin_cultist": ene_gremlinCultist_60,
  "gremlin_vanguard": ene_gremlinVanguard_61,
  "greyhorn_the_caged": ene_greyhornTheCaged_62,
  "grotesque": ene_grotesque_63,
  "grove_01": ene_grove01_64,
  "grove_02": ene_grove02_65,
  "grove_03": ene_grove03_66,
  "grove_04": ene_grove04_67,
  "grove_05": ene_grove05_68,
  "grove_06": ene_grove06_69,
  "grove_07": ene_grove07_70,
  "grove_08": ene_grove08_71,
  "grove_09": ene_grove09_72,
  "grove_10": ene_grove10_73,
  "guard": ene_guard_74,
  "guard_captain": ene_guardCaptain_75,
  "half_ogre": ene_halfOgre_76,
  "hell_01": ene_hell01_77,
  "hell_02": ene_hell02_78,
  "hell_03": ene_hell03_79,
  "hell_04": ene_hell04_80,
  "hell_05": ene_hell05_81,
  "hell_06": ene_hell06_82,
  "hell_07": ene_hell07_83,
  "hell_08": ene_hell08_84,
  "hell_09": ene_hell09_85,
  "hell_10": ene_hell10_86,
  "hell_guard": ene_hellGuard_87,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_88,
  "hobgoblin": ene_hobgoblin_89,
  "hydra_of_the_deep": ene_hydraOfTheDeep_90,
  "ice_elemental": ene_iceElemental_91,
  "knight": ene_knight_92,
  "living_flame": ene_livingFlame_93,
  "living_mold": ene_livingMold_94,
  "lurker": ene_lurker_95,
  "magma_elemental": ene_magmaElemental_96,
  "marsh_builder": ene_marshBuilder_97,
  "marsh_dweller": ene_marshDweller_98,
  "mire_hound": ene_mireHound_99,
  "monk": ene_monk_100,
  "mounted_ratman": ene_mountedRatman_101,
  "munchling": ene_munchling_102,
  "nature_elemental": ene_natureElemental_103,
  "necromental": ene_necromental_104,
  "orc_catapult": ene_orcCatapult_105,
  "orc_grunt": ene_orcGrunt_106,
  "orc_shaman": ene_orcShaman_107,
  "orc_soldier": ene_orcSoldier_108,
  "orc_tracker": ene_orcTracker_109,
  "orc_warchief_zog": ene_orcWarchiefZog_110,
  "orc_wardog": ene_orcWardog_111,
  "orc_warlock": ene_orcWarlock_112,
  "peon": ene_peon_113,
  "piranhasaur": ene_piranhasaur_114,
  "pit_fiend_yagamon": ene_pitFiendYagamon_115,
  "power_elemental": ene_powerElemental_116,
  "pygmy": ene_pygmy_117,
  "rat_ogre": ene_ratOgre_123,
  "ratman_archer": ene_ratmanArcher_118,
  "ratman_champion": ene_ratmanChampion_119,
  "ratman_shaman": ene_ratmanShaman_120,
  "ratman_slave": ene_ratmanSlave_121,
  "ratman_warlock": ene_ratmanWarlock_122,
  "runtling": ene_runtling_124,
  "scuttler": ene_scuttler_125,
  "sharkman": ene_sharkman_126,
  "shrieker": ene_shrieker_127,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_128,
  "skeleton": ene_skeleton_129,
  "skeleton_warrior": ene_skeletonWarrior_130,
  "squib": ene_squib_131,
  "stitched_ogre": ene_stitchedOgre_132,
  "temple_01": ene_temple01_133,
  "temple_02": ene_temple02_134,
  "temple_03": ene_temple03_135,
  "temple_04": ene_temple04_136,
  "temple_05": ene_temple05_137,
  "temple_06": ene_temple06_138,
  "temple_07": ene_temple07_139,
  "temple_08": ene_temple08_140,
  "temple_09": ene_temple09_141,
  "temple_10": ene_temple10_142,
  "the_elder_squid": ene_theElderSquid_143,
  "the_executioner": ene_theExecutioner_144,
  "the_forest_guardian": ene_theForestGuardian_145,
  "the_great_fizzletrix": ene_theGreatFizzletrix_146,
  "the_hellfire_catapult": ene_theHellfireCatapult_147,
  "the_nameless_one": ene_theNamelessOne_148,
  "the_royal_ballista": ene_theRoyalBallista_149,
  "troll": ene_troll_150,
  "tundra_01": ene_tundra01_151,
  "tundra_02": ene_tundra02_152,
  "tundra_03": ene_tundra03_153,
  "tundra_04": ene_tundra04_154,
  "tundra_05": ene_tundra05_155,
  "tundra_06": ene_tundra06_156,
  "tundra_07": ene_tundra07_157,
  "tundra_08": ene_tundra08_158,
  "tundra_09": ene_tundra09_159,
  "tundra_10": ene_tundra10_160,
  "urzul_the_ascended": ene_urzulTheAscended_161,
  "vilespawn": ene_vilespawn_162,
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

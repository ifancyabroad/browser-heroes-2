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
import ene_bloater_11 from '../enemies/bloater';
import ene_boneGuard_12 from '../enemies/boneGuard';
import ene_brute_13 from '../enemies/brute';
import ene_carrionStalker_14 from '../enemies/carrionStalker';
import ene_chaosKnight_15 from '../enemies/chaosKnight';
import ene_chaosMauler_16 from '../enemies/chaosMauler';
import ene_chomper_17 from '../enemies/chomper';
import ene_citadel01_18 from '../enemies/citadel01';
import ene_citadel02_19 from '../enemies/citadel02';
import ene_citadel03_20 from '../enemies/citadel03';
import ene_citadel04_21 from '../enemies/citadel04';
import ene_citadel05_22 from '../enemies/citadel05';
import ene_citadel06_23 from '../enemies/citadel06';
import ene_citadel07_24 from '../enemies/citadel07';
import ene_citadel08_25 from '../enemies/citadel08';
import ene_citadel09_26 from '../enemies/citadel09';
import ene_citadel10_27 from '../enemies/citadel10';
import ene_colossalPiranhasaur_28 from '../enemies/colossalPiranhasaur';
import ene_crabomination_29 from '../enemies/crabomination';
import ene_cursedGuardian_30 from '../enemies/cursedGuardian';
import ene_cyclops_31 from '../enemies/cyclops';
import ene_dampHighPriestess_32 from '../enemies/dampHighPriestess';
import ene_darknessElemental_33 from '../enemies/darknessElemental';
import ene_dracolich_34 from '../enemies/dracolich';
import ene_drakusTheAwakened_35 from '../enemies/drakusTheAwakened';
import ene_dreadSerpent_36 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_37 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_38 from '../enemies/earthElemental';
import ene_fireBeetle_39 from '../enemies/fireBeetle';
import ene_fireDrake_40 from '../enemies/fireDrake';
import ene_fireElemental_41 from '../enemies/fireElemental';
import ene_fireSnake_42 from '../enemies/fireSnake';
import ene_flameShrieker_43 from '../enemies/flameShrieker';
import ene_footman_44 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_45 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_46 from '../enemies/ghoul';
import ene_giantYeti_47 from '../enemies/giantYeti';
import ene_glompling_48 from '../enemies/glompling';
import ene_goblinArcher_49 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_50 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_51 from '../enemies/goblinEngineer';
import ene_goblinFanatic_52 from '../enemies/goblinFanatic';
import ene_goblinHero_53 from '../enemies/goblinHero';
import ene_goblinSeer_54 from '../enemies/goblinSeer';
import ene_goblinWitchDoctor_55 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_56 from '../enemies/goblinWorker';
import ene_golem_57 from '../enemies/golem';
import ene_gremlinCultist_58 from '../enemies/gremlinCultist';
import ene_greyhornTheCaged_59 from '../enemies/greyhornTheCaged';
import ene_grotesque_60 from '../enemies/grotesque';
import ene_grove01_61 from '../enemies/grove01';
import ene_grove02_62 from '../enemies/grove02';
import ene_grove03_63 from '../enemies/grove03';
import ene_grove04_64 from '../enemies/grove04';
import ene_grove05_65 from '../enemies/grove05';
import ene_grove06_66 from '../enemies/grove06';
import ene_grove07_67 from '../enemies/grove07';
import ene_grove08_68 from '../enemies/grove08';
import ene_grove09_69 from '../enemies/grove09';
import ene_grove10_70 from '../enemies/grove10';
import ene_guard_71 from '../enemies/guard';
import ene_guardCaptain_72 from '../enemies/guardCaptain';
import ene_halfOgre_73 from '../enemies/halfOgre';
import ene_hell01_74 from '../enemies/hell01';
import ene_hell02_75 from '../enemies/hell02';
import ene_hell03_76 from '../enemies/hell03';
import ene_hell04_77 from '../enemies/hell04';
import ene_hell05_78 from '../enemies/hell05';
import ene_hell06_79 from '../enemies/hell06';
import ene_hell07_80 from '../enemies/hell07';
import ene_hell08_81 from '../enemies/hell08';
import ene_hell09_82 from '../enemies/hell09';
import ene_hell10_83 from '../enemies/hell10';
import ene_hellGuard_84 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_85 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_86 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_87 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_88 from '../enemies/iceElemental';
import ene_knight_89 from '../enemies/knight';
import ene_livingFlame_90 from '../enemies/livingFlame';
import ene_livingMold_91 from '../enemies/livingMold';
import ene_lurker_92 from '../enemies/lurker';
import ene_magmaElemental_93 from '../enemies/magmaElemental';
import ene_monk_94 from '../enemies/monk';
import ene_mountedRatman_95 from '../enemies/mountedRatman';
import ene_munchling_96 from '../enemies/munchling';
import ene_natureElemental_97 from '../enemies/natureElemental';
import ene_necromental_98 from '../enemies/necromental';
import ene_orcCatapult_99 from '../enemies/orcCatapult';
import ene_orcGrunt_100 from '../enemies/orcGrunt';
import ene_orcSoldier_101 from '../enemies/orcSoldier';
import ene_orcTracker_102 from '../enemies/orcTracker';
import ene_orcWarchiefZog_103 from '../enemies/orcWarchiefZog';
import ene_orcWardog_104 from '../enemies/orcWardog';
import ene_orcWarlock_105 from '../enemies/orcWarlock';
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
import ene_temple01_135 from '../enemies/temple01';
import ene_temple02_136 from '../enemies/temple02';
import ene_temple03_137 from '../enemies/temple03';
import ene_temple04_138 from '../enemies/temple04';
import ene_temple05_139 from '../enemies/temple05';
import ene_temple06_140 from '../enemies/temple06';
import ene_temple07_141 from '../enemies/temple07';
import ene_temple08_142 from '../enemies/temple08';
import ene_temple09_143 from '../enemies/temple09';
import ene_temple10_144 from '../enemies/temple10';
import ene_theElderSquid_145 from '../enemies/theElderSquid';
import ene_theExecutioner_146 from '../enemies/theExecutioner';
import ene_theForestGuardian_147 from '../enemies/theForestGuardian';
import ene_theHellfireCatapult_148 from '../enemies/theHellfireCatapult';
import ene_theNamelessOne_149 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_150 from '../enemies/theRoyalBallista';
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

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_assassinOfRitChi_5, ene_avatarOfRitChi_6, ene_basilisk_7, ene_beholder_8, ene_berserker_9, ene_binkusTheAllKnowing_10, ene_bloater_11, ene_boneGuard_12, ene_brute_13, ene_carrionStalker_14, ene_chaosKnight_15, ene_chaosMauler_16, ene_chomper_17, ene_citadel01_18, ene_citadel02_19, ene_citadel03_20, ene_citadel04_21, ene_citadel05_22, ene_citadel06_23, ene_citadel07_24, ene_citadel08_25, ene_citadel09_26, ene_citadel10_27, ene_colossalPiranhasaur_28, ene_crabomination_29, ene_cursedGuardian_30, ene_cyclops_31, ene_dampHighPriestess_32, ene_darknessElemental_33, ene_dracolich_34, ene_drakusTheAwakened_35, ene_dreadSerpent_36, ene_dunzarakTheDeceived_37, ene_earthElemental_38, ene_fireBeetle_39, ene_fireDrake_40, ene_fireElemental_41, ene_fireSnake_42, ene_flameShrieker_43, ene_footman_44, ene_forsakenBrotherMcinnes_45, ene_ghoul_46, ene_giantYeti_47, ene_glompling_48, ene_goblinArcher_49, ene_goblinChieftainRotfang_50, ene_goblinEngineer_51, ene_goblinFanatic_52, ene_goblinHero_53, ene_goblinSeer_54, ene_goblinWitchDoctor_55, ene_goblinWorker_56, ene_golem_57, ene_gremlinCultist_58, ene_greyhornTheCaged_59, ene_grotesque_60, ene_grove01_61, ene_grove02_62, ene_grove03_63, ene_grove04_64, ene_grove05_65, ene_grove06_66, ene_grove07_67, ene_grove08_68, ene_grove09_69, ene_grove10_70, ene_guard_71, ene_guardCaptain_72, ene_halfOgre_73, ene_hell01_74, ene_hell02_75, ene_hell03_76, ene_hell04_77, ene_hell05_78, ene_hell06_79, ene_hell07_80, ene_hell08_81, ene_hell09_82, ene_hell10_83, ene_hellGuard_84, ene_highExecutionerGrimhook_85, ene_hobgoblin_86, ene_hydraOfTheDeep_87, ene_iceElemental_88, ene_knight_89, ene_livingFlame_90, ene_livingMold_91, ene_lurker_92, ene_magmaElemental_93, ene_monk_94, ene_mountedRatman_95, ene_munchling_96, ene_natureElemental_97, ene_necromental_98, ene_orcCatapult_99, ene_orcGrunt_100, ene_orcSoldier_101, ene_orcTracker_102, ene_orcWarchiefZog_103, ene_orcWardog_104, ene_orcWarlock_105, ene_peon_106, ene_piranhasaur_107, ene_pitFiendYagamon_108, ene_powerElemental_109, ene_pygmy_110, ene_ratOgre_116, ene_ratmanArcher_111, ene_ratmanChampion_112, ene_ratmanShaman_113, ene_ratmanSlave_114, ene_ratmanWarlock_115, ene_runtling_117, ene_sharkman_118, ene_shrieker_119, ene_sirMichaelTheConceder_120, ene_skeleton_121, ene_skeletonWarrior_122, ene_squib_123, ene_stitchedOgre_124, ene_swamp01_125, ene_swamp02_126, ene_swamp03_127, ene_swamp04_128, ene_swamp05_129, ene_swamp06_130, ene_swamp07_131, ene_swamp08_132, ene_swamp09_133, ene_swamp10_134, ene_temple01_135, ene_temple02_136, ene_temple03_137, ene_temple04_138, ene_temple05_139, ene_temple06_140, ene_temple07_141, ene_temple08_142, ene_temple09_143, ene_temple10_144, ene_theElderSquid_145, ene_theExecutioner_146, ene_theForestGuardian_147, ene_theHellfireCatapult_148, ene_theNamelessOne_149, ene_theRoyalBallista_150, ene_tundra01_151, ene_tundra02_152, ene_tundra03_153, ene_tundra04_154, ene_tundra05_155, ene_tundra06_156, ene_tundra07_157, ene_tundra08_158, ene_tundra09_159, ene_tundra10_160, ene_urzulTheAscended_161, ene_vilespawn_162, ene_voidCreeper_163, ene_waterElemental_164, ene_wight_165, ene_wingedNightmare_166, ene_wizard_167, ene_worg_168, ene_wraithLordMalakar_169, ene_wretch_170] satisfies readonly EnemyDefinition[];

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
  "bloater": ene_bloater_11,
  "bone_guard": ene_boneGuard_12,
  "brute": ene_brute_13,
  "carrion_stalker": ene_carrionStalker_14,
  "chaos_knight": ene_chaosKnight_15,
  "chaos_mauler": ene_chaosMauler_16,
  "chomper": ene_chomper_17,
  "citadel_01": ene_citadel01_18,
  "citadel_02": ene_citadel02_19,
  "citadel_03": ene_citadel03_20,
  "citadel_04": ene_citadel04_21,
  "citadel_05": ene_citadel05_22,
  "citadel_06": ene_citadel06_23,
  "citadel_07": ene_citadel07_24,
  "citadel_08": ene_citadel08_25,
  "citadel_09": ene_citadel09_26,
  "citadel_10": ene_citadel10_27,
  "colossal_piranhasaur": ene_colossalPiranhasaur_28,
  "crabomination": ene_crabomination_29,
  "cursed_guardian": ene_cursedGuardian_30,
  "cyclops": ene_cyclops_31,
  "damp_high_priestess": ene_dampHighPriestess_32,
  "darkness_elemental": ene_darknessElemental_33,
  "dracolich": ene_dracolich_34,
  "drakus_the_awakened": ene_drakusTheAwakened_35,
  "dread_serpent": ene_dreadSerpent_36,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_37,
  "earth_elemental": ene_earthElemental_38,
  "fire_beetle": ene_fireBeetle_39,
  "fire_drake": ene_fireDrake_40,
  "fire_elemental": ene_fireElemental_41,
  "fire_snake": ene_fireSnake_42,
  "flame_shrieker": ene_flameShrieker_43,
  "footman": ene_footman_44,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_45,
  "ghoul": ene_ghoul_46,
  "giant_yeti": ene_giantYeti_47,
  "glompling": ene_glompling_48,
  "goblin_archer": ene_goblinArcher_49,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_50,
  "goblin_engineer": ene_goblinEngineer_51,
  "goblin_fanatic": ene_goblinFanatic_52,
  "goblin_hero": ene_goblinHero_53,
  "goblin_seer": ene_goblinSeer_54,
  "goblin_witch_doctor": ene_goblinWitchDoctor_55,
  "goblin_worker": ene_goblinWorker_56,
  "golem": ene_golem_57,
  "gremlin_cultist": ene_gremlinCultist_58,
  "greyhorn_the_caged": ene_greyhornTheCaged_59,
  "grotesque": ene_grotesque_60,
  "grove_01": ene_grove01_61,
  "grove_02": ene_grove02_62,
  "grove_03": ene_grove03_63,
  "grove_04": ene_grove04_64,
  "grove_05": ene_grove05_65,
  "grove_06": ene_grove06_66,
  "grove_07": ene_grove07_67,
  "grove_08": ene_grove08_68,
  "grove_09": ene_grove09_69,
  "grove_10": ene_grove10_70,
  "guard": ene_guard_71,
  "guard_captain": ene_guardCaptain_72,
  "half_ogre": ene_halfOgre_73,
  "hell_01": ene_hell01_74,
  "hell_02": ene_hell02_75,
  "hell_03": ene_hell03_76,
  "hell_04": ene_hell04_77,
  "hell_05": ene_hell05_78,
  "hell_06": ene_hell06_79,
  "hell_07": ene_hell07_80,
  "hell_08": ene_hell08_81,
  "hell_09": ene_hell09_82,
  "hell_10": ene_hell10_83,
  "hell_guard": ene_hellGuard_84,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_85,
  "hobgoblin": ene_hobgoblin_86,
  "hydra_of_the_deep": ene_hydraOfTheDeep_87,
  "ice_elemental": ene_iceElemental_88,
  "knight": ene_knight_89,
  "living_flame": ene_livingFlame_90,
  "living_mold": ene_livingMold_91,
  "lurker": ene_lurker_92,
  "magma_elemental": ene_magmaElemental_93,
  "monk": ene_monk_94,
  "mounted_ratman": ene_mountedRatman_95,
  "munchling": ene_munchling_96,
  "nature_elemental": ene_natureElemental_97,
  "necromental": ene_necromental_98,
  "orc_catapult": ene_orcCatapult_99,
  "orc_grunt": ene_orcGrunt_100,
  "orc_soldier": ene_orcSoldier_101,
  "orc_tracker": ene_orcTracker_102,
  "orc_warchief_zog": ene_orcWarchiefZog_103,
  "orc_wardog": ene_orcWardog_104,
  "orc_warlock": ene_orcWarlock_105,
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
  "temple_01": ene_temple01_135,
  "temple_02": ene_temple02_136,
  "temple_03": ene_temple03_137,
  "temple_04": ene_temple04_138,
  "temple_05": ene_temple05_139,
  "temple_06": ene_temple06_140,
  "temple_07": ene_temple07_141,
  "temple_08": ene_temple08_142,
  "temple_09": ene_temple09_143,
  "temple_10": ene_temple10_144,
  "the_elder_squid": ene_theElderSquid_145,
  "the_executioner": ene_theExecutioner_146,
  "the_forest_guardian": ene_theForestGuardian_147,
  "the_hellfire_catapult": ene_theHellfireCatapult_148,
  "the_nameless_one": ene_theNamelessOne_149,
  "the_royal_ballista": ene_theRoyalBallista_150,
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

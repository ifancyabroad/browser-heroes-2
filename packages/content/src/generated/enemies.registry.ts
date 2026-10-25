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
import ene_deepbornHunter_36 from '../enemies/deepbornHunter';
import ene_deepbornMystic_37 from '../enemies/deepbornMystic';
import ene_deepbornRider_38 from '../enemies/deepbornRider';
import ene_deepbornWarrior_39 from '../enemies/deepbornWarrior';
import ene_dracolich_40 from '../enemies/dracolich';
import ene_drakusTheAwakened_41 from '../enemies/drakusTheAwakened';
import ene_dreadSerpent_42 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_43 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_44 from '../enemies/earthElemental';
import ene_fireBeetle_45 from '../enemies/fireBeetle';
import ene_fireDrake_46 from '../enemies/fireDrake';
import ene_fireElemental_47 from '../enemies/fireElemental';
import ene_fireSnake_48 from '../enemies/fireSnake';
import ene_flameShrieker_49 from '../enemies/flameShrieker';
import ene_footman_50 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_51 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_52 from '../enemies/ghoul';
import ene_giantYeti_53 from '../enemies/giantYeti';
import ene_glompling_54 from '../enemies/glompling';
import ene_goblinArcher_55 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_56 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_57 from '../enemies/goblinEngineer';
import ene_goblinFanatic_58 from '../enemies/goblinFanatic';
import ene_goblinHero_59 from '../enemies/goblinHero';
import ene_goblinSeer_60 from '../enemies/goblinSeer';
import ene_goblinWitchDoctor_61 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_62 from '../enemies/goblinWorker';
import ene_golem_63 from '../enemies/golem';
import ene_gremlinCultist_64 from '../enemies/gremlinCultist';
import ene_gremlinVanguard_65 from '../enemies/gremlinVanguard';
import ene_greyhornTheCaged_66 from '../enemies/greyhornTheCaged';
import ene_grotesque_67 from '../enemies/grotesque';
import ene_grove01_68 from '../enemies/grove01';
import ene_grove02_69 from '../enemies/grove02';
import ene_grove03_70 from '../enemies/grove03';
import ene_grove04_71 from '../enemies/grove04';
import ene_grove05_72 from '../enemies/grove05';
import ene_grove06_73 from '../enemies/grove06';
import ene_grove07_74 from '../enemies/grove07';
import ene_grove08_75 from '../enemies/grove08';
import ene_grove09_76 from '../enemies/grove09';
import ene_grove10_77 from '../enemies/grove10';
import ene_guard_78 from '../enemies/guard';
import ene_guardCaptain_79 from '../enemies/guardCaptain';
import ene_halfOgre_80 from '../enemies/halfOgre';
import ene_hell01_81 from '../enemies/hell01';
import ene_hell02_82 from '../enemies/hell02';
import ene_hell03_83 from '../enemies/hell03';
import ene_hell04_84 from '../enemies/hell04';
import ene_hell05_85 from '../enemies/hell05';
import ene_hell06_86 from '../enemies/hell06';
import ene_hell07_87 from '../enemies/hell07';
import ene_hell08_88 from '../enemies/hell08';
import ene_hell09_89 from '../enemies/hell09';
import ene_hell10_90 from '../enemies/hell10';
import ene_hellGuard_91 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_92 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_93 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_94 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_95 from '../enemies/iceElemental';
import ene_knight_96 from '../enemies/knight';
import ene_livingFlame_97 from '../enemies/livingFlame';
import ene_livingMold_98 from '../enemies/livingMold';
import ene_lurker_99 from '../enemies/lurker';
import ene_magmaElemental_100 from '../enemies/magmaElemental';
import ene_marshBuilder_101 from '../enemies/marshBuilder';
import ene_marshDweller_102 from '../enemies/marshDweller';
import ene_mindWarper_103 from '../enemies/mindWarper';
import ene_mireHound_104 from '../enemies/mireHound';
import ene_monk_105 from '../enemies/monk';
import ene_mountedRatman_106 from '../enemies/mountedRatman';
import ene_munchling_107 from '../enemies/munchling';
import ene_natureElemental_108 from '../enemies/natureElemental';
import ene_necromental_109 from '../enemies/necromental';
import ene_ogmunstaAcolyte_110 from '../enemies/ogmunstaAcolyte';
import ene_ogmunstasChampion_111 from '../enemies/ogmunstasChampion';
import ene_orcCatapult_112 from '../enemies/orcCatapult';
import ene_orcGrunt_113 from '../enemies/orcGrunt';
import ene_orcShaman_114 from '../enemies/orcShaman';
import ene_orcSoldier_115 from '../enemies/orcSoldier';
import ene_orcTracker_116 from '../enemies/orcTracker';
import ene_orcWarchiefZog_117 from '../enemies/orcWarchiefZog';
import ene_orcWardog_118 from '../enemies/orcWardog';
import ene_orcWarlock_119 from '../enemies/orcWarlock';
import ene_peon_120 from '../enemies/peon';
import ene_piranhasaur_121 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_122 from '../enemies/pitFiendYagamon';
import ene_powerElemental_123 from '../enemies/powerElemental';
import ene_priestOfOgmunsta_124 from '../enemies/priestOfOgmunsta';
import ene_pygmy_125 from '../enemies/pygmy';
import ene_ratOgre_131 from '../enemies/ratOgre';
import ene_ratmanArcher_126 from '../enemies/ratmanArcher';
import ene_ratmanChampion_127 from '../enemies/ratmanChampion';
import ene_ratmanShaman_128 from '../enemies/ratmanShaman';
import ene_ratmanSlave_129 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_130 from '../enemies/ratmanWarlock';
import ene_runtling_132 from '../enemies/runtling';
import ene_scuttler_133 from '../enemies/scuttler';
import ene_sharkman_134 from '../enemies/sharkman';
import ene_shrieker_135 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_136 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_137 from '../enemies/skeleton';
import ene_skeletonWarrior_138 from '../enemies/skeletonWarrior';
import ene_squib_139 from '../enemies/squib';
import ene_stitchedOgre_140 from '../enemies/stitchedOgre';
import ene_theElderSquid_141 from '../enemies/theElderSquid';
import ene_theExecutioner_142 from '../enemies/theExecutioner';
import ene_theForestGuardian_143 from '../enemies/theForestGuardian';
import ene_theGreatFizzletrix_144 from '../enemies/theGreatFizzletrix';
import ene_theHellfireCatapult_145 from '../enemies/theHellfireCatapult';
import ene_theNamelessOne_146 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_147 from '../enemies/theRoyalBallista';
import ene_troll_148 from '../enemies/troll';
import ene_tundra01_149 from '../enemies/tundra01';
import ene_tundra02_150 from '../enemies/tundra02';
import ene_tundra03_151 from '../enemies/tundra03';
import ene_tundra04_152 from '../enemies/tundra04';
import ene_tundra05_153 from '../enemies/tundra05';
import ene_tundra06_154 from '../enemies/tundra06';
import ene_tundra07_155 from '../enemies/tundra07';
import ene_tundra08_156 from '../enemies/tundra08';
import ene_tundra09_157 from '../enemies/tundra09';
import ene_tundra10_158 from '../enemies/tundra10';
import ene_urzulTheAscended_159 from '../enemies/urzulTheAscended';
import ene_vhorakAndTheObliterator_160 from '../enemies/vhorakAndTheObliterator';
import ene_vilespawn_161 from '../enemies/vilespawn';
import ene_voidCreeper_162 from '../enemies/voidCreeper';
import ene_voidHorror_163 from '../enemies/voidHorror';
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

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_ankhegQueen_5, ene_assassinOfRitChi_6, ene_avatarOfRitChi_7, ene_basilisk_8, ene_beholder_9, ene_berserker_10, ene_binkusTheAllKnowing_11, ene_bloater_12, ene_bogWitch_13, ene_boneGuard_14, ene_brute_15, ene_carrionStalker_16, ene_chaosKnight_17, ene_chaosMauler_18, ene_chomper_19, ene_citadel01_20, ene_citadel02_21, ene_citadel03_22, ene_citadel04_23, ene_citadel05_24, ene_citadel06_25, ene_citadel07_26, ene_citadel08_27, ene_citadel09_28, ene_citadel10_29, ene_colossalPiranhasaur_30, ene_crabomination_31, ene_cursedGuardian_32, ene_cyclops_33, ene_dampHighPriestess_34, ene_darknessElemental_35, ene_deepbornHunter_36, ene_deepbornMystic_37, ene_deepbornRider_38, ene_deepbornWarrior_39, ene_dracolich_40, ene_drakusTheAwakened_41, ene_dreadSerpent_42, ene_dunzarakTheDeceived_43, ene_earthElemental_44, ene_fireBeetle_45, ene_fireDrake_46, ene_fireElemental_47, ene_fireSnake_48, ene_flameShrieker_49, ene_footman_50, ene_forsakenBrotherMcinnes_51, ene_ghoul_52, ene_giantYeti_53, ene_glompling_54, ene_goblinArcher_55, ene_goblinChieftainRotfang_56, ene_goblinEngineer_57, ene_goblinFanatic_58, ene_goblinHero_59, ene_goblinSeer_60, ene_goblinWitchDoctor_61, ene_goblinWorker_62, ene_golem_63, ene_gremlinCultist_64, ene_gremlinVanguard_65, ene_greyhornTheCaged_66, ene_grotesque_67, ene_grove01_68, ene_grove02_69, ene_grove03_70, ene_grove04_71, ene_grove05_72, ene_grove06_73, ene_grove07_74, ene_grove08_75, ene_grove09_76, ene_grove10_77, ene_guard_78, ene_guardCaptain_79, ene_halfOgre_80, ene_hell01_81, ene_hell02_82, ene_hell03_83, ene_hell04_84, ene_hell05_85, ene_hell06_86, ene_hell07_87, ene_hell08_88, ene_hell09_89, ene_hell10_90, ene_hellGuard_91, ene_highExecutionerGrimhook_92, ene_hobgoblin_93, ene_hydraOfTheDeep_94, ene_iceElemental_95, ene_knight_96, ene_livingFlame_97, ene_livingMold_98, ene_lurker_99, ene_magmaElemental_100, ene_marshBuilder_101, ene_marshDweller_102, ene_mindWarper_103, ene_mireHound_104, ene_monk_105, ene_mountedRatman_106, ene_munchling_107, ene_natureElemental_108, ene_necromental_109, ene_ogmunstaAcolyte_110, ene_ogmunstasChampion_111, ene_orcCatapult_112, ene_orcGrunt_113, ene_orcShaman_114, ene_orcSoldier_115, ene_orcTracker_116, ene_orcWarchiefZog_117, ene_orcWardog_118, ene_orcWarlock_119, ene_peon_120, ene_piranhasaur_121, ene_pitFiendYagamon_122, ene_powerElemental_123, ene_priestOfOgmunsta_124, ene_pygmy_125, ene_ratOgre_131, ene_ratmanArcher_126, ene_ratmanChampion_127, ene_ratmanShaman_128, ene_ratmanSlave_129, ene_ratmanWarlock_130, ene_runtling_132, ene_scuttler_133, ene_sharkman_134, ene_shrieker_135, ene_sirMichaelTheConceder_136, ene_skeleton_137, ene_skeletonWarrior_138, ene_squib_139, ene_stitchedOgre_140, ene_theElderSquid_141, ene_theExecutioner_142, ene_theForestGuardian_143, ene_theGreatFizzletrix_144, ene_theHellfireCatapult_145, ene_theNamelessOne_146, ene_theRoyalBallista_147, ene_troll_148, ene_tundra01_149, ene_tundra02_150, ene_tundra03_151, ene_tundra04_152, ene_tundra05_153, ene_tundra06_154, ene_tundra07_155, ene_tundra08_156, ene_tundra09_157, ene_tundra10_158, ene_urzulTheAscended_159, ene_vhorakAndTheObliterator_160, ene_vilespawn_161, ene_voidCreeper_162, ene_voidHorror_163, ene_waterElemental_164, ene_wight_165, ene_wingedNightmare_166, ene_wizard_167, ene_worg_168, ene_wraithLordMalakar_169, ene_wretch_170] satisfies readonly EnemyDefinition[];

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
  "deepborn_hunter": ene_deepbornHunter_36,
  "deepborn_mystic": ene_deepbornMystic_37,
  "deepborn_rider": ene_deepbornRider_38,
  "deepborn_warrior": ene_deepbornWarrior_39,
  "dracolich": ene_dracolich_40,
  "drakus_the_awakened": ene_drakusTheAwakened_41,
  "dread_serpent": ene_dreadSerpent_42,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_43,
  "earth_elemental": ene_earthElemental_44,
  "fire_beetle": ene_fireBeetle_45,
  "fire_drake": ene_fireDrake_46,
  "fire_elemental": ene_fireElemental_47,
  "fire_snake": ene_fireSnake_48,
  "flame_shrieker": ene_flameShrieker_49,
  "footman": ene_footman_50,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_51,
  "ghoul": ene_ghoul_52,
  "giant_yeti": ene_giantYeti_53,
  "glompling": ene_glompling_54,
  "goblin_archer": ene_goblinArcher_55,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_56,
  "goblin_engineer": ene_goblinEngineer_57,
  "goblin_fanatic": ene_goblinFanatic_58,
  "goblin_hero": ene_goblinHero_59,
  "goblin_seer": ene_goblinSeer_60,
  "goblin_witch_doctor": ene_goblinWitchDoctor_61,
  "goblin_worker": ene_goblinWorker_62,
  "golem": ene_golem_63,
  "gremlin_cultist": ene_gremlinCultist_64,
  "gremlin_vanguard": ene_gremlinVanguard_65,
  "greyhorn_the_caged": ene_greyhornTheCaged_66,
  "grotesque": ene_grotesque_67,
  "grove_01": ene_grove01_68,
  "grove_02": ene_grove02_69,
  "grove_03": ene_grove03_70,
  "grove_04": ene_grove04_71,
  "grove_05": ene_grove05_72,
  "grove_06": ene_grove06_73,
  "grove_07": ene_grove07_74,
  "grove_08": ene_grove08_75,
  "grove_09": ene_grove09_76,
  "grove_10": ene_grove10_77,
  "guard": ene_guard_78,
  "guard_captain": ene_guardCaptain_79,
  "half_ogre": ene_halfOgre_80,
  "hell_01": ene_hell01_81,
  "hell_02": ene_hell02_82,
  "hell_03": ene_hell03_83,
  "hell_04": ene_hell04_84,
  "hell_05": ene_hell05_85,
  "hell_06": ene_hell06_86,
  "hell_07": ene_hell07_87,
  "hell_08": ene_hell08_88,
  "hell_09": ene_hell09_89,
  "hell_10": ene_hell10_90,
  "hell_guard": ene_hellGuard_91,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_92,
  "hobgoblin": ene_hobgoblin_93,
  "hydra_of_the_deep": ene_hydraOfTheDeep_94,
  "ice_elemental": ene_iceElemental_95,
  "knight": ene_knight_96,
  "living_flame": ene_livingFlame_97,
  "living_mold": ene_livingMold_98,
  "lurker": ene_lurker_99,
  "magma_elemental": ene_magmaElemental_100,
  "marsh_builder": ene_marshBuilder_101,
  "marsh_dweller": ene_marshDweller_102,
  "mind_warper": ene_mindWarper_103,
  "mire_hound": ene_mireHound_104,
  "monk": ene_monk_105,
  "mounted_ratman": ene_mountedRatman_106,
  "munchling": ene_munchling_107,
  "nature_elemental": ene_natureElemental_108,
  "necromental": ene_necromental_109,
  "ogmunsta_acolyte": ene_ogmunstaAcolyte_110,
  "ogmunstas_champion": ene_ogmunstasChampion_111,
  "orc_catapult": ene_orcCatapult_112,
  "orc_grunt": ene_orcGrunt_113,
  "orc_shaman": ene_orcShaman_114,
  "orc_soldier": ene_orcSoldier_115,
  "orc_tracker": ene_orcTracker_116,
  "orc_warchief_zog": ene_orcWarchiefZog_117,
  "orc_wardog": ene_orcWardog_118,
  "orc_warlock": ene_orcWarlock_119,
  "peon": ene_peon_120,
  "piranhasaur": ene_piranhasaur_121,
  "pit_fiend_yagamon": ene_pitFiendYagamon_122,
  "power_elemental": ene_powerElemental_123,
  "priest_of_ogmunsta": ene_priestOfOgmunsta_124,
  "pygmy": ene_pygmy_125,
  "rat_ogre": ene_ratOgre_131,
  "ratman_archer": ene_ratmanArcher_126,
  "ratman_champion": ene_ratmanChampion_127,
  "ratman_shaman": ene_ratmanShaman_128,
  "ratman_slave": ene_ratmanSlave_129,
  "ratman_warlock": ene_ratmanWarlock_130,
  "runtling": ene_runtling_132,
  "scuttler": ene_scuttler_133,
  "sharkman": ene_sharkman_134,
  "shrieker": ene_shrieker_135,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_136,
  "skeleton": ene_skeleton_137,
  "skeleton_warrior": ene_skeletonWarrior_138,
  "squib": ene_squib_139,
  "stitched_ogre": ene_stitchedOgre_140,
  "the_elder_squid": ene_theElderSquid_141,
  "the_executioner": ene_theExecutioner_142,
  "the_forest_guardian": ene_theForestGuardian_143,
  "the_great_fizzletrix": ene_theGreatFizzletrix_144,
  "the_hellfire_catapult": ene_theHellfireCatapult_145,
  "the_nameless_one": ene_theNamelessOne_146,
  "the_royal_ballista": ene_theRoyalBallista_147,
  "troll": ene_troll_148,
  "tundra_01": ene_tundra01_149,
  "tundra_02": ene_tundra02_150,
  "tundra_03": ene_tundra03_151,
  "tundra_04": ene_tundra04_152,
  "tundra_05": ene_tundra05_153,
  "tundra_06": ene_tundra06_154,
  "tundra_07": ene_tundra07_155,
  "tundra_08": ene_tundra08_156,
  "tundra_09": ene_tundra09_157,
  "tundra_10": ene_tundra10_158,
  "urzul_the_ascended": ene_urzulTheAscended_159,
  "vhorak_and_the_obliterator": ene_vhorakAndTheObliterator_160,
  "vilespawn": ene_vilespawn_161,
  "void_creeper": ene_voidCreeper_162,
  "void_horror": ene_voidHorror_163,
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

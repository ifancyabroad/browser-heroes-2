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
import ene_archmageVorath_6 from '../enemies/archmageVorath';
import ene_assassinOfRitChi_7 from '../enemies/assassinOfRitChi';
import ene_avatarOfRitChi_8 from '../enemies/avatarOfRitChi';
import ene_basilisk_9 from '../enemies/basilisk';
import ene_bearClanCleric_10 from '../enemies/bearClanCleric';
import ene_bearClanElite_11 from '../enemies/bearClanElite';
import ene_bearClanHunter_12 from '../enemies/bearClanHunter';
import ene_bearClanMage_13 from '../enemies/bearClanMage';
import ene_bearClanOutrider_14 from '../enemies/bearClanOutrider';
import ene_bearClanRaider_15 from '../enemies/bearClanRaider';
import ene_bearClanRam_16 from '../enemies/bearClanRam';
import ene_beholder_17 from '../enemies/beholder';
import ene_berserker_18 from '../enemies/berserker';
import ene_binkusTheAllKnowing_19 from '../enemies/binkusTheAllKnowing';
import ene_bloater_20 from '../enemies/bloater';
import ene_bogWitch_21 from '../enemies/bogWitch';
import ene_boneGuard_22 from '../enemies/boneGuard';
import ene_brute_23 from '../enemies/brute';
import ene_carrionStalker_24 from '../enemies/carrionStalker';
import ene_chaosKnight_25 from '../enemies/chaosKnight';
import ene_chaosMauler_26 from '../enemies/chaosMauler';
import ene_chomper_27 from '../enemies/chomper';
import ene_citadel01_28 from '../enemies/citadel01';
import ene_citadel02_29 from '../enemies/citadel02';
import ene_citadel03_30 from '../enemies/citadel03';
import ene_citadel04_31 from '../enemies/citadel04';
import ene_citadel05_32 from '../enemies/citadel05';
import ene_citadel06_33 from '../enemies/citadel06';
import ene_citadel07_34 from '../enemies/citadel07';
import ene_citadel08_35 from '../enemies/citadel08';
import ene_citadel09_36 from '../enemies/citadel09';
import ene_citadel10_37 from '../enemies/citadel10';
import ene_colossalPiranhasaur_38 from '../enemies/colossalPiranhasaur';
import ene_crabomination_39 from '../enemies/crabomination';
import ene_crownPrinceThalanor_40 from '../enemies/crownPrinceThalanor';
import ene_cursedGuardian_41 from '../enemies/cursedGuardian';
import ene_cyclops_42 from '../enemies/cyclops';
import ene_dampHighPriestess_43 from '../enemies/dampHighPriestess';
import ene_darknessElemental_44 from '../enemies/darknessElemental';
import ene_deepbornHunter_45 from '../enemies/deepbornHunter';
import ene_deepbornMystic_46 from '../enemies/deepbornMystic';
import ene_deepbornRider_47 from '../enemies/deepbornRider';
import ene_deepbornWarrior_48 from '../enemies/deepbornWarrior';
import ene_dracolich_49 from '../enemies/dracolich';
import ene_dragonSlayerEric_50 from '../enemies/dragonSlayerEric';
import ene_drakusTheAwakened_51 from '../enemies/drakusTheAwakened';
import ene_dreadSerpent_52 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_53 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_54 from '../enemies/earthElemental';
import ene_elfCaptain_55 from '../enemies/elfCaptain';
import ene_elfKingsblade_56 from '../enemies/elfKingsblade';
import ene_elfKingsguard_57 from '../enemies/elfKingsguard';
import ene_elfNightsinger_58 from '../enemies/elfNightsinger';
import ene_elfRanger_59 from '../enemies/elfRanger';
import ene_elfScout_60 from '../enemies/elfScout';
import ene_elfSorceress_61 from '../enemies/elfSorceress';
import ene_elfSpearman_62 from '../enemies/elfSpearman';
import ene_fireBeetle_63 from '../enemies/fireBeetle';
import ene_fireDrake_64 from '../enemies/fireDrake';
import ene_fireElemental_65 from '../enemies/fireElemental';
import ene_fireSnake_66 from '../enemies/fireSnake';
import ene_flameShrieker_67 from '../enemies/flameShrieker';
import ene_footman_68 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_69 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_70 from '../enemies/ghoul';
import ene_giantYeti_71 from '../enemies/giantYeti';
import ene_glompling_72 from '../enemies/glompling';
import ene_goblinArcher_73 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_74 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_75 from '../enemies/goblinEngineer';
import ene_goblinFanatic_76 from '../enemies/goblinFanatic';
import ene_goblinHero_77 from '../enemies/goblinHero';
import ene_goblinSeer_78 from '../enemies/goblinSeer';
import ene_goblinWitchDoctor_79 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_80 from '../enemies/goblinWorker';
import ene_golem_81 from '../enemies/golem';
import ene_gremlinCultist_82 from '../enemies/gremlinCultist';
import ene_gremlinVanguard_83 from '../enemies/gremlinVanguard';
import ene_greyhornTheCaged_84 from '../enemies/greyhornTheCaged';
import ene_grotesque_85 from '../enemies/grotesque';
import ene_guard_86 from '../enemies/guard';
import ene_guardCaptain_87 from '../enemies/guardCaptain';
import ene_halfOgre_88 from '../enemies/halfOgre';
import ene_hell01_89 from '../enemies/hell01';
import ene_hell02_90 from '../enemies/hell02';
import ene_hell03_91 from '../enemies/hell03';
import ene_hell04_92 from '../enemies/hell04';
import ene_hell05_93 from '../enemies/hell05';
import ene_hell06_94 from '../enemies/hell06';
import ene_hell07_95 from '../enemies/hell07';
import ene_hell08_96 from '../enemies/hell08';
import ene_hell09_97 from '../enemies/hell09';
import ene_hell10_98 from '../enemies/hell10';
import ene_hellGuard_99 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_100 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_101 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_102 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_103 from '../enemies/iceElemental';
import ene_jarlAlfredBlondbeard_104 from '../enemies/jarlAlfredBlondbeard';
import ene_knight_105 from '../enemies/knight';
import ene_livingFlame_106 from '../enemies/livingFlame';
import ene_livingMold_107 from '../enemies/livingMold';
import ene_lurker_108 from '../enemies/lurker';
import ene_magmaElemental_109 from '../enemies/magmaElemental';
import ene_marshBuilder_110 from '../enemies/marshBuilder';
import ene_marshDweller_111 from '../enemies/marshDweller';
import ene_mindWarper_112 from '../enemies/mindWarper';
import ene_mireHound_113 from '../enemies/mireHound';
import ene_monk_114 from '../enemies/monk';
import ene_mountedRatman_115 from '../enemies/mountedRatman';
import ene_munchling_116 from '../enemies/munchling';
import ene_natureElemental_117 from '../enemies/natureElemental';
import ene_necromental_118 from '../enemies/necromental';
import ene_ogmunstaAcolyte_119 from '../enemies/ogmunstaAcolyte';
import ene_ogmunstasChampion_120 from '../enemies/ogmunstasChampion';
import ene_orcCatapult_121 from '../enemies/orcCatapult';
import ene_orcGrunt_122 from '../enemies/orcGrunt';
import ene_orcShaman_123 from '../enemies/orcShaman';
import ene_orcSoldier_124 from '../enemies/orcSoldier';
import ene_orcTracker_125 from '../enemies/orcTracker';
import ene_orcWarchiefZog_126 from '../enemies/orcWarchiefZog';
import ene_orcWardog_127 from '../enemies/orcWardog';
import ene_orcWarlock_128 from '../enemies/orcWarlock';
import ene_peon_129 from '../enemies/peon';
import ene_piranhasaur_130 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_131 from '../enemies/pitFiendYagamon';
import ene_powerElemental_132 from '../enemies/powerElemental';
import ene_priestOfOgmunsta_133 from '../enemies/priestOfOgmunsta';
import ene_pygmy_134 from '../enemies/pygmy';
import ene_ratOgre_140 from '../enemies/ratOgre';
import ene_ratmanArcher_135 from '../enemies/ratmanArcher';
import ene_ratmanChampion_136 from '../enemies/ratmanChampion';
import ene_ratmanShaman_137 from '../enemies/ratmanShaman';
import ene_ratmanSlave_138 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_139 from '../enemies/ratmanWarlock';
import ene_runtling_141 from '../enemies/runtling';
import ene_scuttler_142 from '../enemies/scuttler';
import ene_sharkman_143 from '../enemies/sharkman';
import ene_shrieker_144 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_145 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_146 from '../enemies/skeleton';
import ene_skeletonWarrior_147 from '../enemies/skeletonWarrior';
import ene_squib_148 from '../enemies/squib';
import ene_stitchedOgre_149 from '../enemies/stitchedOgre';
import ene_theElderSquid_150 from '../enemies/theElderSquid';
import ene_theExecutioner_151 from '../enemies/theExecutioner';
import ene_theForestGuardian_152 from '../enemies/theForestGuardian';
import ene_theGreatFizzletrix_153 from '../enemies/theGreatFizzletrix';
import ene_theHellfireCatapult_154 from '../enemies/theHellfireCatapult';
import ene_theNamelessOne_155 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_156 from '../enemies/theRoyalBallista';
import ene_troll_157 from '../enemies/troll';
import ene_tundraBeast_158 from '../enemies/tundraBeast';
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

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_ankhegQueen_5, ene_archmageVorath_6, ene_assassinOfRitChi_7, ene_avatarOfRitChi_8, ene_basilisk_9, ene_bearClanCleric_10, ene_bearClanElite_11, ene_bearClanHunter_12, ene_bearClanMage_13, ene_bearClanOutrider_14, ene_bearClanRaider_15, ene_bearClanRam_16, ene_beholder_17, ene_berserker_18, ene_binkusTheAllKnowing_19, ene_bloater_20, ene_bogWitch_21, ene_boneGuard_22, ene_brute_23, ene_carrionStalker_24, ene_chaosKnight_25, ene_chaosMauler_26, ene_chomper_27, ene_citadel01_28, ene_citadel02_29, ene_citadel03_30, ene_citadel04_31, ene_citadel05_32, ene_citadel06_33, ene_citadel07_34, ene_citadel08_35, ene_citadel09_36, ene_citadel10_37, ene_colossalPiranhasaur_38, ene_crabomination_39, ene_crownPrinceThalanor_40, ene_cursedGuardian_41, ene_cyclops_42, ene_dampHighPriestess_43, ene_darknessElemental_44, ene_deepbornHunter_45, ene_deepbornMystic_46, ene_deepbornRider_47, ene_deepbornWarrior_48, ene_dracolich_49, ene_dragonSlayerEric_50, ene_drakusTheAwakened_51, ene_dreadSerpent_52, ene_dunzarakTheDeceived_53, ene_earthElemental_54, ene_elfCaptain_55, ene_elfKingsblade_56, ene_elfKingsguard_57, ene_elfNightsinger_58, ene_elfRanger_59, ene_elfScout_60, ene_elfSorceress_61, ene_elfSpearman_62, ene_fireBeetle_63, ene_fireDrake_64, ene_fireElemental_65, ene_fireSnake_66, ene_flameShrieker_67, ene_footman_68, ene_forsakenBrotherMcinnes_69, ene_ghoul_70, ene_giantYeti_71, ene_glompling_72, ene_goblinArcher_73, ene_goblinChieftainRotfang_74, ene_goblinEngineer_75, ene_goblinFanatic_76, ene_goblinHero_77, ene_goblinSeer_78, ene_goblinWitchDoctor_79, ene_goblinWorker_80, ene_golem_81, ene_gremlinCultist_82, ene_gremlinVanguard_83, ene_greyhornTheCaged_84, ene_grotesque_85, ene_guard_86, ene_guardCaptain_87, ene_halfOgre_88, ene_hell01_89, ene_hell02_90, ene_hell03_91, ene_hell04_92, ene_hell05_93, ene_hell06_94, ene_hell07_95, ene_hell08_96, ene_hell09_97, ene_hell10_98, ene_hellGuard_99, ene_highExecutionerGrimhook_100, ene_hobgoblin_101, ene_hydraOfTheDeep_102, ene_iceElemental_103, ene_jarlAlfredBlondbeard_104, ene_knight_105, ene_livingFlame_106, ene_livingMold_107, ene_lurker_108, ene_magmaElemental_109, ene_marshBuilder_110, ene_marshDweller_111, ene_mindWarper_112, ene_mireHound_113, ene_monk_114, ene_mountedRatman_115, ene_munchling_116, ene_natureElemental_117, ene_necromental_118, ene_ogmunstaAcolyte_119, ene_ogmunstasChampion_120, ene_orcCatapult_121, ene_orcGrunt_122, ene_orcShaman_123, ene_orcSoldier_124, ene_orcTracker_125, ene_orcWarchiefZog_126, ene_orcWardog_127, ene_orcWarlock_128, ene_peon_129, ene_piranhasaur_130, ene_pitFiendYagamon_131, ene_powerElemental_132, ene_priestOfOgmunsta_133, ene_pygmy_134, ene_ratOgre_140, ene_ratmanArcher_135, ene_ratmanChampion_136, ene_ratmanShaman_137, ene_ratmanSlave_138, ene_ratmanWarlock_139, ene_runtling_141, ene_scuttler_142, ene_sharkman_143, ene_shrieker_144, ene_sirMichaelTheConceder_145, ene_skeleton_146, ene_skeletonWarrior_147, ene_squib_148, ene_stitchedOgre_149, ene_theElderSquid_150, ene_theExecutioner_151, ene_theForestGuardian_152, ene_theGreatFizzletrix_153, ene_theHellfireCatapult_154, ene_theNamelessOne_155, ene_theRoyalBallista_156, ene_troll_157, ene_tundraBeast_158, ene_urzulTheAscended_159, ene_vhorakAndTheObliterator_160, ene_vilespawn_161, ene_voidCreeper_162, ene_voidHorror_163, ene_waterElemental_164, ene_wight_165, ene_wingedNightmare_166, ene_wizard_167, ene_worg_168, ene_wraithLordMalakar_169, ene_wretch_170] satisfies readonly EnemyDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const enemies = rawEnemies as readonly Enemy[];

const rawEnemiesById = {
  "abomination": ene_abomination_0,
  "abyss_armour": ene_abyssArmour_1,
  "abyss_rider": ene_abyssRider_2,
  "aetheris_the_dawnflame": ene_aetherisTheDawnflame_3,
  "air_elemental": ene_airElemental_4,
  "ankheg_queen": ene_ankhegQueen_5,
  "archmage_vorath": ene_archmageVorath_6,
  "assassin_of_rit_chi": ene_assassinOfRitChi_7,
  "avatar_of_rit_chi": ene_avatarOfRitChi_8,
  "basilisk": ene_basilisk_9,
  "bear_clan_cleric": ene_bearClanCleric_10,
  "bear_clan_elite": ene_bearClanElite_11,
  "bear_clan_hunter": ene_bearClanHunter_12,
  "bear_clan_mage": ene_bearClanMage_13,
  "bear_clan_outrider": ene_bearClanOutrider_14,
  "bear_clan_raider": ene_bearClanRaider_15,
  "bear_clan_ram": ene_bearClanRam_16,
  "beholder": ene_beholder_17,
  "berserker": ene_berserker_18,
  "binkus_the_all_knowing": ene_binkusTheAllKnowing_19,
  "bloater": ene_bloater_20,
  "bog_witch": ene_bogWitch_21,
  "bone_guard": ene_boneGuard_22,
  "brute": ene_brute_23,
  "carrion_stalker": ene_carrionStalker_24,
  "chaos_knight": ene_chaosKnight_25,
  "chaos_mauler": ene_chaosMauler_26,
  "chomper": ene_chomper_27,
  "citadel_01": ene_citadel01_28,
  "citadel_02": ene_citadel02_29,
  "citadel_03": ene_citadel03_30,
  "citadel_04": ene_citadel04_31,
  "citadel_05": ene_citadel05_32,
  "citadel_06": ene_citadel06_33,
  "citadel_07": ene_citadel07_34,
  "citadel_08": ene_citadel08_35,
  "citadel_09": ene_citadel09_36,
  "citadel_10": ene_citadel10_37,
  "colossal_piranhasaur": ene_colossalPiranhasaur_38,
  "crabomination": ene_crabomination_39,
  "crown_prince_thalanor": ene_crownPrinceThalanor_40,
  "cursed_guardian": ene_cursedGuardian_41,
  "cyclops": ene_cyclops_42,
  "damp_high_priestess": ene_dampHighPriestess_43,
  "darkness_elemental": ene_darknessElemental_44,
  "deepborn_hunter": ene_deepbornHunter_45,
  "deepborn_mystic": ene_deepbornMystic_46,
  "deepborn_rider": ene_deepbornRider_47,
  "deepborn_warrior": ene_deepbornWarrior_48,
  "dracolich": ene_dracolich_49,
  "dragon_slayer_eric": ene_dragonSlayerEric_50,
  "drakus_the_awakened": ene_drakusTheAwakened_51,
  "dread_serpent": ene_dreadSerpent_52,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_53,
  "earth_elemental": ene_earthElemental_54,
  "elf_captain": ene_elfCaptain_55,
  "elf_kingsblade": ene_elfKingsblade_56,
  "elf_kingsguard": ene_elfKingsguard_57,
  "elf_nightsinger": ene_elfNightsinger_58,
  "elf_ranger": ene_elfRanger_59,
  "elf_scout": ene_elfScout_60,
  "elf_sorceress": ene_elfSorceress_61,
  "elf_spearman": ene_elfSpearman_62,
  "fire_beetle": ene_fireBeetle_63,
  "fire_drake": ene_fireDrake_64,
  "fire_elemental": ene_fireElemental_65,
  "fire_snake": ene_fireSnake_66,
  "flame_shrieker": ene_flameShrieker_67,
  "footman": ene_footman_68,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_69,
  "ghoul": ene_ghoul_70,
  "giant_yeti": ene_giantYeti_71,
  "glompling": ene_glompling_72,
  "goblin_archer": ene_goblinArcher_73,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_74,
  "goblin_engineer": ene_goblinEngineer_75,
  "goblin_fanatic": ene_goblinFanatic_76,
  "goblin_hero": ene_goblinHero_77,
  "goblin_seer": ene_goblinSeer_78,
  "goblin_witch_doctor": ene_goblinWitchDoctor_79,
  "goblin_worker": ene_goblinWorker_80,
  "golem": ene_golem_81,
  "gremlin_cultist": ene_gremlinCultist_82,
  "gremlin_vanguard": ene_gremlinVanguard_83,
  "greyhorn_the_caged": ene_greyhornTheCaged_84,
  "grotesque": ene_grotesque_85,
  "guard": ene_guard_86,
  "guard_captain": ene_guardCaptain_87,
  "half_ogre": ene_halfOgre_88,
  "hell_01": ene_hell01_89,
  "hell_02": ene_hell02_90,
  "hell_03": ene_hell03_91,
  "hell_04": ene_hell04_92,
  "hell_05": ene_hell05_93,
  "hell_06": ene_hell06_94,
  "hell_07": ene_hell07_95,
  "hell_08": ene_hell08_96,
  "hell_09": ene_hell09_97,
  "hell_10": ene_hell10_98,
  "hell_guard": ene_hellGuard_99,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_100,
  "hobgoblin": ene_hobgoblin_101,
  "hydra_of_the_deep": ene_hydraOfTheDeep_102,
  "ice_elemental": ene_iceElemental_103,
  "jarl_alfred_blondbeard": ene_jarlAlfredBlondbeard_104,
  "knight": ene_knight_105,
  "living_flame": ene_livingFlame_106,
  "living_mold": ene_livingMold_107,
  "lurker": ene_lurker_108,
  "magma_elemental": ene_magmaElemental_109,
  "marsh_builder": ene_marshBuilder_110,
  "marsh_dweller": ene_marshDweller_111,
  "mind_warper": ene_mindWarper_112,
  "mire_hound": ene_mireHound_113,
  "monk": ene_monk_114,
  "mounted_ratman": ene_mountedRatman_115,
  "munchling": ene_munchling_116,
  "nature_elemental": ene_natureElemental_117,
  "necromental": ene_necromental_118,
  "ogmunsta_acolyte": ene_ogmunstaAcolyte_119,
  "ogmunstas_champion": ene_ogmunstasChampion_120,
  "orc_catapult": ene_orcCatapult_121,
  "orc_grunt": ene_orcGrunt_122,
  "orc_shaman": ene_orcShaman_123,
  "orc_soldier": ene_orcSoldier_124,
  "orc_tracker": ene_orcTracker_125,
  "orc_warchief_zog": ene_orcWarchiefZog_126,
  "orc_wardog": ene_orcWardog_127,
  "orc_warlock": ene_orcWarlock_128,
  "peon": ene_peon_129,
  "piranhasaur": ene_piranhasaur_130,
  "pit_fiend_yagamon": ene_pitFiendYagamon_131,
  "power_elemental": ene_powerElemental_132,
  "priest_of_ogmunsta": ene_priestOfOgmunsta_133,
  "pygmy": ene_pygmy_134,
  "rat_ogre": ene_ratOgre_140,
  "ratman_archer": ene_ratmanArcher_135,
  "ratman_champion": ene_ratmanChampion_136,
  "ratman_shaman": ene_ratmanShaman_137,
  "ratman_slave": ene_ratmanSlave_138,
  "ratman_warlock": ene_ratmanWarlock_139,
  "runtling": ene_runtling_141,
  "scuttler": ene_scuttler_142,
  "sharkman": ene_sharkman_143,
  "shrieker": ene_shrieker_144,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_145,
  "skeleton": ene_skeleton_146,
  "skeleton_warrior": ene_skeletonWarrior_147,
  "squib": ene_squib_148,
  "stitched_ogre": ene_stitchedOgre_149,
  "the_elder_squid": ene_theElderSquid_150,
  "the_executioner": ene_theExecutioner_151,
  "the_forest_guardian": ene_theForestGuardian_152,
  "the_great_fizzletrix": ene_theGreatFizzletrix_153,
  "the_hellfire_catapult": ene_theHellfireCatapult_154,
  "the_nameless_one": ene_theNamelessOne_155,
  "the_royal_ballista": ene_theRoyalBallista_156,
  "troll": ene_troll_157,
  "tundra_beast": ene_tundraBeast_158,
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

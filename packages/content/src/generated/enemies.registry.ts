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
import ene_ancientWarlord_5 from '../enemies/ancientWarlord';
import ene_ankhegQueen_6 from '../enemies/ankhegQueen';
import ene_archmageVorath_7 from '../enemies/archmageVorath';
import ene_assassinOfRitChi_8 from '../enemies/assassinOfRitChi';
import ene_avatarOfRitChi_9 from '../enemies/avatarOfRitChi';
import ene_basilisk_10 from '../enemies/basilisk';
import ene_bearClanCleric_11 from '../enemies/bearClanCleric';
import ene_bearClanElite_12 from '../enemies/bearClanElite';
import ene_bearClanHunter_13 from '../enemies/bearClanHunter';
import ene_bearClanMage_14 from '../enemies/bearClanMage';
import ene_bearClanOutrider_15 from '../enemies/bearClanOutrider';
import ene_bearClanRaider_16 from '../enemies/bearClanRaider';
import ene_bearClanRam_17 from '../enemies/bearClanRam';
import ene_beholder_18 from '../enemies/beholder';
import ene_berserker_19 from '../enemies/berserker';
import ene_bileDemon_20 from '../enemies/bileDemon';
import ene_binkusTheAllKnowing_21 from '../enemies/binkusTheAllKnowing';
import ene_bloater_22 from '../enemies/bloater';
import ene_bogWitch_23 from '../enemies/bogWitch';
import ene_boneGuard_24 from '../enemies/boneGuard';
import ene_boneHound_25 from '../enemies/boneHound';
import ene_bonelessBlob_26 from '../enemies/bonelessBlob';
import ene_brutalusTheDemonKing_27 from '../enemies/brutalusTheDemonKing';
import ene_brute_28 from '../enemies/brute';
import ene_carrionStalker_29 from '../enemies/carrionStalker';
import ene_cerberus_30 from '../enemies/cerberus';
import ene_chaosKnight_31 from '../enemies/chaosKnight';
import ene_chaosMauler_32 from '../enemies/chaosMauler';
import ene_chomper_33 from '../enemies/chomper';
import ene_colossalPiranhasaur_34 from '../enemies/colossalPiranhasaur';
import ene_crabomination_35 from '../enemies/crabomination';
import ene_crownPrinceThalanor_36 from '../enemies/crownPrinceThalanor';
import ene_cursedGuardian_37 from '../enemies/cursedGuardian';
import ene_cyclops_38 from '../enemies/cyclops';
import ene_dampHighPriestess_39 from '../enemies/dampHighPriestess';
import ene_darknessElemental_40 from '../enemies/darknessElemental';
import ene_deathKnight_41 from '../enemies/deathKnight';
import ene_deepbornHunter_42 from '../enemies/deepbornHunter';
import ene_deepbornMystic_43 from '../enemies/deepbornMystic';
import ene_deepbornRider_44 from '../enemies/deepbornRider';
import ene_deepbornWarrior_45 from '../enemies/deepbornWarrior';
import ene_devilspawn_46 from '../enemies/devilspawn';
import ene_dracolich_47 from '../enemies/dracolich';
import ene_dragonSlayerEric_48 from '../enemies/dragonSlayerEric';
import ene_drakusTheAwakened_49 from '../enemies/drakusTheAwakened';
import ene_dreadFatherNicolas_50 from '../enemies/dreadFatherNicolas';
import ene_dreadSerpent_51 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_52 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_53 from '../enemies/earthElemental';
import ene_elfCaptain_54 from '../enemies/elfCaptain';
import ene_elfKingsblade_55 from '../enemies/elfKingsblade';
import ene_elfKingsguard_56 from '../enemies/elfKingsguard';
import ene_elfNightsinger_57 from '../enemies/elfNightsinger';
import ene_elfRanger_58 from '../enemies/elfRanger';
import ene_elfScout_59 from '../enemies/elfScout';
import ene_elfSorceress_60 from '../enemies/elfSorceress';
import ene_elfSpearman_61 from '../enemies/elfSpearman';
import ene_fireBeetle_62 from '../enemies/fireBeetle';
import ene_fireDrake_63 from '../enemies/fireDrake';
import ene_fireElemental_64 from '../enemies/fireElemental';
import ene_fireSnake_65 from '../enemies/fireSnake';
import ene_flameShrieker_66 from '../enemies/flameShrieker';
import ene_footman_67 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_68 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_69 from '../enemies/ghoul';
import ene_giantYeti_70 from '../enemies/giantYeti';
import ene_glompling_71 from '../enemies/glompling';
import ene_goblinArcher_72 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_73 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_74 from '../enemies/goblinEngineer';
import ene_goblinFanatic_75 from '../enemies/goblinFanatic';
import ene_goblinHero_76 from '../enemies/goblinHero';
import ene_goblinSeer_77 from '../enemies/goblinSeer';
import ene_goblinVanguard_78 from '../enemies/goblinVanguard';
import ene_goblinWitchDoctor_79 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_80 from '../enemies/goblinWorker';
import ene_golem_81 from '../enemies/golem';
import ene_gremlinCultist_82 from '../enemies/gremlinCultist';
import ene_greyhornTheCaged_83 from '../enemies/greyhornTheCaged';
import ene_grotesque_84 from '../enemies/grotesque';
import ene_guard_85 from '../enemies/guard';
import ene_guardCaptain_86 from '../enemies/guardCaptain';
import ene_halfOgre_87 from '../enemies/halfOgre';
import ene_hellGuard_88 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_89 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_90 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_91 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_92 from '../enemies/iceElemental';
import ene_imp_93 from '../enemies/imp';
import ene_island01_94 from '../enemies/island01';
import ene_island02_95 from '../enemies/island02';
import ene_island03_96 from '../enemies/island03';
import ene_island04_97 from '../enemies/island04';
import ene_island05_98 from '../enemies/island05';
import ene_island06_99 from '../enemies/island06';
import ene_island07_100 from '../enemies/island07';
import ene_island08_101 from '../enemies/island08';
import ene_island09_102 from '../enemies/island09';
import ene_island10_103 from '../enemies/island10';
import ene_jarlAlfredBlondbeard_104 from '../enemies/jarlAlfredBlondbeard';
import ene_knight_105 from '../enemies/knight';
import ene_livingCorpse_106 from '../enemies/livingCorpse';
import ene_livingFlame_107 from '../enemies/livingFlame';
import ene_livingMold_108 from '../enemies/livingMold';
import ene_lurker_109 from '../enemies/lurker';
import ene_madGenie_110 from '../enemies/madGenie';
import ene_magmaElemental_111 from '../enemies/magmaElemental';
import ene_magog_112 from '../enemies/magog';
import ene_marshBuilder_113 from '../enemies/marshBuilder';
import ene_marshDweller_114 from '../enemies/marshDweller';
import ene_mindWarper_115 from '../enemies/mindWarper';
import ene_mireHound_116 from '../enemies/mireHound';
import ene_monk_117 from '../enemies/monk';
import ene_mountain01_118 from '../enemies/mountain01';
import ene_mountain02_119 from '../enemies/mountain02';
import ene_mountain03_120 from '../enemies/mountain03';
import ene_mountain04_121 from '../enemies/mountain04';
import ene_mountain05_122 from '../enemies/mountain05';
import ene_mountain06_123 from '../enemies/mountain06';
import ene_mountain07_124 from '../enemies/mountain07';
import ene_mountain08_125 from '../enemies/mountain08';
import ene_mountain09_126 from '../enemies/mountain09';
import ene_mountain10_127 from '../enemies/mountain10';
import ene_mountedRatman_128 from '../enemies/mountedRatman';
import ene_munchling_129 from '../enemies/munchling';
import ene_natureElemental_130 from '../enemies/natureElemental';
import ene_necromental_131 from '../enemies/necromental';
import ene_nightReaver_132 from '../enemies/nightReaver';
import ene_ogmunstaAcolyte_133 from '../enemies/ogmunstaAcolyte';
import ene_ogmunstasChampion_134 from '../enemies/ogmunstasChampion';
import ene_orcCatapult_135 from '../enemies/orcCatapult';
import ene_orcGrunt_136 from '../enemies/orcGrunt';
import ene_orcShaman_137 from '../enemies/orcShaman';
import ene_orcSoldier_138 from '../enemies/orcSoldier';
import ene_orcTracker_139 from '../enemies/orcTracker';
import ene_orcWarchiefZog_140 from '../enemies/orcWarchiefZog';
import ene_orcWardog_141 from '../enemies/orcWardog';
import ene_orcWarlock_142 from '../enemies/orcWarlock';
import ene_peon_143 from '../enemies/peon';
import ene_piranhasaur_144 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_145 from '../enemies/pitFiendYagamon';
import ene_powerElemental_146 from '../enemies/powerElemental';
import ene_priestOfOgmunsta_147 from '../enemies/priestOfOgmunsta';
import ene_pygmy_148 from '../enemies/pygmy';
import ene_quasit_149 from '../enemies/quasit';
import ene_ratOgre_155 from '../enemies/ratOgre';
import ene_ratmanArcher_150 from '../enemies/ratmanArcher';
import ene_ratmanChampion_151 from '../enemies/ratmanChampion';
import ene_ratmanShaman_152 from '../enemies/ratmanShaman';
import ene_ratmanSlave_153 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_154 from '../enemies/ratmanWarlock';
import ene_runtling_156 from '../enemies/runtling';
import ene_scuttler_157 from '../enemies/scuttler';
import ene_sharkman_158 from '../enemies/sharkman';
import ene_shrieker_159 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_160 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_161 from '../enemies/skeleton';
import ene_skeletonWarrior_162 from '../enemies/skeletonWarrior';
import ene_skeletonWatchman_163 from '../enemies/skeletonWatchman';
import ene_squib_164 from '../enemies/squib';
import ene_stitchedOgre_165 from '../enemies/stitchedOgre';
import ene_succubus_166 from '../enemies/succubus';
import ene_theBoneCollector_167 from '../enemies/theBoneCollector';
import ene_theElderSquid_168 from '../enemies/theElderSquid';
import ene_theExecutioner_169 from '../enemies/theExecutioner';
import ene_theForestGuardian_170 from '../enemies/theForestGuardian';
import ene_theGreatFizzletrix_171 from '../enemies/theGreatFizzletrix';
import ene_theHellfireCatapult_172 from '../enemies/theHellfireCatapult';
import ene_theInfernalHorseman_173 from '../enemies/theInfernalHorseman';
import ene_theNamelessOne_174 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_175 from '../enemies/theRoyalBallista';
import ene_troll_176 from '../enemies/troll';
import ene_tundraBeast_177 from '../enemies/tundraBeast';
import ene_urzulTheAscended_178 from '../enemies/urzulTheAscended';
import ene_vampireLord_179 from '../enemies/vampireLord';
import ene_vhorakAndTheObliterator_180 from '../enemies/vhorakAndTheObliterator';
import ene_vilespawn_181 from '../enemies/vilespawn';
import ene_voidCreeper_182 from '../enemies/voidCreeper';
import ene_voidHorror_183 from '../enemies/voidHorror';
import ene_waterElemental_184 from '../enemies/waterElemental';
import ene_wight_185 from '../enemies/wight';
import ene_wingedNightmare_186 from '../enemies/wingedNightmare';
import ene_wizard_187 from '../enemies/wizard';
import ene_worg_188 from '../enemies/worg';
import ene_wraithLordMalakar_189 from '../enemies/wraithLordMalakar';
import ene_wretch_190 from '../enemies/wretch';

export { enemyIdSchema, enemyIds };
export type { EnemyId } from './enemyIds';

export type Enemy = Omit<WithGeneratedId<EnemyDefinition, EnemyId>, 'combat'> & {
  combat: WithCombatContentIds<EnemyDefinition['combat'], SkillId, FeatId>;
};

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_ancientWarlord_5, ene_ankhegQueen_6, ene_archmageVorath_7, ene_assassinOfRitChi_8, ene_avatarOfRitChi_9, ene_basilisk_10, ene_bearClanCleric_11, ene_bearClanElite_12, ene_bearClanHunter_13, ene_bearClanMage_14, ene_bearClanOutrider_15, ene_bearClanRaider_16, ene_bearClanRam_17, ene_beholder_18, ene_berserker_19, ene_bileDemon_20, ene_binkusTheAllKnowing_21, ene_bloater_22, ene_bogWitch_23, ene_boneGuard_24, ene_boneHound_25, ene_bonelessBlob_26, ene_brutalusTheDemonKing_27, ene_brute_28, ene_carrionStalker_29, ene_cerberus_30, ene_chaosKnight_31, ene_chaosMauler_32, ene_chomper_33, ene_colossalPiranhasaur_34, ene_crabomination_35, ene_crownPrinceThalanor_36, ene_cursedGuardian_37, ene_cyclops_38, ene_dampHighPriestess_39, ene_darknessElemental_40, ene_deathKnight_41, ene_deepbornHunter_42, ene_deepbornMystic_43, ene_deepbornRider_44, ene_deepbornWarrior_45, ene_devilspawn_46, ene_dracolich_47, ene_dragonSlayerEric_48, ene_drakusTheAwakened_49, ene_dreadFatherNicolas_50, ene_dreadSerpent_51, ene_dunzarakTheDeceived_52, ene_earthElemental_53, ene_elfCaptain_54, ene_elfKingsblade_55, ene_elfKingsguard_56, ene_elfNightsinger_57, ene_elfRanger_58, ene_elfScout_59, ene_elfSorceress_60, ene_elfSpearman_61, ene_fireBeetle_62, ene_fireDrake_63, ene_fireElemental_64, ene_fireSnake_65, ene_flameShrieker_66, ene_footman_67, ene_forsakenBrotherMcinnes_68, ene_ghoul_69, ene_giantYeti_70, ene_glompling_71, ene_goblinArcher_72, ene_goblinChieftainRotfang_73, ene_goblinEngineer_74, ene_goblinFanatic_75, ene_goblinHero_76, ene_goblinSeer_77, ene_goblinVanguard_78, ene_goblinWitchDoctor_79, ene_goblinWorker_80, ene_golem_81, ene_gremlinCultist_82, ene_greyhornTheCaged_83, ene_grotesque_84, ene_guard_85, ene_guardCaptain_86, ene_halfOgre_87, ene_hellGuard_88, ene_highExecutionerGrimhook_89, ene_hobgoblin_90, ene_hydraOfTheDeep_91, ene_iceElemental_92, ene_imp_93, ene_island01_94, ene_island02_95, ene_island03_96, ene_island04_97, ene_island05_98, ene_island06_99, ene_island07_100, ene_island08_101, ene_island09_102, ene_island10_103, ene_jarlAlfredBlondbeard_104, ene_knight_105, ene_livingCorpse_106, ene_livingFlame_107, ene_livingMold_108, ene_lurker_109, ene_madGenie_110, ene_magmaElemental_111, ene_magog_112, ene_marshBuilder_113, ene_marshDweller_114, ene_mindWarper_115, ene_mireHound_116, ene_monk_117, ene_mountain01_118, ene_mountain02_119, ene_mountain03_120, ene_mountain04_121, ene_mountain05_122, ene_mountain06_123, ene_mountain07_124, ene_mountain08_125, ene_mountain09_126, ene_mountain10_127, ene_mountedRatman_128, ene_munchling_129, ene_natureElemental_130, ene_necromental_131, ene_nightReaver_132, ene_ogmunstaAcolyte_133, ene_ogmunstasChampion_134, ene_orcCatapult_135, ene_orcGrunt_136, ene_orcShaman_137, ene_orcSoldier_138, ene_orcTracker_139, ene_orcWarchiefZog_140, ene_orcWardog_141, ene_orcWarlock_142, ene_peon_143, ene_piranhasaur_144, ene_pitFiendYagamon_145, ene_powerElemental_146, ene_priestOfOgmunsta_147, ene_pygmy_148, ene_quasit_149, ene_ratOgre_155, ene_ratmanArcher_150, ene_ratmanChampion_151, ene_ratmanShaman_152, ene_ratmanSlave_153, ene_ratmanWarlock_154, ene_runtling_156, ene_scuttler_157, ene_sharkman_158, ene_shrieker_159, ene_sirMichaelTheConceder_160, ene_skeleton_161, ene_skeletonWarrior_162, ene_skeletonWatchman_163, ene_squib_164, ene_stitchedOgre_165, ene_succubus_166, ene_theBoneCollector_167, ene_theElderSquid_168, ene_theExecutioner_169, ene_theForestGuardian_170, ene_theGreatFizzletrix_171, ene_theHellfireCatapult_172, ene_theInfernalHorseman_173, ene_theNamelessOne_174, ene_theRoyalBallista_175, ene_troll_176, ene_tundraBeast_177, ene_urzulTheAscended_178, ene_vampireLord_179, ene_vhorakAndTheObliterator_180, ene_vilespawn_181, ene_voidCreeper_182, ene_voidHorror_183, ene_waterElemental_184, ene_wight_185, ene_wingedNightmare_186, ene_wizard_187, ene_worg_188, ene_wraithLordMalakar_189, ene_wretch_190] satisfies readonly EnemyDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const enemies = rawEnemies as readonly Enemy[];

const rawEnemiesById = {
  "abomination": ene_abomination_0,
  "abyss_armour": ene_abyssArmour_1,
  "abyss_rider": ene_abyssRider_2,
  "aetheris_the_dawnflame": ene_aetherisTheDawnflame_3,
  "air_elemental": ene_airElemental_4,
  "ancient_warlord": ene_ancientWarlord_5,
  "ankheg_queen": ene_ankhegQueen_6,
  "archmage_vorath": ene_archmageVorath_7,
  "assassin_of_rit_chi": ene_assassinOfRitChi_8,
  "avatar_of_rit_chi": ene_avatarOfRitChi_9,
  "basilisk": ene_basilisk_10,
  "bear_clan_cleric": ene_bearClanCleric_11,
  "bear_clan_elite": ene_bearClanElite_12,
  "bear_clan_hunter": ene_bearClanHunter_13,
  "bear_clan_mage": ene_bearClanMage_14,
  "bear_clan_outrider": ene_bearClanOutrider_15,
  "bear_clan_raider": ene_bearClanRaider_16,
  "bear_clan_ram": ene_bearClanRam_17,
  "beholder": ene_beholder_18,
  "berserker": ene_berserker_19,
  "bile_demon": ene_bileDemon_20,
  "binkus_the_all_knowing": ene_binkusTheAllKnowing_21,
  "bloater": ene_bloater_22,
  "bog_witch": ene_bogWitch_23,
  "bone_guard": ene_boneGuard_24,
  "bone_hound": ene_boneHound_25,
  "boneless_blob": ene_bonelessBlob_26,
  "brutalus_the_demon_king": ene_brutalusTheDemonKing_27,
  "brute": ene_brute_28,
  "carrion_stalker": ene_carrionStalker_29,
  "cerberus": ene_cerberus_30,
  "chaos_knight": ene_chaosKnight_31,
  "chaos_mauler": ene_chaosMauler_32,
  "chomper": ene_chomper_33,
  "colossal_piranhasaur": ene_colossalPiranhasaur_34,
  "crabomination": ene_crabomination_35,
  "crown_prince_thalanor": ene_crownPrinceThalanor_36,
  "cursed_guardian": ene_cursedGuardian_37,
  "cyclops": ene_cyclops_38,
  "damp_high_priestess": ene_dampHighPriestess_39,
  "darkness_elemental": ene_darknessElemental_40,
  "death_knight": ene_deathKnight_41,
  "deepborn_hunter": ene_deepbornHunter_42,
  "deepborn_mystic": ene_deepbornMystic_43,
  "deepborn_rider": ene_deepbornRider_44,
  "deepborn_warrior": ene_deepbornWarrior_45,
  "devilspawn": ene_devilspawn_46,
  "dracolich": ene_dracolich_47,
  "dragon_slayer_eric": ene_dragonSlayerEric_48,
  "drakus_the_awakened": ene_drakusTheAwakened_49,
  "dread_father_nicolas": ene_dreadFatherNicolas_50,
  "dread_serpent": ene_dreadSerpent_51,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_52,
  "earth_elemental": ene_earthElemental_53,
  "elf_captain": ene_elfCaptain_54,
  "elf_kingsblade": ene_elfKingsblade_55,
  "elf_kingsguard": ene_elfKingsguard_56,
  "elf_nightsinger": ene_elfNightsinger_57,
  "elf_ranger": ene_elfRanger_58,
  "elf_scout": ene_elfScout_59,
  "elf_sorceress": ene_elfSorceress_60,
  "elf_spearman": ene_elfSpearman_61,
  "fire_beetle": ene_fireBeetle_62,
  "fire_drake": ene_fireDrake_63,
  "fire_elemental": ene_fireElemental_64,
  "fire_snake": ene_fireSnake_65,
  "flame_shrieker": ene_flameShrieker_66,
  "footman": ene_footman_67,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_68,
  "ghoul": ene_ghoul_69,
  "giant_yeti": ene_giantYeti_70,
  "glompling": ene_glompling_71,
  "goblin_archer": ene_goblinArcher_72,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_73,
  "goblin_engineer": ene_goblinEngineer_74,
  "goblin_fanatic": ene_goblinFanatic_75,
  "goblin_hero": ene_goblinHero_76,
  "goblin_seer": ene_goblinSeer_77,
  "goblin_vanguard": ene_goblinVanguard_78,
  "goblin_witch_doctor": ene_goblinWitchDoctor_79,
  "goblin_worker": ene_goblinWorker_80,
  "golem": ene_golem_81,
  "gremlin_cultist": ene_gremlinCultist_82,
  "greyhorn_the_caged": ene_greyhornTheCaged_83,
  "grotesque": ene_grotesque_84,
  "guard": ene_guard_85,
  "guard_captain": ene_guardCaptain_86,
  "half_ogre": ene_halfOgre_87,
  "hell_guard": ene_hellGuard_88,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_89,
  "hobgoblin": ene_hobgoblin_90,
  "hydra_of_the_deep": ene_hydraOfTheDeep_91,
  "ice_elemental": ene_iceElemental_92,
  "imp": ene_imp_93,
  "island_01": ene_island01_94,
  "island_02": ene_island02_95,
  "island_03": ene_island03_96,
  "island_04": ene_island04_97,
  "island_05": ene_island05_98,
  "island_06": ene_island06_99,
  "island_07": ene_island07_100,
  "island_08": ene_island08_101,
  "island_09": ene_island09_102,
  "island_10": ene_island10_103,
  "jarl_alfred_blondbeard": ene_jarlAlfredBlondbeard_104,
  "knight": ene_knight_105,
  "living_corpse": ene_livingCorpse_106,
  "living_flame": ene_livingFlame_107,
  "living_mold": ene_livingMold_108,
  "lurker": ene_lurker_109,
  "mad_genie": ene_madGenie_110,
  "magma_elemental": ene_magmaElemental_111,
  "magog": ene_magog_112,
  "marsh_builder": ene_marshBuilder_113,
  "marsh_dweller": ene_marshDweller_114,
  "mind_warper": ene_mindWarper_115,
  "mire_hound": ene_mireHound_116,
  "monk": ene_monk_117,
  "mountain_01": ene_mountain01_118,
  "mountain_02": ene_mountain02_119,
  "mountain_03": ene_mountain03_120,
  "mountain_04": ene_mountain04_121,
  "mountain_05": ene_mountain05_122,
  "mountain_06": ene_mountain06_123,
  "mountain_07": ene_mountain07_124,
  "mountain_08": ene_mountain08_125,
  "mountain_09": ene_mountain09_126,
  "mountain_10": ene_mountain10_127,
  "mounted_ratman": ene_mountedRatman_128,
  "munchling": ene_munchling_129,
  "nature_elemental": ene_natureElemental_130,
  "necromental": ene_necromental_131,
  "night_reaver": ene_nightReaver_132,
  "ogmunsta_acolyte": ene_ogmunstaAcolyte_133,
  "ogmunstas_champion": ene_ogmunstasChampion_134,
  "orc_catapult": ene_orcCatapult_135,
  "orc_grunt": ene_orcGrunt_136,
  "orc_shaman": ene_orcShaman_137,
  "orc_soldier": ene_orcSoldier_138,
  "orc_tracker": ene_orcTracker_139,
  "orc_warchief_zog": ene_orcWarchiefZog_140,
  "orc_wardog": ene_orcWardog_141,
  "orc_warlock": ene_orcWarlock_142,
  "peon": ene_peon_143,
  "piranhasaur": ene_piranhasaur_144,
  "pit_fiend_yagamon": ene_pitFiendYagamon_145,
  "power_elemental": ene_powerElemental_146,
  "priest_of_ogmunsta": ene_priestOfOgmunsta_147,
  "pygmy": ene_pygmy_148,
  "quasit": ene_quasit_149,
  "rat_ogre": ene_ratOgre_155,
  "ratman_archer": ene_ratmanArcher_150,
  "ratman_champion": ene_ratmanChampion_151,
  "ratman_shaman": ene_ratmanShaman_152,
  "ratman_slave": ene_ratmanSlave_153,
  "ratman_warlock": ene_ratmanWarlock_154,
  "runtling": ene_runtling_156,
  "scuttler": ene_scuttler_157,
  "sharkman": ene_sharkman_158,
  "shrieker": ene_shrieker_159,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_160,
  "skeleton": ene_skeleton_161,
  "skeleton_warrior": ene_skeletonWarrior_162,
  "skeleton_watchman": ene_skeletonWatchman_163,
  "squib": ene_squib_164,
  "stitched_ogre": ene_stitchedOgre_165,
  "succubus": ene_succubus_166,
  "the_bone_collector": ene_theBoneCollector_167,
  "the_elder_squid": ene_theElderSquid_168,
  "the_executioner": ene_theExecutioner_169,
  "the_forest_guardian": ene_theForestGuardian_170,
  "the_great_fizzletrix": ene_theGreatFizzletrix_171,
  "the_hellfire_catapult": ene_theHellfireCatapult_172,
  "the_infernal_horseman": ene_theInfernalHorseman_173,
  "the_nameless_one": ene_theNamelessOne_174,
  "the_royal_ballista": ene_theRoyalBallista_175,
  "troll": ene_troll_176,
  "tundra_beast": ene_tundraBeast_177,
  "urzul_the_ascended": ene_urzulTheAscended_178,
  "vampire_lord": ene_vampireLord_179,
  "vhorak_and_the_obliterator": ene_vhorakAndTheObliterator_180,
  "vilespawn": ene_vilespawn_181,
  "void_creeper": ene_voidCreeper_182,
  "void_horror": ene_voidHorror_183,
  "water_elemental": ene_waterElemental_184,
  "wight": ene_wight_185,
  "winged_nightmare": ene_wingedNightmare_186,
  "wizard": ene_wizard_187,
  "worg": ene_worg_188,
  "wraith_lord_malakar": ene_wraithLordMalakar_189,
  "wretch": ene_wretch_190,
} satisfies Record<EnemyId, EnemyDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ENEMIES_BY_ID = rawEnemiesById as Record<EnemyId, Enemy>;

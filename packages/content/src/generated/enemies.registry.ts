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
import ene_binkusTheAllKnowing_20 from '../enemies/binkusTheAllKnowing';
import ene_bloater_21 from '../enemies/bloater';
import ene_bogWitch_22 from '../enemies/bogWitch';
import ene_boneGuard_23 from '../enemies/boneGuard';
import ene_boneHound_24 from '../enemies/boneHound';
import ene_brute_25 from '../enemies/brute';
import ene_carrionStalker_26 from '../enemies/carrionStalker';
import ene_chaosKnight_27 from '../enemies/chaosKnight';
import ene_chaosMauler_28 from '../enemies/chaosMauler';
import ene_chomper_29 from '../enemies/chomper';
import ene_colossalPiranhasaur_30 from '../enemies/colossalPiranhasaur';
import ene_crabomination_31 from '../enemies/crabomination';
import ene_crownPrinceThalanor_32 from '../enemies/crownPrinceThalanor';
import ene_cursedGuardian_33 from '../enemies/cursedGuardian';
import ene_cyclops_34 from '../enemies/cyclops';
import ene_dampHighPriestess_35 from '../enemies/dampHighPriestess';
import ene_darknessElemental_36 from '../enemies/darknessElemental';
import ene_deathKnight_37 from '../enemies/deathKnight';
import ene_deepbornHunter_38 from '../enemies/deepbornHunter';
import ene_deepbornMystic_39 from '../enemies/deepbornMystic';
import ene_deepbornRider_40 from '../enemies/deepbornRider';
import ene_deepbornWarrior_41 from '../enemies/deepbornWarrior';
import ene_dracolich_42 from '../enemies/dracolich';
import ene_dragonSlayerEric_43 from '../enemies/dragonSlayerEric';
import ene_drakusTheAwakened_44 from '../enemies/drakusTheAwakened';
import ene_dreadFatherNicolas_45 from '../enemies/dreadFatherNicolas';
import ene_dreadSerpent_46 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_47 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_48 from '../enemies/earthElemental';
import ene_elfCaptain_49 from '../enemies/elfCaptain';
import ene_elfKingsblade_50 from '../enemies/elfKingsblade';
import ene_elfKingsguard_51 from '../enemies/elfKingsguard';
import ene_elfNightsinger_52 from '../enemies/elfNightsinger';
import ene_elfRanger_53 from '../enemies/elfRanger';
import ene_elfScout_54 from '../enemies/elfScout';
import ene_elfSorceress_55 from '../enemies/elfSorceress';
import ene_elfSpearman_56 from '../enemies/elfSpearman';
import ene_fireBeetle_57 from '../enemies/fireBeetle';
import ene_fireDrake_58 from '../enemies/fireDrake';
import ene_fireElemental_59 from '../enemies/fireElemental';
import ene_fireSnake_60 from '../enemies/fireSnake';
import ene_flameShrieker_61 from '../enemies/flameShrieker';
import ene_footman_62 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_63 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_64 from '../enemies/ghoul';
import ene_giantYeti_65 from '../enemies/giantYeti';
import ene_glompling_66 from '../enemies/glompling';
import ene_goblinArcher_67 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_68 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_69 from '../enemies/goblinEngineer';
import ene_goblinFanatic_70 from '../enemies/goblinFanatic';
import ene_goblinHero_71 from '../enemies/goblinHero';
import ene_goblinSeer_72 from '../enemies/goblinSeer';
import ene_goblinWitchDoctor_73 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_74 from '../enemies/goblinWorker';
import ene_golem_75 from '../enemies/golem';
import ene_gremlinCultist_76 from '../enemies/gremlinCultist';
import ene_gremlinVanguard_77 from '../enemies/gremlinVanguard';
import ene_greyhornTheCaged_78 from '../enemies/greyhornTheCaged';
import ene_grotesque_79 from '../enemies/grotesque';
import ene_guard_80 from '../enemies/guard';
import ene_guardCaptain_81 from '../enemies/guardCaptain';
import ene_halfOgre_82 from '../enemies/halfOgre';
import ene_hell01_83 from '../enemies/hell01';
import ene_hell02_84 from '../enemies/hell02';
import ene_hell03_85 from '../enemies/hell03';
import ene_hell04_86 from '../enemies/hell04';
import ene_hell05_87 from '../enemies/hell05';
import ene_hell06_88 from '../enemies/hell06';
import ene_hell07_89 from '../enemies/hell07';
import ene_hell08_90 from '../enemies/hell08';
import ene_hell09_91 from '../enemies/hell09';
import ene_hell10_92 from '../enemies/hell10';
import ene_hellGuard_93 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_94 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_95 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_96 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_97 from '../enemies/iceElemental';
import ene_jarlAlfredBlondbeard_98 from '../enemies/jarlAlfredBlondbeard';
import ene_knight_99 from '../enemies/knight';
import ene_livingCorpse_100 from '../enemies/livingCorpse';
import ene_livingFlame_101 from '../enemies/livingFlame';
import ene_livingMold_102 from '../enemies/livingMold';
import ene_lurker_103 from '../enemies/lurker';
import ene_madGenie_104 from '../enemies/madGenie';
import ene_magmaElemental_105 from '../enemies/magmaElemental';
import ene_marshBuilder_106 from '../enemies/marshBuilder';
import ene_marshDweller_107 from '../enemies/marshDweller';
import ene_mindWarper_108 from '../enemies/mindWarper';
import ene_mireHound_109 from '../enemies/mireHound';
import ene_monk_110 from '../enemies/monk';
import ene_mountedRatman_111 from '../enemies/mountedRatman';
import ene_munchling_112 from '../enemies/munchling';
import ene_natureElemental_113 from '../enemies/natureElemental';
import ene_necromental_114 from '../enemies/necromental';
import ene_nightReaver_115 from '../enemies/nightReaver';
import ene_ogmunstaAcolyte_116 from '../enemies/ogmunstaAcolyte';
import ene_ogmunstasChampion_117 from '../enemies/ogmunstasChampion';
import ene_orcCatapult_118 from '../enemies/orcCatapult';
import ene_orcGrunt_119 from '../enemies/orcGrunt';
import ene_orcShaman_120 from '../enemies/orcShaman';
import ene_orcSoldier_121 from '../enemies/orcSoldier';
import ene_orcTracker_122 from '../enemies/orcTracker';
import ene_orcWarchiefZog_123 from '../enemies/orcWarchiefZog';
import ene_orcWardog_124 from '../enemies/orcWardog';
import ene_orcWarlock_125 from '../enemies/orcWarlock';
import ene_peon_126 from '../enemies/peon';
import ene_piranhasaur_127 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_128 from '../enemies/pitFiendYagamon';
import ene_powerElemental_129 from '../enemies/powerElemental';
import ene_priestOfOgmunsta_130 from '../enemies/priestOfOgmunsta';
import ene_pygmy_131 from '../enemies/pygmy';
import ene_ratOgre_137 from '../enemies/ratOgre';
import ene_ratmanArcher_132 from '../enemies/ratmanArcher';
import ene_ratmanChampion_133 from '../enemies/ratmanChampion';
import ene_ratmanShaman_134 from '../enemies/ratmanShaman';
import ene_ratmanSlave_135 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_136 from '../enemies/ratmanWarlock';
import ene_runtling_138 from '../enemies/runtling';
import ene_scuttler_139 from '../enemies/scuttler';
import ene_sharkman_140 from '../enemies/sharkman';
import ene_shrieker_141 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_142 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_143 from '../enemies/skeleton';
import ene_skeletonWarrior_144 from '../enemies/skeletonWarrior';
import ene_skeletonWatchman_145 from '../enemies/skeletonWatchman';
import ene_squib_146 from '../enemies/squib';
import ene_stitchedOgre_147 from '../enemies/stitchedOgre';
import ene_theBoneCollector_148 from '../enemies/theBoneCollector';
import ene_theElderSquid_149 from '../enemies/theElderSquid';
import ene_theExecutioner_150 from '../enemies/theExecutioner';
import ene_theForestGuardian_151 from '../enemies/theForestGuardian';
import ene_theGreatFizzletrix_152 from '../enemies/theGreatFizzletrix';
import ene_theHellfireCatapult_153 from '../enemies/theHellfireCatapult';
import ene_theNamelessOne_154 from '../enemies/theNamelessOne';
import ene_theRoyalBallista_155 from '../enemies/theRoyalBallista';
import ene_troll_156 from '../enemies/troll';
import ene_tundraBeast_157 from '../enemies/tundraBeast';
import ene_urzulTheAscended_158 from '../enemies/urzulTheAscended';
import ene_vampireLord_159 from '../enemies/vampireLord';
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

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_ancientWarlord_5, ene_ankhegQueen_6, ene_archmageVorath_7, ene_assassinOfRitChi_8, ene_avatarOfRitChi_9, ene_basilisk_10, ene_bearClanCleric_11, ene_bearClanElite_12, ene_bearClanHunter_13, ene_bearClanMage_14, ene_bearClanOutrider_15, ene_bearClanRaider_16, ene_bearClanRam_17, ene_beholder_18, ene_berserker_19, ene_binkusTheAllKnowing_20, ene_bloater_21, ene_bogWitch_22, ene_boneGuard_23, ene_boneHound_24, ene_brute_25, ene_carrionStalker_26, ene_chaosKnight_27, ene_chaosMauler_28, ene_chomper_29, ene_colossalPiranhasaur_30, ene_crabomination_31, ene_crownPrinceThalanor_32, ene_cursedGuardian_33, ene_cyclops_34, ene_dampHighPriestess_35, ene_darknessElemental_36, ene_deathKnight_37, ene_deepbornHunter_38, ene_deepbornMystic_39, ene_deepbornRider_40, ene_deepbornWarrior_41, ene_dracolich_42, ene_dragonSlayerEric_43, ene_drakusTheAwakened_44, ene_dreadFatherNicolas_45, ene_dreadSerpent_46, ene_dunzarakTheDeceived_47, ene_earthElemental_48, ene_elfCaptain_49, ene_elfKingsblade_50, ene_elfKingsguard_51, ene_elfNightsinger_52, ene_elfRanger_53, ene_elfScout_54, ene_elfSorceress_55, ene_elfSpearman_56, ene_fireBeetle_57, ene_fireDrake_58, ene_fireElemental_59, ene_fireSnake_60, ene_flameShrieker_61, ene_footman_62, ene_forsakenBrotherMcinnes_63, ene_ghoul_64, ene_giantYeti_65, ene_glompling_66, ene_goblinArcher_67, ene_goblinChieftainRotfang_68, ene_goblinEngineer_69, ene_goblinFanatic_70, ene_goblinHero_71, ene_goblinSeer_72, ene_goblinWitchDoctor_73, ene_goblinWorker_74, ene_golem_75, ene_gremlinCultist_76, ene_gremlinVanguard_77, ene_greyhornTheCaged_78, ene_grotesque_79, ene_guard_80, ene_guardCaptain_81, ene_halfOgre_82, ene_hell01_83, ene_hell02_84, ene_hell03_85, ene_hell04_86, ene_hell05_87, ene_hell06_88, ene_hell07_89, ene_hell08_90, ene_hell09_91, ene_hell10_92, ene_hellGuard_93, ene_highExecutionerGrimhook_94, ene_hobgoblin_95, ene_hydraOfTheDeep_96, ene_iceElemental_97, ene_jarlAlfredBlondbeard_98, ene_knight_99, ene_livingCorpse_100, ene_livingFlame_101, ene_livingMold_102, ene_lurker_103, ene_madGenie_104, ene_magmaElemental_105, ene_marshBuilder_106, ene_marshDweller_107, ene_mindWarper_108, ene_mireHound_109, ene_monk_110, ene_mountedRatman_111, ene_munchling_112, ene_natureElemental_113, ene_necromental_114, ene_nightReaver_115, ene_ogmunstaAcolyte_116, ene_ogmunstasChampion_117, ene_orcCatapult_118, ene_orcGrunt_119, ene_orcShaman_120, ene_orcSoldier_121, ene_orcTracker_122, ene_orcWarchiefZog_123, ene_orcWardog_124, ene_orcWarlock_125, ene_peon_126, ene_piranhasaur_127, ene_pitFiendYagamon_128, ene_powerElemental_129, ene_priestOfOgmunsta_130, ene_pygmy_131, ene_ratOgre_137, ene_ratmanArcher_132, ene_ratmanChampion_133, ene_ratmanShaman_134, ene_ratmanSlave_135, ene_ratmanWarlock_136, ene_runtling_138, ene_scuttler_139, ene_sharkman_140, ene_shrieker_141, ene_sirMichaelTheConceder_142, ene_skeleton_143, ene_skeletonWarrior_144, ene_skeletonWatchman_145, ene_squib_146, ene_stitchedOgre_147, ene_theBoneCollector_148, ene_theElderSquid_149, ene_theExecutioner_150, ene_theForestGuardian_151, ene_theGreatFizzletrix_152, ene_theHellfireCatapult_153, ene_theNamelessOne_154, ene_theRoyalBallista_155, ene_troll_156, ene_tundraBeast_157, ene_urzulTheAscended_158, ene_vampireLord_159, ene_vhorakAndTheObliterator_160, ene_vilespawn_161, ene_voidCreeper_162, ene_voidHorror_163, ene_waterElemental_164, ene_wight_165, ene_wingedNightmare_166, ene_wizard_167, ene_worg_168, ene_wraithLordMalakar_169, ene_wretch_170] satisfies readonly EnemyDefinition[];

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
  "binkus_the_all_knowing": ene_binkusTheAllKnowing_20,
  "bloater": ene_bloater_21,
  "bog_witch": ene_bogWitch_22,
  "bone_guard": ene_boneGuard_23,
  "bone_hound": ene_boneHound_24,
  "brute": ene_brute_25,
  "carrion_stalker": ene_carrionStalker_26,
  "chaos_knight": ene_chaosKnight_27,
  "chaos_mauler": ene_chaosMauler_28,
  "chomper": ene_chomper_29,
  "colossal_piranhasaur": ene_colossalPiranhasaur_30,
  "crabomination": ene_crabomination_31,
  "crown_prince_thalanor": ene_crownPrinceThalanor_32,
  "cursed_guardian": ene_cursedGuardian_33,
  "cyclops": ene_cyclops_34,
  "damp_high_priestess": ene_dampHighPriestess_35,
  "darkness_elemental": ene_darknessElemental_36,
  "death_knight": ene_deathKnight_37,
  "deepborn_hunter": ene_deepbornHunter_38,
  "deepborn_mystic": ene_deepbornMystic_39,
  "deepborn_rider": ene_deepbornRider_40,
  "deepborn_warrior": ene_deepbornWarrior_41,
  "dracolich": ene_dracolich_42,
  "dragon_slayer_eric": ene_dragonSlayerEric_43,
  "drakus_the_awakened": ene_drakusTheAwakened_44,
  "dread_father_nicolas": ene_dreadFatherNicolas_45,
  "dread_serpent": ene_dreadSerpent_46,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_47,
  "earth_elemental": ene_earthElemental_48,
  "elf_captain": ene_elfCaptain_49,
  "elf_kingsblade": ene_elfKingsblade_50,
  "elf_kingsguard": ene_elfKingsguard_51,
  "elf_nightsinger": ene_elfNightsinger_52,
  "elf_ranger": ene_elfRanger_53,
  "elf_scout": ene_elfScout_54,
  "elf_sorceress": ene_elfSorceress_55,
  "elf_spearman": ene_elfSpearman_56,
  "fire_beetle": ene_fireBeetle_57,
  "fire_drake": ene_fireDrake_58,
  "fire_elemental": ene_fireElemental_59,
  "fire_snake": ene_fireSnake_60,
  "flame_shrieker": ene_flameShrieker_61,
  "footman": ene_footman_62,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_63,
  "ghoul": ene_ghoul_64,
  "giant_yeti": ene_giantYeti_65,
  "glompling": ene_glompling_66,
  "goblin_archer": ene_goblinArcher_67,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_68,
  "goblin_engineer": ene_goblinEngineer_69,
  "goblin_fanatic": ene_goblinFanatic_70,
  "goblin_hero": ene_goblinHero_71,
  "goblin_seer": ene_goblinSeer_72,
  "goblin_witch_doctor": ene_goblinWitchDoctor_73,
  "goblin_worker": ene_goblinWorker_74,
  "golem": ene_golem_75,
  "gremlin_cultist": ene_gremlinCultist_76,
  "gremlin_vanguard": ene_gremlinVanguard_77,
  "greyhorn_the_caged": ene_greyhornTheCaged_78,
  "grotesque": ene_grotesque_79,
  "guard": ene_guard_80,
  "guard_captain": ene_guardCaptain_81,
  "half_ogre": ene_halfOgre_82,
  "hell_01": ene_hell01_83,
  "hell_02": ene_hell02_84,
  "hell_03": ene_hell03_85,
  "hell_04": ene_hell04_86,
  "hell_05": ene_hell05_87,
  "hell_06": ene_hell06_88,
  "hell_07": ene_hell07_89,
  "hell_08": ene_hell08_90,
  "hell_09": ene_hell09_91,
  "hell_10": ene_hell10_92,
  "hell_guard": ene_hellGuard_93,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_94,
  "hobgoblin": ene_hobgoblin_95,
  "hydra_of_the_deep": ene_hydraOfTheDeep_96,
  "ice_elemental": ene_iceElemental_97,
  "jarl_alfred_blondbeard": ene_jarlAlfredBlondbeard_98,
  "knight": ene_knight_99,
  "living_corpse": ene_livingCorpse_100,
  "living_flame": ene_livingFlame_101,
  "living_mold": ene_livingMold_102,
  "lurker": ene_lurker_103,
  "mad_genie": ene_madGenie_104,
  "magma_elemental": ene_magmaElemental_105,
  "marsh_builder": ene_marshBuilder_106,
  "marsh_dweller": ene_marshDweller_107,
  "mind_warper": ene_mindWarper_108,
  "mire_hound": ene_mireHound_109,
  "monk": ene_monk_110,
  "mounted_ratman": ene_mountedRatman_111,
  "munchling": ene_munchling_112,
  "nature_elemental": ene_natureElemental_113,
  "necromental": ene_necromental_114,
  "night_reaver": ene_nightReaver_115,
  "ogmunsta_acolyte": ene_ogmunstaAcolyte_116,
  "ogmunstas_champion": ene_ogmunstasChampion_117,
  "orc_catapult": ene_orcCatapult_118,
  "orc_grunt": ene_orcGrunt_119,
  "orc_shaman": ene_orcShaman_120,
  "orc_soldier": ene_orcSoldier_121,
  "orc_tracker": ene_orcTracker_122,
  "orc_warchief_zog": ene_orcWarchiefZog_123,
  "orc_wardog": ene_orcWardog_124,
  "orc_warlock": ene_orcWarlock_125,
  "peon": ene_peon_126,
  "piranhasaur": ene_piranhasaur_127,
  "pit_fiend_yagamon": ene_pitFiendYagamon_128,
  "power_elemental": ene_powerElemental_129,
  "priest_of_ogmunsta": ene_priestOfOgmunsta_130,
  "pygmy": ene_pygmy_131,
  "rat_ogre": ene_ratOgre_137,
  "ratman_archer": ene_ratmanArcher_132,
  "ratman_champion": ene_ratmanChampion_133,
  "ratman_shaman": ene_ratmanShaman_134,
  "ratman_slave": ene_ratmanSlave_135,
  "ratman_warlock": ene_ratmanWarlock_136,
  "runtling": ene_runtling_138,
  "scuttler": ene_scuttler_139,
  "sharkman": ene_sharkman_140,
  "shrieker": ene_shrieker_141,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_142,
  "skeleton": ene_skeleton_143,
  "skeleton_warrior": ene_skeletonWarrior_144,
  "skeleton_watchman": ene_skeletonWatchman_145,
  "squib": ene_squib_146,
  "stitched_ogre": ene_stitchedOgre_147,
  "the_bone_collector": ene_theBoneCollector_148,
  "the_elder_squid": ene_theElderSquid_149,
  "the_executioner": ene_theExecutioner_150,
  "the_forest_guardian": ene_theForestGuardian_151,
  "the_great_fizzletrix": ene_theGreatFizzletrix_152,
  "the_hellfire_catapult": ene_theHellfireCatapult_153,
  "the_nameless_one": ene_theNamelessOne_154,
  "the_royal_ballista": ene_theRoyalBallista_155,
  "troll": ene_troll_156,
  "tundra_beast": ene_tundraBeast_157,
  "urzul_the_ascended": ene_urzulTheAscended_158,
  "vampire_lord": ene_vampireLord_159,
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

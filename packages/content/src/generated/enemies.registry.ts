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
import ene_armouredSatyr_8 from '../enemies/armouredSatyr';
import ene_assassinOfRitChi_9 from '../enemies/assassinOfRitChi';
import ene_avatarOfRitChi_10 from '../enemies/avatarOfRitChi';
import ene_basilisk_11 from '../enemies/basilisk';
import ene_bearClanCleric_12 from '../enemies/bearClanCleric';
import ene_bearClanElite_13 from '../enemies/bearClanElite';
import ene_bearClanHunter_14 from '../enemies/bearClanHunter';
import ene_bearClanMage_15 from '../enemies/bearClanMage';
import ene_bearClanOutrider_16 from '../enemies/bearClanOutrider';
import ene_bearClanRaider_17 from '../enemies/bearClanRaider';
import ene_bearClanRam_18 from '../enemies/bearClanRam';
import ene_beholder_19 from '../enemies/beholder';
import ene_berserker_20 from '../enemies/berserker';
import ene_bigBossGriff_21 from '../enemies/bigBossGriff';
import ene_bileDemon_22 from '../enemies/bileDemon';
import ene_binkusTheAllKnowing_23 from '../enemies/binkusTheAllKnowing';
import ene_bloater_24 from '../enemies/bloater';
import ene_bogWitch_25 from '../enemies/bogWitch';
import ene_boneGuard_26 from '../enemies/boneGuard';
import ene_boneHound_27 from '../enemies/boneHound';
import ene_bonelessBlob_28 from '../enemies/bonelessBlob';
import ene_brutalusTheDemonKing_29 from '../enemies/brutalusTheDemonKing';
import ene_brute_30 from '../enemies/brute';
import ene_bucketKnight_31 from '../enemies/bucketKnight';
import ene_carrionStalker_32 from '../enemies/carrionStalker';
import ene_cerberus_33 from '../enemies/cerberus';
import ene_chaosKnight_34 from '../enemies/chaosKnight';
import ene_chaosMauler_35 from '../enemies/chaosMauler';
import ene_chomper_36 from '../enemies/chomper';
import ene_cleavorOfTheTwilightClan_37 from '../enemies/cleavorOfTheTwilightClan';
import ene_colossalPiranhasaur_38 from '../enemies/colossalPiranhasaur';
import ene_crabomination_39 from '../enemies/crabomination';
import ene_crownPrinceThalanor_40 from '../enemies/crownPrinceThalanor';
import ene_cursedGuardian_41 from '../enemies/cursedGuardian';
import ene_cyclops_42 from '../enemies/cyclops';
import ene_dampHighPriestess_43 from '../enemies/dampHighPriestess';
import ene_darknessElemental_44 from '../enemies/darknessElemental';
import ene_deathKnight_45 from '../enemies/deathKnight';
import ene_deepbornHunter_46 from '../enemies/deepbornHunter';
import ene_deepbornMystic_47 from '../enemies/deepbornMystic';
import ene_deepbornRider_48 from '../enemies/deepbornRider';
import ene_deepbornWarrior_49 from '../enemies/deepbornWarrior';
import ene_devilspawn_50 from '../enemies/devilspawn';
import ene_dracolich_51 from '../enemies/dracolich';
import ene_dragonSlayerEric_52 from '../enemies/dragonSlayerEric';
import ene_drakusTheAwakened_53 from '../enemies/drakusTheAwakened';
import ene_dreadFatherNicolas_54 from '../enemies/dreadFatherNicolas';
import ene_dreadSerpent_55 from '../enemies/dreadSerpent';
import ene_dunzarakTheDeceived_56 from '../enemies/dunzarakTheDeceived';
import ene_earthElemental_57 from '../enemies/earthElemental';
import ene_elfCaptain_58 from '../enemies/elfCaptain';
import ene_elfKingsblade_59 from '../enemies/elfKingsblade';
import ene_elfKingsguard_60 from '../enemies/elfKingsguard';
import ene_elfNightsinger_61 from '../enemies/elfNightsinger';
import ene_elfRanger_62 from '../enemies/elfRanger';
import ene_elfScout_63 from '../enemies/elfScout';
import ene_elfSorceress_64 from '../enemies/elfSorceress';
import ene_elfSpearman_65 from '../enemies/elfSpearman';
import ene_fireBeetle_66 from '../enemies/fireBeetle';
import ene_fireDrake_67 from '../enemies/fireDrake';
import ene_fireElemental_68 from '../enemies/fireElemental';
import ene_fireSnake_69 from '../enemies/fireSnake';
import ene_flameShrieker_70 from '../enemies/flameShrieker';
import ene_footman_71 from '../enemies/footman';
import ene_forsakenBrotherMcinnes_72 from '../enemies/forsakenBrotherMcinnes';
import ene_ghoul_73 from '../enemies/ghoul';
import ene_giantYeti_74 from '../enemies/giantYeti';
import ene_glompling_75 from '../enemies/glompling';
import ene_gobbler_76 from '../enemies/gobbler';
import ene_goblinArcher_77 from '../enemies/goblinArcher';
import ene_goblinChieftainRotfang_78 from '../enemies/goblinChieftainRotfang';
import ene_goblinEngineer_79 from '../enemies/goblinEngineer';
import ene_goblinFanatic_80 from '../enemies/goblinFanatic';
import ene_goblinHero_81 from '../enemies/goblinHero';
import ene_goblinSeer_82 from '../enemies/goblinSeer';
import ene_goblinVanguard_83 from '../enemies/goblinVanguard';
import ene_goblinWitchDoctor_84 from '../enemies/goblinWitchDoctor';
import ene_goblinWorker_85 from '../enemies/goblinWorker';
import ene_golem_86 from '../enemies/golem';
import ene_gremlinCultist_87 from '../enemies/gremlinCultist';
import ene_greyhornTheCaged_88 from '../enemies/greyhornTheCaged';
import ene_grotesque_89 from '../enemies/grotesque';
import ene_guard_90 from '../enemies/guard';
import ene_guardCaptain_91 from '../enemies/guardCaptain';
import ene_halfOgre_92 from '../enemies/halfOgre';
import ene_hellGuard_93 from '../enemies/hellGuard';
import ene_highExecutionerGrimhook_94 from '../enemies/highExecutionerGrimhook';
import ene_hobgoblin_95 from '../enemies/hobgoblin';
import ene_hydraOfTheDeep_96 from '../enemies/hydraOfTheDeep';
import ene_iceElemental_97 from '../enemies/iceElemental';
import ene_imp_98 from '../enemies/imp';
import ene_jarlAlfredBlondbeard_99 from '../enemies/jarlAlfredBlondbeard';
import ene_knight_100 from '../enemies/knight';
import ene_livingCorpse_101 from '../enemies/livingCorpse';
import ene_livingFlame_102 from '../enemies/livingFlame';
import ene_livingMold_103 from '../enemies/livingMold';
import ene_lostProtector_104 from '../enemies/lostProtector';
import ene_lurker_105 from '../enemies/lurker';
import ene_madGenie_106 from '../enemies/madGenie';
import ene_magicSentry_107 from '../enemies/magicSentry';
import ene_magmaElemental_108 from '../enemies/magmaElemental';
import ene_magog_109 from '../enemies/magog';
import ene_manaBug_110 from '../enemies/manaBug';
import ene_manticore_111 from '../enemies/manticore';
import ene_marshBuilder_112 from '../enemies/marshBuilder';
import ene_marshDweller_113 from '../enemies/marshDweller';
import ene_mindWarper_114 from '../enemies/mindWarper';
import ene_mireHound_115 from '../enemies/mireHound';
import ene_monk_116 from '../enemies/monk';
import ene_mountainWolf_117 from '../enemies/mountainWolf';
import ene_mountedRatman_118 from '../enemies/mountedRatman';
import ene_munchling_119 from '../enemies/munchling';
import ene_natureElemental_120 from '../enemies/natureElemental';
import ene_necromental_121 from '../enemies/necromental';
import ene_nightReaver_122 from '../enemies/nightReaver';
import ene_norcMercenary_123 from '../enemies/norcMercenary';
import ene_ogmunstaAcolyte_124 from '../enemies/ogmunstaAcolyte';
import ene_ogmunstasChampion_125 from '../enemies/ogmunstasChampion';
import ene_ogreGladiator_126 from '../enemies/ogreGladiator';
import ene_ogreWarden_127 from '../enemies/ogreWarden';
import ene_orcCatapult_128 from '../enemies/orcCatapult';
import ene_orcGrunt_129 from '../enemies/orcGrunt';
import ene_orcShaman_130 from '../enemies/orcShaman';
import ene_orcSoldier_131 from '../enemies/orcSoldier';
import ene_orcTracker_132 from '../enemies/orcTracker';
import ene_orcWarchiefZog_133 from '../enemies/orcWarchiefZog';
import ene_orcWardog_134 from '../enemies/orcWardog';
import ene_orcWarlock_135 from '../enemies/orcWarlock';
import ene_outlander_136 from '../enemies/outlander';
import ene_peon_137 from '../enemies/peon';
import ene_piranhasaur_138 from '../enemies/piranhasaur';
import ene_pitFiendYagamon_139 from '../enemies/pitFiendYagamon';
import ene_powerElemental_140 from '../enemies/powerElemental';
import ene_priestOfOgmunsta_141 from '../enemies/priestOfOgmunsta';
import ene_pygmy_142 from '../enemies/pygmy';
import ene_quasit_143 from '../enemies/quasit';
import ene_ratOgre_149 from '../enemies/ratOgre';
import ene_ratmanArcher_144 from '../enemies/ratmanArcher';
import ene_ratmanChampion_145 from '../enemies/ratmanChampion';
import ene_ratmanShaman_146 from '../enemies/ratmanShaman';
import ene_ratmanSlave_147 from '../enemies/ratmanSlave';
import ene_ratmanWarlock_148 from '../enemies/ratmanWarlock';
import ene_runtling_150 from '../enemies/runtling';
import ene_savageYeti_151 from '../enemies/savageYeti';
import ene_scuttler_152 from '../enemies/scuttler';
import ene_sharkman_153 from '../enemies/sharkman';
import ene_shrieker_154 from '../enemies/shrieker';
import ene_sirMichaelTheConceder_155 from '../enemies/sirMichaelTheConceder';
import ene_skeleton_156 from '../enemies/skeleton';
import ene_skeletonWarrior_157 from '../enemies/skeletonWarrior';
import ene_skeletonWatchman_158 from '../enemies/skeletonWatchman';
import ene_squib_159 from '../enemies/squib';
import ene_stitchedOgre_160 from '../enemies/stitchedOgre';
import ene_styxTheCragrunner_161 from '../enemies/styxTheCragrunner';
import ene_succubus_162 from '../enemies/succubus';
import ene_theBoneCollector_163 from '../enemies/theBoneCollector';
import ene_theElderSquid_164 from '../enemies/theElderSquid';
import ene_theExecutioner_165 from '../enemies/theExecutioner';
import ene_theForestGuardian_166 from '../enemies/theForestGuardian';
import ene_theGreatFizzletrix_167 from '../enemies/theGreatFizzletrix';
import ene_theHellfireCatapult_168 from '../enemies/theHellfireCatapult';
import ene_theInfernalHorseman_169 from '../enemies/theInfernalHorseman';
import ene_theNamelessOne_170 from '../enemies/theNamelessOne';
import ene_theOverseer_171 from '../enemies/theOverseer';
import ene_theRoyalBallista_172 from '../enemies/theRoyalBallista';
import ene_troll_173 from '../enemies/troll';
import ene_tropicalShrieker_174 from '../enemies/tropicalShrieker';
import ene_tundraBeast_175 from '../enemies/tundraBeast';
import ene_urzulTheAscended_176 from '../enemies/urzulTheAscended';
import ene_vampireLord_177 from '../enemies/vampireLord';
import ene_vhorakAndTheObliterator_178 from '../enemies/vhorakAndTheObliterator';
import ene_vilespawn_179 from '../enemies/vilespawn';
import ene_voidCreeper_180 from '../enemies/voidCreeper';
import ene_voidHorror_181 from '../enemies/voidHorror';
import ene_wanderingFiend_182 from '../enemies/wanderingFiend';
import ene_waterElemental_183 from '../enemies/waterElemental';
import ene_werewolf_184 from '../enemies/werewolf';
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

const rawEnemies = [ene_abomination_0, ene_abyssArmour_1, ene_abyssRider_2, ene_aetherisTheDawnflame_3, ene_airElemental_4, ene_ancientWarlord_5, ene_ankhegQueen_6, ene_archmageVorath_7, ene_armouredSatyr_8, ene_assassinOfRitChi_9, ene_avatarOfRitChi_10, ene_basilisk_11, ene_bearClanCleric_12, ene_bearClanElite_13, ene_bearClanHunter_14, ene_bearClanMage_15, ene_bearClanOutrider_16, ene_bearClanRaider_17, ene_bearClanRam_18, ene_beholder_19, ene_berserker_20, ene_bigBossGriff_21, ene_bileDemon_22, ene_binkusTheAllKnowing_23, ene_bloater_24, ene_bogWitch_25, ene_boneGuard_26, ene_boneHound_27, ene_bonelessBlob_28, ene_brutalusTheDemonKing_29, ene_brute_30, ene_bucketKnight_31, ene_carrionStalker_32, ene_cerberus_33, ene_chaosKnight_34, ene_chaosMauler_35, ene_chomper_36, ene_cleavorOfTheTwilightClan_37, ene_colossalPiranhasaur_38, ene_crabomination_39, ene_crownPrinceThalanor_40, ene_cursedGuardian_41, ene_cyclops_42, ene_dampHighPriestess_43, ene_darknessElemental_44, ene_deathKnight_45, ene_deepbornHunter_46, ene_deepbornMystic_47, ene_deepbornRider_48, ene_deepbornWarrior_49, ene_devilspawn_50, ene_dracolich_51, ene_dragonSlayerEric_52, ene_drakusTheAwakened_53, ene_dreadFatherNicolas_54, ene_dreadSerpent_55, ene_dunzarakTheDeceived_56, ene_earthElemental_57, ene_elfCaptain_58, ene_elfKingsblade_59, ene_elfKingsguard_60, ene_elfNightsinger_61, ene_elfRanger_62, ene_elfScout_63, ene_elfSorceress_64, ene_elfSpearman_65, ene_fireBeetle_66, ene_fireDrake_67, ene_fireElemental_68, ene_fireSnake_69, ene_flameShrieker_70, ene_footman_71, ene_forsakenBrotherMcinnes_72, ene_ghoul_73, ene_giantYeti_74, ene_glompling_75, ene_gobbler_76, ene_goblinArcher_77, ene_goblinChieftainRotfang_78, ene_goblinEngineer_79, ene_goblinFanatic_80, ene_goblinHero_81, ene_goblinSeer_82, ene_goblinVanguard_83, ene_goblinWitchDoctor_84, ene_goblinWorker_85, ene_golem_86, ene_gremlinCultist_87, ene_greyhornTheCaged_88, ene_grotesque_89, ene_guard_90, ene_guardCaptain_91, ene_halfOgre_92, ene_hellGuard_93, ene_highExecutionerGrimhook_94, ene_hobgoblin_95, ene_hydraOfTheDeep_96, ene_iceElemental_97, ene_imp_98, ene_jarlAlfredBlondbeard_99, ene_knight_100, ene_livingCorpse_101, ene_livingFlame_102, ene_livingMold_103, ene_lostProtector_104, ene_lurker_105, ene_madGenie_106, ene_magicSentry_107, ene_magmaElemental_108, ene_magog_109, ene_manaBug_110, ene_manticore_111, ene_marshBuilder_112, ene_marshDweller_113, ene_mindWarper_114, ene_mireHound_115, ene_monk_116, ene_mountainWolf_117, ene_mountedRatman_118, ene_munchling_119, ene_natureElemental_120, ene_necromental_121, ene_nightReaver_122, ene_norcMercenary_123, ene_ogmunstaAcolyte_124, ene_ogmunstasChampion_125, ene_ogreGladiator_126, ene_ogreWarden_127, ene_orcCatapult_128, ene_orcGrunt_129, ene_orcShaman_130, ene_orcSoldier_131, ene_orcTracker_132, ene_orcWarchiefZog_133, ene_orcWardog_134, ene_orcWarlock_135, ene_outlander_136, ene_peon_137, ene_piranhasaur_138, ene_pitFiendYagamon_139, ene_powerElemental_140, ene_priestOfOgmunsta_141, ene_pygmy_142, ene_quasit_143, ene_ratOgre_149, ene_ratmanArcher_144, ene_ratmanChampion_145, ene_ratmanShaman_146, ene_ratmanSlave_147, ene_ratmanWarlock_148, ene_runtling_150, ene_savageYeti_151, ene_scuttler_152, ene_sharkman_153, ene_shrieker_154, ene_sirMichaelTheConceder_155, ene_skeleton_156, ene_skeletonWarrior_157, ene_skeletonWatchman_158, ene_squib_159, ene_stitchedOgre_160, ene_styxTheCragrunner_161, ene_succubus_162, ene_theBoneCollector_163, ene_theElderSquid_164, ene_theExecutioner_165, ene_theForestGuardian_166, ene_theGreatFizzletrix_167, ene_theHellfireCatapult_168, ene_theInfernalHorseman_169, ene_theNamelessOne_170, ene_theOverseer_171, ene_theRoyalBallista_172, ene_troll_173, ene_tropicalShrieker_174, ene_tundraBeast_175, ene_urzulTheAscended_176, ene_vampireLord_177, ene_vhorakAndTheObliterator_178, ene_vilespawn_179, ene_voidCreeper_180, ene_voidHorror_181, ene_wanderingFiend_182, ene_waterElemental_183, ene_werewolf_184, ene_wight_185, ene_wingedNightmare_186, ene_wizard_187, ene_worg_188, ene_wraithLordMalakar_189, ene_wretch_190] satisfies readonly EnemyDefinition[];

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
  "armoured_satyr": ene_armouredSatyr_8,
  "assassin_of_rit_chi": ene_assassinOfRitChi_9,
  "avatar_of_rit_chi": ene_avatarOfRitChi_10,
  "basilisk": ene_basilisk_11,
  "bear_clan_cleric": ene_bearClanCleric_12,
  "bear_clan_elite": ene_bearClanElite_13,
  "bear_clan_hunter": ene_bearClanHunter_14,
  "bear_clan_mage": ene_bearClanMage_15,
  "bear_clan_outrider": ene_bearClanOutrider_16,
  "bear_clan_raider": ene_bearClanRaider_17,
  "bear_clan_ram": ene_bearClanRam_18,
  "beholder": ene_beholder_19,
  "berserker": ene_berserker_20,
  "big_boss_griff": ene_bigBossGriff_21,
  "bile_demon": ene_bileDemon_22,
  "binkus_the_all_knowing": ene_binkusTheAllKnowing_23,
  "bloater": ene_bloater_24,
  "bog_witch": ene_bogWitch_25,
  "bone_guard": ene_boneGuard_26,
  "bone_hound": ene_boneHound_27,
  "boneless_blob": ene_bonelessBlob_28,
  "brutalus_the_demon_king": ene_brutalusTheDemonKing_29,
  "brute": ene_brute_30,
  "bucket_knight": ene_bucketKnight_31,
  "carrion_stalker": ene_carrionStalker_32,
  "cerberus": ene_cerberus_33,
  "chaos_knight": ene_chaosKnight_34,
  "chaos_mauler": ene_chaosMauler_35,
  "chomper": ene_chomper_36,
  "cleavor_of_the_twilight_clan": ene_cleavorOfTheTwilightClan_37,
  "colossal_piranhasaur": ene_colossalPiranhasaur_38,
  "crabomination": ene_crabomination_39,
  "crown_prince_thalanor": ene_crownPrinceThalanor_40,
  "cursed_guardian": ene_cursedGuardian_41,
  "cyclops": ene_cyclops_42,
  "damp_high_priestess": ene_dampHighPriestess_43,
  "darkness_elemental": ene_darknessElemental_44,
  "death_knight": ene_deathKnight_45,
  "deepborn_hunter": ene_deepbornHunter_46,
  "deepborn_mystic": ene_deepbornMystic_47,
  "deepborn_rider": ene_deepbornRider_48,
  "deepborn_warrior": ene_deepbornWarrior_49,
  "devilspawn": ene_devilspawn_50,
  "dracolich": ene_dracolich_51,
  "dragon_slayer_eric": ene_dragonSlayerEric_52,
  "drakus_the_awakened": ene_drakusTheAwakened_53,
  "dread_father_nicolas": ene_dreadFatherNicolas_54,
  "dread_serpent": ene_dreadSerpent_55,
  "dunzarak_the_deceived": ene_dunzarakTheDeceived_56,
  "earth_elemental": ene_earthElemental_57,
  "elf_captain": ene_elfCaptain_58,
  "elf_kingsblade": ene_elfKingsblade_59,
  "elf_kingsguard": ene_elfKingsguard_60,
  "elf_nightsinger": ene_elfNightsinger_61,
  "elf_ranger": ene_elfRanger_62,
  "elf_scout": ene_elfScout_63,
  "elf_sorceress": ene_elfSorceress_64,
  "elf_spearman": ene_elfSpearman_65,
  "fire_beetle": ene_fireBeetle_66,
  "fire_drake": ene_fireDrake_67,
  "fire_elemental": ene_fireElemental_68,
  "fire_snake": ene_fireSnake_69,
  "flame_shrieker": ene_flameShrieker_70,
  "footman": ene_footman_71,
  "forsaken_brother_mcinnes": ene_forsakenBrotherMcinnes_72,
  "ghoul": ene_ghoul_73,
  "giant_yeti": ene_giantYeti_74,
  "glompling": ene_glompling_75,
  "gobbler": ene_gobbler_76,
  "goblin_archer": ene_goblinArcher_77,
  "goblin_chieftain_rotfang": ene_goblinChieftainRotfang_78,
  "goblin_engineer": ene_goblinEngineer_79,
  "goblin_fanatic": ene_goblinFanatic_80,
  "goblin_hero": ene_goblinHero_81,
  "goblin_seer": ene_goblinSeer_82,
  "goblin_vanguard": ene_goblinVanguard_83,
  "goblin_witch_doctor": ene_goblinWitchDoctor_84,
  "goblin_worker": ene_goblinWorker_85,
  "golem": ene_golem_86,
  "gremlin_cultist": ene_gremlinCultist_87,
  "greyhorn_the_caged": ene_greyhornTheCaged_88,
  "grotesque": ene_grotesque_89,
  "guard": ene_guard_90,
  "guard_captain": ene_guardCaptain_91,
  "half_ogre": ene_halfOgre_92,
  "hell_guard": ene_hellGuard_93,
  "high_executioner_grimhook": ene_highExecutionerGrimhook_94,
  "hobgoblin": ene_hobgoblin_95,
  "hydra_of_the_deep": ene_hydraOfTheDeep_96,
  "ice_elemental": ene_iceElemental_97,
  "imp": ene_imp_98,
  "jarl_alfred_blondbeard": ene_jarlAlfredBlondbeard_99,
  "knight": ene_knight_100,
  "living_corpse": ene_livingCorpse_101,
  "living_flame": ene_livingFlame_102,
  "living_mold": ene_livingMold_103,
  "lost_protector": ene_lostProtector_104,
  "lurker": ene_lurker_105,
  "mad_genie": ene_madGenie_106,
  "magic_sentry": ene_magicSentry_107,
  "magma_elemental": ene_magmaElemental_108,
  "magog": ene_magog_109,
  "mana_bug": ene_manaBug_110,
  "manticore": ene_manticore_111,
  "marsh_builder": ene_marshBuilder_112,
  "marsh_dweller": ene_marshDweller_113,
  "mind_warper": ene_mindWarper_114,
  "mire_hound": ene_mireHound_115,
  "monk": ene_monk_116,
  "mountain_wolf": ene_mountainWolf_117,
  "mounted_ratman": ene_mountedRatman_118,
  "munchling": ene_munchling_119,
  "nature_elemental": ene_natureElemental_120,
  "necromental": ene_necromental_121,
  "night_reaver": ene_nightReaver_122,
  "norc_mercenary": ene_norcMercenary_123,
  "ogmunsta_acolyte": ene_ogmunstaAcolyte_124,
  "ogmunstas_champion": ene_ogmunstasChampion_125,
  "ogre_gladiator": ene_ogreGladiator_126,
  "ogre_warden": ene_ogreWarden_127,
  "orc_catapult": ene_orcCatapult_128,
  "orc_grunt": ene_orcGrunt_129,
  "orc_shaman": ene_orcShaman_130,
  "orc_soldier": ene_orcSoldier_131,
  "orc_tracker": ene_orcTracker_132,
  "orc_warchief_zog": ene_orcWarchiefZog_133,
  "orc_wardog": ene_orcWardog_134,
  "orc_warlock": ene_orcWarlock_135,
  "outlander": ene_outlander_136,
  "peon": ene_peon_137,
  "piranhasaur": ene_piranhasaur_138,
  "pit_fiend_yagamon": ene_pitFiendYagamon_139,
  "power_elemental": ene_powerElemental_140,
  "priest_of_ogmunsta": ene_priestOfOgmunsta_141,
  "pygmy": ene_pygmy_142,
  "quasit": ene_quasit_143,
  "rat_ogre": ene_ratOgre_149,
  "ratman_archer": ene_ratmanArcher_144,
  "ratman_champion": ene_ratmanChampion_145,
  "ratman_shaman": ene_ratmanShaman_146,
  "ratman_slave": ene_ratmanSlave_147,
  "ratman_warlock": ene_ratmanWarlock_148,
  "runtling": ene_runtling_150,
  "savage_yeti": ene_savageYeti_151,
  "scuttler": ene_scuttler_152,
  "sharkman": ene_sharkman_153,
  "shrieker": ene_shrieker_154,
  "sir_michael_the_conceder": ene_sirMichaelTheConceder_155,
  "skeleton": ene_skeleton_156,
  "skeleton_warrior": ene_skeletonWarrior_157,
  "skeleton_watchman": ene_skeletonWatchman_158,
  "squib": ene_squib_159,
  "stitched_ogre": ene_stitchedOgre_160,
  "styx_the_cragrunner": ene_styxTheCragrunner_161,
  "succubus": ene_succubus_162,
  "the_bone_collector": ene_theBoneCollector_163,
  "the_elder_squid": ene_theElderSquid_164,
  "the_executioner": ene_theExecutioner_165,
  "the_forest_guardian": ene_theForestGuardian_166,
  "the_great_fizzletrix": ene_theGreatFizzletrix_167,
  "the_hellfire_catapult": ene_theHellfireCatapult_168,
  "the_infernal_horseman": ene_theInfernalHorseman_169,
  "the_nameless_one": ene_theNamelessOne_170,
  "the_overseer": ene_theOverseer_171,
  "the_royal_ballista": ene_theRoyalBallista_172,
  "troll": ene_troll_173,
  "tropical_shrieker": ene_tropicalShrieker_174,
  "tundra_beast": ene_tundraBeast_175,
  "urzul_the_ascended": ene_urzulTheAscended_176,
  "vampire_lord": ene_vampireLord_177,
  "vhorak_and_the_obliterator": ene_vhorakAndTheObliterator_178,
  "vilespawn": ene_vilespawn_179,
  "void_creeper": ene_voidCreeper_180,
  "void_horror": ene_voidHorror_181,
  "wandering_fiend": ene_wanderingFiend_182,
  "water_elemental": ene_waterElemental_183,
  "werewolf": ene_werewolf_184,
  "wight": ene_wight_185,
  "winged_nightmare": ene_wingedNightmare_186,
  "wizard": ene_wizard_187,
  "worg": ene_worg_188,
  "wraith_lord_malakar": ene_wraithLordMalakar_189,
  "wretch": ene_wretch_190,
} satisfies Record<EnemyId, EnemyDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ENEMIES_BY_ID = rawEnemiesById as Record<EnemyId, Enemy>;

const starts = [
	"ael",
	"ar",
	"bel",
	"bryn",
	"cael",
	"cal",
	"daer",
	"dran",
	"elar",
	"fael",
	"gal",
	"hal",
	"kael",
	"kor",
	"lor",
	"maer",
	"nyr",
	"or",
	"rael",
	"ryn",
	"sael",
	"ser",
	"thal",
	"tor",
	"vael",
	"var",
	"wyn",
	"zor",
] as const;

const middles = [
	"a",
	"ae",
	"an",
	"ar",
	"el",
	"en",
	"ia",
	"il",
	"in",
	"ir",
	"ol",
	"on",
	"or",
	"ra",
	"ri",
	"ul",
] as const;

const endings = [
	"dan",
	"dir",
	"dor",
	"drin",
	"fin",
	"ion",
	"is",
	"lan",
	"len",
	"lin",
	"lor",
	"mir",
	"mon",
	"neth",
	"nor",
	"ran",
	"ren",
	"ric",
	"riel",
	"rin",
	"ron",
	"rune",
	"sen",
	"sil",
	"tar",
	"than",
	"thas",
	"ven",
	"wyn",
	"zar",
] as const;

function pick<T>(options: readonly T[]): T {
	return options[Math.floor(Math.random() * options.length)]!;
}

function capitalizeName(heroName: string): string {
	return `${heroName.charAt(0).toUpperCase()}${heroName.slice(1)}`;
}

export function generateHeroName(): string {
	const start = pick(starts);
	const middle = pick(middles);
	const ending = pick(endings);

	if (Math.random() < 0.35) {
		return capitalizeName(`${start}${ending}`);
	}

	return capitalizeName(`${start}${middle}${ending}`);
}

export type Section = "makkah" | "madinah";

export interface RawTrack {
    id: number;
    surah_id: number;
    surah_name: string;
    audio_url: string;
    [key: string]: unknown;
}

export interface EnrichedTrack extends RawTrack {
    year: number;
    section: Section;
}

// Base URL for QuranicAudio recordings
const BASE_URL = "https://download.quranicaudio.com/quran";

// Path pattern for taraweeh recordings
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SECTION_PATHS: Record<Section, string> = {
    makkah: "makkah_",  // followed by year like makkah_1426
    madinah: "madinah_", // followed by year like madinah_1426
};

// Years range for taraweeh recordings (1426-1442)
const YEARS = Array.from({ length: 17 }, (_, i) => 1426 + i);

// Surah names in English
const SURAH_NAMES = [
    "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah",
    "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
    "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr",
    "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Taha",
    "Al-Anbya", "Al-Haj", "Al-Mu'minun", "An-Nur", "Al-Furqan",
    "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-'Ankabut", "Ar-Rum",
    "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir",
    "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
    "Fussilat", "Ash-Shuraa", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah",
    "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
    "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman",
    "Al-Waqi'ah", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahanah",
    "As-Saf", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq",
    "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
    "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah",
    "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "'Abasa",
    "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj",
    "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad",
    "Ash-Shams", "Al-Layl", "Ad-Duhaa", "Ash-Sharh", "At-Tin",
    "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat",
    "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil",
    "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr",
    "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

/**
 * Generate audio URL for a surah recording
 */
function generateAudioUrl(section: Section, year: number, surahId: number): string {
    // Format surah ID to 3 digits (e.g., 1 -> 001)
    const formattedSurahId = surahId.toString().padStart(3, '0');

    // Try a different URL structure that matches QuranicAudio's actual structure
    // Format: https://download.quranicaudio.com/quran/makkah_taraweeh_1431/001.mp3
    return `${BASE_URL}/${section}_taraweeh_${year}/${formattedSurahId}.mp3`;
}

/**
 * Creates tracks for a specific section and year
 */
function createTracksForYear(section: Section, year: number): EnrichedTrack[] {
    // For each surah (1-114), create a track
    return Array.from({ length: 114 }, (_, i) => {
        const surahId = i + 1;
        return {
            id: surahId + (year - 1426) * 114 + (section === "makkah" ? 0 : 114 * 17),
            surah_id: surahId,
            surah_name: SURAH_NAMES[i],
            audio_url: generateAudioUrl(section, year, surahId),
            year,
            section,
        };
    });
}

/**
 * Fetches all taraweeh tracks directly by constructing URLs
 * This doesn't rely on the QuranicAudio API which returns HTML
 */
export async function fetchAllTracks(): Promise<EnrichedTrack[]> {
    console.log("Generating taraweeh recording tracks...");

    const tracks: EnrichedTrack[] = [];

    // Generate tracks for all sections and years
    for (const section of ["makkah", "madinah"] as Section[]) {
        for (const year of YEARS) {
            const yearTracks = createTracksForYear(section, year);
            tracks.push(...yearTracks);
        }
    }

    console.log(`Generated ${tracks.length} tracks`);
    return tracks;
}

/** Group tracks by year & section */
export async function fetchTracksByYear() {
    const all = await fetchAllTracks();
    const map = new Map<string, EnrichedTrack[]>();
    for (const t of all) {
        const key = `${t.section}-${t.year}`;
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(t);
    }
    return map; // key like "makkah-1426"
} 
import { EnrichedTrack, Section } from "../quranicaudio";

// Generate a set of mock tracks for the demo app
export function generateMockTracks(): EnrichedTrack[] {
    const sections: Section[] = ["makkah", "madinah"];
    const years = Array.from({ length: 17 }, (_, i) => 1426 + i); // 1426-1442
    const tracks: EnrichedTrack[] = [];

    // For each section and year, generate 20-30 tracks (1 per night of Ramadan)
    for (const section of sections) {
        for (const year of years) {
            const nightCount = Math.floor(Math.random() * 10) + 20; // 20-30 nights

            for (let night = 1; night <= nightCount; night++) {
                const surahId = Math.floor(Math.random() * 114) + 1; // 1-114 surahs

                tracks.push({
                    id: tracks.length + 1,
                    surah_id: surahId,
                    surah_name: `Surah ${getSurahName(surahId)}`,
                    audio_url: `https://example.com/audio/${section}/${year}/night${night}.mp3`,
                    year,
                    section,
                });
            }
        }
    }

    return tracks;
}

// Helper to generate surah names
function getSurahName(id: number): string {
    const surahs = [
        "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah",
        "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
        // ... simplified list
    ];

    return id <= surahs.length ? surahs[id - 1] : `Surah ${id}`;
} 
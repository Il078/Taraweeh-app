import { fetchTracksByYear } from "@/lib/quranicaudio";
import Link from "next/link";
import { notFound } from "next/navigation";
import AudioPlayer from "@/components/ui/AudioPlayer";
import DownloadButton from "@/components/ui/DownloadButton";

export const dynamic = "force-dynamic";

export default async function YearPage({ params }) {
    // Get the params in a proper async-safe way
    const section = String(params?.section || '');
    const year = String(params?.year || '');
    const yearNum = Number(year);

    // Validate params
    if (!section || !year || !["makkah", "madinah"].includes(section)) {
        console.error("Invalid section or year:", { section, year });
        notFound();
    }

    try {
        const map = await fetchTracksByYear();
        const key = `${section}-${yearNum}`;
        const tracks = map.get(key);

        if (!tracks || tracks.length === 0) {
            console.error("No tracks found for", key);
            notFound();
        }

        console.log(`Found ${tracks.length} tracks for ${section}-${yearNum}`);
        // Add a sample URL to debug
        console.log("Sample track URL:", tracks[0].audio_url);

        // Convert Hijri year to Gregorian (approximate)
        const gregorianYear = Math.floor(yearNum - 622 + (yearNum / 33));

        // Get the location full name
        const locationName = section === "makkah"
            ? "Makkah Al-Mukarramah"
            : "Madinah Al-Munawwarah";

        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 py-6">
                    <div className="bg-green-50 p-6 rounded-lg mb-6 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2 md:mb-0 capitalize">
                                {locationName}
                                <span className="mx-2">·</span>
                                <span className="text-green-700">{year} H</span>
                                <span className="text-sm text-green-600 ml-2">({gregorianYear} CE)</span>
                            </h1>

                            <Link
                                href="/"
                                className="inline-flex items-center text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-full transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <p className="text-green-700 mb-3 sm:mb-0">
                                <span className="font-semibold">{tracks.length}</span> surahs available
                            </p>
                            <DownloadButton />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tracks.map((t) => (
                            <div key={t.id} className="bg-white border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="bg-green-600 text-white py-2 px-4">
                                    <h3 className="font-medium">
                                        {t.surah_id}. {t.surah_name}
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <AudioPlayer
                                        audioUrl={t.audio_url}
                                        title={t.surah_name}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in YearPage:", error);
        throw error; // Let Next.js handle the error
    }
} 
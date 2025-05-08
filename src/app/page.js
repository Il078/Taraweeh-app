import Link from "next/link";
import { fetchTracksByYear } from "@/lib/quranicaudio";
import React from "react";

export const dynamic = "force-dynamic"; // always fetch on server during dev

const YEARS = Array.from({ length: 17 }, (_, i) => 1426 + i);
const SECTIONS = ["makkah", "madinah"];

// Convert Hijri year to Gregorian (approximate)
const hijriToGregorian = (hijriYear) => {
  return Math.floor(hijriYear - 622 + (hijriYear / 33));
};

export default async function Home() {
  // Prefetch track counts to show badge numbers
  let counts = {};
  try {
    const map = await fetchTracksByYear();
    for (const [key, arr] of map.entries()) counts[key] = arr.length;
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
            Taraweeh Recitations
          </h1>
          <p className="text-green-700 text-lg">Holy Quran recitations from the Two Sacred Mosques (1426-1442)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SECTIONS.map((section) => (
            <div key={section} className="rounded-lg overflow-hidden shadow-md bg-white">
              <div className="bg-green-700 text-white py-4 px-6">
                <h2 className="text-xl font-bold capitalize">
                  {section === "makkah" ? "Makkah Al-Mukarramah" : "Madinah Al-Munawwarah"}
                </h2>
              </div>

              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {YEARS.map((year) => {
                  const key = `${section}-${year}`;
                  const trackCount = counts[key] ?? 0;
                  const gregorianYear = hijriToGregorian(year);

                  return (
                    <Link
                      key={key}
                      href={`/${section}/${year}`}
                      className="bg-white hover:bg-green-50 border border-green-200 rounded-lg p-3 transition-all duration-200 transform hover:scale-105 hover:shadow-md flex flex-col items-center justify-center text-center"
                    >
                      <span className="text-lg font-semibold text-green-800">{year} H</span>
                      <span className="text-xs text-gray-500">({gregorianYear})</span>
                      {trackCount > 0 && (
                        <div className="mt-2 bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">
                          {trackCount} suwar
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 bg-green-50 rounded-lg text-center">
          <p className="text-green-700 text-sm">
            Select a year to listen to taraweeh recitations from the imams of the Two Sacred Mosques
          </p>
        </div>
      </div>
    </div>
  );
}

// Airtable Setup Script for Taraweeh App
// 1. Create a free Airtable account at https://airtable.com
// 2. Create a new base called "TaraweehApp"
// 3. Create API key at https://airtable.com/account
// 4. Add your API key and base ID below
// 5. Run: node airtable-setup.js

const API_KEY = 'YOUR_API_KEY';
const BASE_ID = 'YOUR_BASE_ID';

// Mock data generator similar to our app's mock
function generateMockTracks() {
    const sections = ["makkah", "madinah"];
    const years = Array.from({ length: 17 }, (_, i) => 1426 + i); // 1426-1442
    const tracks = [];

    const surahs = [
        "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah",
        "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
    ];

    // For each section and year, generate tracks
    for (const section of sections) {
        for (const year of years) {
            const nightCount = Math.floor(Math.random() * 10) + 20; // 20-30 nights

            for (let night = 1; night <= nightCount; night++) {
                const surahId = Math.floor(Math.random() * 10) + 1; // 1-10 surahs

                tracks.push({
                    fields: {
                        id: tracks.length + 1,
                        section: section,
                        year: year,
                        surah_id: surahId,
                        surah_name: surahs[surahId - 1] || `Surah ${surahId}`,
                        audio_url: `https://example.com/audio/${section}/${year}/night${night}.mp3`,
                        night: night
                    }
                });
            }
        }
    }

    return tracks;
}

async function setupAirtable() {
    console.log('Generating mock data...');
    const tracks = generateMockTracks();
    console.log(`Generated ${tracks.length} tracks`);

    // We'll split into batches of 10 for Airtable's API limits
    const BATCH_SIZE = 10;
    const batches = [];

    for (let i = 0; i < tracks.length; i += BATCH_SIZE) {
        batches.push(tracks.slice(i, i + BATCH_SIZE));
    }

    console.log(`Uploading in ${batches.length} batches...`);

    // For each batch, upload to Airtable
    try {
        // This part would use the Airtable API
        // Requires node-fetch or axios, example using fetch:
        // 
        // for (let i = 0; i < batches.length; i++) {
        //   console.log(`Uploading batch ${i+1}/${batches.length}`);
        //   await fetch(`https://api.airtable.com/v0/${BASE_ID}/tracks`, {
        //     method: 'POST',
        //     headers: {
        //       'Authorization': `Bearer ${API_KEY}`,
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       records: batches[i]
        //     })
        //   });
        // }

        console.log('To upload to Airtable:');
        console.log('1. Install dependencies: npm install airtable');
        console.log('2. Uncomment the code in this file');
        console.log('3. Add your API key and base ID');
        console.log('4. Run: node airtable-setup.js');

        // Also output the first batch as example
        console.log('\nSample data (first 2 records):');
        console.log(JSON.stringify(batches[0].slice(0, 2), null, 2));

    } catch (error) {
        console.error('Error uploading to Airtable:', error);
    }
}

setupAirtable(); 
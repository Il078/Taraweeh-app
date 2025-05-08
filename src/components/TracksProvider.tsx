"use client";

import { useEffect } from 'react';
import { useAudio } from '@/lib/AudioContext';

interface Track {
    id: number;
    surah_id: number;
    surah_name: string;
    audio_url: string;
    year?: number;
    section?: string;
}

export default function TracksProvider({ tracks }: { tracks: Track[] }) {
    const { setTracks } = useAudio();

    useEffect(() => {
        if (tracks && tracks.length > 0) {
            setTracks(tracks);
        }
    }, [tracks, setTracks]);

    // This is a utility component that doesn't render anything
    return null;
} 
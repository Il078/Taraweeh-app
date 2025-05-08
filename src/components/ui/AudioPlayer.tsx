"use client";

import React, { useState } from "react";
import { useAudio } from '@/lib/AudioContext';

interface AudioPlayerProps {
    audioUrl: string;
    title: string;
    id: number;
    surah_id: number;
    surah_name: string;
}

export default function AudioPlayer({ audioUrl, title, id, surah_id, surah_name }: AudioPlayerProps) {
    const { playTrack, currentTrack, isPlaying, pauseTrack } = useAudio();
    const [localPlaying, setLocalPlaying] = useState(false);

    // Track is currently playing if it matches the current track ID and is actually playing
    const isCurrentlyPlaying = currentTrack?.id === id && isPlaying;

    // We immediately reflect state changes locally for better UX
    const displayAsPlaying = isCurrentlyPlaying || (currentTrack?.id === id && localPlaying);

    // Handle play/pause button click
    const handleClick = () => {
        if (isCurrentlyPlaying) {
            // If already playing, pause it
            pauseTrack();
            setLocalPlaying(false);
        } else {
            // If not playing, update local state immediately
            setLocalPlaying(true);

            // Create the track object to play
            const track = {
                id,
                audio_url: audioUrl,
                surah_id,
                surah_name
            };

            // Play the track (will update global state when it actually starts playing)
            playTrack(track);
        }
    };

    // When the global playing state changes, update our local state
    React.useEffect(() => {
        if (currentTrack?.id === id) {
            setLocalPlaying(isPlaying);
        } else {
            setLocalPlaying(false);
        }
    }, [currentTrack, isPlaying, id]);

    return (
        <div className="w-full p-2">
            <button
                onClick={handleClick}
                className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors duration-200
                    ${displayAsPlaying
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : (isPlaying && currentTrack?.id !== id)
                            ? 'bg-gray-100 text-gray-400 cursor-wait'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                aria-label={displayAsPlaying ? "Pause" : "Play"}
            >
                {displayAsPlaying ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Pause</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span>{isPlaying && currentTrack?.id !== id ? 'Wait' : 'Play'}</span>
                    </>
                )}
            </button>
        </div>
    );
} 
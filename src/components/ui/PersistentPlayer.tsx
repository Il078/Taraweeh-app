"use client";

import React, { useEffect, useState } from 'react';
import { useAudio } from '@/lib/AudioContext';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function PersistentPlayer() {
    const {
        currentTrack,
        isPlaying,
        nextTrack,
        prevTrack,
        togglePlay
    } = useAudio();

    const [showPlayer, setShowPlayer] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);

    // Show player when a track is selected
    useEffect(() => {
        if (currentTrack) {
            setShowPlayer(true);

            // Mark player as ready after a short delay to allow for proper initialization
            const timer = setTimeout(() => {
                setPlayerReady(true);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [currentTrack]);

    // Don't render anything if no track is selected
    if (!showPlayer || !currentTrack) {
        return null;
    }

    // Handler for minimizing the player
    const handleClose = () => {
        setShowPlayer(false);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 shadow-lg z-50">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between mb-1">
                    <div className="text-green-800 font-medium truncate flex-1">
                        <span className="mr-2">{currentTrack.surah_id}.</span>
                        {currentTrack.surah_name}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={togglePlay}
                            className={`p-2 rounded-full ${isPlaying ? 'bg-green-100' : 'bg-green-600 text-white'}`}
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 p-2"
                            aria-label="Minimize player"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={prevTrack}
                        className="bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-full"
                        aria-label="Previous track"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="flex-1 max-w-xl">
                        <H5AudioPlayer
                            src={currentTrack.audio_url}
                            autoPlay={playerReady && isPlaying}
                            showJumpControls={true}
                            layout="horizontal"
                            showDownloadProgress
                            autoPlayAfterSrcChange={false}
                            onPlay={() => {
                                if (!isPlaying) togglePlay();
                            }}
                            onPause={() => {
                                if (isPlaying) togglePlay();
                            }}
                            className="persistent-player"
                        />
                    </div>

                    <button
                        onClick={nextTrack}
                        className="bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-full"
                        aria-label="Next track"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
} 
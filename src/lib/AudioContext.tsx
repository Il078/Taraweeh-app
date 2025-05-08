"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface Track {
    id: number;
    surah_id: number;
    surah_name: string;
    audio_url: string;
    year?: number;
    section?: string;
}

interface AudioContextType {
    currentTrack: Track | null;
    tracks: Track[];
    isPlaying: boolean;
    setCurrentTrack: (track: Track) => void;
    setTracks: (tracks: Track[]) => void;
    togglePlay: () => void;
    playTrack: (track: Track) => void;
    pauseTrack: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize the audio element only once when the component mounts
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const audio = new Audio();
        audioRef.current = audio;

        // Set up event listeners to keep state in sync with the audio element
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            // Try playing the next track when the current one ends
            setTimeout(() => {
                if (currentTrack && tracks.length > 0) {
                    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
                    if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
                        const nextTrack = tracks[currentIndex + 1];
                        playTrackInternal(nextTrack);
                    }
                }
            }, 500);
        });

        // Clean up when the component unmounts
        return () => {
            if (audio) {
                audio.pause();
                audio.src = '';
                audio.removeEventListener('play', () => setIsPlaying(true));
                audio.removeEventListener('pause', () => setIsPlaying(false));
                audio.removeEventListener('ended', () => setIsPlaying(false));
            }
        };
    }, []);

    // Try alternative URL format if initial URL fails
    const tryAlternativeUrl = (url: string): string => {
        if (!url) return '';

        try {
            // Clean the URL first (remove query params, hash)
            const cleanUrl = url.split('?')[0].split('#')[0];

            if (cleanUrl.includes('_taraweeh_')) {
                // Change from makkah_taraweeh_1431 to makkah_1431
                return cleanUrl.replace('_taraweeh_', '_');
            } else {
                // Try to insert _taraweeh_ before the year
                const parts = cleanUrl.split('/');
                const lastDir = parts[parts.length - 2];

                if (lastDir) {
                    const match = lastDir.match(/(makkah|madinah)_(\d{4})/);
                    if (match) {
                        const section = match[1];
                        const year = match[2];
                        const newDir = `${section}_taraweeh_${year}`;
                        parts[parts.length - 2] = newDir;
                        return parts.join('/');
                    }
                }
            }

            return cleanUrl;
        } catch (e) {
            console.error("Error creating alternative URL", e);
            return url;
        }
    };

    // Internal function to handle playing tracks
    const playTrackInternal = (track: Track, tryAlternative = false) => {
        if (!audioRef.current) return;

        // Update state immediately
        setCurrentTrack(track);

        // Use the alternative URL if we're trying the fallback
        const audioUrl = tryAlternative
            ? tryAlternativeUrl(track.audio_url)
            : track.audio_url;

        // Only change the source if it's different
        if (audioRef.current.src !== audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.load();
        }

        // Play the audio and handle any errors
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Error playing audio:", error);

                // Try alternative URL if primary URL fails and we haven't tried it yet
                if (!tryAlternative) {
                    const altUrl = tryAlternativeUrl(track.audio_url);
                    if (altUrl && altUrl !== track.audio_url) {
                        console.log("Trying alternative URL:", altUrl);
                        playTrackInternal(track, true);
                    } else {
                        setIsPlaying(false);
                    }
                } else {
                    setIsPlaying(false);
                }
            });
        }
    };

    // Public API functions exposed through context
    const playTrack = (track: Track) => {
        // If this track is already playing, just return
        if (currentTrack?.id === track.id && isPlaying) return;

        // If anything else is playing, stop it first
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
        }

        // Play the requested track
        playTrackInternal(track);
    };

    const pauseTrack = () => {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
        }
    };

    const togglePlay = () => {
        if (!currentTrack || !audioRef.current) return;

        if (audioRef.current.paused) {
            playTrackInternal(currentTrack);
        } else {
            audioRef.current.pause();
        }
    };

    const nextTrack = () => {
        if (!currentTrack || tracks.length === 0) return;

        const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
        if (currentIndex === -1 || currentIndex === tracks.length - 1) return;

        const nextTrack = tracks[currentIndex + 1];
        playTrackInternal(nextTrack);
    };

    const prevTrack = () => {
        if (!currentTrack || tracks.length === 0) return;

        const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
        if (currentIndex <= 0) return;

        const prevTrack = tracks[currentIndex - 1];
        playTrackInternal(prevTrack);
    };

    // Make useEffect dependent on currentTrack and tracks for auto-next functionality
    useEffect(() => {
        // This ensures that the ended event handler has access to the latest tracks and currentTrack
        if (!audioRef.current) return;

        const handleEnded = () => {
            setIsPlaying(false);
            // Auto play next track
            if (currentTrack && tracks.length > 0) {
                const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
                if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
                    const nextTrack = tracks[currentIndex + 1];
                    setTimeout(() => playTrackInternal(nextTrack), 500);
                }
            }
        };

        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [currentTrack, tracks]);

    const value = {
        currentTrack,
        tracks,
        isPlaying,
        setCurrentTrack,
        setTracks,
        togglePlay,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
} 
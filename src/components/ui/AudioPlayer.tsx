"use client";

import React, { useState } from "react";
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerProps {
    audioUrl: string;
    title: string;
}

export default function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
    const [error, setError] = useState<boolean>(false);
    const [alternativeURL, setAlternativeURL] = useState<string | null>(null);

    const handleError = () => {
        // If we already tried an alternative URL and it failed too
        if (alternativeURL) {
            setError(true);
            console.error("Failed to load audio from both URLs:", audioUrl, alternativeURL);
            return;
        }

        // Try creating an alternative URL format if the first one failed
        // Change from makkah_taraweeh_1431 to makkah_1431 or vice versa
        const newUrl = createAlternativeUrl(audioUrl);
        if (newUrl !== audioUrl) {
            console.log("Trying alternative URL format:", newUrl);
            setAlternativeURL(newUrl);
        } else {
            setError(true);
            console.error("Failed to load audio from URL:", audioUrl);
        }
    };

    // Try to create an alternative URL format if the first one fails
    const createAlternativeUrl = (url: string): string => {
        // If the URL is example.com (mock data), just return it
        if (url.includes('example.com')) return url;

        try {
            // Handle different URL patterns:
            // Pattern 1: https://download.quranicaudio.com/quran/makkah_taraweeh_1431/001.mp3
            // Pattern 2: https://download.quranicaudio.com/quran/makkah_1431/001.mp3
            if (url.includes('_taraweeh_')) {
                // Change from makkah_taraweeh_1431 to makkah_1431
                return url.replace('_taraweeh_', '_');
            } else {
                // Try to insert _taraweeh_ before the year
                const parts = url.split('/');
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
        } catch (e) {
            console.error("Error creating alternative URL:", e);
        }

        return url; // Return original URL if no transformation is possible
    };

    // In demo mode - show simplified UI with Play button
    if (audioUrl.includes('example.com')) {
        return (
            <div className="w-full rounded-md bg-green-50">
                <div className="mb-2 text-xs text-green-700 font-medium">{title}</div>
                <H5AudioPlayer
                    src={audioUrl}
                    header={`Track: ${title}`}
                    onPlay={() => alert('This is demo mode with mock data.\n\nIn production, this would stream actual Taraweeh recitations.')}
                    showJumpControls={false}
                    customAdditionalControls={[]}
                    layout="horizontal"
                    customProgressBarSection={[]}
                    autoPlay={false}
                    autoPlayAfterSrcChange={false}
                    showDownloadProgress={false}
                    className="custom-green-player"
                />
            </div>
        );
    }

    // When we've tried all URLs and failed, show error message
    if (error) {
        return (
            <div className="w-full rounded-md bg-red-50 p-3">
                <div className="mb-2 text-xs text-green-700 font-medium">{title}</div>
                <div className="text-red-500 p-3 text-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Unable to load audio. The recitation may not be available.
                </div>
            </div>
        );
    }

    // Real audio player for production
    return (
        <div className="w-full rounded-md bg-green-50">
            <div className="mb-2 text-xs text-green-700 font-medium">{title}</div>
            <H5AudioPlayer
                src={alternativeURL || audioUrl}
                header={`Track: ${title}`}
                showJumpControls={true}
                customAdditionalControls={[]}
                layout="horizontal"
                autoPlay={false}
                autoPlayAfterSrcChange={false}
                showDownloadProgress={true}
                className="custom-green-player"
                onError={handleError}
            />
        </div>
    );
} 
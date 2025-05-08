"use client";

import React, { useState, useEffect } from 'react';

export default function AddToHomePrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Only show in browsers that support the features
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIOSDevice);

        // Check if already installed (in standalone mode)
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        // Show prompt if iOS and not already installed
        // Also check if user has dismissed it before
        const promptDismissed = localStorage.getItem('pwaPromptDismissed');
        if (isIOSDevice && !isStandalone && !promptDismissed) {
            // Delay showing the prompt by 3 seconds
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setShowPrompt(false);
        // Remember that the user dismissed the prompt
        localStorage.setItem('pwaPromptDismissed', 'true');
    };

    if (!showPrompt || !isIOS || isStandalone) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-green-50 border-t border-green-200 shadow-lg">
            <div className="flex items-start justify-between">
                <div className="pr-4">
                    <h3 className="text-lg font-semibold text-green-800">Install this App</h3>
                    <p className="mt-1 text-sm text-green-600">
                        Add this app to your home screen for a better experience.
                    </p>
                    <div className="mt-2 text-sm text-green-600">
                        <p className="flex items-center">
                            <span className="mr-2">1.</span>
                            Tap the share icon
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </p>
                        <p className="flex items-center">
                            <span className="mr-2">2.</span>
                            Select "Add to Home Screen"
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
                    aria-label="Dismiss"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    onClick={handleDismiss}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Got it
                </button>
            </div>
        </div>
    );
} 
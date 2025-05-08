"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl md:text-2xl font-bold flex items-center">
                        <span className="mr-2">🌙</span>
                        <span>Taraweeh Recitations</span>
                    </Link>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    <nav className={`absolute left-0 right-0 top-14 bg-green-700 p-4 shadow-lg transition-all duration-300 ease-in-out md:static md:shadow-none md:p-0 md:flex md:items-center md:bg-transparent ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                        <ul className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
                            <li>
                                <Link
                                    href="/"
                                    className="text-white hover:text-green-200 transition duration-300 flex items-center space-x-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://quranicaudio.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-green-200 transition duration-300 flex items-center space-x-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                    <span>QuranicAudio.com</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
} 
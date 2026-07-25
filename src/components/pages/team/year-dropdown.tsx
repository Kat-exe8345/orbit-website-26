'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { geistMono } from '@/components/fonts/typography';

export default function YearDropdown({ Years, activeYear, setActiveYear }: { Years: { id: number; label: string }[], activeYear: number | null, setActiveYear: (year: number) => void }) {
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    return (
        <div className={`relative flex flex-1 justify-around items-center max-w-max h-full transition-all duration-300 ease-in-out`}>
                    <span className={`${geistMono.className} text-sm h-full font-medium text-black border-x bg-white border-x-[#000000] p-4`}>YEAR</span>
                    <div className="relative h-full">
                        <button
                            key="years"

                            className={`${geistMono.className} flex h-full justify-center items-center text-sm bg-white tracking-wide font-medium text-black p-4`}
                            onClick={() => setIsYearDropdownOpen((prev) => !prev)}
                        >
                            {Years.find((year) => year.id === activeYear)?.label}
                            <ChevronDown className={`ml-2 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                        </button>
                        {isYearDropdownOpen && (
                            <div
                                className={`absolute flex flex-col top-full left-0 w-full bg-white z-10 transition-all duration-300 ease-in-out border-y border-black`}
                            >
                                {Years.map((year) => (
                                    <span
                                        key={year.id}
                                        className={`${geistMono.className} text-sm tracking-wide font-medium text-black border-b border-black p-4 hover:bg-[#f0f0f0] cursor-pointer`}
                                        onClick={() => {
                                            setActiveYear(year.id);
                                            setIsYearDropdownOpen(false);
                                        }}
                                    >
                                        {year.label}
                                    </span>
                                ))}
                            </div>
                        )
                        }
                    </div>
                </div>
    )
}

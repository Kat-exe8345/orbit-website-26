import { Inter, Geist_Mono, Instrument_Serif, Playfair_Display, Geist } from "next/font/google"

export const inter = Inter({ subsets: ["latin"] })
export const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" })
export const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic" })
export const playfairDisplay = Playfair_Display({ subsets: ["latin"] })
export const geist = Geist({ subsets: ["latin"], display: "swap" })
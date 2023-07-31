"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from 'typewriter-effect'
import { Button } from "./ui/button"
import { Zap } from "lucide-react"

export const LandingHero = () => {
    const {isSignedIn} = useAuth()

    return (
        <div className="relative text-white font-bold py-28 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
                    The Best AI Tool for
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEC836] via-[#B193FC] to-[#00E9B0]">
                    <TypewriterComponent
                        options={{
                            strings:[
                                "Chatbot.",
                                "Photo Generation.",
                                "Code Generation.",
                                "Translation.",
                                "Social Media Generation"
                            
                            ],
                            autoStart: true,
                            loop: true
                        }}/>
                </div>
            </div>
            <p className="text-sm md:text-xl font-light text-zinc-400">
                Create content using AI 10x faster.
            </p>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
                    <Button variant='white' className="rounded-full">
                        Test Beta For Free
                        <Zap className="fill-[#FEC836] text-[#FEC836] ml-1"/>
                    </Button>
                </Link>
            </div>
            <p className="text-zinc-400 text-sm md:text-sm font-normal">
                No credit card required. 
            </p>
            <div className="custom-shape-divider-bottom-1690832433">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}
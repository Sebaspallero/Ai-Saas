"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from 'typewriter-effect'
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import Image from "next/image"

export const LandingHero = () => {
    const {isSignedIn} = useAuth()

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
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
                                "Code Generation."
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
                    <Button variant='premium' className="rounded-full">
                        Start Generating For Free
                        <Zap className="fill-[#FEC836] text-[#FEC836] ml-1"/>
                    </Button>
                </Link>
            </div>
            <p className="text-zinc-400 text-sm md:text-sm font-normal">
                No credit card required. 
            </p>
        </div>
    )
}
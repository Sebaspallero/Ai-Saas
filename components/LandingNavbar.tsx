"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { useAuth } from "@clerk/nextjs"
import { Badge } from "./ui/badge"


export const LandingNavbar = () => {

    const {isSignedIn} = useAuth()

    return(
        <nav className="p-4 md:px-12 flex items-center justify-between">
            <Link href='/' className="flex items-center">
                <div className="relative h-12 w-12 mr-4">
                    <Image
                        fill
                        alt="logo"
                        src='/logo-retibo.svg'/>
                </div>
                <div className="relative mr-2">
                    <Image
                        height={70}
                        width={120}
                        alt="logo"
                        src='/name-logo.svg'/>
                </div>
                <Badge className="text-xs py-1 text-white mb-6 mr-4" variant='outline'>
                    Beta
                </Badge>
            </Link >
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? '/dashboard' : "/sign-up"}>
                    <Button variant='outline' className="rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}
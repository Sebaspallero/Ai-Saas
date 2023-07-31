import LandingContent from "@/components/LandingContent"
import { LandingHero } from "@/components/LandingHero"
import { LandingNavbar } from "@/components/LandingNavbar"


const LandingPage = () => {
    return (
        <div className="h-full">
            <div className="bg-gradient-to-r from-[#8595e3] via-[#4e1e8c] to-[#2c0635]">
                <LandingNavbar/>
                <LandingHero/>
            </div>
            <LandingContent/>
        </div>
    )
}

export default LandingPage
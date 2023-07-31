import Heading from "@/components/Heading";
import {UserProfile} from "@clerk/nextjs";

import {Settings} from "lucide-react"

const SettingsPage = () => {
  return (
    <div className="md:pb-4 md:pl-4">
         <Heading
            title="Settings"
            description="Configure your profile"
            Icon={Settings}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
        />
        <div className="mb-8">
            <UserProfile/>
        </div>
    </div>
  )
}

export default SettingsPage
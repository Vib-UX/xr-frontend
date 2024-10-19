'use client'
import { NavbarComponent } from '@/components/Navbar'
import UserProfile from '@/components/ui/user-profile'

const ProfilePage = () => {
    return (
        <div>
            <NavbarComponent />
            <UserProfile />
        </div>
    )
}

export default ProfilePage
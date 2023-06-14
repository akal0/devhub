import React, { useEffect, useState } from 'react'
import SidebarLink from './SidebarLink'

import { MdWork, MdCode, MdStream, MdAccountCircle, MdNotifications, MdBookmark, MdInbox, MdOutlineLogout  } from "react-icons/md"
import SignedInLogo from '../logo/SignedInLogo'
import { auth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

const Sidebar = () => {

  const [username, setUsername] = useState("")
  const router = useRouter()

  const pathname = router.pathname.replace("/", "");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUsername(user.displayName)
      }
    })
  }, [onAuthStateChanged])

  return (
    <div className="hidden sm:flex flex-col h-full xl:items-start xl:w-[340px] fixed pt-6 pb-16 border-r border-zinc-700/[0.5] shadow-inner">

        <div className="flex items-center justify-center xl:ml-24">
          <SignedInLogo />
        </div>

        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <SidebarLink icon={<MdStream />} text="Stream" destination="/stream" pathname={pathname}/>
          <SidebarLink icon={<MdCode />} text="Articles" destination="#" pathname={pathname}/>
          <SidebarLink icon={<MdWork />} text="Opportunities" destination="#" pathname={pathname}/>
          <SidebarLink icon={<MdBookmark />} text="Saved" destination="#" pathname={pathname}/>
          <SidebarLink icon={<MdInbox />} text="Messages" destination="#" pathname={pathname}/>
          <SidebarLink icon={<MdNotifications />} text="Notifications" destination="#" pathname={pathname}/>
        </div>

        <div className="flex flex-col mt-4 space-y-2.5 mb-2.5 justify-end xl:ml-24 h-full">
          <SidebarLink icon={<MdAccountCircle />} text={username} destination="#" profile />
          <SidebarLink icon={<MdOutlineLogout />} text="Log out" destination="#" logout />
        </div>

    </div>
  )
}

export default Sidebar;
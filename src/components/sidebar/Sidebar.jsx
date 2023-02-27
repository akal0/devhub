import React from 'react'
import SidebarLink from './SidebarLink'

import { MdWork, MdCode, MdStream, MdAccountCircle, MdNotifications, MdBookmark, MdInbox, MdOutlineLogout  } from "react-icons/md"
import SignedInLogo from '../logo/SignedInLogo'

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col h-full xl:items-start xl:w-[340px] fixed pt-6 pb-16 border-r border-zinc-700/[0.5] shadow-inner">

        <div className="flex items-center justify-center xl:ml-24">
          <SignedInLogo />
        </div>

        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
          <SidebarLink icon={<MdStream />} text="Stream" destination="#" active/>
          <SidebarLink icon={<MdCode />} text="Articles" destination="#" />
          <SidebarLink icon={<MdWork />} text="Opportunities" destination="#" />
          <SidebarLink icon={<MdBookmark />} text="Saved" destination="#" />
          <SidebarLink icon={<MdInbox />} text="Messages" destination="#" />
          <SidebarLink icon={<MdNotifications />} text="Notifications" destination="#" />
          <SidebarLink icon={<MdAccountCircle />} text="Profile" destination="#" />
        </div>

        <div className="flex space-y-2.5 mt-4 mb-2.5 items-end xl:ml-24 h-full">
          <SidebarLink icon={<MdOutlineLogout />} text="Log out" destination="#" logout />
        </div>
    </div>
  )
}

export default Sidebar
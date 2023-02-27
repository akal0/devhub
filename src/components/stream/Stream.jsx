import React from 'react'
import { MdStream } from 'react-icons/md'
import Input from './Input'

const Stream = () => {
  return (
    <div className="flex-grow sm:ml-[52px] xl:ml-[340px] border-r border-zinc-700/[0.5] h-screen max-w-screen-xl">
        <div className="border-b border-zinc-700/[0.5] flex text-2xl items-center justify-between pr-12 sticky top-0 z-50 py-10">
            <h1 className="pl-12 text-xl"> Your <span className="text-[#6C63ff]">Stream</span> </h1>
            <MdStream />
        </div>

        <Input />
    </div>
  )
}

export default Stream
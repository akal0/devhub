import React, { useEffect, useState } from 'react'
import { MdStream } from 'react-icons/md'
import Input from './Input'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import Post from './Post'

const Stream = () => {

  const [posts, setPosts] = useState([])

  useEffect(
    () => 
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
          (snapshot) => {
            setPosts(snapshot.docs)
          }
      ), [db]
  ); 

  return (
    <div className="flex-grow sm:ml-[52px] xl:ml-[340px] border-r border-zinc-700/[0.5] h-full max-w-screen">

        {/* Header section of the Stream page */}

        <div className="bg-zinc-900 border-b border-zinc-700/[0.5] flex text-2xl items-center justify-between pr-24 sticky top-0 z-50 py-10">
            <h1 className="pl-12 text-xl"> Your <span className="text-[#6C63ff]">Stream</span> </h1>
            <MdStream />
        </div>

        {/* Where the user can create their posts */}

        <Input />

        {/* Where all posts are displayed after being retrieved */}

        <div className="pb-16 pr-[4rem]">
          {posts.map(post => (
            <Post key={post.id} id={post.id} post={post.data()} />
          ))}
        </div>

    </div>
  )
}

export default Stream
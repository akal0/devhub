import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/router';

import { IoMdHeartDislike } from "react-icons/io"
import { MdOutlineFavorite, MdOutlineForum, MdDeleteOutline, MdDelete } from "react-icons/md"

import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

import Moment from 'react-moment';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalState, postIdState, commentIdState } from '@/atoms/modalAtom';

import useNotifStore from "@/store/useNotifStore";

const Post = ({ id, post, page }) => {

    // Role

    const [role, setRole] = useState([])

    // Comments

    const [comments, setComments] = useState([])

    // Modal

    const [isOpen, setIsOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)

    // Likes

    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)

    // Dislikes

    const [dislikes, setDislikes] = useState([])
    const [disliked, setDisliked] = useState(false)


    // Notif system

    const { setNotif, message } = useNotifStore();

    // Router

    const router = useRouter();

    const likePost = async () => {

      if (liked) {
        await deleteDoc(doc(db, "posts", id, "likes", auth.currentUser.uid))
      } else {

        // Add your like to the DB
        await setDoc(doc(db, "posts", id, "likes", auth.currentUser.uid), {
          username: auth.currentUser.displayName
        })

        // If you've disliked, it takes that away as well!

        await deleteDoc(doc(db, "posts", id, "dislikes", auth.currentUser.uid))

      }

    }

    const dislikePost = async () => {

      if (disliked) {
        await deleteDoc(doc(db, "posts", id, "dislikes", auth.currentUser.uid))
      } else {

        // Add your dislike
        await setDoc(doc(db, "posts", id, "dislikes", auth.currentUser.uid), {
          username: auth.currentUser.displayName
        })

        await deleteDoc(doc(db, "posts", id, "likes", auth.currentUser.uid))
      }

    }

    // Likes

    useEffect(() => {

      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
          setLikes(snapshot.docs)
        )
      
      setLiked(likes.findIndex((like) => like.id === auth?.currentUser?.uid) !== -1)

    }, [db, id, likes])

    // Dislikes

    useEffect(() => {

      onSnapshot(collection(db, "posts", id, "dislikes"), (snapshot) => 
        setDislikes(snapshot.docs)
      )
      
      setDisliked(dislikes.findIndex((dislike) => dislike.id === auth?.currentUser?.uid) !== -1)
  
    }, [db, id, dislikes])

    // Comments

    useEffect(() =>

      onSnapshot(
        query(
          collection(db, "posts", id, "comments"), 
          orderBy("timestamp", "desc"), 
        ),
        (snapshot) => setComments(snapshot.docs)
      )
      
    , [db])

  return (
    <div className="bg-[#1e1e22] rounded-sm pt-6 pb-8 m-8 flex flex-col gap-6 border-b-2 border-[#6C63FF] cursor-pointer hover:bg-[#1c1c1f] transition-all" onClick={() => router.push(`/post/${id}`)}>
            <header className="flex justify-between pr-12 items-end">
                <div className="px-10 flex items-center gap-4">
                  <Image
                    src="/guts.png"
                    height={75}
                    width={75}
                    className="rounded-full px-2 py-2"
                    alt="Profile pic"
                  />

                  <info className="flex flex-col gap-2">
                    <h1 className="text-sm"> { post?.username } </h1>
                    <p className="text-xs text-red-600"> {role} </p>
                  </info>
                </div>

                <p className="text-gray-400 text-xs pb-5 flex flex-col gap-2">
                  <Moment date={post?.timestamp?.toDate()} fromNow />
                </p>
              </header>

              <content className="border-l-2 space-y-4 border-[#6C63FF] px-16">
                <p className="line-clamp-2">
                  {post?.text}
                </p>

                <div>
                <img src={post?.image} alt="" className="rounded-lg max-h-[500px] object-cover" />
              </div>
              </content>
              
              {/* Post Footer */}

              <footer className="px-12 flex flex-wrap gap-6 justify-between items-center mt-4">
                <div className="flex gap-4 text-xs">

                  {/* Liking the post */}
                  
                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group" onClick={(e) => {
                    e.stopPropagation();
                    likePost();
                  }}>

                    <span>
                      {liked ? (
                          <MdOutlineFavorite className="text-[#6C63FF] transition-all text-sm" />
                        ) : (
                          <MdOutlineFavorite className="text-zinc-500 group-hover:text-[#6C63FF] transition-all text-sm" />
                        )}
                    </span>
                    <span className="text-zinc-400 group-hover:text-white transition-all"> {likes.length > 0 ? likes.length : "0"} </span>
                  </p>

                  {/* Disliking the post */}

                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group" onClick={(e) => {
                    e.stopPropagation();
                    dislikePost();
                  }}>

                    <span>
                      {disliked ? (
                          <IoMdHeartDislike className="text-red-500 transition-all text-sm" />
                        ) : (
                          <IoMdHeartDislike className="text-zinc-500 group-hover:text-red-500 transition-all text-sm" />
                        )}
                    </span>
                    <span className="text-zinc-400 group-hover:text-white transition-all"> {dislikes.length > 0 ? dislikes.length : "0"} </span>
                  </p>
                  
                  {/* Comments of post */}

                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group" onClick={(e) => {
                    e.stopPropagation();
                    setPostId(id);
                    setIsOpen(true);
                  }}>
                    <span>
                          {comments.length > 0 ?
                          (
                            <MdOutlineForum className="text-[#6c63ff] transition-all text-sm" />
                          )
                          :
                          (
                          <MdOutlineForum className="text-zinc-500 group-hover:text-[#6c63ff] transition-all text-sm" />)
                          }
                        </span>
                    
                    <span className="text-zinc-400 group-hover:text-white transition-all"> {comments.length > 0 ? comments.length : "0"} </span>

                  </p>
                </div>

                <div className="flex gap-x-2">
                    
                  {/* Deleting the post */}

                  {auth?.currentUser?.displayName === post?.username && (
                      <p className="flex gap-3 items-center cursor-pointer transition-all px-2 py-2 text-lg group hover:bg-red-600 rounded-sm" onClick={(e) => {
                          e.stopPropagation();
                          deleteDoc(doc(db, "posts", id));

                          setNotif("Post was successfully deleted!")

                          router.push("/stream")
                      }}>
                          <span>
                          <MdDeleteOutline className="text-zinc-500 group-hover:text-white transition-all text-lg" />
                          </span>
                      </p>
                  )}

                </div>

              </footer>
            </div>
  )
}

export default Post
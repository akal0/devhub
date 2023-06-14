import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'

import { useRouter } from 'next/router';

import { IoMdHeartDislike } from "react-icons/io"
import { MdOutlineFavorite, MdOutlineForum, MdDeleteOutline, MdDelete } from "react-icons/md"

import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

import { useRecoilState } from 'recoil';
import { modalState, postIdState, commentIdState } from '@/atoms/modalAtom';

import useNotifStore from "@/store/useNotifStore";

const Comment = ({comment, id, post, idPost}) => {

        // Comments

        const [comments, setComments] = useState([])

        const [isOpen, setIsOpen] = useRecoilState(modalState)
        const [postId, setPostId] = useRecoilState(postIdState)
    
        // Likes
    
        const [likes, setLikes] = useState([])
        const [liked, setLiked] = useState(false)
    
        // Dislikes
    
        const [dislikes, setDislikes] = useState([])
        const [disliked, setDisliked] = useState(false)

        // Post username

        // Author of post

        const [op, setOp] = useState(false)
    
        // Notif system
    
        const { setNotif, message } = useNotifStore();
    
        // Router
    
        const router = useRouter();
    
        const likePost = async () => {
    
          if (liked) {
            await deleteDoc(doc(db, "posts", idPost, "comments", id, "likes", auth.currentUser.uid))
          } else {
    
            // Add your like to the DB
            await setDoc(doc(db, "posts", idPost, "comments", id, "likes", auth.currentUser.uid), {
              username: auth.currentUser.displayName
            })
    
            // If you've disliked, it takes that away as well!
    
            await deleteDoc(doc(db, "posts", idPost, "comments", id, "dislikes", auth.currentUser.uid))
    
          }
    
        }
    
        const dislikePost = async () => {
    
          if (disliked) {
            await deleteDoc(doc(db, "posts", idPost, "comments", id, "dislikes", auth.currentUser.uid))
          } else {
    
            // Add your dislike
            await setDoc(doc(db, "posts", idPost, "comments", id, "dislikes", auth.currentUser.uid), {
              username: auth.currentUser.displayName
            })
    
            await deleteDoc(doc(db, "posts", idPost, "comments", id, "likes", auth.currentUser.uid))
          }
    
        }
        // Likes
    
        useEffect(() => {
    
          onSnapshot(collection(db, "posts", idPost, "comments", id, "likes"), (snapshot) =>
              setLikes(snapshot.docs)
            )
          
          setLiked(likes.findIndex((like) => like.id === auth?.currentUser?.uid) !== -1)
    
        }, [db, id, likes])
    
        // Dislikes
    
        useEffect(() => {
    
          onSnapshot(collection(db, "posts", idPost, "comments", id, "dislikes"), (snapshot) => 
            setDislikes(snapshot.docs)
          )
          
          setDisliked(dislikes.findIndex((dislike) => dislike.id === auth?.currentUser?.uid) !== -1)
      
        }, [db, id, dislikes])

        // Check if logged in user is the OP (original poster)

        useEffect(() => {
            if (post?.username === comment?.username) {
                setOp(true);
            }
        })


  return (
    <div className="flex cursor-pointer border-b border-zinc-700 w-full">

        <div className="bg-[#1e1e22] w-full rounded-sm pt-6 pb-8 m-8 flex flex-col gap-6 border-b-2 border-zinc-400 cursor-pointer hover:bg-[#1c1c1f] transition-all">
            <header className="flex justify-between pr-12 items-end">
                <div className="px-10 flex items-center gap-4">
                  <Image
                    src="/guts.png"
                    height={75}
                    width={75}
                    className="rounded-full px-2 py-2"
                    alt="Profile pic"
                  />

                  <info className="flex flex-col gap-4 justify-center">
                    <h1 className="text-sm"> { comment?.username } </h1>
                    {/* {op && <p className="text-[10px] uppercase bg-zinc-600/[0.5] px-3 py-1.5 rounded-md"> Original poster </p> } */}
                    {op && <p className="text-[10px] text-green-500 uppercase rounded-md"> Original poster </p> }
                  </info>
                </div>

                <p className="text-gray-400 text-xs pb-5 flex flex-col gap-2">
                  <Moment date={comment?.timestamp?.toDate()} fromNow />
                </p>
              </header>

              <content className="border-l-2 space-y-4 border-zinc-400 px-16">
                <p className="line-clamp-2">
                  {comment?.comment}
                </p>
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
                  
                </div>

                {/* Deleting the post */}

                {auth?.currentUser?.displayName === comment?.username && (
                    <p className="flex gap-3 items-center cursor-pointer transition-all px-2 py-2 group hover:bg-red-600 rounded-sm" onClick={(e) => {
                        e.stopPropagation();
                        deleteDoc(doc(db, "posts", idPost, "comments", id));

                        setNotif("Comment was successfully deleted!")

                        router.push(`/post/${post}`)
                    }}>
                        <span>
                        <MdDeleteOutline className="text-zinc-500 group-hover:text-white transition-all text-lg" />
                        </span>
                    </p>
                )}

              </footer>
              
            </div>
    </div>
  )
}

export default Comment
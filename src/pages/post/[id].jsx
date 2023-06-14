import React, { useEffect, useState } from 'react'

import Head from "next/head";

import useNotifStore from "@/store/useNotifStore";
import Sidebar from "@/components/sidebar/Sidebar";
import Stream from "@/components/stream/Stream";
import { auth, db } from "@/firebase";
import Modal from "@/components/modal/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { useRouter } from 'next/router';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

import { BsArrowLeft } from "react-icons/bs"
import Post from '@/components/stream/Post';
import Comment from '@/components/comment/Comment';

const PostPage = ({ query: idQuery }) => {

  // States

  const [isOpen, setIsOpen] = useRecoilState(modalState);

  const [post, setPost] = useState()
  const [comments, setComments] = useState([])

  const router = useRouter();

  // Post

  useEffect(() => 
    onSnapshot(doc(db, "posts", idQuery.id), (snapshot) => {
      setPost(snapshot.data())
    }),
    [db]
  )

  // Comments

  useEffect(() =>
      onSnapshot(
        query(
          collection(db, "posts", idQuery.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, idQuery.id]
  )

  return (
    <div>
      <Head>
        { post ? (
          <title> {post?.username} on devhub: {post?.text} </title>
        ) : (
          <title> devhub / Post </title>
        )}
      </Head>

      <div className="flex font-noto">

          <Sidebar />

          <div className="flex-grow sm:ml-[52px] xl:ml-[340px] border-r border-zinc-700/[0.5] h-full max-w-screen">

            {/* Header section of the Stream page */}

            <div className="bg-zinc-900 border-b border-zinc-700/[0.5] flex text-2xl items-center justify-between px-16 pr-20 sticky top-0 z-50 py-10">

                <BsArrowLeft className="cursor-pointer hover:text-[#6c63ff] transition-all" onClick={() => router.push("/stream")} /> 
                
                <h1 className="pl-12 text-lg"> {post?.username}'s <span className="text-[#6C63ff]">Post</span> </h1>
            </div>

            {/* Where post is displayed */}

            <div className="pb-72">

              <div className="border-b border-zinc-800">
                <Post id={idQuery.id} post={post} page />
              </div>

              {comments.length > 0 && (
                <div>
                    {comments.map(comment => (
                      <Comment key={comment.id} idPost={idQuery.id} id={comment.id} comment={comment.data()} post={post} />
                    ))}
                </div>
              )}
              
            </div>

          </div>

          {isOpen && <Modal />}

          
      </div>

      
    </div>
  )
}

export default PostPage;

export const getServerSideProps = async (context) => {

  const { query } = context;

  return {
    props: {
      query
    }
  }

}
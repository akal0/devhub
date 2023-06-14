import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Moment from "react-moment";
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { modalState, postIdState, commentIdState } from "@/atoms/modalAtom";

import { AiOutlineClose } from "react-icons/ai"
import { MdOutlineEmojiEmotions, MdOutlineImage } from "react-icons/md";

import Image from "next/image";

// Emoji Mart

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import useNotifStore from "@/store/useNotifStore";

function Modal() {

    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [commentId, setCommentId] = useRecoilState(commentIdState)

    const [showEmojis, setShowEmojis] = useState(false)

    const [post, setPost] = useState();
    const [comments, setComments] = useState();

    const [comment, setComment] = useState("");

    const {setNotif} = useNotifStore();

    const router = useRouter();

    useEffect(() => 
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
      [db]
    )

    const addEmoji = (e) => {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);

      setInput(input + emoji)
  }

  const sendComment = async (e) => {

    e.preventDefault();
    
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      username: auth?.currentUser.displayName,
      timestamp: serverTimestamp()
    })

    setIsOpen(false)
    setComment("")

    setNotif("Reply sent!")

    router.push(`/post/${postId}`)

  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8 flex-grow" onClose={setIsOpen}>
        
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block border-t-2 border-[#6c63ff] align-bottom bg-[#1e1e22] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex justify-end px-8 py-4 border-b border-zinc-700">

                <div className="w-6 h-8 flex items-end justify-end xl:px-0 cursor-pointer hover:text-[#6c63ff] transition-all" onClick={() => setIsOpen(false)}> 
                  <AiOutlineClose className="text-[20px]" />
                </div>

              </div>

              <div className="flex px-4 pt-5 pb-8 sm:px-6 ">

                <div className="w-full"> 

                  <div className="flex gap-x-5 relative text-zinc-400">

                    {/* Line that links the two users in the modal */}

                    <span className="w-0.5 h-full z-[-1] absolute left-6 top-11 bg-gray-600" />

                    {/* Image of the first user */}

                    <Image
                    src="/guts.png"
                    height={55}
                    width={55}
                    className="rounded-full h-14 w-14"
                    alt="Profile pic"
                  />

                    {/* Information about the user's post */}

                    <div>

                      <div className="flex gap-x-3">

                        <h4 className="font-bold text-white sm:text-base"> @{post?.username} </h4> 

                        •

                        <Moment fromNow date={post?.timestamp.toDate()} />

                      </div>


                      <p className="text-[#d9d9d9] py-4 text-sm"> {post?.text} </p>

                    </div>

                  </div>

                  {/* Information for the user thats commenting... */}

                  <div className="mt-10 flex space-x-3 w-full">

                    {/* Image of the logged in user */}

                    <Image
                    src="/guts.png"
                    height={55}
                    width={55}
                    className="rounded-full h-14 w-14"
                    alt="Profile pic"
                  />

                    <div className="flex flex-col items-center justify-between w-full">

                      <div className="flex-grow w-full">
                        
                        <textarea 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Give your input!"
                          className="px-2 py-1.5 bg-transparent outline-none text-[#d9d9d9] text-sm placeholder-zinc-500 tracking-wide w-full min-h-[30px] resize-none"
                        />

                      </div>

                      <div className="flex justify-between w-full items-center gap-4">

                          <div className="text-xl text-[#6c63ff] cursor-pointer opacity-50 hover:opacity-100 transition-all" onClick={(() => setShowEmojis(!showEmojis))}>
                              <MdOutlineEmojiEmotions />
                          </div>

                          { showEmojis && (
                              
                              <div className="absolute right-[8rem] top-[0rem] h-[30px]">
                                  <Picker 
                                  onEmojiSelect={addEmoji}
                                  data={data}
                                  theme="dark"
                                  emojiSize={20}
                                  previewPosition="none"
                                  set="native"
                              />
                              </div>

                          )}

                          <button className="disabled:bg-[#6b63ff5e] bg-[#5750d3] hover:bg-[#3b3697] text-sm rounded-sm px-5 py-2 transition-all" type="submit" onClick={sendComment} disabled={!comment.trim()}> Reply </button>

                      </div>

                    

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
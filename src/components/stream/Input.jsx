import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { MdOutlineClose, MdOutlineEmojiEmotions, MdOutlineImage } from 'react-icons/md'

// Emoji Mart

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// Firebase 

import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const Input = () => {

    const [input, setInput] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)

    const [loading, setLoading] = useState(false)

    const imagePickerRef = useRef(null)

    const uploadPost = async () => {
        if ( loading ) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            // id: sessionStorage.user.uid,
            // username: sessionStorage.user.username,
            // userAvatar: session.user.avatar,
            // role: session.user.role,
            text: input,
            timestamp: serverTimestamp()
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedImage) {
            await uploadString(imageRef, selectedImage, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL
                })
            })
        }

        setLoading(false)
        setInput("")
        setSelectedImage(null)
        setShowEmojis(false)

    }

    const addImageToStream = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedImage(readerEvent.target.result)
        }

    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);

        setInput(input + emoji)
    }


  return (
    <div className={`border-b border-zinc-700/[0.5] px-10 py-8 flex space-x-3 overflow-y-scroll ${loading && "opacity-60"}`}>
        <div className="pt-2">
            <Image src="/guts.png" alt="avatar" height={48} width={48} className="rounded-full" />
        </div>

        <div className="w-full">

            <div className={`${selectedImage && "pb-8"} ${input && "space-y-2.5"} `}>
                <textarea value={input} className=" w-full bg-[#1e1e22] rounded-sm resize-none outline-none pl-5 pt-3 tracking-wide border border-zinc-800/[0.6]" placeholder="Add some data to your stream to let people know what you're thinking about!" onChange={(e) => setInput(e.target.value)}>

                </textarea>
            </div>

            {selectedImage && (
                <div className="relative">

                    <div className="absolute w-8 h-8 bg-[#1e1e22] hover:text-red-500 bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer top-1 left-1" onClick={() => setSelectedImage(null)}>
                        <MdOutlineClose />
                    </div>

                    <img src={selectedImage} alt="Image in the stream post" className="rounded-lg max-h-80 object-contain" />
                </div>
            )}

            {!loading && (
                <div className="flex items-center justify-between pt-5">

                    <div className="flex items-center gap-3">

                        <div className="text-xl text-[#6c63ff] cursor-pointer opacity-50 hover:opacity-100 transition-all" onClick={(() => imagePickerRef.current.click())}>
                            <MdOutlineImage />
                            <input type="file" onChange={addImageToStream} ref={imagePickerRef} hidden />
                        </div>

                        <div className="text-xl text-[#6c63ff] cursor-pointer opacity-50 hover:opacity-100 transition-all" onClick={(() => setShowEmojis(!showEmojis))}>
                            <MdOutlineEmojiEmotions />
                        </div>

                        { showEmojis && (
                            
                            <div className="absolute top-[17rem]">
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

                    </div>

                    <button className="bg-[#1e1e22] disabled:opacity-50 px-6 py-3 rounded-sm text-sm transition-all" disabled={!input.trim() && !selectedImage} onClick={uploadPost}> Add to stream </button>

                </div>
            )}


        </div>

    </div>
  )
}

export default Input;
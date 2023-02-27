import Head from "next/head";
import Header from "@/components/Header/Header";
import Image from "next/image";

import Link from "next/link";

// import {
//   BubbleChart,
//   Create,
//   DataObject,
//   Favorite,
//   Forum,
//   HeartBroken,
//   Share,
//   Work,
// } from "@mui/icons-material";

import { IoMdHeartDislike } from "react-icons/io"

import { MdOutlineBubbleChart, MdOutlineCreate, MdCode, MdOutlineFavorite, MdWork, MdShare, MdOutlineForum } from "react-icons/md"

const Landing = () => {
  return (
    <div className="pb-32">
      <Head>
        <title> devhub </title>
      </Head>

      <Header />

      <div className="flex flex-col gap-28 mx-32 pb-36">
        <main className="xl:h-[calc(100vh-22rem)] xl:max-w-screen-2xl xl:mx-auto xl:mt-40">
          <div className="flex flex-col justify-center px-16 gap-20 xl:flex-row xl:gap-28 items-center xl:divide-x-2 xl:divide-[#6C63FF]">
            <div className="flex flex-col gap-12">
              <div>
                <h1 className="text-2xl xl:text-3xl font-bold capitalize text-[#6C63FF]">
                  The new hotspot for developers of all levels
                </h1>

                <p className="text-[14px] mt-2">
                  which also provides you a place to network, blog your findings
                  and share your thoughts!
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p>
                  By signing up to{" "}
                  <span className="text-[#6C63FF]">devhub</span>, you agree to
                  the terms and conditions.
                </p>
                <Link
                  href="/register"
                  className="py-3 bg-[#1e1e22] rounded-sm hover:bg-[#6C63FF] transition-all text-center"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="px-28">
              <Image src="/landing.svg" width={600} height={600} alt="Landing Image" />
            </div>
          </div>
        </main>

        {/* Main content */}

        <content className="flex flex-col px-12 gap-72">
          {/* Articles section */}

          <div className="flex flex-col-reverse gap-24 xl:grid xl:grid-cols-2">
            <div className="flex flex-col gap-6  justify-between">
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold">
                  Look out for these, they're called
                  <span className="text-[#6C63FF]"> articles</span>!
                </h1>

                <content className="flex flex-col gap-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    id mauris est. Fusce placerat velit orci, ac vulputate
                    sapien maximus ac. Nam rhoncus sem sed enim aliquam, sit
                    amet congue leo porttitor.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    id mauris est. Fusce placerat velit orci, ac vulputate
                    sapien maximus ac. Nam rhoncus sem sed enim aliquam, sit
                    amet congue leo porttitor.
                  </p>
                </content>
              </div>

              <button className="bg-[#1e1e22] py-3 rounded-sm hover:bg-[#6C63FF] transition-all capitalize">
                View articles
              </button>
            </div>

            <div className="bg-[#1e1e22] rounded-sm pt-6 pb-8 flex flex-col gap-6">
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
                    <h1> cryptev </h1>
                    <p className="text-xs text-red-600"> Elite Programmer </p>
                  </info>
                </div>

                <p className="text-gray-400 text-xs pb-5 flex flex-col gap-2">
                  <span className="text-white"> 3 min read </span>
                  Posted on February, 14th 2023
                </p>
              </header>

              <content className="border-l-2 space-y-4 border-[#6C63FF] px-16">
                <h1 className="text-xl">
                  Welcome to <span className="text-[#716af7]">devhub</span>
                  ...
                </h1>
                <p className="line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  id mauris est. Fusce placerat velit orci, ac vulputate sapien
                  maximus ac. Nam rhoncus sem sed enim aliquam, sit amet congue
                  leo porttitor.
                </p>
              </content>

              <footer className="px-12 flex flex-wrap gap-6 justify-between items-center mt-4">
                <div className="flex gap-4 text-xs">
                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group">
                    <span>
                      <MdOutlineFavorite className="text-zinc-500 group-hover:text-[#6C63FF] transition-all text-sm" />
                    </span>
                    29 likes
                  </p>

                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group">
                    <span>
                      <IoMdHeartDislike className="text-zinc-500 group-hover:text-red-500 transition-all text-sm" />
                    </span>
                    29 dislikes
                  </p>

                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group ">
                    <span>
                      <MdOutlineForum className="text-zinc-500 group-hover:text-white transition-all text-sm" />
                    </span>
                    29 comments
                  </p>
                </div>

                <p
                  className="bg-zinc-700 px-6 py-2 rounded-sm text-sm cursor-pointer hover:bg-[#6C3CFF] transition-all
                "
                >
                  Read more
                </p>
              </footer>
            </div>
          </div>

          {/* Opportunities section */}

          <div className="flex flex-col-reverse gap-24 xl:grid xl:grid-cols-2">
            <div className="flex flex-col gap-6  justify-between">
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold">
                  We provide you with a platform to find all sorts of
                  <span className="text-[#6C63FF]"> opportunities</span>!
                </h1>

                <content className="flex flex-col gap-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    id mauris est. Fusce placerat velit orci, ac vulputate
                    sapien maximus ac. Nam rhoncus sem sed enim aliquam, sit
                    amet congue leo porttitor.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    id mauris est. Fusce placerat velit orci, ac vulputate
                    sapien maximus ac. Nam rhoncus sem sed enim aliquam, sit
                    amet congue leo porttitor.
                  </p>
                </content>
              </div>

              <button className="bg-[#1e1e22] py-3 rounded-sm hover:bg-[#6C63FF] transition-all capitalize">
                View opportunities
              </button>
            </div>

            <div className="bg-[#1e1e22] rounded-sm pt-6 pb-8 flex flex-col gap-6 order-first">
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
                    <h1> Google </h1>
                    <p className="text-xs text-green-600"> Recruiter </p>
                  </info>
                </div>

                <p className="text-gray-400 text-xs pb-5 flex flex-col gap-2 flex-wrap w-52">
                  <span className="text-white">
                    <span className="text-[#8983ff]"> Hybrid </span> job in
                    <span className="text-[#8983ff]"> London, UK </span>
                  </span>
                  Posted on February, 14th 2023
                </p>
              </header>

              <content className="border-l-2 space-y-4 border-[#6C63FF] px-16">
                <h1 className="text-xl">
                  Looking for a{" "}
                  <span className="text-[#716af7]">
                    Senior Front End Web Developer
                  </span>
                  ...
                </h1>
                <p className="line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  id mauris est. Fusce placerat velit orci, ac vulputate sapien
                  maximus ac. Nam rhoncus sem sed enim aliquam, sit amet congue
                  leo porttitor.
                </p>
              </content>

              <footer className="px-12 flex flex-wrap gap-6 justify-between items-center mt-4">
                <div className="flex gap-4">
                  <p className="flex gap-3 items-center cursor-pointer hover:bg-zinc-700 transition-all px-4 py-2 rounded-sm group text-xs">
                    <span>
                      <MdOutlineCreate className="text-zinc-500 group-hover:text-[#6C63FF] transition-all text-sm" />
                    </span>
                    46 applications
                  </p>
                </div>

                <p
                  className="bg-zinc-700 px-10 py-2 text-sm rounded-sm cursor-pointer hover:bg-[#6C3CFF] transition-all
                "
                >
                  Apply
                </p>
              </footer>
            </div>
          </div>
        </content>
      </div>

      <div className="bg-[#1e1e22] py-24 flex flex-col items-center gap-20 xl:grid xl:grid-cols-2">
        <div className="flex flex-col space-y-6 px-36 xl:ml-32">
          <h1 className="text-2xl font-bold">
            Only the coolest people on the Internet use
            <span className="text-[#6C63FF]"> devhub</span>.
          </h1>
          <p className="w-3/4 xl:w-full">
            But what does
            <span className="text-[#6C63FF] font-bold"> devhub </span>
            provide that's different to all these different sites but still
            tailors to your personal needs?
          </p>
        </div>

        <div className="space-y-8 w-[75%]">
          <h1 className="flex items-center gap-8">
            <span>
              <MdShare className="text-xl" />
            </span>
            Network with all types of developers, rookies and vets.
          </h1>

          <h1 className="flex items-center gap-8">
            <span>
              <MdOutlineBubbleChart className="text-xl" />
            </span>
            Share your thoughts everyday on your timeline!
          </h1>

          <h1 className="flex items-center gap-8">
            <span>
              <MdCode className="text-xl" />
            </span>
            Post your findings on different topics. It could help someone out!
          </h1>

          <h1 className="flex items-center gap-8">
            <span>
              <MdWork className="text-xl" />
            </span>
            Find a multitude of opportunities on our platform, getting you
            closer to your true potential!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Landing;

"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { getEvents } from "@/app/dashboard/action";
import { useRouter } from "next/navigation";
import { FaCirclePlus, FaPlay } from "react-icons/fa6";
// import { DatePkr } from "./ui/date-pkr";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoMdPause } from "react-icons/io";

interface event {
  title: string;
  src: string;
  artists: string[];
}

const Event = ({ userid, events }: { userid: string; events: event[] }) => {
  const router = useRouter();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleClickNext = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex < events.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClickPrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : events.length - 1
    );
  };
  return (
    <div className=" p-10 relative min-h-screen bg-gray-200">
      <div className=" max-h-[60dvh]  overflow-y-auto flex flex-col gap-5 scrollbar-hide">
        <p className=" text-2xl">Playlist</p>
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-lg cursor-pointer"
          >
            <div className="w-20 h-20 bg-gray-500 rounded-full" />
            <div className="flex-1">
              <h2 className=" text-xl">{event.title}</h2>
              <p className=" text-gray-500">{event.artists.join(", ")}</p>
            </div>

            <button
              onClick={() => setCurrentTrackIndex(index)}
              className="bg-cyan-500 p-3 rounded-full hover:bg-cyan-600 transition-colors"
            >
             {index===currentTrackIndex ? <IoMdPause className=" text-black"/> : <FaPlay className=" text-black" />}
            </button>
          </div>
        ))}
      </div>

      <div className=" absolute bottom-0 left-0 min-w-full bg-gray-600 p-5 flex flex-col gap-5 w-full max-w-md rounded-xl shadow-lg">
        <h2 className=" text-2xl text-white text-center">
          {events[currentTrackIndex].title}
        </h2>

        <AudioPlayer
          autoPlay
          src={events[currentTrackIndex].src}
          onPlay={(e) => console.log("onPlay")}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          showSkipControls
          showJumpControls={false}
          className="rhap_container rounded-md shadow-md"
          //   customProgressBarSection={[
          //     <div key="progress" className="w-full flex items-center gap-2">
          //       <div className="flex-1 h-1 bg-gray-600 rounded-full">
          //         <div
          //           className="h-full bg-cyan-500 rounded-full transition-all duration-100"
          //           style={{ width: '30%' }} // Replace with actual progress
          //         />
          //       </div>
          //       <span className="text-gray-400 text-sm">2:15</span>
          //       <span className="text-gray-400 text-sm">-1:30</span>
          //     </div>
          //   ]}
          //   customControlsSection={[
          //     <div
          //       key="controls"
          //       className="flex items-center justify-between w-full"
          //     >
          //       <button
          //         onClick={handleClickPrevious}
          //         className="text-white hover:text-cyan-400 p-2 transition-colors"
          //       >
          //         <svg
          //           className="w-8 h-8"
          //           fill="none"
          //           viewBox="0 0 24 24"
          //           stroke="currentColor"
          //         >
          //           <path
          //             strokeLinecap="round"
          //             strokeLinejoin="round"
          //             strokeWidth={2}
          //             d="M15 19l-7-7 7-7"
          //           />
          //         </svg>
          //       </button>

          //       <button className="bg-cyan-500/20 p-4 rounded-full hover:bg-cyan-500/30 transition-colors">
          //         <svg
          //           className="w-8 h-8 text-cyan-400"
          //           fill="none"
          //           viewBox="0 0 24 24"
          //           stroke="currentColor"
          //         >
          //           <path
          //             strokeLinecap="round"
          //             strokeLinejoin="round"
          //             strokeWidth={2}
          //             d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          //           />
          //           <path
          //             strokeLinecap="round"
          //             strokeLinejoin="round"
          //             strokeWidth={2}
          //             d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          //           />
          //         </svg>
          //       </button>

          //       <button
          //         onClick={handleClickNext}
          //         className="text-white hover:text-cyan-400 p-2 transition-colors"
          //       >
          //         <svg
          //           className="w-8 h-8"
          //           fill="none"
          //           viewBox="0 0 24 24"
          //           stroke="currentColor"
          //         >
          //           <path
          //             strokeLinecap="round"
          //             strokeLinejoin="round"
          //             strokeWidth={2}
          //             d="M9 5l7 7-7 7"
          //           />
          //         </svg>
          //       </button>
          //     </div>,
          //   ]}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Event;

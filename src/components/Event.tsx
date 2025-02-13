"use client";

import { FaPlay } from "react-icons/fa6";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoMdPause } from "react-icons/io";
import { useState } from "react";

interface event {
  title: string;
  src: string;
  artists: string[];
}

const Event = ({ events }: {  events: event[] }) => {
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
        {events?.length > 0 ? (
          events.map((event, index) => (
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
                {index === currentTrackIndex ? (
                  <IoMdPause className=" text-black" />
                ) : (
                  <FaPlay className=" text-black" />
                )}
              </button>
            </div>
          ))
        ) : (
          <p className=" text-center text-2xl text-gray-500">No events found</p>
        )}
      </div>

      <div className=" absolute bottom-0 left-0 min-w-full bg-gray-600 p-5 flex flex-col gap-5 w-full max-w-md rounded-xl shadow-lg">
        <h2 className=" text-2xl text-white text-center">
          {events[currentTrackIndex]?.title}
        </h2>

        <AudioPlayer
          autoPlay
          src={events[currentTrackIndex]?.src}
          onPlay={(e) => console.log("onPlay")}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          showSkipControls
          showJumpControls={false}
          className="rhap_container rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Event;

import React, { createContext, useState, useContext } from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  return (
    <MusicPlayerContext.Provider value={{ currentTrack, isPlaying, setIsPlaying, playTrack, pauseTrack }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

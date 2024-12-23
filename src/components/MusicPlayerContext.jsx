import React, { createContext, useState, useContext } from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = currentTrack?.tracklist || []; // Tracklist from `currentTrack`

  const nextTrack = () => {
    setPlayingIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const prevTrack = () => {
    setPlayingIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const playTrack = (track, index) => {
    setCurrentTrack(track);
    setPlayingIndex(index);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playingIndex,
        setPlayingIndex,
        setCurrentTrack,
        setIsPlaying,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

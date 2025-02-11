import React, { createContext, useState, useContext, useRef } from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);

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

  const updateProgress = () => {
    if (playerRef.current) {
      const played = playerRef.current.getCurrentTime() / playerRef.current.getDuration();
      setProgress(played * 100);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playingIndex,
        progress,
        setProgress,
        setPlayingIndex,
        setCurrentTrack,
        setIsPlaying,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack,
        updateProgress,
        playerRef,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

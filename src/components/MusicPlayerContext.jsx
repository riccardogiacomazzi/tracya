import React, { createContext, useState, useContext, useRef, useEffect } from "react";

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
    setProgress(0);

    setPlayingIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    updateProgress();
  };

  const prevTrack = () => {
    setProgress(0);

    setPlayingIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    updateProgress();
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

  useEffect(() => {
    setProgress(0);
    if (isPlaying && playerRef.current) {
      playerRef.current.seekTo(0); // Ensure player seeks to the start
    }
  }, [playingIndex]);

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

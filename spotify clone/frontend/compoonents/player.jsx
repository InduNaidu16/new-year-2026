import React, { useRef, useEffect, useState } from 'react';

export default function Player({ track }) {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if(track && audioRef.current) {
      audioRef.current.src = `/api/tracks/stream/${track._id}`;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [track]);

  const toggle = () => {
    if(!audioRef.current) return;
    if(playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="player">
      {track ? (
        <>
          <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
          <div>{track.title} — {track.artist}</div>
          <audio ref={audioRef} onEnded={() => setPlaying(false)} />
        </>
      ) : <div>No track selected</div>}
    </div>
  );
}

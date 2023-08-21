import React from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamcore';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  const tracks = data?.tracks;

  /* const shuffle = (array) => { 
    const newArray = [...array];
    const length = newArray.length;

    for (let start = 0; start < length; start++) {
        const randomPosition = Math.floor((newArray.length - start) * Math.random())
        const randomItem = newArray.splice(randomPosition, 1)

        newArray.push(...randomItem)
    }
    return newArray;
};

const shuffledTracks = shuffle(tracks); */

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
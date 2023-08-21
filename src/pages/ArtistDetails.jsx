import { useParams } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamcore';
import { SiApplemusic } from "react-icons/si";
import { Link } from 'react-router-dom';

const VideoEmbed = ({uri}) => {
    
    //console.log(uri);

    return (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={uri}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
)}

const  ArtistDetails = () => {
    const {id: artistId} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const {data: artistData, isFetching: isFetchingArtistDetails, error} = useGetArtistDetailsQuery(artistId);

    if(isFetchingArtistDetails) return 
        <Loader title='Searching artist details'/>

    if(error)
        <Error/>
    

    const appleMusicURL = artistData?.data[0]?.attributes?.url;
    const artistName = artistData?.data[0]?.attributes?.name;

    return (
        <div className='flex flex-col mt-10 xl:mt-0'>
            <p className="text-white font-bold text-2xl mb-5">About {artistName}</p>
            <DetailsHeader 
                artistId={artistId}
                artistData={artistData}
            />

            <div className="flex flex-col mt-10">
              <p className="text-white text-xl mb-5">More on Apple Music...</p>
              <SiApplemusic
                className="w-16 h-16 text-white mt-5 cursor-pointer"
                onClick={() => window.open(appleMusicURL, "_blank")}
              />
            </div>
        </div>
    )
};

export default ArtistDetails;

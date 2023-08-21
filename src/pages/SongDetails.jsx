import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from '../redux/services/shazamcore';

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

const  SongDetails = () => {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const {data: songData, isFetching: isFetchingSongDetails, error} = useGetSongDetailsQuery({songid});

    if(isFetchingSongDetails) return 
        <Loader title='Searching song details'/>

    if(error)
        <Error/>
    //console.log(songData);

    return (
        <div className='flex flex-col'>
            <DetailsHeader
                songData={songData}
            />

            <div className="mt-10 mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                {
                    songData?.sections[1].type === 'LYRICS' 
                    ? songData?.sections[1].text.map((line, i) => (
                        <p key={i} className="text-gray-400 text-base my-1">
                            {line}
                        </p>
                    ))
                    : <p className='text-gray-400 text-base my-1'>Sorry, No Lyrics Found for this Song</p>
                }
                </div>

                {/* <div className="mt-5">
                    {songData?.sections[1].type === "VIDEO" ? (
                        <VideoEmbed 
                            uri={songData?.sections[1]?.youtubeurl?.actions[0]?.uri}
                        />
                    ) : <p className='text-gray-400 text-base my-1'>Sorry, No Video Found for this Song</p>}
                </div> */}
            </div>

            <div className="w-full sm:h-44 h-24" />
        </div>
    )
};

export default SongDetails;

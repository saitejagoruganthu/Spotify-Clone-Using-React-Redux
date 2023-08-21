import {Link} from 'react-router-dom';

const DetailsHeader = ({artistId, artistData, songData}) => (
  <div className='relative w-full flex flex-col'>
    <div className="w-full bg-gradient-to-l from-[#b34700] to-[#ff6600] rounded-lg sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center sm:ml-5">
      <img
        src={
          artistId 
          ? artistData?.data[0]?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
          : songData?.images?.coverart
        } 
        alt="art"
        className='sm:w-40 w-28 sm:h-40 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
      />

      <div className="ml-5">
        <p className='font-bold sm:text-3xl text-xl text-white'>
          {
            artistId
            ? artistData?.data[0]?.attributes.name
            : songData?.title
          }
        </p>

        {
          !artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className='text-base text-white mt-2'>
                {songData?.subtitle}
              </p>
            </Link>
          )
        }

        <p className='text-base text-white mt-2'>
          {
            artistId
            ? artistData?.data[0]?.attributes?.genreNames[0]
            : songData?.genres?.primary
          }
        </p>
      </div>
    </div>
  </div>
);

export default DetailsHeader;

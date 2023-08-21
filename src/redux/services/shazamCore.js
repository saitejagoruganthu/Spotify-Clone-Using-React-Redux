import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '7f935545ffmsh2b5a6352868f83ap1f2ad0jsn08f200d594ea');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/charts/track?pageSize=30'}),
        getSongDetails: builder.query({query: ({songid}) => `/songs/get-details?key=${songid}`}),
        getArtistDetails: builder.query({query: (artistId) => `/artists/get-details?id=${artistId}`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `/search?term=${searchTerm}`}),
    }),
})

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetSongsBySearchQuery
} = shazamCoreApi;
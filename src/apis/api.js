import axios from "axios";


export default {
    getStreamingAvailability: (movieTitle) =>
        axios({
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/v2/search/title',
            params: {
              title: movieTitle,
              country: 'us',
              show_type: 'movie',
              output_language: 'en'
            },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
              'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        })
}
import action from '../assets/20051517.jpg'
import history from '../assets/7ACf5GwwzmzuTFzPLEg9ZagvXUa.jpg'
import horror from '../assets/Terrifier-2-c05ef0c.png'
import fiction from '../assets/Mad_Max_Fury_Road-397817030-large.jpg'
import war from '../assets/e9066fbb111bc061592d0eafe42579e60c-08-war-movies-ranking-1.rvertical.w570.webp'
import comedy from '../assets/ar_el-dictador-2012_p_m.jpg'
import mistery from '../assets/au_poster_20thcentury_murderontheorientexpress_afcb9ced.jpg'
import fantasy from '../assets/0623168d086a9e0db1af99f13a19864ead23792b.jpg'
import drama from '../assets/840_560.jpg'



const page_buttons = [
    {
        index: 1,
        page: 1
    },
    {
        index: 2,
        page: 2
    },
    {
        index: 3,
        page: 3
    },
    {
        index: 4,
        page: 4
    },
    {
        index: 5,
        page: 5
    },
    {
        index: 6,
        page: 6
    },
    {
        index: 7,
        page: 7
    },
    {
        index: 8,
        page: 8
    },
    {
        index: 9,
        page: 9
    },
    {
        index: 10,
        page: 10
    },
]

const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
]


const movie_search_recomendation = [
    {
        id: 28,
        name: 'action',
        icon: action
    },
    {
        id: 36,
        name: 'history',
        icon: history
    },
    {
        id: 14,
        name: 'fantasy',
        icon: fantasy
    },
    {
        id: 10752,
        name: 'war',
        icon: war
    },
    {
        id: 18,
        name: 'drama',
        icon: drama
    },
    {
        id: 9648,
        name: 'mistery',
        icon: mistery
    },
    {
        id: 27,
        name: 'horror',
        icon: horror
    },
    {
        id: 35,
        name: 'comedy',
        icon: comedy
    }
]

export { page_buttons, genres, movie_search_recomendation }
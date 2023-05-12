import { Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { RiEmotionSadLine } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import LogoTMDBLarge from '../assets/large-tmdb.svg'
import Loader from './Loader'
import '../apis/scrollbar.css'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import { movie_search_recomendation } from '../apis/buttons'



function scrollContainer(scrollOffset, containerRef, containerIndex) {
    containerRef[containerIndex].current.scrollTo({
        left: containerRef[containerIndex].current.scrollLeft + scrollOffset,
        behavior: 'smooth',
    });
}



const Home = () => {
    const [data, setData] = useState([])
    const [popular, setPopular] = useState([])
    const [value, setValue] = useState('')
    const [horror, setHorror] = useState([])
    const [adventure, setAdventure] = useState([])
    const [history, setHistory] = useState([])
    const [modal, setModal] = useState([])

    const containerRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const [randomIndex, setRandomIndex] = useState([])

    const [open, setOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(true);

    const baseURLImg = 'https://image.tmdb.org/t/p/original'

    const key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`).then((response) => {
            setData(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&region=US`).then((response) => {
            setPopular(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_watch_monetization_types=flatrate`).then((response) => {
            setHorror(response.data)
        }).then(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12&with_watch_monetization_types=flatrate`).then((response) => {
            setAdventure(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=36&with_watch_monetization_types=flatrate`).then((response) => {
            setHistory(response.data)
        })
    }, [])

    if (value !== '') {
        axios.get(`https://api.themoviedb.org/3/movie/${value}?api_key=${key}&language=en-US&append_to_response=watch%2Fproviders`).then((response) => {
            setModal(response.data)
        })
        setValue('')
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1&region=US`)
            .then(response => {
                const randomIndex = Math.floor(Math.random() * response.data.results.length);
                setRandomIndex(response.data.results[randomIndex]);
            })
    }, []);




    return (
        <>
            {
                open &&

                <div className='absolute h-[100vh] w-[100vw] flex flex-col items-center justify-center backdrop-blur-sm bg-white/10 z-50 gap-2'>
                    <div className='flex items-center justify-center rounded-[50%] bg-gray-600 p-1'>
                        <div onClick={() => setValue('')}>
                            <RxCross1 size={30} color='white' onClick={() => setOpen(false)} />
                        </div>
                    </div>
                    {
                        modal.id &&
                        <div className='w-[80%] max-w-[600px] h-[75%] bg-gradient-to-r from-[#0b525b] to-[#006466] flex flex-col items-center justify-start overflow-auto'>

                            <div className='w-[100%] flex items-center justify-center gap-4'>
                                {
                                    modal.backdrop_path ?
                                        <img src={`${baseURLImg}${modal.backdrop_path}`} alt='/' className='w-[100%]' />
                                        :
                                        <p className='text-[13px] text-red-500'>**no image available**</p>
                                }
                            </div>
                            <div className='w-[100%] text-center text-white text-[16px] md:text-[20px] flex items-center justify-between p-2'>
                                <p className='text-[20px] md:text-[25px]'><b>{modal.title}</b></p>
                                <Link to={`/film/${modal.id}`}>
                                    <div onClick={() => setOpen(false)} className='flex items-center justify-center rounded-[50%] p-2 bg-gray-100 cursor-pointer'>
                                        <BiDotsVerticalRounded size={18} color='black' />
                                    </div>
                                </Link>
                            </div>
                            <div className='w-[100%] flex items-center justify-center text-center text-white gap-2 p-2'>
                                {
                                    modal.genres.map((elem) => (
                                        <p className='text-[13px] md:text-[16px]'>{elem.name}</p>
                                    ))
                                }
                            </div>
                            <div className='w-[100%] flex items-center text-white gap-1'>
                                <div className='w-[100%] flex items-center justify-start text-left p-2'>
                                    <p className='text-[14px] md:text-[18px]'><b>{modal.release_date}</b></p>
                                </div>
                            </div>
                            <Divider sx={{ width: '90%' }} />
                            {
                                modal.overview ?
                                    <div className='w-[100%] p-2 text-left text-white text-[13px] md:text-[16px]'>
                                        <p>{modal.overview}</p>
                                    </div>
                                    :
                                    <div className='w-[100%] flex flex-col items-center justify-center text-left p-2 gap-2 text-white'>
                                        <RiEmotionSadLine size={25} color='white' />
                                        <p><b>no OVERVIEW about this movie !!!</b></p>
                                    </div>
                            }
                            <Divider sx={{ width: '90%' }} />

                            {
                                modal["watch/providers"].results.US ?
                                    modal["watch/providers"].results.US.buy ?
                                        <div className='w-[100%] flex flex-col items-center justify-center text-center p-2 gap-1'>
                                            <p className='text-[13px] md:text-[16px] text-white'>Where can i see this movie ?</p>
                                            <div className='flex items-center justify-center text-center text-white gap-2'>
                                                {
                                                    modal["watch/providers"].results.US.buy.map((elem) => (
                                                        <img src={`${baseURLImg}${elem.logo_path}`} className='min-w-[20px]' />
                                                    ))
                                                }
                                            </div>
                                            <div className='w[100%] text-center text-blue-500 text-[13px] md:text[15px] mt-4'>
                                                <Link to={`/film/${modal.id}`}>
                                                    <p onClick={() => setOpen(false)}>See more details and where you can watch</p>
                                                </Link>
                                            </div>
                                        </div>
                                        : modal["watch/providers"].results.US.rent ?
                                            <div className='w-[100%] flex flex-col items-center justify-center text-center p-2 gap-1'>
                                                <p className='text-[13px] md:text-[16px] text-white'>Where can i see this movie ?</p>
                                                <div className='flex items-center justify-center text-center text-white gap-2'>
                                                    {
                                                        modal["watch/providers"].results.US.rent.map((elem) => (
                                                            <img src={`${baseURLImg}${elem.logo_path}`} className='min-w-[20px]' />
                                                        ))
                                                    }
                                                </div>
                                                <div className='w[100%] text-center text-blue-500 text-[13px] md:text[15px] mt-4'>
                                                    <Link to={`/film/${modal.id}`}>
                                                        <p onClick={() => setOpen(false)}>See more details and where you can watch</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            :
                                            <div className='w-[100%] flex flex-col items-center justify-center text-center p-2 gap-1'>
                                                <p className='text-[13px] md:text-[16px] text-white'>Where can i see this movie ?</p>
                                                <div className='flex items-center justify-center text-center text-white gap-2'>
                                                    {
                                                        modal["watch/providers"].results.US.flatrate.map((elem) => (
                                                            <img src={`${baseURLImg}${elem.logo_path}`} className='min-w-[20px]' />
                                                        ))
                                                    }
                                                </div>
                                                <div className='w[100%] text-center text-blue-500 text-[13px] md:text[15px] mt-4'>
                                                    <Link to={`/film/${modal.id}`}>
                                                        <p onClick={() => setOpen(false)}>See more details and where you can watch</p>
                                                    </Link>
                                                </div>
                                            </div>
                                    :
                                    <div className='w-[100%] flex flex-col items-center justify-center text-left p-2 gap-2 text-white'>
                                        <RiEmotionSadLine size={25} color='white' />
                                        <p><b>no DATA about this movie in US !!!</b></p>
                                        <Link to={`/film/${modal.id}`}>
                                            <p onClick={() => setOpen(false)} className='text-[14px] text-blue-600'>See more details and where you can watch</p>
                                        </Link>
                                    </div>
                            }

                        </div>
                    }
                </div>
            }


            {
                isLoading ?
                    <Loader />
                    :
                    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-start bg-gradient-to-r from-[#212f45] to-[#006466] p-3 gap-4'>
                        <Nav />
                        <div className='w-[100%] max-w-[700px] flex flex-col items-center justify-center gap-1'>
                            <p className='text-white text-[10px] md:text-[12px]'>Powered with TMDB Api</p>
                            <img src={LogoTMDBLarge} alt="/" className='w-[40%]' />
                        </div>

                        <div className='relative w-[100%]  h-[100%] text-[14px] md:text-[18px] lg:text-[20] flex flex-col items-center justify-start p-2 gap-2 overflow-auto'>
                            <div className='w-[100%] max-w-[700px] p-2 flex items-center justify-center'>
                                <div className='w-[80%]  pt-4 pb-4 gap-3 p-2 flex flex-col items-center justify-center text-center backdrop-blur-sm bg-[#006466]/30 rounded-[20px]'>
                                    {
                                        randomIndex.poster_path &&
                                        randomIndex.backdrop_path &&
                                        <div onClick={() => setOpen(true)} className='flex items-center justify-center'>
                                            <div onClick={() => setValue(randomIndex.id)} className='w-[80%] md:min-w-[140px] max-w-[300px] flex items-center justify-center'>
                                                <img src={`${baseURLImg}${randomIndex.poster_path}`} alt='/' />
                                            </div>
                                        </div>

                                    }
                                    <div className='w-[100%] flex flex-col items-center justify-center text-center'>
                                        {
                                            randomIndex.title &&
                                            <p className='text-white text-[16px] md:text-[19px]'><b>{randomIndex.title}</b></p>
                                        }
                                        {
                                            randomIndex.release_date &&
                                            <p className='text-white text-[14px] md:text-[16px]'>{randomIndex.release_date}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='w-[100%] max-w-[550px] md:max-w-[1300px] flex flex-col items-start justify-center text-white'>
                                <p><b>Trending</b></p>
                                <div ref={containerRefs[0]} id='scrollbar' className='w-[100%] flex items-center justify-start gap-4 overflow-auto pt-2 pb-2 '>
                                    {
                                        data.results &&
                                        data.results.map((elem) => (
                                            elem.backdrop_path &&
                                                elem.poster_path ?
                                                <div onClick={() => setOpen(true)}>
                                                    <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] flex items-center justify-center'>
                                                        <img src={`${baseURLImg}${elem.poster_path}`} alt="/" />
                                                    </div>
                                                </div>
                                                : !elem.poster_path ?
                                                    <div onClick={() => setOpen(true)}>
                                                        <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] min-h-[130px] md:min-h-[180px] text-center text-white flex flex-col p-1 gap-1 items-center justify-center border-solid border-[1px] border-white'>
                                                            <img src={`${baseURLImg}${elem.poster_path}`} alt="/" className='object-cover' />
                                                            <p className='text-[14px] md:text-[16px]'>{elem.title}</p>
                                                            <p className='text-[12px] md:text-[14px] text-blue-300'>see details</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                        ))
                                    }
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-4'>
                                    <div onClick={() => scrollContainer(-200, containerRefs, 0)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowBackIos size={25} color='black' />
                                    </div>
                                    <div onClick={() => scrollContainer(200, containerRefs, 0)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowForwardIos size={25} color='black' />
                                    </div>
                                </div>
                            </div>

                            <div className='w-[100%] max-w-[550px] md:max-w-[1300px] flex flex-col items-start justify-center text-white'>
                                <div ref={containerRefs[5]} id='scrollbar' className='w-[100%] flex items-center justify-start gap-4 overflow-auto pt-2 pb-2 '>
                                    {
                                        movie_search_recomendation.map((elem) => (
                                            <Link to={`/genre/${elem.id}`}>
                                                <div className='w-[100px] flex flex-col items-center justify-start cursor-pointer'>
                                                    <div className='w-[90px] h-[90px] flex items-center justify-center overflow-hidden rounded-[50%]'>
                                                        <img src={elem.icon} alt="" className='h-[100%] w-[100%] object-cover' />
                                                    </div>
                                                    <p className='text-white text-14px md:text-[16px]'><b>{elem.name}</b></p>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-4'>
                                    <div onClick={() => scrollContainer(-200, containerRefs, 5)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowBackIos size={25} color='black' />
                                    </div>
                                    <div onClick={() => scrollContainer(200, containerRefs, 5)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowForwardIos size={25} color='black' />
                                    </div>
                                </div>
                            </div>



                            <div className='w-[100%] max-w-[550px] md:max-w-[1300px] flex flex-col items-start justify-center text-white'>
                                <p><b>Most Popular</b></p>
                                <div ref={containerRefs[1]} id='scrollbar' className='w-[100%] flex items-center justify-start gap-4 overflow-auto pt-2 pb-2 '>
                                    {
                                        popular.results &&
                                        popular.results.map((elem) => (
                                            elem.backdrop_path &&
                                                elem.poster_path ?
                                                <div onClick={() => setOpen(true)}>
                                                    <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] flex items-center justify-center'>
                                                        <img src={`${baseURLImg}${elem.poster_path}`} alt="" />
                                                    </div>
                                                </div>
                                                : !elem.poster_path ?
                                                    <div onClick={() => setOpen(true)}>
                                                        <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] min-h-[130px] md:min-h-[180px] text-center text-white flex flex-col p-1 gap-1 items-center justify-center border-solid border-[1px] border-white'>
                                                            <img src={`${baseURLImg}${elem.poster_path}`} alt="/" className='object-cover' />
                                                            <p className='text-[14px] md:text-[16px]'>{elem.title}</p>
                                                            <p className='text-[12px] md:text-[14px] text-blue-300'>see details</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null

                                        ))
                                    }
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-4'>
                                    <div onClick={() => scrollContainer(-200, containerRefs, 1)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowBackIos size={25} color='black' />
                                    </div>
                                    <div onClick={() => scrollContainer(200, containerRefs, 1)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowForwardIos size={25} color='black' />
                                    </div>
                                </div>
                            </div>

                            <div className='w-[100%] max-w-[550px] md:max-w-[1300px] flex flex-col items-start justify-center text-white'>
                                <div className='w-[100%] flex items-center justify-between'>
                                    <p><b>History</b></p>
                                    <Link to={`/genre/${36}`}>
                                        <p className='text-[14px] md:text-[14px] text-blue-400'>see all</p>
                                    </Link>
                                </div>
                                <div ref={containerRefs[2]} id='scrollbar' className='w-[100%] flex items-center justify-start gap-4 overflow-auto pt-2 pb-2 '>
                                    {
                                        history.results &&
                                        history.results.map((elem) => (
                                            elem.backdrop_path &&
                                                elem.poster_path ?
                                                <div onClick={() => setOpen(true)}>
                                                    <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] flex items-center justify-center'>
                                                        <img src={`${baseURLImg}${elem.poster_path}`} alt="" />
                                                    </div>
                                                </div>
                                                : !elem.poster_path ?
                                                    <div onClick={() => setOpen(true)}>
                                                        <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] min-h-[130px] md:min-h-[180px] text-center text-white flex flex-col p-1 gap-1 items-center justify-center border-solid border-[1px] border-white'>
                                                            <img src={`${baseURLImg}${elem.poster_path}`} alt="/" className='object-cover' />
                                                            <p className='text-[14px] md:text-[16px]'>{elem.title}</p>
                                                            <p className='text-[12px] md:text-[14px] text-blue-300'>see details</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null

                                        ))
                                    }
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-4'>
                                    <div onClick={() => scrollContainer(-200, containerRefs, 2)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowBackIos size={25} color='black' />
                                    </div>
                                    <div onClick={() => scrollContainer(200, containerRefs, 2)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowForwardIos size={25} color='black' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100%] max-w-[550px] md:max-w-[1300px] flex flex-col items-start justify-center text-white'>
                                <div className='w-[100%] flex items-center justify-between'>
                                    <p><b>Adventure</b></p>
                                    <Link to={`/genre/${12}`}>
                                        <p className='text-[14px] md:text-[14px] text-blue-400'>see all</p>
                                    </Link>
                                </div>
                                <div ref={containerRefs[3]} className='w-[100%] flex items-center justify-start gap-4 overflow-auto pt-2 pb-2 ' id='scrollbar'>
                                    {
                                        adventure.results &&
                                        adventure.results.map((elem) => (
                                            elem.backdrop_path &&
                                                elem.poster_path ?
                                                <div onClick={() => setOpen(true)}>
                                                    <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] flex items-center justify-center'>
                                                        <img src={`${baseURLImg}${elem.poster_path}`} alt="" />
                                                    </div>
                                                </div>
                                                : !elem.poster_path ?
                                                    <div onClick={() => setOpen(true)}>
                                                        <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] min-h-[130px] md:min-h-[180px] text-center text-white flex flex-col p-1 gap-1 items-center justify-center border-solid border-[1px] border-white'>
                                                            <img src={`${baseURLImg}${elem.poster_path}`} alt="/" className='object-cover' />
                                                            <p className='text-[14px] md:text-[16px]'>{elem.title}</p>
                                                            <p className='text-[12px] md:text-[14px] text-blue-300'>see details</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null

                                        ))
                                    }
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-4'>
                                    <div onClick={() => scrollContainer(-200, containerRefs, 3)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowBackIos size={25} color='black' />
                                    </div>
                                    <div onClick={() => scrollContainer(200, containerRefs, 3)} className='w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-slate-400'>
                                        <MdOutlineArrowForwardIos size={25} color='black' />
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100%] max-w-[550px] md:max-w-[1300px] flex flex-col items-start justify-center text-white'>
                                <div className='w-[100%] flex items-center justify-between'>
                                    <p><b>Horror</b></p>

                                    <Link to={`/genre/${27}`}>
                                        <p className='text-[14px] md:text-[14px] text-blue-400'>see all</p>
                                    </Link>
                                </div>
                                <div ref={containerRefs[4]} className='w-[100%] flex items-center justify-start gap-4 overflow-x-scroll pt-2 pb-2' id='scrollbar'>

                                    {
                                        horror.results &&
                                        horror.results.map((elem) => (
                                            elem.backdrop_path &&
                                                elem.poster_path ?
                                                <div onClick={() => setOpen(true)}>
                                                    <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] flex items-center justify-center'>
                                                        <img src={`${baseURLImg}${elem.poster_path}`} alt="" />
                                                    </div>
                                                </div>
                                                : !elem.poster_path ?
                                                    <div onClick={() => setOpen(true)}>
                                                        <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] min-h-[130px] md:min-h-[180px] text-center text-white flex flex-col p-1 gap-1 items-center justify-center border-solid border-[1px] border-white'>
                                                            <img src={`${baseURLImg}${elem.poster_path}`} alt="/" className='object-cover' />
                                                            <p className='text-[14px] md:text-[16px]'>{elem.title}</p>
                                                            <p className='text-[12px] md:text-[14px] text-blue-300'>see details</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null

                                        ))
                                    }

                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-4'>
                                    <div onClick={() => scrollContainer(-200, containerRefs, 4)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowBackIos size={25} color='black' />
                                    </div>
                                    <div onClick={() => scrollContainer(200, containerRefs, 4)} className='w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-slate-400'>
                                        <MdOutlineArrowForwardIos size={25} color='black' />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Home
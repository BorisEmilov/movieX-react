import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../apis/api'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import { Box, Divider, Modal } from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { RiEmotionSadLine } from 'react-icons/ri'
import Home from './Home'
import Nav from './Nav'
import Loader from './Loader'
import { movie_search_recomendation } from '../apis/buttons'



const Search = () => {
  const [availabilityData, setAvailabilityData] = useState([])
  const [searchMovie, setSearchMovie] = useState('')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [modal, setModal] = useState([])
  const [value, setValue] = useState('')

  const [isLoading, setIsLoading] = useState(true);

  const key = process.env.REACT_APP_API_KEY

  const baseURLImg = 'https://image.tmdb.org/t/p/original'

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchMovie}&page=1&include_adult=false`

  const search = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setIsLoading(true)
        setAvailabilityData(response.data)
      }).then(() => setIsLoading(false));
      setSearchMovie('')
    }
  }

  if (value !== '') {
    axios.get(`https://api.themoviedb.org/3/movie/${value}?api_key=${key}&language=en-US&append_to_response=watch%2Fproviders`).then((response) => {
      setModal(response.data)
    })
    setValue('')
  }


  return (
    <>
      {
        open &&
        <div className='absolute h-[100vh] w-[100vw] flex flex-col items-center justify-center backdrop-blur-sm bg-white/10 gap-2'>
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


      <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-start bg-gradient-to-r from-[#212f45] to-[#006466] p-3 gap-4'>
        <Nav />
        <input className='w-[85%] max-w-[550px] h-[35px] rounded-3xl text-center' type="text" value={searchMovie} onChange={event => setSearchMovie(event.target.value)} onKeyPress={search} placeholder='Search...' />

        {
          isLoading ?
            <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-8 text-[16px] md:text-[20px] text-white'>
              <div className='w-[100%] max-w-[550px] h-[400px] flex flex-wrap items-center justify-center gap-4 p-2 overflow-auto'>
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
              <p><b>*** Search for movie ***</b></p>
            </div>
            :
            availabilityData.results ?
              <div className='w-[100%] h-[90%] flex flex-col items-center justify-start gap-4'>
                <div className='w-[100%] flex items-center justify-center'>
                  <div onClick={() => setAvailabilityData([])} className='flex items-center justify-center p-2 rounded-[50%] bg-[#006466]'>
                    <RxCross2 size={20} color='white' />
                  </div>
                </div>
                <div className='w-[100%] max-w-[700px] h-[100%] text-[14px] md:text-[18px] lg:text-[20px] text-white grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 items-start justify-items-center gap-2 overflow-auto'>
                  {
                    availabilityData.results.map((elem) => (
                      elem.backdrop_path ?
                        elem.poster_path ?
                          <div onClick={handleOpen}>
                            <div onClick={() => setValue(elem.id)} className='w-[90%] max-w-[250px]  bg-[#0b525b] cursor-pointer flex flex-col items-center justify-start'>
                              <img src={`${baseURLImg}${elem.poster_path}`} alt='/' className='object-cover' />
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
                        :
                        elem.poster_path ?
                          <div onClick={handleOpen}>
                            <div onClick={() => setValue(elem.id)} className='w-[90%] max-w-[250px]  bg-[#0b525b] cursor-pointer flex flex-col items-center justify-start'>
                              <img src={`${baseURLImg}${elem.poster_path}`} alt='/' className='object-cover' />
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
              </div>
              :
              <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-8 text-[16px] md:text-[20px] text-white'>
                <div className='w-[100%] max-w-[550px] h-[400px] flex flex-wrap items-center justify-center gap-4 p-2 overflow-auto'>
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
                <p><b>*** Search for movie ***</b></p>
              </div>
        }


      </div>
    </>
  )
}

export default Search
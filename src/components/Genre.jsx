import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from './Nav'
import { page_buttons } from '../apis/buttons'
import { RiEmotionSadLine } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Divider } from '@mui/material'
import Loader from './Loader'
import { genres } from '../apis/buttons'

const Genre = () => {
  const [genreData, setGenreData] = useState([])
  const [modal, setModal] = useState([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const { id } = useParams()

  let genre_id = id

  const [isLoading, setIsLoading] = useState(true);
  const key = process.env.REACT_APP_API_KEY

  const baseURLImg = 'https://image.tmdb.org/t/p/original'



  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`).then((response) => {
      setGenreData(response.data)
    })
      .then(() => setIsLoading(false));
  }, [`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`, page, isLoading])

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
                    :
                    modal["watch/providers"].results.US.rent ?
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
            <Nav click={() => setIsLoading(true)} />
            <div className='w-[100%] max-w-[600px] flex items-center justify-center'>
              {
                genres.map((elem) => (
                  elem.id == genre_id &&
                  <p className='text-white text-[16px] md:text-[20px]'><b>{elem.name}</b></p>
                ))
              }
            </div>
            <div className='w-[100%] max-w-[600px] flex items-center justify-center text-white gap-2'>
              <div onClick={() => setPage(1)} className={`flex items-center justify-center p-1 ${page === 1 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>1</p>
              </div>
              <div onClick={() => setPage(2)} className={`flex items-center justify-center p-1 ${page === 2 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>2</p>
              </div>
              <div onClick={() => setPage(3)} className={`flex items-center justify-center p-1 ${page === 3 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>3</p>
              </div>
              <div onClick={() => setPage(4)} className={`flex items-center justify-center p-1 ${page === 4 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>4</p>
              </div>
              <div onClick={() => setPage(5)} className={`flex items-center justify-center p-1 ${page === 5 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>5</p>
              </div>
              <div onClick={() => setPage(6)} className={`flex items-center justify-center p-1 ${page === 6 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>6</p>
              </div>
              <div onClick={() => setPage(7)} className={`flex items-center justify-center p-1 ${page === 7 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>7</p>
              </div>
              <div onClick={() => setPage(8)} className={`flex items-center justify-center p-1 ${page === 8 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>8</p>
              </div>
              <div onClick={() => setPage(9)} className={`flex items-center justify-center p-1 ${page === 9 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>9</p>
              </div>
              <div onClick={() => setPage(10)} className={`flex items-center justify-center p-1 ${page === 10 && 'bg-gray-400'} rounded-md`}>
                <p onClick={() => setIsLoading(true)}>10</p>
              </div>
            </div>
            {
              genreData.results &&
              <div className='w-[100%] h-[100%] max-w-[600px] grid items-center justify-center justify-items-center grid-cols-3 md:grid-cols-4 gap-2 overflow-auto'>
                {
                  genreData.results.map((elem) => (
                    elem.backdrop_path &&
                    <div onClick={() => setOpen(true)}>
                      <div onClick={() => setValue(elem.id)} className='w-[90%] max-w-[250px]  bg-[#0b525b] cursor-pointer flex flex-col items-center justify-start'>
                        <img src={`${baseURLImg}${elem.poster_path}`} alt='/' className='object-cover' />
                      </div>
                    </div>
                  ))
                }
              </div>
            }
          </div>
      }
    </>
  )
}

export default Genre
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Nav from './Nav'
import { Divider } from '@mui/material'
import { RxCross1 } from 'react-icons/rx'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { RiEmotionSadLine } from 'react-icons/ri'
import Loader from './Loader'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'



function scrollContainer(scrollOffset, containerRef, containerIndex) {
  containerRef[containerIndex].current.scrollTo({
    left: containerRef[containerIndex].current.scrollLeft + scrollOffset,
    behavior: 'smooth',
  });
}



const Film = () => {
  const [data, setData] = useState([])
  const [recomended, setRecomended] = useState([])
  const [country, setCountry] = useState('US')

  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState([])
  const [value, setValue] = useState('')

  const containerRefs = [useRef(null)];

  const [video, setVideo] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams()

  const key = process.env.REACT_APP_API_KEY

  const baseURLImg = 'https://image.tmdb.org/t/p/original'

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=watch%2Fproviders`).then((response) => {
      setData(response.data)
    })
  }, [`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=watch%2Fproviders`])


  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`).then((response) => {
      setRecomended(response.data)
    }).then(() => setIsLoading(false));
  }, [`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=watch%2Fproviders`])


  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`).then((response) => {
      setVideo(response.data)
    })
  }, [`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`])



  if (value !== '') {
    axios.get(`https://api.themoviedb.org/3/movie/${value}?api_key=${key}&language=en-US&append_to_response=watch%2Fproviders`).then((response) => {
      setModal(response.data)
    })
    setValue('')
  }


  console.log(video)


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
                  <div onClick={() => setIsLoading(true)} className='flex items-center justify-center rounded-[50%] p-2 bg-gray-100 cursor-pointer'>
                    <BiDotsVerticalRounded onClick={() => setOpen(false)} size={18} color='black' />
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
                          <div onClick={() => setIsLoading(true)} className='flex items-center justify-center p-1'>
                            <p onClick={() => setOpen(false)}>See more details and where you can watch</p>
                          </div>
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
                            <div onClick={() => setIsLoading(true)} className='flex items-center justify-center p-1'>
                              <p onClick={() => setOpen(false)}>See more details and where you can watch</p>
                            </div>
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
                            <div onClick={() => setIsLoading(true)} className='flex items-center justify-center p-1'>
                              <p onClick={() => setOpen(false)}>See more details and where you can watch</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                  :
                  <div className='w-[100%] flex flex-col items-center justify-center text-left p-2 gap-2 text-white'>
                    <RiEmotionSadLine size={25} color='white' />
                    <p><b>no DATA about this movie in US !!!</b></p>
                    <Link to={`/film/${modal.id}`}>
                      <div onClick={() => setIsLoading(true)} className='flex items-center justify-center p-1'>
                        <p onClick={() => setOpen(false)} className='text-[14px] text-blue-600'>See more details and where you can watch</p>
                      </div>
                    </Link>
                  </div>
              }

            </div>
          }
        </div>
      }



      {isLoading ?
        <Loader />
        :
        <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-start bg-gradient-to-r from-[#212f45] to-[#006466] p-3 gap-4 overflow-auto'>
          <Nav />
          <div className='w-[100%] text-center text-[16px] md:text-[20px] text-white'>
            {
              data.title &&
              <p><b>{data.title}</b></p>
            }
          </div>
          <div className='w-[100%] max-w-[600px] flex items-center justify-center gap-4 mt-2'>
            {
              data.poster_path &&
              <img src={`${baseURLImg}${data.poster_path}`} alt="/" className='w-[40%] max-w-[250px] ml-3' />
            }

            <div className='w-[100%] h-[100%] flex flex-col items-center justify-start text-white gap-3'>
              {
                data.tagline &&
                <div className='w-[100%] flex items-center justify-start text-[14px] md:text-[16px]'>
                  <p><b>{data.tagline}</b></p>
                </div>
              }
              {
                data.genres &&
                <div className='w-[100%] flex items-center flex-wrap justify-start text-[14px] md:text-[16px] gap-2'>
                  {
                    data.genres.map((elem) => (
                      <p>{elem.name}</p>
                    ))
                  }
                </div>
              }
              {
                data.runtime &&
                <div className='w-[100%] flex items-center justify-start text-[14px] md:text-[16px]'>
                  <p><b>{data.release_date}</b></p>
                </div>
              }
              {
                data.runtime &&
                <div className='w-[100%] flex items-center justify-start text-[14px] md:text-[16px]'>
                  <p><b>{data.runtime}</b> min</p>
                </div>
              }
              {
                data.production_companies &&
                <div className='w-[100%] h-[100%] flex flex-col items-center justify-end '>
                  <div className='w-[100%] flex items-center justify-start gap-2'>
                    {
                      data.production_companies.map((elem) => (
                        elem.logo_path &&
                        <img src={`${baseURLImg}${elem.logo_path}`} alt='/' className='w-[20%] max-w-[35px] md:max-w-[50px] color-white' />
                      ))
                    }
                  </div>
                </div>
              }

            </div>
          </div>
          {
            data.overview &&
            <div className='w-[100%] max-w-[700px] flex items-center justify-center text-center text-[14px] md:text-[17px] text-white'>
              <p>{data.overview}</p>
            </div>
          }
          <Divider sx={{ width: '95%', maxWidth: '700px' }} />
          <div className='w-[100%] max-w-[700px] flex flex-col items-center jus gap-1 text-white'>
            <p className='text-[14px] md:text-[17px]'><b>Find a streaming platform</b></p>
            <div className='w-[100%] flex items-center justify-center gap-3 text-[14px] md:text-[17px]'>
              <div onClick={() => setCountry('ES')} className={`flex items-center justify-center p-2 ${country === 'ES' ? 'bg-gray-400 rounded-[10px]' : 'null'} cursor-pointer`}>
                <p><b>ES</b></p>
              </div>
              <div onClick={() => setCountry('US')} className={`flex items-center justify-center p-2 ${country === 'US' ? 'bg-gray-400 rounded-[10px]' : 'null'} cursor-pointer`}>
                <p><b>US</b></p>
              </div>
              <div onClick={() => setCountry('MX')} className={`flex items-center justify-center p-2 ${country === 'MX' ? 'bg-gray-400 rounded-[10px]' : 'null'} cursor-pointer`}>
                <p><b>MX</b></p>
              </div>
            </div>

            {
              data["watch/providers"] ?
                data["watch/providers"].results[country] ?
                  <div className='w-[100%] flex flex-col items-start justify-center gap-2'>
                    {
                      data["watch/providers"].results[country].flatrate &&
                      <>
                        <p>BUY and RENT</p>
                        <div className='w-[100%] flex items-center justify-start gap-3 overflow-auto'>
                          {
                            data["watch/providers"].results[country].flatrate.map((elem) => (
                              <img src={`${baseURLImg}${elem.logo_path}`} alt='/' className='w-[10%] max-w-[25px] md:max-w-[50px]' />
                            ))
                          }
                        </div>
                        <Divider sx={{ width: '100%' }} />
                      </>
                    }
                    {
                      data["watch/providers"].results[country].buy &&
                      <>
                        <p>BUY only</p>
                        <div className='w-[100%] flex items-center justify-start gap-3 overflow-auto'>
                          {
                            data["watch/providers"].results[country].buy.map((elem) => (
                              <img src={`${baseURLImg}${elem.logo_path}`} alt='/' className='w-[10%] max-w-[25px] md:max-w-[50px]' />
                            ))
                          }
                        </div>
                        <Divider sx={{ width: '100%' }} />
                      </>
                    }

                    {
                      data["watch/providers"].results[country].rent &&
                      <>
                        <p>RENT only</p>
                        <div className='w-[100%] flex items-center justify-start gap-3 overflow-auto'>
                          {
                            data["watch/providers"].results[country].rent.map((elem) => (
                              <img src={`${baseURLImg}${elem.logo_path}`} alt='/' className='w-[10%] max-w-[25px] md:max-w-[50px]' />
                            ))
                          }
                        </div>
                        <Divider sx={{ width: '100%' }} />
                      </>
                    }
                  </div>
                  :
                  <div className='w-[100%] flex items-center justify-center gap-3'>
                    <RiEmotionSadLine size={20} color='white' />
                    <p className='text-[13px] md:text-[15px]'>no data in your country</p>
                  </div>
                :
                <div><p>no streaming data for this movie</p></div>
            }
          </div>
          {
            recomended.results &&
            recomended.results.length >= 1 &&
            <>
              <p className='text-white text-[14px] md:text-[16px]'><b>RECOMENDED</b></p>
              <div className='w-[100%] max-w-[900px] flex flex-col items-center justify-center'>

                <div ref={containerRefs[0]} id='scrollbar' className='w-[100%] flex items-center justify-start overflow-auto gap-4 p-2'>
                  {
                    recomended.results.map((elem) => (
                      elem.backdrop_path &&
                        elem.poster_path ?
                        <div onClick={() => setOpen(true)}>
                          <div onClick={() => setValue(elem.id)} className='min-w-[100px] md:min-w-[140px] flex items-center justify-center'>
                            <img src={`${baseURLImg}${elem.poster_path}`} alt="/" className='object-cover' />
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
            </>
          }
        </div>
      }
    </>
  )
}

export default Film
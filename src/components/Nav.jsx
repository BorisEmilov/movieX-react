import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const Nav = ({click}) => {
  const [genres, setGenres] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const [openGenres, setOpenGenres] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`).then((response) => {
      setGenres(response.data)
    })
  }, [`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`])


  return (
    <>
      {
        openGenres &&
        <div className='absolute w-[100vw] h-[100vh] flex flex-col items-center justify-center backdrop-blur-sm bg-white/10 top-0 gap-2 z-50'>
          <div onClick={() => setOpenGenres(false)}>
            <RxCross1 size={30} color='white' />
          </div>
          <div className='w-[300px] h-[70%] backdrop-blur-md bg-black/70 rounded-[20px] overflow-auto p-2'>
            {
              genres.genres &&
              genres.genres.map((elem) => (
                <Link to={`/genre/${elem.id}`}>
                  <div onClick={click} className='w-[100%] flex items-center justify-center p-2 text-white text-[14px] md:text-[16px] cursor-pointer'>
                  {elem.name}
                </div>
                </Link>
              ))
            }
          </div>
        </div>
      }

      <div className='md:hidden w-[100%] h-[40px] flex items-center justify-between pl-2 pr-2'>

        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ ml: -2 }}
        >
          <AiOutlineMenu onClick={handleClick} size={25} color='white' />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Link to='/'>
            <MenuItem onClick={handleClose}>Home</MenuItem>
          </Link>
          <div onClick={() => setOpenGenres(true)}>
            <MenuItem onClick={handleClose}>Genres</MenuItem>
          </div>
          <MenuItem onClick={handleClose}>Tv Shows</MenuItem>
          <MenuItem onClick={handleClose}>My List</MenuItem>
        </Menu>


        <Link to='/search'>
          <BsSearch size={25} color='white' />
        </Link>
      </div>
    </>
  )
}

export default Nav
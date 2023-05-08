import axios from 'axios'
import React, { useEffect } from 'react'

const WatchProv = () => {

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/watch/providers/regions?api_key=407367f2b60dc1fc2d09c4ec31c9816d&language=en-US`).then((response) => {
        
      })
    }, [])
    


  return (
    <div>WatchProv</div>
  )
}

export default WatchProv
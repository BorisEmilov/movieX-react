import React from 'react'
import '../apis/loader.css'

const Loader = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-gradient-to-r from-[#212f45] to-[#006466] p-3 gap-4'>
    <div className="loader"></div>
    </div>
  )
}

export default Loader
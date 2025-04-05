import React from 'react'

const Home = () => {
    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                   
                    <button
                       
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
               
            </div>
           
           
        </div>
    )
}

export default Home
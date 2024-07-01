import React from 'react'
import { IoIosSearch } from "react-icons/io";
import Avatar from 'react-avatar';

const RightSidebar = ({otherUsers}) => {
  return (
    <div className='w-[25%] '>
      <div className='flex items-center p-2 rounded-full outline-none bg-gray-100'>
        <IoIosSearch size="21px" />
        <input type='text' className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
        {
          otherUsers?.amp((user)=>{
            return(
              <div key={user?._id} className='flex item-center justify-between my-3'>
          <div className='flex'>
            <div>
            <Avatar src="https://imgs.search.brave.com/D9s5zAFOq-EMMiIZEBKViIiSTIV-zsw2tc0dfOPQbY4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1wcm9maWxlLXBp/Y3R1cmVzLW1vbmtl/eS1mYWNlLTBqeHdt/cTZicG0zaHM5Y2Iu/anBn" size="30" round={true} />
            </div>
         <div className='ml-2'>
          <h1 className='font-bolf'>{user?.name}</h1>
          <p className='text-sm'>{`@${user?.username}`}</p>
         </div>
          </div>
          <Link to={`/profile/${user?._id}`}>
          <button className='bg-black text-white rounded-full px-4'>Profile</button>
          </Link>
        </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default RightSidebar
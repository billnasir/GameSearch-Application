 import PropTypes from 'prop-types'
 import {Link} from "react-router-dom"
 import {useState} from 'react'

function UserItem({user:{name,id,metacritic,platforms, released,background_image
}}) {
  const [isShown ,setIsShown]=useState(true);

  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm ">
    <img
        className="object-cover w-full h-48"
        src={background_image}
        alt="image"
    />
    <div className="p-4">
        <h4 className="text-xl font-bold	 tracking-tight text-white">
           {name}
        </h4>
 
         

        <p className="mb-2 py-2 leading-normal font-bold text-slate-400">
            Release Date:  { released}
        </p>

        <p className='my-1 pb-3'>Metacritic Score: <span class="font-bold">{metacritic? metacritic :'N/A'}</span></p>

       
        <button className="my-1 px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
            <Link to={`/user/${id}`}>Check it Out</Link>
            
        </button>
    </div>
</div>
  )
}

UserItem.propTypes={
  user:PropTypes.object.isRequired,
}

export default UserItem
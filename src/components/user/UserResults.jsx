import React from 'react'
import { useContext} from 'react'
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import{motion, AnimatePresence} from 'framer-motion'
import GameContext from '../../context/game/GameContext'; 

function UserResults() {
  const {users, loading}= useContext(GameContext)
  console.log(users)
   
 

   

   
  // const fetchUsers= async()=>{
  //  const response= await fetch(`https://rawg.io/api/games?token&key=${process.env.REACT_APP_KEY}&page_size=10`)

  //  const data = await response.json()
 
  //   setUsers(data.results)
  //   setLoading(false)
  // }

  
  if(!loading){
    return( <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
    <AnimatePresence>
    {users.map((user)=>(
      <motion.div
      key={user.id}
      initial={{opacity:0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >
      <UserItem key={user.id} user={user} />
      </motion.div>
    ))}
    </AnimatePresence>
  </div>
  )
  }else{
    return <Spinner />
  }
  
}

export default UserResults
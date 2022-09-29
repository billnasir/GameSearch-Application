import {createContext,  useState, useReducer} from "react";
import gameReducer from "./GameReducer";
 
const GameContext= createContext()

const GAME_URL=process.env.REACT_APP_URL
const GAME_TOKEN=process.env.REACT_APP_KEY

export const GameProvider=({children})=>{
  const initialState={
    users:[],
    user:{},
    screenshots:[],
    loading:false,
  }

  const[state, dispatch]= useReducer(gameReducer,initialState)

//Get initial users(testing purpose)
  const searchUsers= async(text)=>{
    setLoading()
    
    // const params=new URLSearchParams({
    //   q:text.toLowerCase()
    // })
    let slug=text.split(' ').join('-').toLowerCase()

    fetch(`https://rawg.io/api/games?search=${slug}/token&key=${process.env.REACT_APP_KEY}&page_size=12`)
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data)
      const {results}=data
      dispatch({
        type:'GET_USERS',
        payload:results,
      })
    })
  }

  const getScreenshots=async(id)=>{
    setLoading()
    fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_KEY}`)
    .then((response)=>response.json())
    .then((data)=>{
         
      const{results}=data
      console.log(results)
        
         dispatch({
          type:'GET_SCREENSHOT',
          payload:results,
        })
       
     
    })

    
  }

  //Get single game
  const getUser= async(id)=>{
    setLoading()
    
    
 
    fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_KEY}`)
    .then((response)=>response.json())
    .then((data)=>{
       console.log(data)
        
         dispatch({
          type:'GET_USER',
          payload:data,
        })
       
     
    })

    
  }


  //Clear users from state
  const clearUsers=()=>dispatch({type: 'CLEAR_USERS'})

  //Set loading
  const setLoading=()=> dispatch({type:'SET_LOADING'})

  return <GameContext.Provider value={{
   users:state.users,
   loading:state.loading,
   user:state.user,
   screenshots:state.screenshots,
   searchUsers,
   clearUsers,
   getUser,
   getScreenshots,
  }}>
  {children}
  </GameContext.Provider>
}

 export default GameContext
import React from 'react'
import{useEffect, useContext} from 'react'
import {useParams,Link} from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import GameContext from '../context/game/GameContext'
import DOMPurify from "dompurify";

 
function User() {
  const {getUser, user,getScreenshots,screenshots,loading}=useContext(GameContext)
   
  const params= useParams()
     
    
 useEffect(()=>{
  getUser(params.login)
  getScreenshots(params.login)
   },[params.login])

   const {
   name,
   released,
   description,
   background_image,
   developers,
   genres,
   metacritic,
   platforms,
   id
   }=user

    
   if(loading){
    return <Spinner />
   }
 
  return <>
    <div className="w-full mx-auto lg:w-10/12">
       <div className="mb-4">
        <Link to='/' className='btn btn-ghost text-white'>
         BACK TO SEARCH
        </Link>
         
       </div>
        <div className="grid grid-cols-1 xl:grid-cols-1
         lg:grid-cols-1 md:grid-cols-1 mb-8 md:gap-8">
         
          <div className="custom-card-image mb-6 md:mb-0">
            <div className=" shadow-lg card image-full">
            
              <figure>
                <img src={background_image} alt="" />
              </figure>
              
              <div className="card-body justify-end">
              <div>
              {genres?.map((items)=>(
              <div key={items.id} className="ml-2  badge badge-primary text-sm text-white">
                {items?.name}
              </div>
              ))}
              </div>
                <h2 className="card-title mb-0 xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl text-white">
                {name}
                </h2>
                <br/>
                <p className='font-medium xl:text-xl lg:text-xl md:text-lg sm:text-lg '><span className='text-white'>Released:</span>  {released}</p>

                <h1 className='font-bold   xl:text-xl lg:text-xl md:text-lg sm:text-lg text-white'>Publishers</h1>  
                {developers?.map((item)=>(
                <span key={item.id}  className='text-md'> 
                    {  item.name }  
                </span>
              ))}
              
              <div className='text-sm   font-xs mt-4'><span className='font-bold   xl:text-xl lg:text-xl md:text-lg sm:text-lg text-white'>Platforms:</span>  {platforms?.map((item)=>{
                 return <p className='text-sm my-1'>{item?.platform?.name}</p> 

              })}</div>
             
             </div>
            </div> 
          </div>   
    

    
            

              
               
              

              
              
           

            
        </div>
 
        <div className="alert shadow-lg bg-gray-800 py-10">
          <h1 className='text-lg'>Metacritic Score:<span className='font-bold '>{metacritic?metacritic :'N/A'}</span></h1>  
               </div>

               <h1 className='text-2xl font-semibold 	mt-7'>Screenshots</h1>
               <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 mt-4">
               {screenshots?.map((item)=>{
               return <img key={item?.id} className="object-cover w-full  rounded" src={item?.image} alt="photos" />
               })}
            
            
        </div>
       
        <div className='mt-10 w-full '>  
       <h1 className='text-2xl font-semibold 	mt-4'>Description</h1>
        <div className='mt-2' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(description)}}></div>
       </div>

    </div>
    
    
  </>
}

export default User
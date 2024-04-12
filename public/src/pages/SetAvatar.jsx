import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import loader from '../assest/Loader.gif';
import {ToastContainer,toast} from 'react-toastify';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"
import { Buffer } from 'buffer';
import  {setAvatarRoute}  from '../utils/APIRoutes';

export default function SetAvatar() {

   const api = "https://api.multiavatar.com/45678945";
   const navigate = useNavigate();
   const [avatars,setAvatars] = useState([]);
   const [isLoading,setIsLoading] = useState(true);
   const [selectedAvatar,setSelectedAvatar] = useState(undefined);
   const toastOptions = {
    position : "bottom-right",
    autoClose :8000,
    pauseOnHover:true,
    draggable:true,
    theme:'dark'
  };

  useEffect(()=> {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
  },[])

  const setProfilePicture = async ()=> {
      if(selectedAvatar === undefined){
        toast.error("Select an Avatar",toastOptions);
      } else{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        console.log(setAvatarRoute);
        console.log(user._id);
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
          image: avatars[selectedAvatar],
        });
        console.log("reach");
        if(data.isSet){
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user',JSON.stringify(user));
          navigate('/');
        }else{
          toast.error("Error setting avatar. Please try again",toastOptions);
        }
      }
  };
  useEffect (()=> {
     const asyncfn = async()=>{
      const data = [];
       for(let i=0;i<4;i++){
       const image =  await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
       const buffer = new Buffer(image.data);
       data.push(buffer.toString("base64"));
       }
       setAvatars(data);
     setIsLoading(false);
   }
   asyncfn();
},[]);
  return ( <>
  {
     isLoading ? <Container>
      <img src={loader} alt="Loader" className="loader"/>
     </Container> : (
    <Container>
        <div className="title-container">
         <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">{
           avatars.map((avatar,index)=>{
            console.log(avatar);
            return(
               <div
               key={index} 
               className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                 <img 
                 src={`data:image/svg+xml;base64,${avatar}`} 
                 alt='avatar'
                  onClick={()=>setSelectedAvatar(index)}
                 />
                </div>
            );
           })}
           </div>
           <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
    </Container>
    )}
    <ToastContainer /> 
  </>
  );
  }


 const Container = styled.div`
  {display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 gap: 3rem;
 background-color: #131334;
 height: 100vh;
 width: 100vw;
 .loader{
    max-inline-size: 100%;
 }
 .title-container{
    h1{
        color: orange;
    }
 }
 .avatars{
    display: flex;
    gap:2rem;
  .avatar{
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img{
        height: 6rem;
    }
  }
  .selected{
    border: 0.4rem solid white;
  }
 }
 }
 .submit-btn{
  background-color: chocolate;
  color: antiquewhite;
  padding: 1rem 2rem;
  border:none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  &:hover{
      background-color: cornflowerblue;
  }
 }   
 `;


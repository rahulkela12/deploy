import React from 'react'
import styled from 'styled-components'
import hello from '../assest/hello-gif-1.gif'
export default function Welcome({currentUser}) {
  return (
    <Container>
      <img src={hello} alt = 'Hello'/>
      <h1>
        Welcome,<span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start Messaging</h3>
    </Container>
  )
}

const Container = styled.div`
{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: aliceblue;
    img{
       height: 20rem;
    }
    span{
        color: #4e0eff;
    }
}`;
import React from 'react'
import './home.css'
import { Button } from '@mui/material'
import { SendIcon } from 'lucide-react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  return (

    <div className='bg-[#001220] text-cyan-50'>
      <div className="spacer layer1"></div>
      <section className='relative flex flex-col items-center min-h-[8rem] p-24'>
        <h1>Hello!</h1>
        <p>This is the Homepage for the task submission by Sahil Khadayate</p>

<div className='flex flex-row justify-between w-full mt-10'>
  
<Button variant="contained" color='secondary' startIcon={<ArrowBackIosNewIcon />} onClick={()=>navigate('/getdata')} >
View Table
</Button> 
<Button variant="contained" color='secondary' endIcon={<ArrowForwardIosIcon />} onClick={()=>navigate('/transact')}>
Add amount
</Button>
</div>
      </section>


    </div>
  )
}

export default Home
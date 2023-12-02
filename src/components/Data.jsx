import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chart from './Chart';
import axios from 'axios';
const apikey = "https://jsonplaceholder.typicode.com/posts"


const Data = () => {
const navigate = useNavigate();
const [totalData, setTotalData] = React.useState(null);
const [userData, setUserData] = React.useState(null);
const [piechartdata, setPiechartData] = React.useState([]);

React.useEffect(() => {
  const getData=async()=>{
    const res = await axios.get(apikey);
    const tempdata = res.data;
    setTotalData(tempdata);
    const filteredPosts = tempdata.filter(post => post.userId === 1);
    setUserData(filteredPosts); 
    //console.log("res:",filteredPosts);
    
  }
  getData();

}, [])

React.useEffect(() => {
  // Update piechartdata with the lengths
  setPiechartData([userData?.length || 0, totalData?.length-userData?.length || 0]);
}, [userData, totalData]);

//console.log("piechartdata:", piechartdata);

  return (
    <div className=''>
      <div className="bg-black h-14 flex flex-row"><Button variant="contained" color='secondary' startIcon={<ArrowBackIosNewIcon />} onClick={()=>navigate('/')} style={{marginTop:'1.5rem', marginLeft:'2rem'}}>
Homepage
</Button> <div className=' text-cyan-50 text-2xl ml-64 mt-3'> Table showing posts by userId:1</div></div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell > <strong>ID</strong> </TableCell>
            <TableCell ><strong>Title</strong></TableCell>
            <TableCell align="right"><strong>Body</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {userData && userData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell align="right">{row.body}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

<Chart data = {piechartdata}/>

    </div>
    
  );
}


export default Data
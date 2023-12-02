import * as React from 'react';
import { collection,addDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ArrowBackwardIosIcon from '@mui/icons-material/ArrowBackIosNew'
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  

const defaultTheme = createTheme();

const Transaction=()=>{
    const [wrongAddress,setwrongAddress]=React.useState(true);
    const [walletConnected,setWalletconnected]=React.useState(false);
    const [currentAccount,setCurrentAccount]=React.useState("");
    const [isLoading,setIsLoading]=React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate  = useNavigate();
    console.log(currentAccount)
    const checkIfWalletConnected= async()=>{
       // checkNetwork();
        try {
          
          const {ethereum} = window;
          
          if(!ethereum){
            console.log("Metamask not present!");
            setIsLoading(false);
            return;
          }
          else{
           // console.log("We have the object",ethereum);
      
            const accounts = await ethereum.request({method:'eth_accounts'});
      
            if(accounts.length !==0){
              const account = accounts[0];
              console.log("Authorized Account found!", account);
              setWalletconnected(true);
              setCurrentAccount(account);
            }
            else{
              console.log("Authorized account not found!");
              setWalletconnected(false);
            }
          }
    
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      };

    //   const checkNetwork =async()=>{
    //     try{
    //       //console.log("type of network version is: ",typeof(window.ethereum.networkVersion))
    //       if(window.ethereum.networkVersion !=="11155111"){
    //         alert("Please connect to sepolia!")
    //       }
    //     }
    //     catch(error){
    //     console.error(error);
    //     }
    //   }
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try{
        const amtref = await addDoc(collection(db,"deposits"), {
            account:currentAccount ,
            amount:data.get('amount') ,
          });
          setOpen(true);
          console.log("added successfully", amtref);
    }
   catch{
    console.error("Couldn't add to database")
   }
   
  };

  // const validateAmount = (e)=>{
  //   let inputamount=e.target.value;

  // }
  const ValidateAddress = (e)=>{
   // console.log(e.target.error);
    let inputaddress=e.target.value;
    const validAddress = (inputaddress.startsWith("0x") && inputaddress.length===42) || inputaddress==="";
    setwrongAddress(!validAddress) 
  }
  const connectWalletAction= async()=>{
    try {
      const {ethereum} = window;
      if(!ethereum){
        console.log("Not connected!");
        alert("Please connect to metamask");
        return;
      }

      const accounts = await ethereum.request({method:'eth_requestAccounts',});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  React.useEffect(() => {
    setIsLoading(true);
    //checkNetwork();
    checkIfWalletConnected();
  }, []); 


  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className='absolute left-9 top-8'>
        <Button variant="contained" color='secondary' endIcon={<ArrowBackwardIosIcon />} onClick={()=>navigate('/')}>
Homepage
</Button>
        </div>
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AttachMoneyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Deposit Here
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
              <Grid item xs={12}>
  <TextField
    required
    error={wrongAddress}
    fullWidth
    id="walletaddress"
    label={!walletConnected?"Wallet Address":''}
    name="walletaddress"
    value={walletConnected?currentAccount:null}
     // Set the value to currentAccount if it exists, otherwise an empty string
    onChange={(e) => ValidateAddress(e)}
    disabled={walletConnected}
   
  />
</Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
      
                  name="amount"
                  label="Amount"
                  type="number"
                  id="amount"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              store
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              disabled={currentAccount.length>0?true:false}
              sx={{ mt: 3, mb: 2 }}
              onClick={connectWalletAction}
            >
              {currentAccount.length?"connected":"Connect"}
            </Button>
            <Grid container justifyContent="flex-end">
             
            </Grid>
          </Box>
        </Box>
     
      </Container>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Successfully Added to Database!
  </Alert>
</Snackbar>
    </ThemeProvider>
  );
}


export default Transaction
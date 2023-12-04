"use client";
import {ChangeEvent, useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../../hooks/useAuth';
import { AuthenicationContext } from './context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  zborder: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AuthModal({buttonType}: {buttonType:boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disable, setDisable] = useState(true);
 
  const {signIn,signUp} = useAuth();
  const {loading,data,error} = useContext(AuthenicationContext);
  const [modalInput, setModalInput] = useState({ 
                                                firstName: "",
                                                lastName:"",
                                                email:"",
                                                phone: "",
                                                city:"",
                                                password: ""
                                              });
  const siginText = buttonType ? "Sign Up": "Sign In";
  const buttonClassName = buttonType ? "mr-3":" bg-blue-400 text-white " ;

  useEffect(()=>{
    if(!buttonType){
        if(modalInput.email.length>0 && modalInput.password.length>0){
           return setDisable(false);
        }
    }
    else{
      if(modalInput.email.length>0 && modalInput.password.length>0 && modalInput.firstName.length>0 && modalInput.lastName.length>0 && modalInput.city.length>0 )
          return setDisable(false);
    }
    setDisable(true);
  },[modalInput])

  const inputHandler =(e:ChangeEvent<HTMLInputElement>) =>{
    setModalInput({...modalInput, [e.target.name]: e.target.value});
  }

  const AuthenicatonHandler = () => {
    console.log('on button click');
    if(!buttonType)
    {
      signIn({email:modalInput.email, password: modalInput.password}, handleClose);
    }
    else 
    {
      signUp({email:modalInput.email, password: modalInput.password, firstname:modalInput.firstName, lastname: modalInput.lastName, city:modalInput.city, phone: modalInput.phone}, handleClose);
    }
  } 
  console.log(loading );
  console.log(error );
  console.log(data );
  return (
    <div>
   
      <button onClick={handleOpen}  className={`border p-1 px-4 rounded ${buttonClassName}`}>{siginText}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? <div className="py-24 px-2 h-600px flex justify-center"> <CircularProgress /></div> :
            <div className="p-2 h-[600px]">
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                    <p className="text-sml">
                        {buttonType ?  "Create Account" : "Sign In"}
                  
                    </p>
                  
                </div>
                <div className=".m-auto">
                  {error ? <Alert severity="error">{error}!</Alert>: null}
                    <h2 className="text-2xl font-light text-center">
                        {buttonType ? "Create Your OpenTable Account" : "Log Into Your Account"}
                    </h2>
                    {data?.firstName}
                    <AuthModalInputs inputs={modalInput} handleChangeInputs={inputHandler} accountType={buttonType}/>
                
                    <button className="bg-red-600 uppercase w-full text-white p-3 text-sm mb-5 disabled:bg-gray-400" onClick={AuthenicatonHandler} disabled={disable}> {buttonType ? "Create Account" :"Sign In"}</button>
                </div>


            </div>
          }
        </Box>
      </Modal>
    </div>
  );
}
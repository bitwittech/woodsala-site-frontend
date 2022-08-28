import React,{useContext} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Store} from '../../context/Context'

export default function SnackBar() {

  const {state: {Notify}, dispatch} = Store();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
     
  return (
      <>
          {Notify.open === true  &&   
          <Snackbar open={Notify.open} autoHideDuration={6000} onClose={()=>dispatch({type : 'Notify',payload : {open: false, variant : null,massage : null}})}>
                <Alert onClose={()=>dispatch({type : 'Notify',payload : {open: false, variant : null,massage : null}})} severity = {Notify.variant}  sx={{ width: '100%' }}>
                    {Notify.message}
                </Alert>
            </Snackbar>
            }
  </>
  )
}

// error warning info success

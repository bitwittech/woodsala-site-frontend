import * as React from 'react';
import {
    Backdrop,
    Box,
    Modal,Button,
    Fade,
    Typography}  from '@mui/material';

import {useDispatch,useSelector} from 'react-redux';
import {thanks} from '../../Redux/action/action';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  textAlign : 'center',
  p: 3,
};

export default function Thanks() {
  const dispatch = useDispatch();
  const state = useSelector(state=>state)

  return (
    <>
    {console.log(state)}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={state.thanks.open}
        // closeAfterTransition
        disableBackdropClick
        disableEscapeKeyDown
        BackdropComponent={Backdrop}
      >
        <Fade in={state.thanks.open}>
          <Box sx={style}>
            <CheckCircleRoundedIcon color = 'primary'  sx = {{fontSize : '50px'}}></CheckCircleRoundedIcon>
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Thanks You!
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Your are all set, your order <strong>{state.thanks.payload}</strong> will be coming on your way. 
            </Typography>
            <Button sx = {{mt : 1}} onClick ={()=>{ dispatch(thanks({open:false})); window.location.href = '/'}} variant = 'outlined'>Continue Shopping</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
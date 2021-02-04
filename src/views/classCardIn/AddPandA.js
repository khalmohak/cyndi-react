import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, Button, TextField} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  pandaAddButton: {
    backgroundColor: '#025fa1',
    color: '#ffffff',
    '&:hover': {
      color: '#025fa1',
      borderColor: "#025fa1"
    }
  }
}));

const AddPandA = ({className, ...rest})=>{
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} className={classes.pandaAddButton}>Add</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Add P&A</h3>
            <form>
              <TextField
                label="Title"
                id="formTitle"
                placeholder="Title"
              />
              <TextField
                label="Hello"
                id="formDescription"
                placeholder="Description"
              />

            </form>
          </div>
        </Fade>
      </Modal>
    </div>

  )

};

export default AddPandA;



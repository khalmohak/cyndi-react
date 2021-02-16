import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Backdrop, Box, Button, Fade, Menu, MenuItem, Modal, TextField} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';

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

const AddPandA = ({className, ...rest}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //const [pandaType, setPandaType] = useState();
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    formTitle: "",
    formDescription: "",
    maxMarks: "",
    eachQuestionMarks: "",
    maxDuration: "",
    eachQuestionDuration: "",
    pandaType: ""
  });

  const open2 = Boolean(anchorEl);


  const handleOpenModal = (e) => {
    sessionStorage.setItem('pandaType', e);
    setAnchorEl(null);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleFormTitle = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.formTitle = title;
  };
  const handleFormDescription = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.formDescription = title;
  };
  const handleFormmaxMarks = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.maxMarks = title;
  };
  const handleFormEachMarks = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.eachQuestionMarks = title;
  };
  const handleFormMaxDuration = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.maxDuration = title;
  };
  const handleFormEachDuration = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.eachQuestionDuration = title;
  };

  const nextButton = () => {
    let form = formDetails;
    form.pandaType = sessionStorage.getItem('pandaType');
    setFormDetails(form);
    sessionStorage.setItem('formDetails', JSON.stringify(formDetails));
    navigate('/app/resources', {replace: true});
  };

  return (
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.pandaAddButton}>
        Add
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open2}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={e => handleOpenModal("Projects")} value={"Projects"}>Projects</MenuItem>
        <MenuItem onClick={e => handleOpenModal("Assignments")} value={"Assignments"}>Assignments</MenuItem>
      </Menu>

      {/*Modal form for projects and assignements*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
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
                onChange={handleFormTitle}
              />
              <br/>
              <TextField
                label="Description"
                id="formDescription"
                onChange={handleFormDescription}
              />
              <br/>
              <TextField
                label="Max marks"
                id="max marks"
                onChange={handleFormmaxMarks}
              />
              <TextField
                label="Each question marks"
                id="each question marks"
                onChange={handleFormEachMarks}
              />
              <br/>
              <TextField
                label="Max duration"
                id="maxDuration"
                onChange={handleFormMaxDuration}
              />
              <TextField
                label="Each question duration"
                id="eachQuestionDuration"
                onChange={handleFormEachDuration}
              />
              <br/>
              <Box
                mt={2}
              >
                <Button className={classes.pandaAddButton} onClick={nextButton}>Next</Button>
              </Box>

            </form>
          </div>
        </Fade>
      </Modal>
    </div>

  )

};

export default AddPandA;



import React from 'react';
import {
  Button,
  Fade,
  Grid,
  makeStyles, Modal,
  TextField
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import changePasswordAction from "../../../actions/changePasswordAction";
import {useDispatch, useSelector} from "react-redux";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import checkPasswordAction from "../../../actions/checkPasswordAction";
import store from "../../../store";

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
  checkIcon: {
    color: "Green"
  },
  clearIcon: {
    color: 'red'
  }

}));


const ChangePassword = ({className, ...rest}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [pwdChange, setPwdChange] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState();
  const [ifDigit, setIfDigit] = React.useState();
  const [ifLength, setIfLength] = React.useState();
  const [ifSymbol, setIfSymbol] = React.useState();
  const [pwdValid, setpwdValid] = React.useState(false);
  const dispatch = useDispatch();
  const misc = useSelector(state => state.misc)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const savePassword = () => {
    console.log(pwdValid)
    if (pwdValid) {
      dispatch(checkPasswordAction({
        email: sessionStorage.getItem('userEmail'),
        password: oldPassword,
        role: sessionStorage.getItem('userRole')
      }))

      //console.log(store.getState().misc.checkPassword)
      console.log(store.getState().misc)
    } else {
      //throw error
    }

    //console.log(pwdValid);
  }



  if (store.getState().misc.checkPassword && pwdValid) {
    console.log("old Password is correct")
    // dispatch(changePasswordAction({
    //   email: sessionStorage.getItem('userEmail'),
    //   password: confirmPassword
    // }))
  }

  const regExValidator = (text, regEx) => {
    if (text.match(regEx) != null) {
      console.log("true")
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <Grid container spacing={3} style={{marginTop: "10px"}}>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Grid container>
            <Grid item md={11} xs={11}>
              <TextField
                fullWidth
                label="Old Password"
                type="password"
                variant="outlined"
                onChange={e => {
                  setOldPassword(e.target.value)

                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={1} xs={1}>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Grid container>
            <Grid item md={11} xs={11}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                onChange={e => {
                  setPassword(e.target.value)
                  setPwdChange(true)
                  setIfSymbol(regExValidator(e.target.value, '[@#$%_*-]'))
                  setIfLength(e.target.value.length > 7)
                  setIfDigit(regExValidator(e.target.value, '[0-9]'))
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={1} xs={1}>
              {
                password === confirmPassword && pwdChange ? <CheckIcon className={classes.checkIcon}/> :
                  <ClearIcon className={classes.clearIcon}/>}
            </Grid>
          </Grid>
          {ifSymbol ? <div className={classes.checkIcon}>Please use at least one symbol from @#$%_*-</div> :
            <div className={classes.clearIcon}>Please use at least one symbol from @#$%_*-</div>}
          {ifDigit ? <div className={classes.checkIcon}>Please use at least one digit from 0 to 9</div> :
            <div className={classes.clearIcon}>Please use at least one digit from 0 to 9</div>}
          {ifLength ? <div className={classes.checkIcon}>Password should be at least 8 characters long</div> :
            <div className={classes.clearIcon}>Password should be at least 8 characters long</div>}
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Grid container>
            <Grid item md={11} xs={11}>
              <TextField
                fullWidth
                label="Confirm password"
                type="password"
                variant="outlined"
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  if (password === e.target.value && ifLength && ifSymbol && ifDigit) {
                    console.log("password fully validated")
                    setpwdValid(true);
                  }else{
                    setpwdValid(false);
                  }
                }
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={1} xs={1}>
              {password === confirmPassword && pwdChange ? <CheckIcon className={classes.checkIcon}/> :
                <ClearIcon className={classes.clearIcon}/>}
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={savePassword}>Save</Button>
      </Grid>
      {/*<div>*/}
      {/*  <Button onClick={handleOpen}>*/}
      {/*    Change Password*/}
      {/*  </Button>*/}
      {/*  <Modal*/}
      {/*    aria-labelledby="transition-modal-title"*/}
      {/*    aria-describedby="transition-modal-description"*/}
      {/*    className={classes.modal}*/}
      {/*    open={open}*/}
      {/*    onClose={handleClose}*/}
      {/*    closeAfterTransition*/}
      {/*    BackdropComponent={Backdrop}*/}
      {/*    BackdropProps={{*/}
      {/*      timeout: 500,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Fade in={open}>*/}
      {/*      <div className={classes.paper}>*/}
      {/*        <h2 id="transition-modal-title">Change Password</h2>*/}
      {/*        <Grid container spacing={3} style={{marginTop: "10px"}}>*/}
      {/*          <Grid*/}
      {/*            item*/}
      {/*            md={12}*/}
      {/*            xs={12}*/}
      {/*          >*/}
      {/*            <Grid container>*/}
      {/*              <Grid item md={11} xs={11}>*/}
      {/*                <TextField*/}
      {/*                  fullWidth*/}
      {/*                  label="Old Password"*/}
      {/*                  type="password"*/}
      {/*                  variant="outlined"*/}
      {/*                  onChange={e => {*/}
      {/*                    setOldPassword(e.target.value)*/}

      {/*                  }}*/}
      {/*                  InputLabelProps={{*/}
      {/*                    shrink: true,*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </Grid>*/}
      {/*              <Grid item md={1} xs={1}>*/}
      {/*              </Grid>*/}
      {/*            </Grid>*/}
      {/*          </Grid>*/}
      {/*          <Grid*/}
      {/*            item*/}
      {/*            md={12}*/}
      {/*            xs={12}*/}
      {/*          >*/}
      {/*            <Grid container>*/}
      {/*              <Grid item md={11} xs={11}>*/}
      {/*                <TextField*/}
      {/*                  fullWidth*/}
      {/*                  label="New Password"*/}
      {/*                  type="password"*/}
      {/*                  variant="outlined"*/}
      {/*                  onChange={e => {*/}
      {/*                    setPassword(e.target.value)*/}
      {/*                    setPwdChange(true)*/}
      {/*                    setIfSymbol(regExValidator(e.target.value, '[@#$%_*-]'))*/}
      {/*                    setIfLength(e.target.value.length > 7)*/}
      {/*                    setIfDigit(regExValidator(e.target.value, '[0-9]'))*/}
      {/*                  }}*/}
      {/*                  InputLabelProps={{*/}
      {/*                    shrink: true,*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </Grid>*/}
      {/*              <Grid item md={1} xs={1}>*/}
      {/*                {*/}
      {/*                  password === confirmPassword && pwdChange ? <CheckIcon className={classes.checkIcon}/> :*/}
      {/*                    <ClearIcon className={classes.clearIcon}/>}*/}
      {/*              </Grid>*/}
      {/*            </Grid>*/}
      {/*            {ifSymbol ? <div className={classes.checkIcon}>Please use at least one symbol from @#$%_*-</div> :*/}
      {/*              <div className={classes.clearIcon}>Please use at least one symbol from @#$%_*-</div>}*/}
      {/*            {ifDigit ? <div className={classes.checkIcon}>Please use at least one digit from 0 to 9</div> :*/}
      {/*              <div className={classes.clearIcon}>Please use at least one digit from 0 to 9</div>}*/}
      {/*            {ifLength ? <div className={classes.checkIcon}>Password should be at least 8 characters long</div> :*/}
      {/*              <div className={classes.clearIcon}>Password should be at least 8 characters long</div>}*/}
      {/*          </Grid>*/}
      {/*          <Grid*/}
      {/*            item*/}
      {/*            md={12}*/}
      {/*            xs={12}*/}
      {/*          >*/}
      {/*            <Grid container>*/}
      {/*              <Grid item md={11} xs={11}>*/}
      {/*                <TextField*/}
      {/*                  fullWidth*/}
      {/*                  label="Confirm password"*/}
      {/*                  type="password"*/}
      {/*                  variant="outlined"*/}
      {/*                  onChange={e => {*/}
      {/*                    setConfirmPassword(e.target.value);*/}
      {/*                    if (password === e.target.value && ifLength && ifSymbol && ifDigit) {*/}
      {/*                      console.log("password fully validated")*/}
      {/*                      setpwdValid(true);*/}
      {/*                    }else{*/}
      {/*                      setpwdValid(false);*/}
      {/*                    }*/}
      {/*                  }*/}
      {/*                  }*/}
      {/*                  InputLabelProps={{*/}
      {/*                    shrink: true,*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </Grid>*/}
      {/*              <Grid item md={1} xs={1}>*/}
      {/*                {password === confirmPassword && pwdChange ? <CheckIcon className={classes.checkIcon}/> :*/}
      {/*                  <ClearIcon className={classes.clearIcon}/>}*/}
      {/*              </Grid>*/}
      {/*            </Grid>*/}
      {/*          </Grid>*/}
      {/*          <Button onClick={savePassword}>Save</Button>*/}
      {/*        </Grid>*/}
      {/*      </div>*/}
      {/*    </Fade>*/}
      {/*  </Modal>*/}
      {/*</div>*/}
    </>
  );
};

export default ChangePassword;



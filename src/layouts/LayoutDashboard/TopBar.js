import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppBar, Box, Button, Hidden, IconButton, makeStyles, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import {LogoLarge, LogoSmall} from '../../components/Logo';
import {Add, ExitToApp} from '@material-ui/icons'
import {getRoleColor} from "../../utils/GetRoleColor";
import {useNavigate} from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  appBar: {
    backgroundColor: theme.palette.colorPrimaryTeacher.main
  },
}));


const TopBar = ({
                  className,
                  onMobileNavOpen,
                  ...rest
                }) => {

  //const [ifShow,setIfShow] = useState(true);

  const removeLoggedInStatus = () => {
    sessionStorage.removeItem('loggedIn');
  }
  const navigate = useNavigate();
  // let addButtonRoute = "";
  //
  // if(sessionStorage.getItem('currentTab') == "Class"){
  //   addButtonRoute = "/add/class";
  //   ifShow=true;
  //   //setIfShow(true);
  // }
  // else if(sessionStorage.getItem('currentTab') == "Notifications"){
  //   addButtonRoute = "/app/addnotification";
  //   ifShow=true;
  //   //setIfShow(true);
  // }
  // else{
  //   setIfShow(false);
  // }

  // function showTopBar(){
  //   if(ifShow){
  //     return(
  //       <RouterLink to={addButtonRoute}>
  //         <Button
  //           variant="contained"
  //           color={getRoleColor()}
  //           style={{
  //             outline: 'none',
  //             color: '#fff',
  //             backgroundColor: '#00000000'
  //           }}
  //
  //           startIcon={<Add/>}
  //
  //         >
  //           Add
  //         </Button>
  //       </RouterLink>
  //     )
  //   }
  // }

  return (
    <React.Fragment>
      <AppBar
        className={getRoleColor()}
        position="sticky"
        elevation={4}
        {...rest}
      >
        <Toolbar>
          {/*<Hidden lgUp>*/}
          <IconButton
            edge="start"
            color="inherit"
            style={{
              outline: 'none'
            }}
            onClick={() => {
              onMobileNavOpen()
            }}
          >
            <MenuIcon/>
          </IconButton>


          <Box
            flexGrow={1}
            ml="100px"
          />
          <Hidden mdDown>
            <RouterLink to="/app/class">
              <LogoLarge/>
            </RouterLink>
          </Hidden>
          <Hidden lgUp>
            <RouterLink to="/app/class">
              <LogoSmall/>
            </RouterLink>
          </Hidden>

          <Box flexGrow={1}/>


          {/*{showTopBar()}*/}



          <Hidden mdDown>
            <IconButton color="inherit" style={{
              outline: 'none', color: '#fff'
            }}>

              <NotificationsIcon className={'button_notifi'}/>
            </IconButton>

            <IconButton color="inherit" style={{
              outline: 'none', color: '#fff'
            }}>
              <RouterLink to='/'>
                <ExitToApp onClick={removeLoggedInStatus} style={{
                  outline: 'none',
                  color: '#fff',
                  backgroundColor: '#00000000'
                }}/>
              </RouterLink>
            </IconButton>
          </Hidden>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};


export default TopBar;

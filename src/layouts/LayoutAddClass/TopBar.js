import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppBar, Box, Hidden, makeStyles, Toolbar, Typography} from '@material-ui/core';
import {LogoLarge, LogoSmall} from 'src/components/Logo';
import {getRoleColor} from "../../utils/GetRoleColor";
import {useNavigate} from "react-router";
//import history from "../../utils/history";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  appBar: {
    backgroundColor: theme.palette.colorPrimaryTeacher.main
  }
}));

const TopBar = ({
                  className,
                  ...rest
                }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const removeLoggedInStatus = () => {
    sessionStorage.removeItem('loggedIn');
  }
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar
        className={getRoleColor()}
        position="sticky"
        elevation={4}
        {...rest}
      >
        <Toolbar>

          {/*<IconButton
            edge="start"
            color="inherit"
            style={{
              outline: 'none'
            }}
            onClick={history.back}
          >
            <ArrowBackIos/>
          </IconButton>*/}

          <Box flexGrow={1}/>

          <Typography>
            Add Class
          </Typography>

          <Hidden mdDown>
            <RouterLink to="/app/dashboard">
              <LogoLarge/>
            </RouterLink>
          </Hidden>
          <Hidden lgUp>
            <RouterLink to="/app/dashboard">
              <LogoSmall/>
            </RouterLink>
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

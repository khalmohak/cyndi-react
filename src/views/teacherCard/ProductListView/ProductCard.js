import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Avatar, Box, Card, CardContent, Divider, Grid, Link, makeStyles, Tooltip, Typography, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper} from '@material-ui/core';
import CardHeader from '../../../components/card_header_white';
import MultiSlider, {Progress} from "react-multi-bar-slider";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'10px',
    width:"500px"
  },
  cardHeaderBg:{
    backgroundColor:'#FFA500'
  },
  avatar:{
    height:'60px',
    width:'60px'
  },
  className:{
    marginLeft:"70px"
  },
  nextClassDate:{
    fontSize:'12px',
    fontWeight:'bold'
  },
  nextClassDateBox:{
    width:'400px',
    marginLeft:'50px',

    position:'flex'
  },
  title:{
  position:'relative',
  boxShadow: `5px #808080`,
},
  classDescription:{
    backgroundColor:'#fff',
    borderRadius:'7px'
  },
  cardContent:{
    backgroundColor:'#b0ada4'
  },
  table:{
    borderRadius:'7px',

  },
  done:{
    color:"#0000ff"
  }
  ,
  remaining:{
  color:"#ffff00"
},
  next:{
    color:"#00ff00"
  }

}));

function createData(name, classes, assignments, projects, test_quiz) {
  return { name, classes, assignments, projects, test_quiz };
}

const rows = [
  createData('Classes', 12, 6, 6, '12/5/'),
  createData('Assignments', 12, 9, 3, '12/5'),
  createData('Projects', 12, 10, 2, '12/5/'),
  createData('Test/Quiz', 12, 3, 9, '12/5/'),

];

const TeachersCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const handleClassCard = (event)=>{
      console.log('card clicked');
  }




  return (
    <Card
      onClick={handleClassCard}
      className={clsx(classes.root, className)}
      {...rest}

    >
      <CardContent
      className={classes.cardContent}
      >
        <Box
          display="flex"
          justifyContent="left"
        >
          <Box
            className={classes.cardHeaderBg}
            fullwidth
            mt={-10}
            mb={-7}
            ml={-2}
          >
            <Box
              ml={0}
              mb={-4.1} >
              <CardHeader
                className={classes.title}
              ></CardHeader>
            </Box>
          </Box>
        </Box>
        <Typography

          variant="h4"
        >
          <Box
            className={classes.className}
          >
            Mohak
          </Box>

          <Box
          ml={8.5}
          >
            Teacher's name
          </Box>
          <Box
            ml={1}
            mt={-7}
          >
            <Avatar
              className={classes.avatar}
            >H
            </Avatar>
          </Box>

        </Typography>
        <Box
          pl={32}
          mt={-2.5}
          className={classes.nextClassDateBox}
        >
          <Typography
            className={classes.nextClassDate}
          >
            Next Class -
          </Typography>

        </Box>
        <Box
          pl={47}
          mt={-2.2}
        >
          <Typography
            className={classes.nextClassDate}
          >
            {'12/12/2020'}
          </Typography>

        </Box>
      {/* Description */}
        <Box
          mb={2}
          pb={1.7}
          mt={3}
          pt={2}
          pl={2}
          pr={1.5}
          justify="space-around"
          spacing={5}
          className={classes.classDescription}
        >
          <Grid>
            <Box
              mb={-2.5}
            >
              <Typography>
                Syllabus
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Box
              ml={13}

            >
              <Tooltip title={50}>
                <MultiSlider
                  width='100%'
                  height='20px'
                  roundedCorners='true'

                >
                  <Progress color="green" progress={40} />
                  <Progress color="grey" progress={100} />
                </MultiSlider>
              </Tooltip>



            </Box>
          </Grid>

        </Box>

        <Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Progress</TableCell>
                  <TableCell align="right">Planned</TableCell>
                  <TableCell align="right" className={classes.done}>Done</TableCell>
                  <TableCell align="right">Remaining</TableCell>
                  <TableCell align="right">Next</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right" >{row.classes}</TableCell>
                    <TableCell align="right" className={classes.done}>{row.assignments}</TableCell>
                    <TableCell align="right" className={classes.remaining}>{row.projects}</TableCell>
                    <TableCell align="right" className={classes.next}>{row.test_quiz}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      {/*Description End*/}


      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}
           className={classes.bottomColor}
      >
        <Grid
          container
          justify="space-between"
          spacing={0}
        >
          <Grid
            className={classes.link}


          >

            <Link
              className={classes.link}
            >
              Board
            </Link>

          </Grid>

          <Grid
            className={classes.link}>
            <Link
              className={classes.link}
            >
              P&A
            </Link>

          </Grid>
          <Grid
            className={classes.link}>
            <Link
              className={classes.link}
            >
              Q.E.S
            </Link>

          </Grid>



        </Grid>
      </Box>

    </Card>
  );
};

TeachersCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default TeachersCard;

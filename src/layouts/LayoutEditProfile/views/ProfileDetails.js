import React, {useState} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl, FormControlLabel, FormLabel,
  Grid,
  makeStyles, Radio, RadioGroup,
  TextField
} from '@material-ui/core';
import {apiEndPoint} from "../../../constants";
import ChangePassword from "./ChangePassword";

const useStyles = makeStyles(() => ({
  root: {}
}));




const ProfileDetails = ({className, ...rest}) => {
  const classes = useStyles();

  let date = sessionStorage.getItem('dob');
  console.log(date)
  let dd = date.slice(0, 2);
  let dm = date.slice(3, 5);
  let dy = date.slice(6, 10);


  const [values, setValues] = useState({
    name: sessionStorage.getItem('userName'),
    gender: sessionStorage.getItem('gender'),
    employee_id: sessionStorage.getItem('employee_id'),
    subject_expertise: sessionStorage.getItem('subject_expertise'),
    university: sessionStorage.getItem('universityName'),
    college: sessionStorage.getItem('collegeName'),
    rank: sessionStorage.getItem('teacher_rank'),
    dob: date /*dy + '-' + dm + '-' + dd*/

  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function handleNameChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }


  function handleDateChange(e) {
    let date = new Date(e.target.value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    setValues({
      ...values,
      [e.target.name]: dt + '/' + month + '/' + year
    });
    console.log(dt + '/' + month + '/' + year);
  }


  function onClick() {
    console.log(values);
    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    let body = {
      university_name: values.university,
      college_name: values.college,
      employee_id: values.employee_id,
      teacher_rank: values.rank,
      subject_expertise: values.subject_expertise,
      name: values.name,
      dob: values.dob,
      photo_url: sessionStorage.getItem('userPhoto'),
      gender: values.gender
    }

    axios.post(`${apiEndPoint}/register/teacher`, body, {
      headers: header
    }).then(response => {
      if (response.status === 200) {
        alert("Info Updated");
      }
    })
      .catch(err => console.log(err))
  }

  return (
    <>
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="Please specify the first name"
                label="Name"
                name="name"
                onChange={e => handleChange(e)}
                value={values.name}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                id="date"
                label="Date Of Birth"
                type="date"
                variant="outlined"
                name="dob"
                defaultValue={values.dob}
                className={classes.textField}
                onChange={e => handleDateChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}>

              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender" value={values.gender} onChange={e => handleChange(e)}>
                <FormControlLabel value="Female" control={<Radio/>} label="Female"/>
                <FormControlLabel value="Male" control={<Radio/>} label="Male"/>
                <FormControlLabel value="other" control={<Radio/>} label="Other"/>
              </RadioGroup>

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Employee Id Number"
                name="employee_id"
                onChange={e => handleChange(e)}
                type="text"
                value={values.employee_id}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Any Subject Expertise"
                name="subject_expertise"
                onChange={e => handleChange(e)}
                value={values.subject_expertise}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Your University"
                name="university"
                onChange={e => handleChange(e)}
                select
                SelectProps={{native: true}}
                value={values.university}
                variant="outlined"
              >
                <option>
                  JC Bose University Of Science And Technology
                </option>
                {/*{states.map((option) => (*/}
                {/*  <option*/}
                {/*    key={option.value}*/}
                {/*    value={option.value}*/}
                {/*  >*/}
                {/*    {option.label}*/}
                {/*  </option>*/}
                {/*))}*/}
              </TextField>

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Your College/Department"
                name="college"
                onChange={e => handleChange(e)}
                select
                SelectProps={{native: true}}
                value={values.college}
                variant="outlined"
              >
                <option>
                  Civil Engineering
                </option>
                <option>
                  CE
                </option>
                {/*{states.map((option) => (*/}
                {/*  <option*/}
                {/*    key={option.value}*/}
                {/*    value={option.value}*/}
                {/*  >*/}
                {/*    {option.label}*/}
                {/*  </option>*/}
                {/*))}*/}
              </TextField>

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Rank/Position"
                name="rank"
                onChange={e => handleChange(e)}
                select
                SelectProps={{native: true}}
                value={values.teacher_rank}
                variant="outlined"
              >
                <option>
                  6
                </option>
                {/*{states.map((option) => (*/}
                {/*  <option*/}
                {/*    key={option.value}*/}
                {/*    value={option.value}*/}
                {/*  >*/}
                {/*    {option.label}*/}
                {/*  </option>*/}
                {/*))}*/}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            onClick={onClick}
          >Save</Button>
        </CardActions>
      </Card>
    </form>
    <ChangePassword/>
    </>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

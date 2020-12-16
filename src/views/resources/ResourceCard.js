
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';

import {
  FormControl,
  Box,
  Card,
  CardContent,
  CardActions,
  Divider,
  Input,
  FormLabel,
  InputLabel,
  FormHelperText,
  Link,
  Typography,
  makeStyles,
  Button,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  ButtonBase,
  Menu,
  MenuItem,
  Select,
  Switch

} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FileUpload from './uploadFile';
import './App.css';
const Dropzone = require('react-dropzone');
const upload = require('superagent')

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'10px',
    margin:"10px",
    display:'block',
    textAlign:"center",
    padding:"10px",
    borderTop: '7px solid #025fa1',
    width:"800px"
    
  },
  card:{
    width:'800px',
    borderRadius:'10px',
    margin:"10px",
    paddingTop:"15px",
    display:'block',
    textAlign:"center",
    boxShadow:"10",
    borderLeft: '7px solid #025fa1'

  },
  cardHeadings:{
    width:'800px',
    fontWeight:'bold',
    textAlign:'center',
    fontSize:'20px'
  },
  cardInput:{
    width:'750px',
    
    
    
  },
  buttons:{
    backgroundColor:'#025fa1',
    color:'white',
    "&:hover":{
      backgroundColor:'white',
      color:'#025fa1'
    }
  },
  resize:{
    fontSize:50
  },
  


}));




const ResourceCard = ({ className, ...rest }) => {
  const classes = useStyles();
 
  const [file, setFile] = useState(null);
  const [formName,setFormName]= useState({formName:""});
  const [forms,setForm] = useState([ ]);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const [scheduled, setScheduled] = React.useState({
    checkedA: false,
    
  });

  const handleSceduled = (event) => {
    setScheduled({ ...scheduled, [event.target.name]: event.target.checked });
  };






  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...forms];
    list[index][name] = value;
    setForm(list);
  };

  const handleRequired = (e, index) => {
    const { name, value } = e.target;
    const list = [...forms];
    list[index][name] = value;
    setForm(list);
  };
  const handleFormNameChange = (e) => {
    setFormName({formName:e.target.value})
  };
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...forms];
    list.splice(index, 1);
    setForm(list);
  };
 
  const handleAddClick = () => {
    setForm([...forms,{ "type":"text", "firstName": "", "lastName": "" , "required": false}]);
  };
  const handleMCQAddClick = () => {
    setForm([...forms, { type:"mcq", question: "", answer: "",option1:"",option2:"",option3:"",option4:"" }]);
  };
  const handleFileAddClick = () => {
    setForm([...forms, { type:"file", fileName:"" }]);
  };
  const handleDateAddClick = () => {
    setForm([...forms, { type:"date", questionDate:"", date:"" }]);
  };
  const handleTimeAddClick = () => {
    setForm([...forms, { type:"time", questionTime:"", time:"" }]);
  };
  const handleScaleAddClick = () => {
    setForm([...forms, { type:"scale", questionScale:"", startVal:"", endVal:"" }]);
  };
  const handleLongAddClick = () => {
    setForm([...forms, { type:"long", questionLong:"", answerLong:""}]);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const submitFile = async () => {
    console.log("This function is working")
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', file[0]);
      console.log(formData);
    //   const rawResponse = fetch('http://localhost:5000/test-upload', {
    //   method: 'POST',
    //   headers: {
        
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: formData
      
    // });
    await axios.post(`http://localhost:5000/test-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
    } catch (error) {
      console.log("Error "+error);
    }
    
    
    }

    function scheduledHandler(){ if(scheduled.checkedA){
      return(
        <Box>
          <Typography>Scheduled Date</Typography>

          <Input type="date" id="scheduledDate" name="scheduledDate"></Input>
          <Typography>Scheduled Time</Typography>
          <Input type="time" name="scheduledTime"></Input>
        </Box>
      )
    }}



   
    return(
      <>
      
         {/* <form action="/formSubmitted" method="post"> */}
         
         












      <form onSubmit={submitFile}>
      <Box>
          <Typography>
            Scheduled
          </Typography>
          <Switch
          checked={scheduled.checkedA}
          onChange={handleSceduled}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          {
          scheduledHandler()
          
          
          }
        </Box>
        
      
        <Grid display="flex" justifyContent="center">
        <Button color="primary" type="submit">Submit</Button>
        
        <Card className={classes.root}>
          <CardContent>
          
          <TextField
          name="formName"
          fullWidth="true"
          placeholder="Enter Form Name Here"
          autoFocus="true"
          variant="standard"
          value={formName.formName}
          onChange={e=>handleFormNameChange(e)}
          variant="filled"
          inputProps={{style: {fontSize: 25,height: 30}}} 
          
          />
          <TextField
          name="formDescription"
          fullWidth="true"
          placeholder="Form Description"
          autoFocus="true"
          variant="standard"
          value={formName.formName}
          onChange={e=>handleFormNameChange(e)}
          
          inputProps={{style: {fontSize: 15,height: 20}}} 
          
          />
          
         
          </CardContent>
          <CardActions>
            {/* <Button 
            id="topButtons"
            className={classes.buttons} onClick={handleAddClick}>Add Text Box</Button>
            <Button 
            id="topButtons"
            className={classes.buttons} onClick={handleMCQAddClick}>Add MCQ</Button> */}
             <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  Add Component
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleAddClick}>Add Text Box</MenuItem>
                  <MenuItem onClick={handleMCQAddClick}>Add MCQ</MenuItem>
                  <MenuItem onClick={handleFileAddClick}>Add File Upload</MenuItem>
                  <MenuItem onClick={handleDateAddClick}>Add Date</MenuItem>
                  <MenuItem onClick={handleTimeAddClick}>Add Time</MenuItem>
                  <MenuItem onClick={handleScaleAddClick}>Add Scale</MenuItem>
                  <MenuItem onClick={handleLongAddClick}>Add Long Question</MenuItem>
                </Menu>
             </div>
            

          </CardActions>
        </Card>
          {forms.map((x,i)=>{
           
         if(x.type=="text"){    
       

          return(
            
            <Grid item xs={12}>
              
            <Card className={classes.card}>
            <CardContent>
              <Box>
            <TextField
              name="firstName"
              placeholder="Question"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 25,height: 30}}} 
              variant="filled"
            />
            </Box>
            <Box>
            <TextField

              className="ml10"
              name="lastName"
              placeholder="Short answer text"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
            />
            </Box>
            </CardContent>
            <CardActions>
            <Grid
            container
            justify="flex-end"
            spacing={0}
            >
              <Grid>
                <Button
                  
                  onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                </Button>
              </Grid>
               
              <Grid>
                <Button
                  onClick={handleAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                </Button>
              </Grid>
              <Grid>
              <Typography>Required</Typography>
              </Grid>
              <Grid>

                
               <Switch
                
                onChange={e=>handleRequired(e,i)}
                name="required"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                />  
              </Grid>  
                
            </Grid>
            </CardActions>
            </Card>
            </Grid>
          
          );
         }
         else if(x.type =="mcq"){
           return(
           
            <Box>
              
            <Card className={classes.card}>
            <CardContent>
              <Box>
            <TextField
            
              name="ques"
              placeholder="Enter Question Here"
              value={x.ques}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}}
              variant="filled" 
            />
            </Box>
            <Box>
            <Input
         
              name="answer"
              placeholder="Enter Answer Here"
              value={x.answer}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
            />
            </Box>
            <Box>
            <Input
              name="option1"
              placeholder="Enter Option 1"
              value={x.option1}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
            />
            </Box>
            <Box>
            <Input
              
              name="option2"
              placeholder="Enter Option 2"
              value={x.option2}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
            />
            </Box>
            <Box>
            <Input
              name="option3"
              placeholder="Enter Option 3"
              value={x.option3}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
            />
            </Box>
            <Box>
            <Input
             
              name="option4"
              placeholder="Enter Option 4"
              value={x.option4}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
            />
            </Box>
            </CardContent>
            <CardActions>
            <Grid
            container
            justify="flex-end"
            spacing={0}
            >
              <Grid>
                <Button
                  
                  onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                </Button>
              </Grid>
               
              <Grid>
                <Button
                  onClick={handleMCQAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                </Button>
              </Grid>
                
                
            </Grid>
            </CardActions>
            </Card>
            
            </Box>
           );
         }
         else if(x.type=="file"){
           return(
             <Card
              className={classes.card}
             >
               <CardContent>
                 <div>
                 <input type="file" onChange={event => setFile(event.target.files)} />
                 </div>
               </CardContent>
               <CardActions>
               <Grid
                container
                justify="flex-end"
                spacing={0}
                >
                  <Grid>
                    <Button
                      
                      onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                    </Button>
                  </Grid>
                  
                  <Grid>
                    <Button
                      onClick={handleFileAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                    </Button>
                  </Grid>
                    
                    
                </Grid>
               </CardActions>
             </Card>
           )
         }
         else if(x.type == "date"){
           return(
            <Card className={classes.card}>
              <CardContent>
                  <Box>
                      <TextField type="text" 
                      name="fDateQuestion" 
                      placeholder="Question" 
                      className={classes.cardInput}
                      inputProps={{style: {fontSize: 25,height: 30}}}
                      variant="filled"
                      />
                      <TextField type="date" 
                      name="fDate"
                      placeholder="Day,Month,Year" 
                      className={classes.cardInput}
                      inputProps={{style: {fontSize: 20,height: 25}}}
                
                      />
                  </Box>
              </CardContent>
              <CardActions>
                <Grid
                container
                justify="flex-end"
                spacing={0}
                >
                  <Grid>
                    <Button
                      
                      onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                    </Button>
                  </Grid>
                  
                  <Grid>
                    <Button
                      onClick={handleDateAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                    </Button>
                  </Grid>
                    
                    
                </Grid>
            </CardActions>
            </Card>

         )}
         else if(x.type == "time"){
          return(
           <Card className={classes.card}>
             <CardContent>
                 <Box>
                     <TextField type="text" 
                     name="fTimeQuestion" 
                     placeholder="Question" 
                     className={classes.cardInput}
                     inputProps={{style: {fontSize: 25,height: 30}}}
                     variant="filled"
                     />
                     <TextField 
                     type="time" 
                     name="fTime" 
                     placeholder="Time" 
                     className={classes.cardInput}
                     inputProps={{style: {fontSize: 20,height: 25}}}
                     
                     />
                 </Box>
             </CardContent>
             <CardActions>
            <Grid
            container
            justify="flex-end"
            spacing={0}
            >
              <Grid>
                <Button
                  
                  onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                </Button>
              </Grid>
               
              <Grid>
                <Button
                  onClick={handleTimeAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                </Button>
              </Grid>
                
                
            </Grid>
            </CardActions>
           </Card>

        )}
        // else if(x.type == "checkboxes"){ 
        //   return(
        //     <Card className={classes.card}>
        //       <CardContent>
        //       <FormGroup>
        //           <FormControlLabel
        //             control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
        //             label="Gilad Gray"
        //           />
        //           <FormControlLabel
        //             control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
        //             label="Jason Killian"
        //           />
        //           <FormControlLabel
        //             control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
        //             label="Antoine Llorca"
        //           />
        //         </FormGroup>
        //       </CardContent>
        //     </Card>
        //   )
        // }
        else if(x.type == "scale"){
          return(
            <Card className={classes.card}>
              <CardContent>
                
                  <Box>
                    <TextField type="text" 
                    name="fScale" 
                    placeholder="Question" 
                    className={classes.cardInput}
                    inputProps={{style: {fontSize: 25,height: 30}}}
                    variant="filled"
                    ></TextField>
                    <Box mt={1}>
                    <Typography>
                        Start Value
                      </Typography>
                      <Select name="fScaleStart"
                        labelID="scale-start-value"
                        inputProps={{style: {fontSize: 20,height: 25}}}
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                      </Select>
                    </Box>
                    <Box>
                      <Typography>
                        End Value
                      </Typography>
                      <Select name="fScaleEnd" 
                      inputProps={{style: {fontSize: 20,height: 25}}}
                      >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                      </Select>
                    </Box>
                    <TextField type="text" 
                    name="fScaleStart" 
                    placeholder="Start Label" 
                    className={classes.cardInput}
                    inputProps={{style: {fontSize: 20,height: 25}}}
                
                    ></TextField>
                    <TextField type="text" 
                    name="fScaleEnd"
                     placeholder="End Label" 
                     className={classes.cardInput}
                     inputProps={{style: {fontSize: 20,height: 25}}}
                     ></TextField>
                  </Box>
              </CardContent>
              <CardActions>
            <Grid
            container
            justify="flex-end"
            spacing={0}
            >
              <Grid>
                <Button
                  
                  onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                </Button>
              </Grid>
               
              <Grid>
                <Button
                  onClick={handleScaleAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                </Button>
              </Grid>
                
                
            </Grid>
            </CardActions>
            </Card>
          )
        }
        else if(x.type=="long"){    
       

          return(
            
            <Grid item xs={12}>
              
            <Card className={classes.card}>
            <CardContent>
              <Box>
            <TextField
              name="longQuestion"
              placeholder="Question"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 25,height: 30}}} 
              variant="filled"
            />
            </Box>
            <Box>
            <TextField

              
              name="longAnswer"
              placeholder="Long answer text"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
              inputProps={{style: {fontSize: 20,height: 25}}} 
              multiline
              rows={5}
             
            />
            </Box>
            </CardContent>
            <CardActions>
            <Grid
            container
            justify="flex-end"
            spacing={0}
            >
              <Grid>
                <Button
                  
                  onClick={() => handleRemoveClick(i)}><DeleteIcon id="cardBottomButtons"></DeleteIcon>
                </Button>
              </Grid>
               
              <Grid>
                <Button
                  onClick={handleLongAddClick}><FileCopyIcon id="cardBottomButtons"></FileCopyIcon>
                </Button>
              </Grid>
                
                
            </Grid>
            </CardActions>
            
            </Card>
            </Grid>
          
          );
         }
        })}
        </Grid>
        </form>
        
        </>
        );
        
 
         

          
      








    //   <div style={{ marginTop: 20 }}>{JSON.stringify(MCQinputList)}</div>
    //     <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    // </div>
  
};

ResourceCard.propTypes = {
  className: PropTypes.string,
  // product: PropTypes.object.isRequired
};

export default ResourceCard;

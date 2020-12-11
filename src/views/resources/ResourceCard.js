import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

//import HTML5Backend from 'react-dnd-html5-backend';
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
  
  
  
  
} from '@material-ui/core';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FormBuilder from '../form-builder/index.js';
import CardHeader from '../../components/card_header';
import DemoBar from '../form-builder/demobar';
import './App.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'10px',
    margin:"10px",
    display:'block',
    textAlign:"center",
    padding:"10px"
    
  },
  card:{
    width:'800px',
    borderRadius:'10px',
    margin:"10px",
    paddingTop:"15px",
    display:'block',
    textAlign:"center",
    boxShadow:"10"

  },
  cardHeadings:{
    width:'750px',
    fontWeight:'bold',
    textAlign:'center',
    fontSize:'20px'
  },
  cardInput:{
    width:'750px',
    
    textAlign:'center',
    
  },
  buttons:{
    backgroundColor:'#025fa1',
    color:'white',
    "&:hover":{
      backgroundColor:'white',
      color:'#025fa1'
    }
  }
  


}));




const ResourceCard = ({ className, ...rest }) => {
  const classes = useStyles();
 
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const [MCQinputList, setMCQInputList] = useState([{ question: "", answer: "",option1:"",option2:"",option3:"",option4:"" }]);
  const [formName,setFormName]= useState({formName:""});
  const [forms,setForm] = useState([ ]);
  
  // handle input change
  const handleInputChange = (e, index) => {
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
    setForm([...forms,{ "type":"text", "firstName": "", "lastName": "" }]);
  };
  const handleMCQAddClick = () => {
    setForm([...forms, { type:"mcq", question: "", answer: "",option1:"",option2:"",option3:"",option4:"" }]);
  };
 
  
   
    return(
      <>
         <form action="/formSubmitted" method="post">
           
        <Grid className={classes.root}>
        <Button type="submit">Submit</Button>
        <Card className={classes.root}>
          <CardContent>
          <Typography className={classes.cardHeadings}>
            Enter the name of form here
          </Typography>
          <TextField
          id="filled-basic"
          label="Standard"
          
          value={formName.formName}
          onChange={e=>handleFormNameChange(e)}
          className={classes.cardInput}
          />
         
          </CardContent>
          <CardActions>
            <Button className={classes.buttons} onClick={handleAddClick}>Add Text Box</Button>
            <Button className={classes.buttons} onClick={handleMCQAddClick}>Add MCQ</Button>
          </CardActions>
        </Card>
          {forms.map((x,i)=>{
           
         if(x.type=="text"){    
       

          return(
            <Grid className={classes.card} item xs={12}>
              <Typography className={classes.cardHeadings}>
                Question {i+1}
              </Typography>
            <Card className={classes.card}>
            <CardContent>
              <Box>
            <Input
              name="firstName"
              placeholder="Enter First Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            <Box>
            <Input
              className="ml10"
              name="lastName"
              placeholder="Enter Last Name"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            </CardContent>
            <CardActions>
            <Box>
              { <Button
                onClick={() => handleRemoveClick(i)}>Remove</Button>}
            </Box>
            </CardActions>
            </Card>
            </Grid>
          
          );
         }
         else{
           return(
           
            <Box className={classes.card}>
              <Typography className={classes.cardHeadings}>
                Question {i+1}
              </Typography>
            <Card className={classes.card}>
            <CardContent>
              <Box>
            <Input
              name="ques"
              placeholder="Enter Question Here"
              value={x.ques}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            <Box>
            <Input
         
              name="answer"
              placeholder="Enter Answer Here"
              value={x.answer}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            <Box>
            <Input
              name="option1"
              placeholder="Enter Option 1"
              value={x.option1}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            <Box>
            <Input
              
              name="option2"
              placeholder="Enter Option 2"
              value={x.option2}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            <Box>
            <Input
              name="option3"
              placeholder="Enter Option 3"
              value={x.option3}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            <Box>
            <Input
             
              name="option4"
              placeholder="Enter Option 4"
              value={x.option4}
              onChange={e => handleInputChange(e, i)}
              className={classes.cardInput}
            />
            </Box>
            </CardContent>
            <CardActions>
            <Box>
              { <Button
                onClick={() => handleRemoveClick(i)}>Remove</Button>}
          </Box>
            </CardActions>
            </Card>
            
            </Box>
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

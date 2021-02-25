import React from 'react';
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader, Container,
  Divider,
  FormControl, FormControlLabel, FormLabel, Grid, InputLabel,
  makeStyles, Paper, Radio, RadioGroup, Select,
  TextField, Typography
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    overflow: "true"
  }
}));


class WeekDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[[{type:"text",index:"0",value:"Courses"}]]};
  }

 addRow(){
    let data = this.state.data;
    let max=0;
    for (let i=0;i<data.length;i++){
      if(data[i].length>=0){
        max=data[i].length;
      }
    }
    data.push([{value:'',index:232,type:"course"}])
    for (let i=1;i<max;i++){
      data[data.length-1].push({value:'',index:232,type:"teacherSubject"})
    }
   this.setState(data)
 }

 removeRow(){
    let data = this.state.data;
    data.pop();
    this.setState(data);
 }

 addColumn(){
    let data = this.state.data;
    data[0].push({value:'',type:'text',index:23})
    for(let i=1;i<data.length;i++){
      data[i].push({value:i,type:"teacherSubject",index:22})
    }
    this.setState(data)
 }

 removeColumn(){

    let data = this.state.data;
    for(let i=0;i<data.length;i++){
      data[i].pop();
      }
    this.setState(data)
 }

 printState(){
    console.log(this.state.data)
 }


  render() {

    return (
      <div>
        <Box
          display="flex"
          flexDirection="row"
        ><Box
          width={'100px'}

          style={{
            display: "flex",
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {'Monday'}

        </Box>

          <Grid container spacing={1}>
            {this.state.data.map(data=>{
              return(
                <Grid container item xs={12} spacing={2}>
                  <React.Fragment>
                    {
                      data.map(res=>{
                        if(res.type=='text'){
                          return(
                            <Grid item xs={2}>
                              <TextField
                                value={res.value}

                                variant="outlined"
                              />
                            </Grid>
                          )
                        }
                        if(res.type=='course'){
                          return(
                            <Grid item xs={2}>
                              <TextField
                                type='date'
                                value={res.value}

                                variant="outlined"
                              />
                            </Grid>
                          )
                        }
                        if(res.type=='teacherSubject'){
                          return(
                            <Grid item xs={2}>
                              <TextField
                                type="time"
                                value={res.value}

                                variant="outlined"
                              />
                            </Grid>
                          )
                        }

                      })
                    }
                  </React.Fragment>

                </Grid>
              )})
            }

          </Grid>
        </Box>
        <Button onClick={this.addRow.bind(this)}>Add Row</Button>
        <Button onClick={this.removeRow.bind(this)}>Remove Row</Button>
        <Button onClick={this.addColumn.bind(this)}>Add Column</Button>
        <Button onClick={this.removeColumn.bind(this)}>Remove Column</Button>
        <Button onClick={this.printState.bind(this)}>Print State</Button>
      </div>
    )
  }
}

export default WeekDay;

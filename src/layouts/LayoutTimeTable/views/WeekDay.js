import React from 'react';
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

let iMatrix = 1;
let jMatrix = 1;

class WeekDay extends React.Component {

  colors = ["#7ca79d", "#ddf2f5", "#9d85c1", "#03a5c6", "#98d4bb", "#a5b591", "#eebab2", "#f3a447", "#9ac8ea", "#e6bc28"];
  subjectColors = {
    "DSA": this.colors[0],
    "AEC": this.colors[1],
    "Digital Electronics": this.colors[2]
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [[{type: "text", index: "00", value: "Courses/Timings"}]],
      modalOpen: false,
      colorSubject: "",
    };
  }

  randomNumberGenerator() {
    return Math.floor(Math.random() * 10);
  }

  returnState() {
    let days = this.props.day;
    let data = this.state.data;
    let obj = {};
    obj[days] = data;
    this.props.callback(obj)
  }

  addRow() {
    let data = this.state.data;
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].length >= 0) {
        max = data[i].length;
      }
    }
    data.push([{value: '', index: `${iMatrix}0`, type: "course"}]);
    for (let i = 1; i < max; i++) {
      data[data.length - 1].push({value: {subject: "", teacher: ""}, index: `${iMatrix}${i}`, type: "teacherSubject"})
    }
    iMatrix++;
    this.setState(data);
  }

  removeRow() {
    let data = this.state.data;
    if (data.length !== 1) {
      data.pop();
    }
    this.setState(data);
    iMatrix--;
  }

  addColumn() {
    let data = this.state.data;
    data[0].push({value: '', type: 'text', index: `0${jMatrix}`});
    for (let i = 1; i < data.length; i++) {
      data[i].push({value: {subject: "", teacher: ""}, type: "teacherSubject", index: `${i}${jMatrix}`})
    }
    jMatrix++;
    this.setState(data);
  }

  removeColumn() {

    let data = this.state.data;

    for (let i = 0; i < data.length; i++) {
      if (data[i].length !== 1) {
        data[i].pop();
      }
    }
    jMatrix--;
    this.setState(data)
  }

  handleTextChange(e, index) {
    let sData = this.state.data;
    // eslint-disable-next-line array-callback-return
    sData[0].map(res => {
      if (res.index === index) {
        res.value = e.target.value;
      }
    })
    this.setState(sData);
  }

  handleCourseChange(e, index) {
    let sData = this.state.data;
    // eslint-disable-next-line array-callback-return
    sData.map(res => {
      if (res[0].index === index) {
        res[0].value = e.target.value;
      }
    })
  }

  handleTeacherChange(e, index) {
    let sData = this.state.data;
    for (let i = 1; i < sData.length; i++) {
      for (let j = 1; j < sData[i].length; j++) {
        if (sData[i][j].index === index) {
          sData[i][j].value.teacher = e.target.value;
        }
      }
    }
    this.setState(sData);
  }

  handleSubjectChange(e, index) {
    let sData = this.state.data;
    for (let i = 1; i < sData.length; i++) {
      for (let j = 1; j < sData[i].length; j++) {
        if (sData[i][j].index === index) {
          sData[i][j].value.subject = e.target.value;
        }
      }
    }
    this.setState(sData);
  }

  printState() {
    //console.log(this.state.data)
    console.log(this.subjectColors);
  }

  getInitialState() {
    return {
      isMouseInside: false
    };
  }

  render() {

    /*function handleModalOpen() {
      this.setState({modalOpen: true})
    }

    function handleModalClose() {
      this.setState({modalOpen: false})
    }

    function colorSubjectChange(color) {
      this.setState({colorSubject: color.hex});
    }*/


    return (
      <div>
        {/*<Button
          onClick={handleModalOpen.bind(this)}
        >Pick Color</Button>*/}

        {/*<Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modalOpen}
          onClose={handleModalClose.bind(this)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modalOpen}>
            <div>
              <h2 id="transition-modal-title">Pick Color</h2>
              <SwatchesPicker
                color={this.state.colorSubject}
                onChange={colorSubjectChange.bind(this)}
              />
            </div>
          </Fade>
        </Modal>*/}

        <Paper>
          <Box
            display="flex"
            flexDirection="row"
          ><Box
            width={'120px'}
            className="block-example border border-dark"
            style={{
              display: "flex",
              padding: 10,
              flexDirection: 'column',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              height={'100%'}
              style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginBottom: 10
              }}
            >
              <b>{this.props.day}</b>
            </Box>
            <Button style={{backgroundColor: '#ff5354', marginBottom: 10, width: '100px'}}
                    onClick={this.addRow.bind(this)} startIcon={<AddIcon/>}>Row</Button>
            <Button style={{backgroundColor: '#ff5354', width: '100px'}}
                    onClick={this.removeRow.bind(this)} startIcon={<RemoveIcon/>}>Row</Button>
          </Box>
            <Grid
              container
            >
              {this.state.data.map(data => {
                return (
                  <>
                    <Grid
                      container
                      item xs={12}
                    >
                      <React.Fragment>
                        {
                          // eslint-disable-next-line array-callback-return
                          data.map(res => {
                            if (res.type === 'text') {
                              return (
                                <>
                                  <Grid item xs={2}
                                        style={{
                                          border: "1px solid gray",
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center'
                                        }}
                                  >
                                    <TextField
                                      value={res.value}
                                      onChange={e => this.handleTextChange(e, res.index)}
                                      placeholder="Period Timings"
                                      variant="filled"
                                      //type="time"
                                      style={{color: "blue", padding: 10}}
                                    />

                                  </Grid>
                                </>
                              )
                            }
                            if (res.type === 'course') {
                              return (
                                <>

                                  <Grid item xs={2}
                                        style={{
                                          padding: 10,
                                          border: "1px solid gray",
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}

                                  >
                                    <FormControl
                                      style={{
                                        minWidth: 120,
                                        width: '100%',
                                      }}
                                    >
                                      <InputLabel
                                        id={res.index}
                                        style={{
                                          marginLeft: '10px'
                                        }}
                                      >Course</InputLabel>
                                      <Select
                                        labelId={res.index}
                                        id={res.index}
                                        value={res.value}
                                        onChange={e => this.handleCourseChange(e, res.index)}
                                        label="Course"
                                        variant="filled"
                                      >
                                        <MenuItem value={'B.Tech'}>B.Tech</MenuItem>
                                        <MenuItem value={'MBA'}>MBA</MenuItem>
                                        <MenuItem value={'BSc'}>B.Sc</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </>
                              )
                            }
                            if (res.type === 'teacherSubject') {
                              return (
                                <Grid item xs={2}
                                      style={{
                                        border: "1px solid gray"
                                      }}
                                >
                                  <Grid
                                    style={{
                                      padding: 10
                                    }}
                                  >
                                    <FormControl
                                      style={{
                                        width: '100%',
                                        //backgroundColor: `${this.state.colorSubject}`
                                        backgroundColor: `${this.subjectColors[res.value.subject]}`
                                      }}
                                    >
                                      <InputLabel
                                        id={res.index}
                                        style={{
                                          marginLeft: '10px',
                                          color: `${this.subjectColors[res.value.subject]}`
                                        }}
                                      >Subject</InputLabel>
                                      <Select
                                        labelId={res.index}
                                        id={res.index}
                                        value={res.value.subject}
                                        onChange={e => this.handleSubjectChange(e, res.index)}
                                        variant="filled"
                                        //style={{color:`${this.subjectColors[res.value.subject]}`}}
                                      >
                                        <MenuItem value={'Digital Electronics'}>Digital Electronics</MenuItem>
                                        <MenuItem value={'AEC'}>AEC</MenuItem>
                                        <MenuItem value={'DSA'}>DSA</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid
                                    style={{
                                      padding: 10
                                    }}
                                  >
                                    <FormControl
                                      style={{
                                        minWidth: 120,
                                        width: '100%'
                                      }}
                                    >
                                      <InputLabel
                                        id={res.index}
                                        style={{
                                          marginLeft: '10px',
                                          color: "green"
                                        }}
                                      >Teacher</InputLabel>
                                      <Select
                                        labelId={res.index}
                                        id={res.index}
                                        value={res.value.teacher}
                                        onChange={e => this.handleTeacherChange(e, res.index)}
                                        variant="filled"
                                      >
                                        <MenuItem value={'Some teacher'}>Some teacher</MenuItem>
                                        <MenuItem value={'Buddha'}>Buddha</MenuItem>
                                        <MenuItem value={'Someone'}>Someone</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>

                                  <Box mt={1}/>

                                  <Box mt={1}/>
                                </Grid>
                              )
                            }

                          })
                        }
                      </React.Fragment>
                      <Box width={'120px'} className="block-example border border-dark"
                           style={{flexDirection: 'column', padding: 10, display: 'flex'}}>
                        <Button style={{backgroundColor: '#ff5354', marginBottom: 10}}
                                onClick={this.addColumn.bind(this)} startIcon={<AddIcon/>}>Column</Button>
                        <Button style={{backgroundColor: '#ff5354'}}
                                onClick={this.removeColumn.bind(this)} startIcon={<RemoveIcon/>}>Column</Button>
                      </Box>
                    </Grid>
                  </>
                )
              })
              }
            </Grid>

            {/*<Button style={{backgroundColor: '#ff5354', marginLeft: 8}} onClick={this.printState.bind(this)}>Testing
                button</Button>*/}
            <Button style={{backgroundColor: '#ff5354'}} onClick={this.returnState()}
                    hidden>Submit</Button>
          </Box>
        </Paper>
      </div>
    )
  }
}

export default WeekDay;

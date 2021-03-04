import React from 'react';
import {
  Backdrop,
  Box,
  Button, Fade,
  FormControl, Grid, InputLabel,
  MenuItem, Modal, Paper, Select,
  TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {SwatchesPicker} from "react-color";

let iMatrix = 1;
let jMatrix = 1;

class WeekDay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [[{type: "text", index: "00", value: "Courses/Timings"}]],
      modalOpen: false,
      colorSubject: "",
    };
  }

  colors = ["#a40100", "#b535dd", "#065a53", "#48acb1", "#4d3e0e", "#848e0c", "#4e3479", "#7d68bd", "#a33914", "#644379"];

  subjectColors = {
    "DSA": this.colors[this.randomNumberGenerator()],
    "AEC": this.colors[this.randomNumberGenerator()],
    "Digital Electronics": this.colors[this.randomNumberGenerator()]
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


  render() {

    function handleModalOpen() {
      this.setState({modalOpen: true})
    }

    function handleModalClose() {
      this.setState({modalOpen: false})
    }

    function colorSubjectChange(color) {
      this.setState({colorSubject: color.hex});
    }

    return (
      <div>
        <Button
          onClick={handleModalOpen.bind(this)}
        >Pick Color</Button>

        <Modal
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
        </Modal>

        <Paper>
          <Box
            display="flex"
            flexDirection="row"
          ><Box
            width={'100px'}
            style={{
              display: "flex",
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <b>{this.props.day}</b>

          </Box>

            <Grid
              container spacing={1}
              style={{padding: '20px'}}
            >
              {this.state.data.map(data => {
                return (
                  <>
                    <Box p={1.01}/>
                    <Grid
                      container
                      item xs={12}
                      spacing={2}

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
                                          border: "1px solid gray"
                                        }}
                                  >
                                    <TextField
                                      value={res.value}
                                      onChange={e => this.handleTextChange(e, res.index)}
                                      placeholder="Period Timings"
                                      variant="filled"
                                      //type="time"
                                      style={{color: "blue"}}
                                    />

                                  </Grid>
                                  <Box mt={2}/>
                                </>
                              )
                            }
                            if (res.type === 'course') {
                              return (
                                <>

                                  <Grid item xs={2}
                                        style={{
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

                                  >
                                    <FormControl
                                      style={{
                                        minWidth: 120,
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

                                  <Box mt={1}/>
                                  <Grid

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
                    </Grid>
                  </>
                )
              })
              }
            </Grid>
          </Box>
          <Button onClick={this.addRow.bind(this)}><AddIcon/> Row</Button>
          <Button onClick={this.removeRow.bind(this)}><RemoveIcon/> Row</Button>
          <Button onClick={this.addColumn.bind(this)}><AddIcon/> Column</Button>
          <Button onClick={this.removeColumn.bind(this)}><RemoveIcon/> Column</Button>
          <Button onClick={this.printState.bind(this)}>Testing button</Button>
          <Button onClick={this.returnState()} hidden>Submit</Button>
        </Paper>
      </div>
    )
  }
}

export default WeekDay;

import React from 'react';
import PropTypes, {func} from 'prop-types';
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader, Container,
  Divider,
  FormControl, FormControlLabel, FormLabel, Grid, InputLabel,
  makeStyles, Radio, RadioGroup, Select,
  TextField, Typography
} from '@material-ui/core';
import Spreadsheet from "react-spreadsheet";
import {Dropdown} from "react-bootstrap";

const useStyles = makeStyles(() => ({
  root: {
    overflow: "true"
  }
}));


const WeekDay = ({className, day, callback, ...rest}) => {

  const [data, setData] = React.useState([
    [{value: "Course"}],
  ]);

  function addRow() {
    let stateData = [...data];
    let max = 0;
    for (let i = 0; i < stateData.length; i++) {
      let length = stateData[i].length;
      if (length > max) {
        max = length;
      }
    }
    let newRow = [];
    for (let i = 0; i < max; i++) {
      newRow.push({value: 100, DataViewer: TextView, DataEditor: TextEdit});
    }
    stateData.push(newRow);
    setData(stateData);
  }

  const addColumn = React.useCallback(
    () =>
      setData((data) =>
        data.map((row, index) => {
          let newD = [...data];
          const nextRow = [...row];
          //nextRow.length += 1;
          nextRow.push({value: 100, DataViewer: TextView, DataEditor: TextEdit})
          //return nextRow;
          return newD[index] = nextRow;
        })
      ),
    [setData]
  );

  const removeColumn = React.useCallback(() => {
    setData((data) =>
      data.map((row) => {
        return row.slice(0, row.length - 1);
      })
    );
  }, [setData]);

  const TextView = ({cell}) => (
    <Box
      p={1.5}
      flexDirection="column"
    >
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          //value={state.age}
          onChange={onRowChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value=""/>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      <Box mt={1.5}/>
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          // value={state.age}
          // onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value=""/>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>


    </Box>
    /*<TextField
      type="text"
      disabled
      style={{pointerEvents: "none"}}
    />*/
  );

  function onRowChange(e) {
    console.log(data);
    let newD = data;
    newD[1][0]['value'] = e.target.value;
    console.log(newD)
    setData(newD);
  }

  /*const onRowChange = React.useCallback((e) => {
    setData(
      () => {
        console.log(data);
        let newD = data;
        newD[1][0]['value'] = e.target.value;
        return newD;
      }
    )
  }, [setData])*/


  const TextEdit = ({cell, onChange}) => (
    <Box
      flexDirection="column"
      p={1.5}
    >
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          //value={state.age}
          onChange={onRowChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value=""/>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      <Box mt={1.5}/>
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          // value={state.age}
          // onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value=""/>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

    </Box>
    /*<TextField
      type="text"
      onChange={(e) =>{
        //onRowChange(e)
        console.log(data)
      }

      }
      autoFocus
    />*/
  );

  const removeRow = React.useCallback(() => {
    setData((data) => {
      return data.slice(0, data.length - 1);
    });
  }, [setData]);

  function submit() {
    callback(data);
  }

  function onSheetChange(e) {
    console.log(e)
  }

  return (
    <Box>
      <Button onClick={addRow}>Add Row</Button>
      <Button onClick={removeRow}>Remove Row</Button>
      <Typography>{day}</Typography>
      <Spreadsheet
        data={data}
        hideRowIndicators
        hideColumnIndicators
        onChange={e => onSheetChange(e)}
      />
      <Button onClick={addColumn}>Add Column</Button>
      <Button onClick={removeColumn}>Remove Column</Button>
      <Button onClick={submit}>Submit</Button>
    </Box>
  )
}

WeekDay.propTypes = {className: PropTypes.string};

export default WeekDay;

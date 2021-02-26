import React, {FunctionComponent, useState} from 'react';
import {
    Button, makeStyles
} from '@material-ui/core';
import WeekDay from './WeekDay';
import axios from "axios";


const useStyles = makeStyles(() => ({
    root: {
        overflow: "true"
    },
    day:{
        margin:'20px',

    },
    btn:{
        backgroundColor:"grey",
        margin:"40px",
        color:"white",
        height:"50px",
        width:"100px",
    }
}));


const TimeTableEditor: FunctionComponent<{ ttData?: JSON[] }> = ({ttData = []}) => {
    const [timeTableData, setTimeTableData] = React.useState(ttData);
    const classes = useStyles();
    function getData(data: any) {
        //console.log(data);
        let sData: JSON[] = timeTableData;
        if (sData.length > 0) {
            let found: boolean = false;
            let index: number = 0;
            for (let i = 0; i < sData.length; i++) {
                let keys: string[] = Object.keys(sData[i]);
                let value: string[] = Object.keys(data);
                for (let j = 0; j < keys.length; j++) {
                    if (keys[j] == value[0]) {
                        found = true;
                        index = i;
                    }
                }

            }
            if (found) {
                //console.log(found)
                sData[index] = data;
            } else {
                //console.log("Not f")
                sData.push(data);
            }
        } else {
            sData.push(data);
        }
        setTimeTableData(sData);
        console.log(sData)
    }

    function postTimeTable() {
        let dataToBeSent: string[] = [];
        timeTableData.map(
            week => {
                dataToBeSent.push(JSON.stringify(week))
            }
        )

        axios.post("http://localhost:4000/test/api", dataToBeSent, {
            headers: {
                'user_id': sessionStorage.getItem('userId'),
                'x-access-token': sessionStorage.getItem("token")
            }
        }).then(
            res => {
                console.log(res)
            }
        )
            .catch(
                err => console.log(err)
            )
    }

    return (
        <div>
            {
                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(data => {
                    return (
                        <div
                        className={classes.day}
                        >
                            <WeekDay day={data} callback={getData}/>
                        </div>
                    )
                })
            }
            <Button
                onClick={postTimeTable}
                className={classes.btn}
            >SEND IT</Button>

        </div>
    )
}


export default TimeTableEditor;

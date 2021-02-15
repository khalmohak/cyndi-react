import React, {useEffect} from 'react';
import {Typography} from "@material-ui/core";
import {apiEndPoint} from "../../constants";
import axios from "axios";



export const Syllabus = () => {
  const [syllabusD,setSyllabus] =React.useState(0)
  let syllabus=undefined;
  function getSyllabus() {
    let data = {
      class_id: sessionStorage.getItem('current_class_id')
    }
    let header = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }
    axios.post(`${apiEndPoint}/get/syllabus`, data, {
      headers: header
    }).then(res => {
      //console.log(res.data);
      syllabus=res.data;
      setSyllabus(res.data)
    })
      .catch(err => console.log(err))
  }
  useEffect(()=>{
       getSyllabus()
    console.log(syllabusD[0])
  },[syllabusD])

  // attached_files: "{"files":[{"fileurl":"Class\/Syllabus\/01EXRTPF0H000G00R40M300209-0.pdf","filename":"kv moral values notes-1.pdf"},{"fileurl":"Class\/Syllabus\/01EXRTPF0V000G00R40M300209-1.pdf","filename":"Students DLMS Help Book.pdf"},{"fileurl":"Class\/Syllabus\/01EXRTPF10000G00R40M300209-2.docx","filename":"Cyndi Technologies Pvt GSTN.docx"},{"fileurl":"Class\/Syllabus\/01EXRTPF14000G00R40M300209-3.docx","filename":"Ajeet Jaiswal-IOS Developer.docx"},{"fileurl":"Class\/Syllabus\/01EXRTPF18000G00R40M300209-4.pptx","filename":"Cyndi Technologies.pptx"}]}"
  // attached_url: ""
  // class_id: "37"
  // created_at: "2021-02-05T10:10:03.681Z"
  // datetime: "05-02-2021 03:40 PM"
  // description: "Attached documents. "
  // syllabus_id: "54"
  // title: "Docs"
  // updated_at: "2021-02-05T10:10:03.681Z"
  // user_id: "65"
  return (
    <>

      <Typography>
        Attachments
      </Typography>
      {/*{syllabusD?syllabusD.map(data=>{*/}
      {/*  return<div>*/}
      {/*    <a href={}>{data.title}</a>*/}



      {/*  </div>*/}
      {/*}):<div>Loading..</div>}*/}

    </>
  )
}

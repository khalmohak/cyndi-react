import React from 'react';
import {current_class_id} from '../product/ClassListView/classCard';
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import Firebase from 'firebase';
import firebaseConfig from '../../utils/firebaseConfig';




Firebase.initializeApp(firebaseConfig.firebase);


const ClassBoard = ()=>{

  return(
    <FirebaseDatabaseProvider>
      <div>
        <div>{current_class_id}</div>

      </div>
    </FirebaseDatabaseProvider>

  );
};

export default ClassBoard;

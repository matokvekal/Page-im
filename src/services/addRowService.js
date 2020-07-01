import axios from 'axios';
import { pageimEndPoint } from '../Config';

const API_ENDPOINT = pageimEndPoint();
    export const addNewRow=async(row)=>{
      debugger
        if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") 
        console.log('no freeUserToken add row')
        else
        {
            let APP = window.location.pathname.toString();
            APP= APP?APP.substr(1):'';
            APP = APP.toLowerCase();
            const URL = `${API_ENDPOINT}/public/${APP}/add`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage['freeUserToken']}` 
            // const config={
            //     headers: { Authorization: "Bearer " + localStorage['freeUserToken'] },
                
            // }
          const data=row;
 
            const response = await axios.post(URL,data)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response);
                return response;
              })
            .catch((response) => {
                console.log("AXIOS ERROR: ", response);
                return response;
              })
    
            return 'Error:add new row';
         
        }

    }

import axios from "axios";

export const fetchMenu = async (RID) => {
      try{
        const response = await axios.get(`http://localhost:4000/api/${RID}/menu`); 
        return response.data;
      }
      catch(err) {
        alert("oops! could not fetch menu");
        return [];
      }
}
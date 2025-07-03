import axios from "axios";

export const fetchMenu = async (RID, token) => {
      try{
        const response = await axios.get(`http://localhost:4000/api/${RID}/menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
        
        return response.data;
      }
      catch(err) {
        alert("oops! could not fetch menu");
        return [];
      }
}
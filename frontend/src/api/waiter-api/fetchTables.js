import axios from "axios";

export const fetchTables = async (RID, token) => {
      try{
        const response = await axios.get(`http://localhost:4000/api/${RID}/tables`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
        return response.data;
      }
      catch(err) {
        alert("oops! could not fetch tables");
        return [];
      }
}
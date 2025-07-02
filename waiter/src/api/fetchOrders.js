import axios from "axios";
import priority from "../utils/priority";
export  const fetchOrders = async (RID, sortByWaiter = true) => {
      try{
        const response = await axios.get(`http://localhost:4000/api/${RID}/orders`); 
        console.log(response.data);
        if(response.data.error) return [];
        else {
          if(sortByWaiter)response.data.sort((a,b) => priority[a.status] - priority[b.status])
          else response.data.sort((a,b) => priority[b.status] - priority[a.status])
          return response.data;
        }
      }
      catch(err) {
        alert("oops! could not fetch orders");
        return [];
      }
}
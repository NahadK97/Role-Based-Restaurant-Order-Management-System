import axios from "axios";
import { IndianRupee, Plus, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
const Table = ({ no, amount }) => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const extendOrder = () => {
    navigate("/waiter/place-order", {
      state: { from: "tables page", table: { no: no } },
    });
  };

  const billTable = async () => {
    try {
      if (window.confirm(`bill table ${no} ?`)) {
        const response = await axios.delete(
          `http://localhost:4000/api/${user.RID}/tables/${no}/delete`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
        );
      }
    } catch (err) {
      alert("could not bill the order");
    }
  };

  return (
    <div className="table-box-wrapper">
      <h1 className="table-box-title">Table {no}</h1>
      <h1 className="table-box-amount">
        {amount} <IndianRupee />
      </h1>
      <div className="table-box-buttons">
        <button onClick={extendOrder} className="table-btn green-btn">
          Extend <Plus />
        </button>
        <button onClick={billTable} className="table-btn red-btn">
          Bill <UserCheck />
        </button>
      </div>
    </div>
  );
};

export default Table;

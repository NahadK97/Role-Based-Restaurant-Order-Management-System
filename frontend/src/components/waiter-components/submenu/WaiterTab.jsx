import { useLocation, useNavigate } from "react-router-dom";
import './Waiter.css';
const WaiterTab = ({ icon: Icon, text, link }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  function handleClick() {
    if (currentPath === link) return;
    navigate(link);
  }

  return (
    <div
      onClick={handleClick}
      className="waiter-tab"
      style={{ color: currentPath === link ? "purple" : "gray" }}
    >
      <Icon className="waiter-tab-icon" />
      <p className="waiter-tab-label">{text}</p>
    </div>
  );
};

export default WaiterTab;

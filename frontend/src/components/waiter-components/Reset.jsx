const Reset = ({ handleClick }) => {
  return (
    <div className="reset-wrapper">
      <button onClick={handleClick} className="reset-button" type="reset">
        reset
      </button>
    </div>
  );
};

export default Reset;

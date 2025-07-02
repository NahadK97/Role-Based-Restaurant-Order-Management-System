
const Amount = ({ amount }) => {
  return (
    <div className="amount-wrapper">
      <label className="amount-label" htmlFor="table">Total:</label>
      <p className="amount-prefix">Rs.</p>
      <input
        className="amount-input"
        required
        readOnly
        value={`${amount}`}
        name="table"
        type="text"
        min="1"
        max="100"
      />
    </div>
  );
};

export default Amount;

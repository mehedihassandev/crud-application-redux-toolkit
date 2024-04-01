import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../store/redux/transactions/transactionsSlice";

export const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
        date,
      })
    );
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              required
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            required
            placeholder="Enter Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            required
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && <p>{error}</p>}

        <button className="btn" type="submit" disabled={isLoading}>
          Add Transaction
        </button>
      </form>

      <button className="btn cancel_edit">Cancel Edit</button>
    </div>
  );
};

export default Form;

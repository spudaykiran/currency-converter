import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function converter() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setIsLoading(false);
        setConverted(data.rates[toCur]);
      }
      if (fromCur === toCur) return setConverted(amount);
      converter();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
      </select>
      {isLoading ? (
        <Loader />
      ) : (
        <p>
          {converted} {toCur}
        </p>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div>
      <div className="loader">
        <p>Loading...</p>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

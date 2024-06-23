"use client"
// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './../services/alldata';

const Statistics = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions(selectedMonth);
      console.log(`Fetched Data for ${selectedMonth}:`, data); // Add this line for logging
      setTransactions(data);
    };
    getTransactions();
  }, [selectedMonth]);

  return (
    <div className="App">
      <h1>Transactions</h1>
      <div className="filters">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            .map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
        </select>
      </div>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.price}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Statistics;

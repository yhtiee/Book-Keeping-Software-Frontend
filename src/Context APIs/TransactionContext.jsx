import React, { createContext, useContext, useState } from "react";
export const TransactionContext = createContext({});

export const useTransaction = () => useContext(TransactionContext);

export default function TransactionProvider({ children }) {
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(-1);
  const [txId, setTxId] = useState("");

  function initTransactionState() {
    setTransactionInProgress(true);
    setTransactionStatus(-1);
  }

  const value = {
    transactionInProgress,
    transactionStatus,
    txId,
    initTransactionState,
    setTxId,
    setTransactionStatus,
  };

  console.log("TransactionProvider", value);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

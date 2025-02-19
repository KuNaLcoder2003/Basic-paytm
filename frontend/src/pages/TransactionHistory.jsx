import { useEffect, useState } from "react";
import TransactionFilters from "../components/TransactionFilters";
import TransactionHeader from "../components/TransactionHeader";
import TransactionList from "../components/TransactionList";
import TransactionPagination from "../components/TransactionPagination";
import toast from "react-hot-toast";


const TransactionHistory = () => {
  // Sample transaction data
  // const transactions = [
  //   {
  //     id: "TXN123456789",
  //     type: "sent",
  //     name: "John Doe",
  //     date: "Feb 7, 2025",
  //     amount: -299.00,
  //     status: "Completed",
  //     category: "Transfer"
  //   },
  //   {
  //     id: "TXN123456788",
  //     type: "received",
  //     name: "Sarah Wilson",
  //     date: "Feb 6, 2025",
  //     amount: 150.00,
  //     status: "Completed",
  //     category: "Payment"
  //   },
  //   {
  //     id: "TXN123456787",
  //     type: "sent",
  //     name: "Mike Johnson",
  //     date: "Feb 5, 2025",
  //     amount: -75.50,
  //     status: "Completed",
  //     category: "Split Bill"
  //   },
  //   {
  //     id: "TXN123456786",
  //     type: "received",
  //     name: "Emma Davis",
  //     date: "Feb 4, 2025",
  //     amount: 500.00,
  //     status: "Completed",
  //     category: "Refund"
  //   }
  // ];

  const [transactions, setTranactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('mounted');
    try {
      fetch('http://localhost:3000/api/v1/account/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      }).then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (data.history) {
          setTranactions(data.history);
        }

      })
    } catch (error) {

    }
  }, [])

  function filterTransactions(filterType) {
    console.log(filterType)

    if (filterType == 'All Types') {
      const token = localStorage.getItem('token');
      console.log('mounted');
      try {
        fetch('http://localhost:3000/api/v1/account/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          }
        }).then(async (response) => {
          const data = await response.json();
          console.log(data);
          if (data.history) {
            setTranactions(data.history);
          }

        })
      } catch (error) {
        toast.error(error);
      }
      return
    }
    let bool = true;
    if (filterType == "Received") {
      bool = false;
    }
    
    console.log(bool);
    const filteredArr = transactions.filter(transaction => transaction.recieved == !bool)
    setTranactions(filteredArr);
  }



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <TransactionHeader />
        <TransactionFilters filterFunction={filterTransactions} />
        <TransactionList transactions={transactions} />
        <TransactionPagination />
      </div>
    </div>
  );
};

export default TransactionHistory;
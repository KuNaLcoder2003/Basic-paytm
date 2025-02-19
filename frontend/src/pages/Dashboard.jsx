import React, { useEffect, useState } from 'react';
import {
  CreditCard,
  Home,
  Send,
  Clock,
  Settings,
  User,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  BarChart,
  Flag,
  Plus,
  LogOut
} from 'lucide-react';
import StatCard from '../components/StatCard';
import NavItem from '../components/NavItem';
import TransactionRow from '../components/TransactionRow';
import toast from 'react-hot-toast';
import SearchUserModal from '../components/SearchUserModal';
import { useNavigate } from 'react-router-dom';

function useGetData(url) {
  const [full_name, setFullName] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      }).then(async (response) => {
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setFullName(data.full_name);
          setBalance(data.balance);
          setLoading(false);
        }
        else {
          setFullName("");
          setBalance("");
          setLoading(false);
          toast.error(data.message);
        }
      })
    } catch (error) {
      toast.error(error);
    }
  }, [])
  return { full_name, balance, loading };
}



const Dashboard = ({ setIsOnline }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const [transactions, setTranactions] = useState([]);
  const [totalSpent , setTotalSpent] = useState(0);
  const [totalRecieved , setTotalRecieved] = useState(0);
  const [spentPercent , setSpentPerecent] = useState("");
  const [recievedPercent , setRecievedPerecent] = useState("");

  const navigate = useNavigate();
  const { full_name, balance, loading } = useGetData('http://localhost:3000/api/v1/user/details');
  // if (modalOpen) {
  //   return (
  //     <SearchUserModal onClose={function () {
  //       setModalOpen(false)
  //     }} />
  //   )
  // }

  function logOutHandler() {
    localStorage.removeItem('token');
    setIsOnline(false);
    navigate('/')
  }

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
          setTranactions(data.history.slice(0, 2));
        }

      })
    } catch (error) {
      toast.error(error);
    }
  }, [])

  useEffect(()=>{
    const token = localStorage.getItem('token')

    try {
      fetch('http://localhost:3000/api/v1/account/totalSpent' , {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          authorization : token
        }
      }).then(async(res)=>{
        const data = await res.json();
        if(data.total_spent){
          setTotalSpent(data.total_spent)
          setSpentPerecent(data.perecentage)
        }
      })
    } catch (error) {
      toast.error(error);
    }
  } , [])

  useEffect(()=>{
    const token = localStorage.getItem('token');
    try {
      fetch('http://localhost:3000/api/v1/account/totalRecieved' , {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          authorization : token
        }
      }).then(async(res)=>{
        const data = await res.json();
        if(data.total_recieved){
          setTotalRecieved(data.total_recieved)
          setRecievedPerecent(data.perecentage)
        }
      })
    } catch (error) {
      toast.error(error);
    }
  } , [])

  
  return (
    <div className="h-screen w-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white h-full border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <CreditCard className="h-6 w-6 text-purple-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">PaySwift</span>
          </div>

          <div className="space-y-1">
            <NavItem icon={<Home size={20} />} label="Overview" active />
            {/* <NavItem icon={<Send size={20} />} label="Transfers" /> */}
            <div onClick={() => navigate('/history')}>
              <NavItem icon={<Clock size={20} />} label="History" />
            </div>
            <NavItem icon={<Settings size={20} />} label="Settings" />
            <div onClick={() => setModalOpen(!modalOpen)}>
              <NavItem icon={<Plus size={20} />} label="New Payment" />
            </div>
            <div onClick={logOutHandler}>
              <NavItem icon={<LogOut size={20} />} label='Logout' />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {modalOpen && <SearchUserModal onClose={() => setModalOpen(false)} />}
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="h-8 w-48 flex items-center justify-center">
              Hello , {full_name}
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              {/* onClick -> open modal , modal -> logout button , account settings */}
              <User size={20} className="text-gray-600" />
            </div>

          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Balance"
                value={`$ ${balance}`}
                change="+2.5%"
                icon={<DollarSign className="h-6 w-6 text-purple-600" />}
              />
              <StatCard
                title="Total Spent"
                value={`$ ${totalSpent}`}
                change={`${spentPercent}%`}
                icon={<ArrowUpRight className="h-6 w-6 text-red-600" />}
                trending="down"
              />
              <StatCard
                title="Total Received"
                value={`$ ${totalRecieved}`}
                change={`${recievedPercent}%`}
                icon={<ArrowDownRight className="h-6 w-6 text-green-600" />}
              />
              {/* <StatCard
                title="Active Cards"
                value="3"
                change="0%"
                icon={<CreditCard className="h-6 w-6 text-blue-600" />}
              /> */}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                  <button onClick={()=>navigate('/history')} className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">

                  {
                    transactions.map((transaction, index) => {
                      return (
                        <TransactionRow
                          name={transaction.senders_name || transaction.receivers_name}
                          date={transaction.date}
                          amount={transaction.amount}
                          type={transaction.recieved ? "recvd" : "sent"}
                        />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// const NavItem = ({ icon, label, active = false }) => (
//   <button
//     className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
//       active 
//         ? 'bg-purple-50 text-purple-600' 
//         : 'text-gray-600 hover:bg-gray-50'
//     }`}
//   >
//     {icon}
//     <span className={active ? 'font-medium' : ''}>{label}</span>
//   </button>
// );

// const StatCard = ({ title, value, change, icon, trending = "up" }) => (
//   <div className="bg-white p-6 rounded-lg shadow">
//     <div className="flex items-center justify-between mb-4">
//       {icon}
//       <span className={`text-sm font-medium ${
//         trending === "up" ? 'text-green-600' : 'text-red-600'
//       }`}>
//         {change}
//       </span>
//     </div>
//     <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
//     <p className="text-2xl font-semibold text-gray-900">{value}</p>
//   </div>
// );

// const TransactionRow = ({ name, date, amount, type }) => (
//   <div className="flex items-center justify-between py-2">
//     <div className="flex items-center space-x-4">
//       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//         type === 'credit' ? 'bg-green-100' : 'bg-red-100'
//       }`}>
//         {type === 'credit' ? (
//           <ArrowDownRight className={`h-5 w-5 ${
//             type === 'credit' ? 'text-green-600' : 'text-red-600'
//           }`} />
//         ) : (
//           <ArrowUpRight className={`h-5 w-5 ${
//             type === 'credit' ? 'text-green-600' : 'text-red-600'
//           }`} />
//         )}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-900">{name}</p>
//         <p className="text-sm text-gray-500">{date}</p>
//       </div>
//     </div>
//     <span className={`text-sm font-medium ${
//       type === 'credit' ? 'text-green-600' : 'text-red-600'
//     }`}>
//       {amount}
//     </span>
//   </div>
// );
export default Dashboard

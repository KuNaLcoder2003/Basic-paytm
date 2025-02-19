const TransactionStatus = ({ status }) => {
    return (
      <span className={`text-sm px-2 py-1 rounded-full ${
        status === 'Pending' 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {status}
      </span>
    );
  };
export default TransactionStatus;
  
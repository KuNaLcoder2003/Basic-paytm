const HistoryHeader = ({ balance, transactionCount }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Transaction History</h1>
            <div className="flex items-center gap-4">
                <div className="bg-purple-100 px-3 py-1 rounded-full">
                    <span className="text-purple-600 font-medium">Balance: ${balance}</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-gray-600">{transactionCount} transactions this month</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryHeader;
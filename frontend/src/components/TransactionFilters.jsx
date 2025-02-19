const TransactionFilters = ({filterFunction}) => {

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
                <select onChange={(e)=>{filterFunction(e.target.value)}} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    <option>All Types</option>
                    <option>Sent</option>
                    <option>Received</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This year</option>
                </select>
            </div>
        </div>
    );
};

export default TransactionFilters;
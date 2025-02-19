import TransactionAmount from "./TransactionAmount";
import TransactionIcon from "./TransactionIcon";


const TransactionItem = ({ transaction, isLast }) => {
    return (
        <div className={`p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer
        ${!isLast ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center space-x-4">
                <TransactionIcon type={transaction.recieved ?'recvd' :'sent'} />
                <div>
                    <h3 className="font-medium text-gray-900">{transaction.senders_name || transaction.receivers_name}</h3>
                    <p className="text-sm text-gray-500">{transaction.date} • {transaction.category}</p>
                </div>
            </div>
            <div className="text-right">
                <TransactionAmount type={transaction.recieved ? 'recvd' : 'sent'} amount={transaction.amount} />
                <span className="text-sm px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {transaction.recieved ? "Recieved" : "Sent"
                    }
                </span>
            </div>
        </div>
    );
};

export default TransactionItem;
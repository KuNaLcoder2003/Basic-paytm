import TransactionItem from "./TransactionItem";



const TransactionList = ({ transactions }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            {transactions.map((transaction, index) => (
                <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    isLast={index === transactions.length - 1}
                />
            ))}
        </div>
    );
};

export default TransactionList;
const TransactionAmount = ({ type, amount }) => {
    return (
        <p className={`font-medium ${type === 'sent' ? 'text-red-600' : 'text-green-600'
            }`}>
            {type === 'sent' ? '-' : '+'}
            ${Math.abs(amount).toFixed(2)}
        </p>
    );
};

export default TransactionAmount;
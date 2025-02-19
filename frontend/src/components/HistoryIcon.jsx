const HistoryIcon = ({ type }) => {
    return (
      <div className={`h-12 w-12 rounded-full flex items-center justify-center
        ${type === 'sent' ? 'bg-red-100' : 'bg-green-100'}`}>
        {type === 'sent' ? 
          <span className="text-red-600 text-xl">↑</span> :
          <span className="text-green-600 text-xl">↓</span>
        }
      </div>
    );
  };

  export default HistoryIcon;
import React from 'react'
import { 
    ArrowUpRight,
    ArrowDownRight,
  } from 'lucide-react';

const TransactionRow = ({ name, date, amount, type }) => {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'recvd' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    {type === 'recvd' ? (
                        <ArrowDownRight className={`h-5 w-5 ${type === 'recvd' ? 'text-green-600' : 'text-red-600'
                            }`} />
                    ) : (
                        <ArrowUpRight className={`h-5 w-5 ${type === 'recvd' ? 'text-green-600' : 'text-red-600'
                            }`} />
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>
            <span className={`text-sm font-medium ${type === 'recvd' ? 'text-green-600' : 'text-red-600'
                }`}>
                {amount}
            </span>
        </div>
    )
}

export default TransactionRow

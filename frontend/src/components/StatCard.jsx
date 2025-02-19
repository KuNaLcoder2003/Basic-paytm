import React from 'react'

const StatCard = ({ title, value, change, icon, trending = "up" }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                {icon}
                <span className={`text-sm font-medium ${trending === "up" ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {change}
                </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    )
}

export default StatCard

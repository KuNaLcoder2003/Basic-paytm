import React from 'react'

const NavItem = ({ icon, label, active = false }) => {
    return (
        <button
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${active
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {icon}
            <span className={active ? 'font-medium' : ''}>{label}</span>
        </button>
    )
}

export default NavItem



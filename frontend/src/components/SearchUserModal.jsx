import React, { useEffect, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useDebounce(word, t) {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(word);
    }, t * 100)
    return () => {
      clearTimeout(time)
    }
  }, [word]);
  console.log(debouncedValue);

  return debouncedValue;
}

const SearchUserModal = ({ onClose }) => {

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([])

  const [input, setInput] = useState("");
  let debouncedValue = useDebounce(input, 2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/v1/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
          word: debouncedValue,
        },
      }).then(async (response) => {
        const data = await response.json()
        if (response.users || response.ok) {
          setSearchResults(data.users);
          setLoading(false);
        }
        else {
          setSearchResults([]);
          setLoading(false)
        }

      })
    } catch (error) {
      toast.error(error)
    }
  }, [debouncedValue])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Search Users</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name or username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-72 overflow-y-auto p-4">
          {/* Example Results
          {[
            { name: 'John Doe', username: '@johndoe' },
            { name: 'Jane Smith', username: '@janesmith' },
            { name: 'Mike Johnson', username: '@mikejohnson' }
          ].map((user, index) => (
            <div 
              key={index}
              className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                {user.name[0]}
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
            </div>
          ))} */}

          {
            searchResults.length == 0 ? <div className='p-3 flex items-center font-medium text-gray-900'>No Users Found</div> : (
              loading ? <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
              </div> : searchResults.map((user) => {
                return (
                  <div className='flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer' key={user.id} onClick={()=>{
                    navigate(`/pay/${user.id}`)
                  }} >
                    <div className='h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold'>
                      {`${user.first_name[0]}`}
                    </div>

                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</p>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SearchUserModal;
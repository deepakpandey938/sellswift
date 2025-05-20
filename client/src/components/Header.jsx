import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-2xl sm:text-3xl flex gap-2 items-center text-white">
            <span className="text-white">SELL</span>
            <span className="text-white">SWIFT</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p- rounded-full flex items-center w-1/3 md:w-1/4 transition-all duration-300 hover:bg-gray-100"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full py-1 px-2 rounded-full text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-gray-600 text-xl ml-1 mx-2 hover:text-blue-500 transition-all duration-300" />
          </button>
        </form>
        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="text-white hover:text-blue-200 transition-all duration-300">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-white hover:text-blue-200 transition-all duration-300">About</li>
          </Link>
           <Link to="/my-listings">
            <li className="text-white hover:text-blue-200 transition-all duration-300">Dashboard</li>
          </Link>



          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-white hover:opacity-80 transition-all duration-300"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-white hover:text-blue-200 transition-all duration-300">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

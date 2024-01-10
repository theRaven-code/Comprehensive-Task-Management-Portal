import React from 'react';
import { Menu, Search, ChevronDown, Info, Settings, User } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-gray-800 p-4 w-[100vw]'>
      {/* Hamburger Menu */}
      <div className='flex items-center'>
        <button className='text-white text-xl lg:text-2xl mr-4'>
          <Menu />
        </button>
        
        {/* Logo */}
        {/* <img src={logo} alt="Logo" className='w-10 h-10 lg:w-12 lg:h-12' /> */}
      </div>

      <div className='relative inline-block'>
        <button className='text-white text-ellipsis'>
          Workspaces <ChevronDown className='inline-block ml-1' />
        </button>
        <div className='hidden absolute bg-gray-800 text-white py-2 px-4 mt-2'>
          <div>Workspace 1</div>
          <div>Workspace 2</div>
          {/* ... */}
        </div>
      </div>

      <div className='flex-grow ml-4'>
        <form className='relative'>
          <input
            type='text'
            className='w-full bg-gray-700 text-white py-1 px-2 rounded-md outline-none'
            placeholder='Search...'
          />
          <Search className='absolute right-2 top-1/2 transform -translate-y-1/2 text-white' />
        </form>
      </div>
      <div className='flex items-center space-x-4 pl-2'>
        <button className='text-white'>
          <Info />
        </button>
        <button className='text-white'>
          <Settings />
        </button>
        <button className='text-white'>
          <User />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

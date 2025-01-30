'use client'
import { useState } from 'react';

import Logo from './Logo';
import Link from 'next/link';
import { Button, SearchBar } from './reusable';
function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  function handleFocus() {
    setSearchActive(true);
  }

  function handleBlur() {
    setSearchActive(false);
  }


  return (
    <nav className={`${'flex w-11/12  justify-between items-center bg-white opacity-90 shadow-md rounded-md px-2 z-10'} ${searchActive? 'opacity-100' : ''}`}>
      <Link href='/'>
          <Logo />
      </Link>
      <div
        className={`flex w-full max-w-sm items-center space-x-1 border rounded-md ${
          searchActive? 'border rounded-md bg-gray-50 border-gray-500 shadow-lg' : '' }`}>
        <SearchBar
          type="text"
          placeholder="Search for your Pokemon 🤩"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button className="text-2xl" variant="ghost">🔎</Button>
      </div>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/cart'>
            <Button className='text-2xl' variant='link'>🛒</Button>
          </Link>
        </li>
        <li>
          <Link href='/auth/login'>
            <Button variant='default'>Login</Button>
          </Link>
        </li>
      </ul>
    </nav>
    )
}

export default Navbar
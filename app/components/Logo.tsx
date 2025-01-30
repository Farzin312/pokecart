'use client'

import Image from 'next/image'
function Logo() {
  return (
      <Image
        src='/logo.png'
        alt='logo'
        width={100}
        height={100}
        className='w-auto'
        priority
      />
  )
}

export default Logo
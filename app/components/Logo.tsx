'use client'

import Image from 'next/image'
import { useMemo } from 'react'
function Logo() {
  const image = useMemo(() => (
    <Image
      src='/logo.png'
      alt='logo'
      width={100}
      height={100}
      className='w-auto'
      priority
    />
  ), [])

  return image
}

export default Logo
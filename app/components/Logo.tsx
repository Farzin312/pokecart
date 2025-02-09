import Image from 'next/image';
function Logo() {
  return (
      <Image
        src="/logo.png"
        alt="Logo"
        width={110}
        height={110}      
        priority
        />
  )
}

export default Logo;
import React from 'react'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
        {children}
    </section>
  )
}

export default AuthLayout
import React from 'react'

//Components Stuff
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  
  return (
    <>
       {/* Header section to show our navbar  */}
       <Header />

       {children}

       {/* Footer section to show our footer  */}
       <Footer />
    </>
  )
}

export default Layout

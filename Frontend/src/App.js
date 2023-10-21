import React from 'react';

import Routers from './OurRoutes'; //setup all routes here



function App() {
  //Disable to right click to download the video 
  // window.addEventListener('contextmenu',(e)=>{
  //   // e.preventDefault();
  // })



  return (
    <>

      {/* ------------- Specifying all routes in our page ----------------X */}
      <Routers />

    </>
  );
}

export default App;

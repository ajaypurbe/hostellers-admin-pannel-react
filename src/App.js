import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navbar from './components/shared/navbar/Navbar';
// import Homepage from './components/screen/homepage/Homepage';
import AppRoutes from './routes/AppRoutes';


import { Provider } from "react-redux";
// import { persistor } from "./features/persistedStore";
import { store } from "./features/store";

import {
  BrowserRouter as Router,
} from "react-router-dom";
import Footer from './components/shared/footer/Footer';
import {Toaster} from 'react-hot-toast';



// import { PersistGate } from 'redux-persist/integration/react'


// function App() {
//   return (
//     <Provider store={persistor}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Router>
//           <div className='font-poppins'>
//             <Navbar />
//             <AppRoutes></AppRoutes>
//             {/* <Homepage></Homepage> */}
//             {/* <Login></Login> */}
//           </div>
//         </Router>
//       </PersistGate>
//     </Provider>
//   );
// }

function App() {
  return (

    <Provider store={store}>
      <div><Toaster /></div>
      <Router>
        <div className='font-poppins'>
          <Navbar />
          <AppRoutes></AppRoutes>
          {/* <Homepage></Homepage> */}
          {/* <Login></Login> */}
          <Footer></Footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
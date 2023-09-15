
import './App.css'
import { BrowserRouter } from "react-router-dom";
import RouterLayout from './router-layouts/RouterLayout';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <RouterLayout />
      </BrowserRouter>
    </>
  )
}

export default App

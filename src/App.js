import Home from "./routes/home/home.component";
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/> {/**when it matches path, it renders elment */}
    </Routes>
  );
};

export default App;

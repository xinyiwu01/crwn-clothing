import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {                                    //callback
      const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
              // create based on uid from snapshot
              createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user));
      })
      return unsubscribe
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}> {/**navigation is outer, parent, with Outlet in Navigation component, its childern will navigate the rest component */}
        {/*<Route path='home' element={<Home/>}/> {/**when it matches path, it renders element */}
        <Route index element={<Home/>}></Route> {/**shorthand for index = {true}, when path is empty, match '/' and render Home */}
        <Route path='auth' element={<Authentication/>}></Route>
        <Route path='shop/*' element={<Shop/>}></Route>
        <Route path='checkout' element={<Checkout/>}></Route>
      </Route>
    </Routes>
  );
};

export default App;

import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/user.context'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  //useContext hook: everytime currentUser changes, all components have currrentUser re-render/re-run
  //rerender: state or props changes
    const {currentUser} = useContext(UserContext); 
    const {isOpen} = useContext(CartContext);

    return (
        //unlike a wrapping div, fragment will not be rendered when inspecting, we need fragment or a wrapping div because root.element -> one parent, no siblings
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo />
            </Link>

            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {currentUser ? (
                  <span className='nav-link' onClick={signOutUser
                  }>SIGN OUT</span>
                ): (
                  <Link className='nav-link' to='/auth'>
                    SIGN IN
                  </Link>
                )
                }
                <CartIcon />
            </div>
            { isOpen && <CartDropDown /> } 
        </div>
        <Outlet />  {/** render nested component */}
      </Fragment>
  
    );
  };

  export default Navigation;
import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';

const Navigation = () => {
    return (
        //unlike a wrapping div, fragment will not be rendered when inspecting, we need fragment or a wrapping div because root.element -> one parent, no siblings
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <div>logo</div>
            </Link>
          <div className='nav-links-container'></div>
        </div>
        <Outlet />  {/** render nested component */}
      </Fragment>
  
    );
  };

  export default Navigation;
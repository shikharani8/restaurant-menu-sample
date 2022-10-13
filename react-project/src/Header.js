import React from 'react';
import {navItems} from './Config';


const Header = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
      <ul class="navbar-nav mr-auto">
        {navItems.map (item => {
          return (
            <li class="nav-item active">
              {/* {item.subMenu
                ? <>
                <div
                    class="btn btn-dark dropdown-toggle"
                    type="button"
                    aria-haspopup="menu"
                  >
                    {item.title}
                  </div>
                <Menu
                  menuCategories={menuCategories}
                />
                </>
                : <a class="btn btn-dark" href={item.path}>{item.title}</a>} */}
                <a class="btn btn-dark" href={item.path}>{item.title}</a>
            </li>
          );
        })}

      </ul>
    </nav>
  )
}

export default Header;

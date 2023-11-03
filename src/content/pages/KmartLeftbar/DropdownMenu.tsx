import React, { useState } from 'react';
import { Menu, MenuItem, ListItemText } from '@mui/material';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>,
    menu: string | React.SetStateAction<null>
  ) => {
    setAnchorEl(event.currentTarget as any);
    setActiveMenu(menu as any);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button onClick={(event) => handleClick(event, 'menu1')}>Menu 1</button>
      <button onClick={(event) => handleClick(event, 'menu2')}>Menu 2</button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={(event) => handleClick(event, 'menu1')}
          selected={activeMenu === 'menu1'}
        >
          <ListItemText primary="Menu Item 1" />
        </MenuItem>
        <MenuItem
          onClick={(event) => handleClick(event, 'menu2')}
          selected={activeMenu === 'menu2'}
        >
          <ListItemText primary="Menu Item 2" />
        </MenuItem>
        <MenuItem
          onClick={(event) => handleClick(event, 'menu3')}
          selected={activeMenu === 'menu3'}
        >
          <ListItemText primary="Menu Item 3" />
          <Menu
            anchorEl={anchorEl}
            open={activeMenu === 'menu3'}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Submenu Item 1" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Submenu Item 2" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemText primary="Submenu Item 3" />
            </MenuItem>
          </Menu>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;

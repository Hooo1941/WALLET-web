import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Me() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const uid = localStorage.getItem('uid') ?? '';
  const isLogined = uid !== '';
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    location.href = '/#/profile';
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('uid');
    location.href = '/';
  };

  if (isLogined)
    return (
      <div>
        <Tooltip title={'已登录'}>
          <IconButton
            color="inherit"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleProfile}>钱包信息</MenuItem>
          <MenuItem onClick={handleLogout}>注销</MenuItem>
        </Menu>
      </div>
    );
  else
    return (
      <div>
        <Button href="/#/login" variant="contained">
          登录
        </Button>
        <Button href="/#/register" variant="contained">
          注册
        </Button>
      </div>
    );
}

export default Me;

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagIcon from '@mui/icons-material/Flag';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@mui/material';
import * as React from 'react';

export function JobFeedbackMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton sx={{ width: '40px' }} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      {/* menu start */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding onClick={handleClose}>
                <ListItemButton sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}>
                  <ListItemIcon sx={{ minWidth: '34px' }}>
                    <FavoriteBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Save job" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={handleClose}>
                <ListItemButton sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}>
                  <ListItemIcon sx={{ minWidth: '34px' }}>
                    <NotInterestedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Not interested" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={handleClose}>
                <ListItemButton sx={{ '& .MuiTypography-root': { fontSize: '12px' } }}>
                  <ListItemIcon sx={{ minWidth: '34px' }}>
                    <FlagIcon />
                  </ListItemIcon>
                  <ListItemText primary="Is there a problem with this" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover>
    </div>
  );
}

export default JobFeedbackMenu;

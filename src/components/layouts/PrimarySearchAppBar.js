import React, { useState, useContext, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import ViewModuleSharpIcon from '@material-ui/icons/ViewModuleSharp';
import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StorageSharpIcon from '@material-ui/icons/StorageSharp';
import AddIcon from '@material-ui/icons/Add';


import Navbar3 from './Navbar3';

// import { ConfigContext } from '../../context/ConfigContext';
import { GlobalContext } from '../../context/GlobalContext';
import Button from '@material-ui/core/Button';

import AddRowModal from './../main/tabale-elemnts/tables/add/AddRowModal';

import HiddenFields from './HiddenFields';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  hiddenColumns: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'fix',
    overflow: 'auto',
    maxHeight: 300,
    direction: 'rtl',
    marginTop: 64,
    boxShadow: '10 10 5 grey',

  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

}));

export default function PrimarySearchAppBar(props) {
  // const { config } = useContext(ConfigContext);
  const { global } = useContext(GlobalContext);
  const { AppDirection, setAppDirection } = props;
  const { screenType, setScreenType } = props;
  const theme = useTheme();
  const siteDirection = () => {
    setAppDirection(AppDirection === 'ltr' ? 'rtl' : 'ltr');
    window.localStorage.setItem('AppDirection', JSON.stringify(AppDirection));
  }

  const changeScreenView = () => {
    setScreenType(screenType === 'table' ? 'card' : 'table');
    window.localStorage.setItem('screenType', JSON.stringify(screenType));
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const [countHidden, SetCountHidden] = useState(0);

  // useEffect(() => {
  //   SetCountHidden(config.filter(x => x.clientTableHideColumn === true).length);
  // }, [config])
  const [modalVisible, setModalVisible] = useState(false)

  const showHideModal = () => {
    setModalVisible(x => !x);
  }
  // const [modalAddRowVisible, setAddRowModalVisible] = useState(false)

  const showHideModalAddRow = () => {
    setModalVisible(false);
    // setModalVisible(x => !x);
  }

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile1</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

    </Menu>

  );

  return (

    <div className={classes.grow}>

      <AppBar style={{ backgroundColor: "#42a5f5" }}>

        <Toolbar>
          <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer"> <MenuIcon /> </IconButton>

          <Badge badgeContent={global[0].countHiddenFields} color="secondary" size="small">
          {/*  <HiddenFields />*/}
          </Badge>





          <Typography className={classes.title} variant="h6" noWrap>
            Page-im
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }} inputProps={{ 'aria-label': 'search' }} />
          </div>

       
          <Button color="default" onClick={showHideModal} ><AddIcon/></Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" color="inherit"> <MoreIcon /> </IconButton>
          </div>
        </Toolbar>
      </AppBar>


      <AddRowModal
        header='Add row'
        visible={modalVisible}
        dismiss={showHideModalAddRow}
        children='modalAddRowVisible'
      />

      <Drawer
        className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={changeScreenView}>{screenType === 'table' ? <ViewModuleSharpIcon /> : <StorageSharpIcon />} </IconButton>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} </IconButton>
        </div>

        <Divider />
        <Navbar3 />
        <Divider />
        <List>

          <Divider />

          <IconButton onClick={siteDirection}> {AppDirection === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />} </IconButton>
          <p>ver 1.03</p>
        </List>

      </Drawer>
      {renderMobileMenu}
      {renderMenu}


    </div>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// This footer component renders a bottom navigation bar with icons for Facebook, Instagram, and LinkedIn. 
// When a user clicks on one of the icons, they are redirected to the corresponding social media profile.

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const handleNavigation = (platform) => {
    switch (platform) {
      case 'facebook':
        window.location.href = 'https://www.facebook.com/noura.darwazeh.7?mibextid=ZbWKwL'; 
        break;
      case 'instagram':
        window.location.href = 'https://www.instagram.com/noura_darwazeh2000/profilecard/?igsh=MXVvNWxlYjczazVpZw==';  
        break;
      case 'LinkedIn':
        window.location.href = 'https://www.linkedin.com/in/nouradarwazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'; 
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        sx={{ backgroundColor: '#00749A' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{ color:'#fff'}}
          label="Facebook"
          icon={<FacebookIcon />}
          onClick={() => handleNavigation('facebook')}
        />
        <BottomNavigationAction
        sx={{ color:'#fff'}}
          label="Instagram"
          icon={<InstagramIcon />}
          onClick={() => handleNavigation('instagram')}
        />
        <BottomNavigationAction
        sx={{ color:'#fff'}}
          label="LinkedIn"
          icon={<LinkedInIcon />}
          onClick={() => handleNavigation('LinkedIn')}
        />
      </BottomNavigation>
    </Box>
  );
}

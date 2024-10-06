import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// This component creates a responsive card with an image, title, and description. 

export default function MediaControlCard({ image, title, description }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '100%', md: 151 },
                    height: { xs: 'auto', md: '100%' }
                }}
                image={image}
                alt="Live from space album cover"
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    padding: { xs: 2, md: 0 }
                }}
            >
                <CardContent sx={{ flex: '1 0 auto', textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}

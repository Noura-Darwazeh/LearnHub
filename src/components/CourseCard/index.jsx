
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ course }) {
  return (
    <Card sx={{ maxWidth: 345 }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: '#00749A' }}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

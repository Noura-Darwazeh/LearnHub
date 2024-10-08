
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// This component creates a simple card layout that displays a course's title and description. 
// It includes a "Learn More" button that triggers an action, allowing users to view more details about the course.
export default function MediaCard({ course,onLearnMore }) {
 
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
        <Button size="small" sx={{ color: '#00749A' }} onClick={() => onLearnMore(course._id)}>Learn More</Button>
      </CardActions>
    
    </Card>
  );
}

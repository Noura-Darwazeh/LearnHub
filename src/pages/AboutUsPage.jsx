import AboutUsCard from '../components/AboutUsCard';
import img1 from '../assets/aboutUs1.jpg';
import img2 from '../assets/aboutUs2.jpg';
import img3 from '../assets/aboutUs3.jpg';
import Container from '@mui/material/Container';
import HomeButton from '../components/HomeButton/BackToHomeButton'

// This page is the About Us page, featuring information about the platform's high-quality content, flexible learning. 

const AboutUsPage = () => {
    return (
        <Container sx={{
            paddingTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '80px'
        }}>
            <HomeButton sx={{ color: '#00749a', borderColor: '#00749a' }}
            />
            <AboutUsCard
                image={img1}
                title="High-Quality Content"
                description="Our courses are created by experts to provide the most valuable information."
            />
            <AboutUsCard
                image={img2}
                title="Flexible Learning"
                description="Learn at your own pace with flexible schedules that fit your life."
            />
            <AboutUsCard
                image={img3}
                title="Community Support"
                description="Join a community of learners and get support from instructors and peers."
            />
        </Container>
    );
};

export default AboutUsPage;

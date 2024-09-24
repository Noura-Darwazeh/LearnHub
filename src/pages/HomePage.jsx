import CourseCard from '../components/CourseCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import { Grid } from '@mui/material'
const HomePage = () => {
    return (
        <>
            <Navbar />
            <Slider />
            <Grid container spacing={3} padding={3}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard />
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default HomePage

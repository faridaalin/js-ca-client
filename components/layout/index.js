import { Grid, GridItem, Container } from '@chakra-ui/react';
// import Navbar from '../navbar';
import Navbar from '../navigationHeader';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ title, children }) => {
  return (
    <Grid
      templateRows='auto 1fr auto'
      templateColumns='1fr'
      className='container'
    >
      <Navbar />
      <Container maxW='container.xl'>
        <main>
          <Header title={title} />
          {children}
        </main>
      </Container>
      <Footer />
    </Grid>
  );
};

export default Layout;

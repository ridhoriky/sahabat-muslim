import HeroCarousel from '../components/HeroCarousel';
// import SideComp from '../components/SideSeacrh';

const Home = () => {
  const styleContainer: React.CSSProperties = {
    padding: '70px 10%',
    backgroundColor: '#FFF5D9',
    minHeight: '100vh',
    minWidth: '100%',
  };
  return (
    <div style={styleContainer}>
      {/* <SideComp />
       */}
      <HeroCarousel />
    </div>
  );
};

export default Home;

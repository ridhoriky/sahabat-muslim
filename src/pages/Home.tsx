import HeroCarousel from '../components/HeroCarousel';
// import SideComp from '../components/SideSeacrh';

const Home = () => {
  return (
    <div className='pt-5 px-[10%] bg-semiBrown min-h-screen min-w-screen'>
      {/* <SideComp />
       */}
      <HeroCarousel />
      <h1 className='md:text-5xl font-bold text-center mt-5 text-darkBrown text-xl'>
        Selalu Tepat, Selalu Dekat
      </h1>
    </div>
  );
};

export default Home;

import GlobalHeroFilter from "../common/GlobalHeroFilter";

const Hero = () => {
  return (
    <section className="home-one home1-overlay home1_bgi1" style={{
      background: `url('https://via.placeholder.com/1920x1080.jpg?text=Home+Service+Experts') no-repeat center/cover`
    }}>
      <div className="container">
        <div className="row posr">
          <div className="col-lg-12">
            <HeroFilter />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroFilter = () => {
  return (
    <div className="home_content">
      <div className="home-text text-center">
        <h2 className="fz55">Your Home Service Experts</h2>
        <p className="fz18 color-white">
          Connect with our trusted and skilled home service professionals
        </p>
      </div>
      {/* End .home-text */}

      <GlobalHeroFilter />
    </div>
  );
};

export default Hero;

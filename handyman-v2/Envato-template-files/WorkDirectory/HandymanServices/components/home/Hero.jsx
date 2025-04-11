import GlobalHeroFilter from "../common/GlobalHeroFilter";

const Hero = () => {
  return (
    <section className="home-one home1-overlay home1_bgi1">
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
        <h2 className="fz55">Find Your Trusted Handyman</h2>
        <p className="fz18 color-white">
          Professional handyman services for all your home repair and maintenance needs
        </p>
      </div>
      {/* End .home-text */}

      <GlobalHeroFilter />
    </div>
  );
};

export default Hero;

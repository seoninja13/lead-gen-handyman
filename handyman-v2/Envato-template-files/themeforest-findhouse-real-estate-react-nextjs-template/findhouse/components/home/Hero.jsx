import Image from "next/image";
import HeroFilter from "./HeroFilter";

const Hero = () => {
  return (
    <section className="home-one home1-overlay home1_bgi1">
      <div className="container">
        <div className="row posr">
          <div className="col-lg-12">
            <div className="home1_content">
              <div className="title_home1 mb30">
                <h2>Find Reliable Handyman Services</h2>
              </div>
              <div className="sub_title">
                <p>Get connected with trusted professionals for all your home repair needs</p>
              </div>
            </div>
            <HeroFilter />
          </div>
        </div>
      </div>
      {/* End container */}

      <div className="mouse_scroll">
        <a href="#feature-property">
          <div className="icon">
            <h4>Scroll Down</h4>
            <p>to discover more</p>
          </div>
          <div className="thumb">
            <Image
              width={21}
              height={35}
              src="/assets/images/resource/mouse.png"
              alt="mouse.png"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

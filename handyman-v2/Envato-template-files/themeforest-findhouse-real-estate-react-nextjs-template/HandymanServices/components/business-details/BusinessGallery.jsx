'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const BusinessGallery = ({ business }) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <Gallery>
          <div className="row">
            <div className="col-sm-7 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="spls_style_two mb30-520">
                    <Item
                      original={business.gallery[0].image}
                      thumbnail={business.gallery[0].image}
                      width={752}
                      height={450}
                    >
                      {({ ref, open }) => (
                        <div role="button" ref={ref} onClick={open}>
                          <img
                            className="img-fluid w100 cover lds-1"
                            src={business.gallery[0].image}
                            alt={business.gallery[0].title}
                          />
                        </div>
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-sm-7 */}

            <div className="col-sm-5 col-lg-4">
              <div className="row">
                {business.gallery.slice(1, 3).map((item, index) => (
                  <div key={index} className="col-6 col-lg-6 ps-1">
                    <div className="spls_style_two mb30">
                      <Item
                        original={item.image}
                        thumbnail={item.image}
                        width={752}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <div role="button" ref={ref} onClick={open}>
                            <img
                              className="img-fluid w100 cover"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                        )}
                      </Item>
                    </div>
                  </div>
                ))}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-sm-5 */}
          </div>
          {/* End .row */}
        </Gallery>
      </div>
    </div>
  );
};

export default BusinessGallery;

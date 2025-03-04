/**
 * Blogs Component
 * 
 * This component displays a list of blog articles related to handyman services.
 * Adapted from the Envato template's Blogs component.
 */

import React from 'react';
import Link from 'next/link';

const Blogs = () => {
  // Sample blog data - in a real application, this would come from an API or CMS
  const blogItems = [
    {
      id: 1,
      title: "DIY Home Repairs Every Homeowner Should Know",
      description: "Learn the essential home repair skills that can save you time and money.",
      date: "March 1, 2025",
      author: "John Smith",
      image: "/assets/images/blog/1.jpg",
      category: "DIY"
    },
    {
      id: 2,
      title: "When to Call a Professional vs. DIY",
      description: "Understanding when a project requires professional help or can be done yourself.",
      date: "February 15, 2025",
      author: "Sarah Johnson",
      image: "/assets/images/blog/2.jpg",
      category: "Home Maintenance"
    },
    {
      id: 3,
      title: "Seasonal Home Maintenance Checklist",
      description: "Keep your home in top condition year-round with these seasonal maintenance tips.",
      date: "January 28, 2025",
      author: "Mike Davis",
      image: "/assets/images/blog/3.jpg",
      category: "Maintenance"
    }
  ];

  return (
    <>
      {blogItems.map((item) => (
        <div className="col-md-6 col-lg-4" key={item.id}>
          <div className="for_blog feat_property">
            <div className="thumb">
              <Link href={`/blog-details/${item.id}`}>
                <img className="img-whp" src={item.image} alt={item.title} />
              </Link>
              <div className="blog_tag">{item.category}</div>
            </div>
            {/* End .thumb */}

            <div className="details">
              <div className="tc_content">
                <h4 className="mb15">
                  <Link href={`/blog-details/${item.id}`}>{item.title}</Link>
                </h4>
                <p>{item.description}</p>
              </div>
              {/* End .tc_content */}

              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <Link href="/agent-details">
                      <img src="/assets/images/property/pposter1.png" alt="pposter1.png" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link href="/agent-details">{item.author}</Link>
                  </li>
                </ul>
                <a className="fp_pdate float-end" href="#">
                  {item.date}
                </a>
              </div>
              {/* End .fp_footer */}
            </div>
            {/* End .details */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Blogs;

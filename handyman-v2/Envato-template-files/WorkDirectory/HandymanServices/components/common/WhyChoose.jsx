const WhyChoose = () => {
  const whyChooseContent = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Trusted Professionals",
      descriptions: `All our service providers are thoroughly vetted, licensed, and insured for your peace of mind.`,
    },
    {
      id: 2,
      icon: "flaticon-home-1",
      title: "Quality Workmanship",
      descriptions: `We stand behind the quality of our work with satisfaction guarantees and warranties.`,
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Competitive Pricing",
      descriptions: `Get fair, transparent pricing with no hidden fees or surprise charges.`,
    },
    {
      id: 4,
      icon: "flaticon-heart",
      title: "Customer Satisfaction",
      descriptions: `Our service providers are rated and reviewed by real customers to ensure quality service.`,
    },
  ];

  return (
    <>
      {whyChooseContent.map((item) => (
        <div className="col-md-6 col-lg-3 col-xl-3" key={item.id}>
          <div className="why_chose_us">
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;

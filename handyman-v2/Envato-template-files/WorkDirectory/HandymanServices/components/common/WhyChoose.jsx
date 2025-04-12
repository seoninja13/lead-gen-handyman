const WhyChoose = () => {
  const whyChooseContent = [
    {
      id: 1,
      icon: "flaticon-user-experience",
      title: "Expert Guidance",
      descriptions: `Our experienced professionals provide expert advice and solutions for all your home service needs.`,
    },
    {
      id: 2,
      icon: "flaticon-alarm",
      title: "24/7 Emergency Service",
      descriptions: `We're available around the clock to handle any urgent home repair or maintenance issues.`,
    },
    {
      id: 3,
      icon: "flaticon-money-bag",
      title: "Transparent Pricing",
      descriptions: `Get upfront, honest pricing with no hidden fees or surprise charges after the work is done.`,
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

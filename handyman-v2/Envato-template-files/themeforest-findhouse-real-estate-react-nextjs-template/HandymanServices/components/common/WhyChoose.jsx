const WhyChoose = ({ style = "" }) => {
  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-tool",
      title: "Expert Craftsmen",
      descriptions: `Our skilled handymen have years of experience and are fully licensed and insured. We take pride in delivering high-quality workmanship on every job.`,
    },
    {
      id: 2,
      icon: "flaticon-clock",
      title: "24/7 Emergency Service",
      descriptions: `We understand that home repairs can't wait. That's why we offer round-the-clock emergency services to handle your urgent repair needs.`,
    },
    {
      id: 3,
      icon: "flaticon-money-bag",
      title: "Transparent Pricing",
      descriptions: `No hidden fees or surprises. We provide upfront pricing and detailed estimates before starting any work, ensuring you know exactly what to expect.`,
    },
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className={`why_chose_us ${style}`}>
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

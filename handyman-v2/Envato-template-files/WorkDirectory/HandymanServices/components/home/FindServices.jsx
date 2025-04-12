import Link from "next/link";

const FindServices = ({ services }) => {
  return (
    <>
      {services.map((item) => (
        <div className={item.column} key={item.id}>
          <Link href={`/services/${item.slug}`}>
            <div className="properti_city">
              <div className="thumb">
                <img className="img-fluid w100" src={item.img} alt={item.name} />
              </div>
              <div className="overlay">
                <div className="details">
                  <h4>{item.name}</h4>
                  <p>{item.number} Providers</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default FindServices;

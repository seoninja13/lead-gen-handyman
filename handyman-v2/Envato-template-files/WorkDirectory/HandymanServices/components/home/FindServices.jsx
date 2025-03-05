import Link from "next/link";
import findServices from "../../data/findServices";
import Image from "next/image";

const FindServices = () => {
  return (
    <>
      {findServices.slice(0, 4).map((item) => (
        <div className={`col-lg-4 ${item.column}`} key={item.id}>
          <Link href={`/services/${item.name.toLowerCase()}`} className="service_category d-block">
            <div className="thumb">
              <Image
                width={752}
                height={352}
                className="img-fluid w100 h-100 cover"
                src={item.img}
                alt={`${item.name} services`}
              />
            </div>
            <div className="overlay">
              <div className="details">
                <h4>{item.name}</h4>
                <p>Starting from ${item.number}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default FindServices;

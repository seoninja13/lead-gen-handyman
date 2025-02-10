import Image from "next/image";
import Link from "next/link";

const ClientReview = () => {
  const reviewContent = [
    {
      id: 1,
      img: "/assets/images/resource/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
      ratings: (
        <>
          {" "}
          <ul>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
          </ul>
        </>
      ),
      reviewOn: "Fix Leaky Faucet",
      text: `Great service! Fixed my leaky faucet quickly and efficiently. Highly recommend!`,
    },
    {
      id: 2,
      img: "/assets/images/resource/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
      ratings: (
        <>
          {" "}
          <ul>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
          </ul>
        </>
      ),
      reviewOn: "Install New Lighting",
      text: `Excellent work! The new lighting looks amazing and the electrician was very professional.`,
    },
    {
      id: 3,
      img: "/assets/images/resource/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
      ratings: (
        <>
          {" "}
          <ul>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-star"></i>
              </a>
            </li>
          </ul>
        </>
      ),
      reviewOn: "Build Custom Shelves",
      text: `The carpenter did a fantastic job building custom shelves for my living room. I'm very happy with the result.`,
    },
  ];

  return (
    <>
      {reviewContent.map((item) => (
        <div className="media pb30 mt30" key={item.id}>
          <Image
            width={120}
            height={120}
            className="mr-3"
            src={item.img}
            alt="Review image"
          />
          <div className="media-body">
            <h5 className="review_title mt-0">
              Your review on{" "}
              <Link href="/agency-details/3">
                <span className="text-thm">{item.reviewOn}</span>
              </Link>
              <span className="sspd_review float-end">{item.ratings}</span>
            </h5>
            <a className="review_date" href="#">
              December 28, 2020
            </a>
            <p className="para">{item.text}</p>

            <ul className="view_edit_delete_list mb0 mt35">
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              >
                <a href="#">
                  <span className="flaticon-edit"></span>
                </a>
              </li>
              {/* End edit */}

              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              >
                <a href="#">
                  <span className="flaticon-garbage"></span>
                </a>
              </li>
              {/* End delete */}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientReview;

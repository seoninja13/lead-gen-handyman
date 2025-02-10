import Image from "next/image";

const SingleUser = () => {
  const singleUserConent = [
    {
      id: 1,
      img: "/assets/images/resource/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "2",
      unreadMessageClass: "m_notif",
      status: "online",
    },
    {
      id: 2,
      img: "/assets/images/resource/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "2",
      unreadMessageClass: "m_notif",
      status: "away",
    },
    {
      id: 3,
      img: "/assets/images/resource/beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "",
      unreadMessageClass: "",
      status: "online",
    },
    {
      id: 4,
      img: "/assets/images/resource/close-up-image-of-a-wooden-staircase-with-several-2024-01-08-22-11-19-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "",
      unreadMessageClass: "",
      status: "away",
    },
    {
      id: 5,
      img: "/assets/images/resource/stunning-interior-decor-with-a-wooden-floor-and-fu-2024-01-08-22-11-19-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "",
      unreadMessageClass: "",
      status: "busy",
    },
    {
      id: 6,
      img: "/assets/images/resource/what-a-beautiful-place-to-call-home-2024-06-25-15-39-29-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "",
      unreadMessageClass: "",
      status: "online",
    },
    {
      id: 7,
      img: "/assets/images/resource/54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "",
      unreadMessageClass: "",
      status: "busy",
    },
    {
      id: 8,
      img: "/assets/images/resource/a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc.jpg",
      name: "Vincent Porter",
      meta: `I'm going to office.`,
      unreadMessage: "",
      unreadMessageClass: "",
      status: "online",
    },
  ];
  return (
    <>
      {singleUserConent.map((user) => (
        <li className="contact" key={user.id}>
          <a href="#">
            <div className="wrap">
              <span className={`contact-status ${user.status}`}</span>
              <Image
                width={50}
                height={50}
                className="img-fluid"
                src={user.img}
                alt="s1.jpg"
              />
              <div className="meta">
                <h5 className="name">{user.name}</h5>
                <p className="preview">{user.meta}</p>
              </div>
              <div className={user.unreadMessageClass}>
                {user.unreadMessage}
              </div>
            </div>
          </a>
        </li>
      ))}
    </>
  );
};

export default SingleUser;

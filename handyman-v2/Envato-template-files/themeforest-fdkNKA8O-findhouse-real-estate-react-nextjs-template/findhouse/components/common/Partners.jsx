import Image from "next/image";

const Partners = () => {
  const partnersImages = [
    "54683-stone-fireplace-in-living-room-2023-11-27-05-19-47-utc",
    "a-big-house-in-the-middle-of-a-hill-with-a-tree-an-2024-01-19-22-55-37-utc",
    "beautiful-modern-house-surrounded-by-nature-in-win-2023-11-27-05-09-17-utc",
    "close-up-image-of-a-wooden-staircase-with-several-2024-01-08-22-11-19-utc",
    "stunning-interior-decor-with-a-wooden-floor-and-fu-2024-01-08-22-11-19-utc",
  ];
  return (
    <>
      {partnersImages.map((val, i) => (
        <div className="col-sm-6 col-md-4 col-lg" key={i}>
          <div className="our_partner">
            <Image
              width={106}
              height={71}
              className="contain"
              src={`/assets/images/resource/${val}.jpg`}
              alt="1.png"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Partners;

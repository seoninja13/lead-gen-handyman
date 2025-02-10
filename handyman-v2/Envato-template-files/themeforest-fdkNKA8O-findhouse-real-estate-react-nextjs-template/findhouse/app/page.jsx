import dynamic from "next/dynamic";
import HomeMain from "@/components/home";

export const metadata = {
  title: 'FindHouse - Real Estate React Template',
  description: 'FindHouse - Real Estate React Template',
}

const HomePage = () => {
  return (
    <>
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });

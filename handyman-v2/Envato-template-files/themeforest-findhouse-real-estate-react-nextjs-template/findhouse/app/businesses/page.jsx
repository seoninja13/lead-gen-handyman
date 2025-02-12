'use client'

import dynamic from "next/dynamic";
import BusinessesList from "@/components/businesses";

const index = () => {
  return (
    <>
      <BusinessesList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

'use client'

import dynamic from "next/dynamic";
import BusinessDetails from "@/components/business-details";
import { useSearchParams } from "next/navigation";

const index = () => {
  const searchParams = useSearchParams();
  const businessId = searchParams.get('id');

  return (
    <>
      <BusinessDetails businessId={businessId} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

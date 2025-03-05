'use client'

import dynamic from "next/dynamic";
import AgencyDetails from "@/components/agency-details";
import { useSearchParams } from "next/navigation";

const index = () => {
  const searchParams = useSearchParams();
  const service = searchParams.get('service');

  return (
    <>
      <AgencyDetails service={service} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

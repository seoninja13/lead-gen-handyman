import dynamic from "next/dynamic";
import AgentV1 from "@/components/agent-view/agent-v1";

export const metadata = {
  title: 'Handyman Services Directory || Professional Home Repair & Maintenance',
  description:
    'Find skilled and reliable handymen in your area. Browse our directory of professional handyman services, read reviews, and get free quotes for your home repair and maintenance needs.',
}

const index = () => {
    return (
        <>
            <AgentV1 />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

// Business-specific service page
import dynamic from "next/dynamic";
import BusinessProfile from '../../../../components/business-profile';

export const metadata = {
  title: 'Business Profile - FindHouse',
  description: 'Business profile page for handyman services',
}

const BusinessPage = () => {
  return <BusinessProfile />;
};

export default dynamic(() => Promise.resolve(BusinessPage), { ssr: false });

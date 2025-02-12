import BreadCrumb from "../common/BreadCrumb";

const formatServiceName = (service) => {
  if (!service) return "All Services";
  return service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BreadCrumb2 = ({ service }) => {
  const serviceName = formatServiceName(service);
  
  return (
    <div className="breadcrumb_content style2">
      <BreadCrumb title={serviceName} />
      <h2 className="breadcrumb_title">{serviceName}</h2>
    </div>
  );
};

export default BreadCrumb2;

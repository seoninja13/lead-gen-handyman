'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAgentItemLength } from "../../../features/agent/agentSlice";
import agents from "../../../data/agents";
import Image from "next/image";

const Team = () => {
  const { name, category, city, listen } =
    useSelector((state) => state.agent) || {};
  const dispatch = useDispatch();

  // name
  const nameHandler = (item) =>
    item.name.toLowerCase().includes(name.toLowerCase());

  // category
  const categoryHandler = (item) =>
    item.type.toLowerCase().includes(category.toLowerCase());

  // city
  const cityHandler = (item) =>
    item.city.toLowerCase().includes(city.toLowerCase());

  let content = agents
    .filter(nameHandler)
    .filter(categoryHandler)
    .filter(cityHandler)
    .filter((item) =>
      item.noOfListings.toLowerCase().includes(listen.toLowerCase())
    )
    .map((item) => (
      <div className="col-md-6 col-lg-6" key={item.id}>
        <div className="feat_property home7 agent">
          <div className="thumb">
            <Link href={`/handyman-details/${item.id}`}>
              <Image
                width={342}
                height={262}
                className="img-whp w-100 h-100 cover"
                src={item.img}
                alt={item.name}
              />
            </Link>
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                {item.specialties.map((specialty, index) => (
                  <li className="list-inline-item" key={index}>
                    <a href="#">{specialty}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>
                <Link href={`/handyman-details/${item.id}`}>{item.name}</Link>
              </h4>
              <p className="text-thm">{item.type}</p>
              <ul className="prop_details mb0">
                <li>
                  <a href="#">
                    Experience: {item.yearsExperience} years
                  </a>
                </li>
                <li>
                  <a href="#">
                    Jobs Completed: {item.noOfListings}
                  </a>
                </li>
                <li>
                  <a href="#">
                    Rating: {item.ratings} ⭐
                  </a>
                </li>
              </ul>
            </div>
            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                {item.socialList.map((social, index) => (
                  <li className="list-inline-item" key={index}>
                    <a href={social.liveLink} target="_blank" rel="noopener noreferrer">
                      <i className={`fa ${social.icon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="fp_pdate float-end text-thm">
                {item.licensedInsured ? "Licensed & Insured" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  // agent item length
  useEffect(() => {
    dispatch(addAgentItemLength(content.length));
  }, [dispatch, content]);

  return <>{content}</>;
};

export default Team;

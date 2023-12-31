import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await axiosPublic("/cards");
      setCards(res.data);
    };
    data();
  }, [axiosPublic]);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-semibold text-black mt-4 mb-6">
          My Projects
        </h2>
        <Link to="/addAProject" className="btn text-white">
          Add a Project
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards?.map((card) => (
          <Link
            to={`/projectDetails/${card?._id}`}
            key={card?._id}
            className="card"
          >
            <div className="h-48 rounded-t-xl">
              <img
                src={card?.image_url}
                alt="Card Image"
                className="h-full w-full rounded-t-xl object-cover"
              />
            </div>
            <div className="card-body items-center text-center py-3 gap-0">
              <h2 className="font-semibold text-black">{card?.author}</h2>
              <h2 className="font-semibold">{card?.title}</h2>
              <p className="text-[#FA782F] font-semibold text-sm">
                {card?.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

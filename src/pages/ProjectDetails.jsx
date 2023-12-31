import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [card, setCard] = useState({});

  useEffect(() => {
    const data = async () => {
      const res = await axiosPublic(`/cards/${id}`);
      setCard(res.data);
    };
    data();
  }, [axiosPublic, id]);

  return (
    <div className="p-10 h-screen">
      <div className="rounded-lg h-full">
        <img
          className="object-cover w-full h-3/5"
          src={card?.image_url}
          alt="Card Image"
        />

        <div className="p-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase">
              {card?.author}
            </span>
            <p
              className="block mt-2 text-xl font-semibold text-gray-800"
              tabIndex="0"
              role="link"
            >
              I Built A Successful Blog In One Year
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
              parturient et sem ipsum volutpat vel. Natoque sem et aliquam
              mauris egestas quam volutpat viverra. In pretium nec senectus
              erat. Et malesuada lobortis. mauris egestas quam volutpat viverra.
              In pretium nec senectus erat. Et malesuada lobortis.
            </p>
          </div>
          <div className="flex justify-end items-center gap-4 mt-4">
            <Link to={`/updateProject/${card?._id}`} className="btn btn-outline text-black">Update</Link>
            <button className="btn btn-warning">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

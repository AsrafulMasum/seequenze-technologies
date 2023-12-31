import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [card, setCard] = useState({});

  useEffect(() => {
    const data = async () => {
      const res = await axiosPublic(`/cards/${id}`);
      setCard(res.data);
    };
    data();
  }, [axiosPublic, id]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/cards/${id}`);
        if (res?.data?.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Player has been deleted.",
            icon: "success",
          });
          navigate("/");
        }
      }
    });
  };

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
              {card?.title}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {card?.description}
            </p>
          </div>
          <div className="flex justify-end items-center gap-4 mt-4">
            <Link
              to={`/updateProject/${card?._id}`}
              className="btn btn-outline text-black"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(card?._id)}
              className="btn btn-warning"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

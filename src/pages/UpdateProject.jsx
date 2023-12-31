import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = async () => {
      const res = await axiosPublic(`/cards/${id}`);
      setCard(res.data);
    };
    data();
  }, [axiosPublic, id]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data?.image[0] };
    const res = await axiosPublic.post(imgHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const photo = res.data.data.display_url;
    if (res?.data?.success) {
      try {
        const cardData = {
          author: data?.author,
          image_url: photo,
        };
        const res = await axiosPublic.put(`/cards/${id}`, cardData);
        if (res?.data?.modifiedCount) {
          setLoading(false);
          toast.success("Your project has been updated.");
          navigate("/");
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-[#F8F8F8] pt-10 min-h-screen">
      <h2 className="text-4xl font-semibold text-black mt-4 mb-6 text-center">
        Update Your Project
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mx-auto">
        <input
          {...register("author", { required: true })}
          defaultValue={card?.author}
          className="w-full h-11 outline-none px-5 bg-white border border-[#D0D0D0] rounded text-sm"
          type="text"
          placeholder="Name"
          required
        />

        <label
          htmlFor="dropzone-file"
          className="flex items-center px-3 py-3 mx-auto mt-4 text-center bg-white border border-dashed border-[#D0D0D0] rounded cursor-pointer"
        >
          <input
            {...register("image", { required: true })}
            id="dropzone-file"
            type="file"
            required
          />
        </label>

        <button className="btn w-full mt-4 bg-[#FA782F] hover:bg-[#FA782F] rounded border-none text-white">
          {loading ? (
            <ImSpinner9 className="animate-spin text-lg"></ImSpinner9>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;

import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic()
  const [cards, setCards] = useState([])

  useEffect(()=>{
    const data = async () => {
      const res = await axiosPublic("https://picsum.photos/v2/list?page=1&limit=12")
      setCards(res.data);
    }
    data()
  }, [axiosPublic])

  return (
    <div className="p-10">
      <h2 className="text-4xl font-semibold text-black mt-4 mb-6">My Projects</h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {
          cards?.map(card => <div key={card?.id} className="card">
          <figure className="px-2 pt-4">
            <img
              src={card?.download_url}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center py-3 gap-0">
            <h2 className="font-semibold text-black">{card?.author}</h2>
            <p className="text-[#FA782F] font-semibold text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, fuga.</p>
          </div>
        </div>)
        }
      </div>
    </div>
  );
};

export default Dashboard;

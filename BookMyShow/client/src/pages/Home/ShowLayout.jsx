import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCheckoutSession,
  getShowById,
} from "../../Services/showApiCalls";
import { useState } from "react";
import { toggleLoader } from "../../Redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Button.jsx";
import { message } from "antd";
import moment from "moment";

const ShowLayout = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const handleBookNow = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await createCheckoutSession({
        showId: id,
        selectedSeats,
      });

      if (response?.success) {
        window.location.href = response.url;
      } else {
        message.error(response?.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
    } finally {
      dispatch(toggleLoader(false));
    }
  };
  const getData = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await getShowById(id);

      if (response?.success) setShow(response?.data);
      else message.error(response?.message);

      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };
  const showSeatingArr = (show) => {
    const totalSeats = show?.totalSeats;
    const bookedSeats = show?.bookedSeats || [];
    const col = 16;
    const row = Math.ceil(totalSeats / col);

    return (
      <div className="flex justify-center items-center my-8 ">
        <div>
          <div className="flex flex-col  gap-2 w-175 border-2 border-black p-5">
            <div>
              <hr />
              <h3 className="text-center">Screen this side </h3>

              <hr className="mb-10" />
            </div>
            {Array.from({ length: row }).map((_, row_no) => {
              return (
                <div key={row_no} className="flex gap-1 justify-center">
                  {Array.from({ length: col }).map((_, col_no) => {
                    const seatNo = row_no * col + col_no + 1;
                    let className =
                      " border-2 w-7.5 h-7.5 text-sm flex justify-center items-center ";

                    if (bookedSeats.includes(seatNo))
                      className += "border-stone-500 bg-stone-500 text-white";
                    else if (selectedSeats.includes(seatNo))
                      className +=
                        "cursor-pointer border-pink-700 text-white bg-pink-700";
                    else
                      className +=
                        " cursor-pointer hover:border-pink-400 hover:text-white hover:bg-pink-400";

                    return (
                      seatNo <= totalSeats && (
                        <div
                          key={seatNo}
                          className={className}
                          onClick={() => {
                            if (!bookedSeats.includes(seatNo)) {
                              setSelectedSeats((prev) => {
                                let newList = [];
                                if (prev.includes(seatNo))
                                  newList = prev.filter(
                                    (seat) => seat !== seatNo,
                                  );
                                else newList = [...prev, seatNo];

                                return newList;
                              });
                            }
                          }}
                        >
                          {seatNo}
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {show?.movie && (
        <div>
          <div className="flex  items-center m-2">
            <div>
              <img
                className="h-[50vh]"
                src={show?.movie?.poster}
                alt="Movie Poster"
              />
            </div>
            <div className=" text-sm p-2 flex flex-col gap-0.5  ">
              <p className="text-xl text-center">{show?.movie?.title}</p>
              <p>
                <span className="font-bold text-base">Description :- </span>
                {show?.movie?.description}
              </p>
              <div>
                <span className="font-bold text-base">Genre :- </span>
                <span> {show?.movie?.genre} </span>
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex justify-center text-center items-center">
            <div>
              <div className="text-md uppercase text-center font-semibold">
                {show?.theater.name}
              </div>
              <div className="text-sm mb-3">
                Address : {show?.theater.address}
              </div>
              <span className="font-bold text-center  mr-2">
                Selected Show :-
              </span>
              {moment(show?.date).format("DD-MMM-YYYY")} {" -: "}
              {moment(show?.time).format("hh:mm A")}
            </div>
          </div>
        </div>
      )}
      {show && showSeatingArr(show)}
      {selectedSeats?.length > 0 && (
        <div className="flex flex-col items-center mb-5 text-center">
          <div className="gap-2 p-2 max-w-60 border-2 mb-2 border-black font-bold">
            <span className="text-sm">
              Selected Seats :- {selectedSeats?.join(", ")}
            </span>

            <div>
              Total Amount :-{" "}
              <span className="text-green-400 text-lg">
                {selectedSeats?.length * show?.ticketPrice}
              </span>
              <div className="flex p-3 justify-center items-center">
                <Button title="Book Now" onClick={handleBookNow} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowLayout;

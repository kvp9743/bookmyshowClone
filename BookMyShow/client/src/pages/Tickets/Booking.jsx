import { message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { deleteBooking, getBookingByUserId } from "../../Services/showApiCalls";
import Button from "../../Components/Button";

const Booking = () => {
  const [bookings, setBooking] = useState([]);
  const handleDelete = async (bookingId) => {
    try {
      const response = await deleteBooking(bookingId);
      message.success("Ticket Deleted Successfully!");
      await getData();
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
    }
  };

  const getData = async () => {
    try {
      const response = await getBookingByUserId();

      if (response?.success) {
        message.success(response.message);
        setBooking(response?.data);
      } else message.error(response?.message);
    } catch (err) {
      message.error(err.message || err);
    }
  };
  const copySessionId = async (sessionId) => {
    await navigator.clipboard.writeText(sessionId);
    message.success("Session ID copied!");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-wrap justify-start gap-8 mb-10">
      {bookings?.map((booking) => (
        <div
          key={booking._id}
          className=" relative w-112.5 overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200"
        >
          {moment().isAfter(booking?.show?.time) && (
            <div className="absolute top-2 right-2">
              <div className="">
                <span className=" text-red-600 font-bold text-lg">Expired</span>
              </div>
              <Button
                title="Delete"
                onClick={() => handleDelete(booking._id)}
              />
            </div>
          )}

          {/* Main Ticket */}
          <div className="flex h-52.5">
            {/* Poster */}
            <div className="w-[34%] p-2">
              <img
                className="h-full w-full rounded-lg object-cover"
                src={booking.show?.movie?.poster}
                alt="Movie poster"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 p-3 overflow-hidden">
              <h2 className="text-xl font-bold truncate">
                {booking.show?.movie?.title}
              </h2>

              <p className="text-sm font-semibold text-gray-600 mt-1 mb-6">
                {moment(booking.show?.date).format("DD-MMM-YYYY")}
                {" • "}
                {moment(booking.show?.time).format("h:mm A")}
              </p>

              <div className="border-t border-dashed border-gray-300 my-2 " />

              <div className="text-sm space-y-1">
                <p className="truncate">
                  <span className="font-semibold">Theater: </span>
                  {booking.show?.theater?.name}
                </p>

                <p className="truncate">
                  <span className="font-semibold">Address: </span>
                  {booking.show?.theater?.address}
                </p>
              </div>

              <div className="border-t border-dashed border-gray-300 my-2" />

              {/* Seats + Price */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">SEATS</p>
                  <p className="font-bold">{booking.seats?.join(", ")}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">TOTAL</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{booking.seats?.length * booking.show?.ticketPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="border-t border-dashed border-gray-300 px-3 py-2 bg-gray-50">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs text-gray-500 shrink-0">
                PAYMENT SESSION
              </span>

              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="text-xs font-mono text-gray-600 truncate"
                  title={booking?.sessionId}
                >
                  {booking?.sessionId}
                </span>

                <button
                  onClick={() => copySessionId(booking?.sessionId)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 shrink-0"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Booking;

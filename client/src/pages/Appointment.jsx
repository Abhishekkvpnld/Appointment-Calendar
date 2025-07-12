import Navbar from "../components/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import AppointmentForm from "./AppointmentForm";
import toast from "react-hot-toast";

const localizer = momentLocalizer(moment);


const Appointment = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myEventList, setMyeventList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("myEventList")) {
      setMyeventList(localStorage.getItem("myEventList"));
    }
  }, []);

  const handleAppointment = (slotInfo) => {
    // console.log("Selected Date:", slotInfo.start);
    // toast.success(slotInfo.start)
    setOpen(true)
  }


  return (
    <div className="min-w-screen flex flex-col items-center gap-3 px-4 py-6">
      <Navbar />

      <div className="hidden md:block w-full">
        <Calendar
          localizer={localizer}
          events={myEventList}
          startAccessor="start"
          endAccessor="end"
          view="month"
          selectable
          date={selectedDate}
          onSelectSlot={(slotInfo) => handleAppointment(slotInfo)}
          style={{ height: 500, width: "100%" }}
          className="rounded-xl bg-white shadow-lg p-2"
        />
      </div>


      <div className="md:hidden">
        {/* Date Picker*/}
        <div className="mb-4">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a Date
          </label>

          <div className="relative">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full p-3 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm text-gray-700"
            />

          </div>
        </div>

        {/* Day View Calendar */}
        <Calendar
          localizer={localizer}
          events={myEventList}
          startAccessor="start"
          endAccessor="end"
          view="day"
          date={selectedDate}
          onNavigate={(date) => setSelectedDate(date)}
          selectable
          onSelectSlot={(slotInfo) => handleAppointment(slotInfo)}
          style={{ height: 500, width: "100%" }}
          className="rounded-xl bg-white shadow-lg p-2"
        />
      </div>

      {open && <AppointmentForm onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Appointment;

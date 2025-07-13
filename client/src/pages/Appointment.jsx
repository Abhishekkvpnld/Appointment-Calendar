import Navbar from "../components/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const Appointment = () => {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myEventList, setMyeventList] = useState([]);
  const [open, setOpen] = useState(false);
  const [] = useState()

  // Load appointments from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("myEventList");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);

      const correctedEvents = parsedEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setMyeventList(correctedEvents);
    }
  }, []);


  // Handle calendar slot click to open modal
  const handleAppointment = (slotInfo) => {
    setSelectedDate(slotInfo?.start);
    setOpen(true);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className="min-w-screen flex flex-col items-center gap-3 px-4 py-6">
      <Navbar />

      {/* Desktop Calendar*/}
      <div className="hidden md:block w-full">
        <Calendar
          localizer={localizer}
          events={myEventList}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          defaultDate={selectedDate}
          selectable
          onSelectSlot={handleAppointment}
          style={{ height: 500, width: "100%" }}
          className="rounded-xl bg-white shadow-lg p-2"
        />
      </div>

      {/* Mobile Day Picker*/}
      <div className="md:hidden w-full">
        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
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
          views={["day"]}
          defaultView="day"
          defaultDate={selectedDate}
          onNavigate={(date) => setSelectedDate(date)}
          selectable
          onSelectSlot={handleAppointment}
          style={{ height: 500, width: "100%" }}
          className="rounded-xl bg-white shadow-lg p-2"
        />
      </div>

      {/* Appointment Modal */}
      {open && (
        <AppointmentForm
          selectedDate={selectedDate}
          setMyeventList={setMyeventList}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default Appointment;

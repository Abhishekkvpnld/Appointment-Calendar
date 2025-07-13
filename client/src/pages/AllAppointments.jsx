import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import doctorPatientData from "../data/doctorsPatients.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import { useChangeTheme } from "../context/ThemeContext";

const AllAppointments = () => {
  const navigate = useNavigate();
  const { darkTheme } = useChangeTheme();

  const [appointments, setAppointments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({ patient: '', doctor: '', time: '' });
  const { patients, doctors } = doctorPatientData;
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myEventList")) || [];
    setAppointments(stored);
    setFilterData(stored);
  }, []);


  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem("myEventList")) || [];

    const filtered = allEvents.filter((appointment) => {
      const [patientName, doctorName] = appointment.title.split(" with ");

      const doctorMatch = selectedDoc ? doctorName === selectedDoc : true;
      const patientMatch = selectedPatient ? patientName === selectedPatient : true;

      return doctorMatch && patientMatch;
    });

    setFilterData(filtered);
  }, [selectedDoc, selectedPatient]);


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const handleDelete = (index) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("myEventList", JSON.stringify(updated));
    toast.success("Appointment Deleted");
    setFilterData(updated);
  };

  const handleEditClick = (index) => {
    const { title, start } = filterData[index];
    const [patient, doctor] = title.split(" with ");
    setEditingIndex(index);
    setEditedAppointment({ patient, doctor, time: moment(start).format("HH:mm") });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    const updated = [...appointments];
    const appointmentToUpdate = filterData[editingIndex];
    const actualIndex = appointments.findIndex(a => a.start === appointmentToUpdate.start);

    const startDate = new Date(updated[actualIndex].start);
    const [hours, minutes] = editedAppointment.time.split(":");
    startDate.setHours(hours);
    startDate.setMinutes(minutes);

    updated[actualIndex] = {
      ...updated[actualIndex],
      title: `${editedAppointment.patient} with ${editedAppointment.doctor}`,
      start: startDate,
      end: new Date(startDate.getTime() + 30 * 60000),
    };

    setAppointments(updated);
    localStorage.setItem("myEventList", JSON.stringify(updated));
    toast.success("Appointment Updated");
    setEditingIndex(null);
    setFilterData(updated);
  };

  return (
    <div className={`${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      <Navbar />
      <div className={`${darkTheme ? "bg-gray-800 text-white" : "bg-white"} max-w-4xl mx-auto mt-6 rounded-lg shadow-lg p-4`}>
        <div className="mb-4 w-full p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-xl md:text-2xl font-bold">All Appointments</h1>
          <Filter
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            darkTheme={darkTheme}
          />
        </div>

        {filterData.length === 0 ? (
          <p className={`${darkTheme ? "text-gray-400" : "text-gray-500"}`}>No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className={`${darkTheme ? "bg-gray-700 text-white" : "bg-gray-200"}`}>
                <tr>
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((appointment, index) => {
                  const { title, start } = appointment;
                  const [patient, doctor] = title.split(" with ");
                  const isEditing = editingIndex === index;

                  return (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <select
                            name="patient"
                            value={editedAppointment?.patient}
                            onChange={handleEditChange}
                            className="border p-1 rounded bg-inherit text-inherit"
                          >
                            <option value="">Select Patient</option>
                            {patients.map((p, idx) => (
                              <option key={idx} value={p}>{p}</option>
                            ))}
                          </select>
                        ) : patient}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <select
                            name="doctor"
                            value={editedAppointment?.doctor}
                            onChange={handleEditChange}
                            className="border p-1 rounded bg-inherit text-inherit"
                          >
                            <option value="">Select Doctor</option>
                            {doctors.map((d, idx) => (
                              <option key={idx} value={d}>{d}</option>
                            ))}
                          </select>
                        ) : doctor}
                      </td>
                      <td className="px-4 py-2">{moment(start).format("MMM DD, YYYY")}</td>
                      <td className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="time"
                            name="time"
                            value={editedAppointment?.time}
                            onChange={handleEditChange}
                            className="border p-1 rounded bg-inherit text-inherit"
                          />
                        ) : moment(start).format("hh:mm A")}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {isEditing ? (
                          <>
                            <button onClick={handleEditSave} className="text-green-500 hover:underline">Save</button>
                            <button onClick={() => setEditingIndex(null)} className="text-gray-400 hover:underline">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(index)} className="text-blue-500 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;

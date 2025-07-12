import { useState } from "react";
import doctorPatientData from "../data/doctorsPatients.json";

const AppointmentForm = ({ onClose, selectedDate, setMyeventList }) => {
    const { patients, doctors } = doctorPatientData;

    const [formData, setFormData] = useState({
        patient: "",
        doctor: "",
        time: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.patient || !formData.doctor || !formData.time) {
            alert("Please fill all fields");
            return;
        }

        const appointmentDate = new Date(selectedDate);
        const [hours, minutes] = formData.time.split(":");
        appointmentDate.setHours(hours);
        appointmentDate.setMinutes(minutes);

        const newEvent = {
            title: `${formData.patient} with ${formData.doctor}`,
            start: appointmentDate,
            end: new Date(appointmentDate.getTime() + 30 * 60000), // 30 min
        };

        const prevEvents = JSON.parse(localStorage.getItem("myEventList")) || [];
        const updatedEvents = [...prevEvents, newEvent];
        localStorage.setItem("myEventList", JSON.stringify(updatedEvents));
        setMyeventList(updatedEvents);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-xl font-semibold mb-4">Add Appointment</h2>

                {/* Patient */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Patient</label>
                    <select
                        name="patient"
                        value={formData.patient}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Select Patient</option>
                        {patients.map((p, idx) => (
                            <option key={idx} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Doctor */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Doctor</label>
                    <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((d, idx) => (
                            <option key={idx} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Time */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;

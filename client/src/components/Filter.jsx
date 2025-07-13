import doctorPatientData from "../data/doctorsPatients.json";


const Filter = ({ selectedDoc, setSelectedDoc, selectedPatient, setSelectedPatient }) => {

    const { patients, doctors } = doctorPatientData;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <select name="doctor" value={selectedDoc} onChange={(e) => setSelectedDoc(e.target.value)} id="doctor" className="border rounded-md px-1 py-1">
                <option className="bg-gray-200" value="">Select Doctor</option>
                {
                    doctors?.map((doc, idx) => (
                        <option key={idx} value={doc}>{doc}</option>
                    ))
                }
            </select>


            <select name="patient" onChange={(e) => setSelectedPatient(e.target.value)} value={selectedPatient} id="patient" className="border rounded-md px-1 py-1">
                <option className="bg-gray-200 cursor-not-allowed" value="">Select Patient</option>
                {
                    patients?.map((p, idx) => (
                        <option key={idx} value={p}>{p}</option>
                    ))
                }
            </select>

        </div>
    )
}

export default Filter
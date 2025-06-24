import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { medication } from "../lib/constants";

export default function Medications() {
  const [medications, setMedications] = useState(medication);

  return (
    <div className="p-9">
      <div className="lg:flex lg:justify-between mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Medications 💊</h2>
        
        <button className="button mb-4" onClick={(e) => e.currentTarget.blur()}>
          <pre className="flex items-center"><FaPlus /> Add Medication</pre>
        </button>
      </div>

      <div className="medications-table">
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {medications.map(({id, name, dosage, frequency}) => (
              <tr key={id} className="border-t">
                <td>{id}.</td>
                <td>{name}</td>
                <td>{dosage}</td>
                <td>{frequency}</td>

                <td>
                  <button title="Edit" className="text-blue-600 mr-4.5">
                    <FaRegEdit className="size-5" />
                  </button>

                  <button title="Delete" className="text-red-600">
                    <MdOutlineDelete className="size-5.5" />
                  </button>
                </td>
              </tr>
            ))}

            {medications.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500">
                  No medications added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
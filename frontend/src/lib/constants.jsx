import { FaBriefcaseMedical, FaFileUpload, FaUserCircle } from "react-icons/fa";
import { MdRule } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

export const menuItems = [
  { label: "Profile", path: "/profile", Icon: FaUserCircle },
  { label: "Medications", path: "/medications", Icon: FaBriefcaseMedical },
  { label: "Adherence", path: "/adherence", Icon: MdRule },
  { label: "Upload Files", path: "/upload", Icon: FaFileUpload },
  { label: "Logout", path: "/login", Icon: BiLogOut },
];

export const medication = [
  { id: 1, name: "Paracetamol", dosage: "500mg", frequency: "2x/day" },
  { id: 2, name: "Amoxicillin", dosage: "250mg", frequency: "1x/day" },
  { id: 3, name: "Aspirin", dosage: "100mg", frequency: "1x/day" },
];

export const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  joined: "2024-10-15",
  profileImage: "/john.jpg",
};

export const adherenceData = [
  { date: "2024-06-10", taken: true },
  { date: "2024-06-11", taken: false },
  { date: "2024-06-12", taken: true },
];
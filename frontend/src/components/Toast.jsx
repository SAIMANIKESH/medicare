import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Hide toast after 5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-300 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
      {message}!
    </div>
  );
};

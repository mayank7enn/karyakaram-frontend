import React, { useState } from "react";

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    stravaProfileUrl: "",
  });
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "../.."

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(import.meta.env.VITE_BACKEND_URL)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register/event-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            state: "",
            city: "",
            stravaProfileUrl: "",
          });
          setMessage("");
          setIsSuccess(false);
        }, 2000);
      } else {
        setMessage(data.error || "Registration failed. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#1A1F2B] rounded-lg shadow-2xl w-[700px] max-w-[95%]">
        {/* Event Header Section */}
        <div 
          className="bg-cover bg-center rounded-t-lg p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${frontendUrl}/assets/marathon.jpg)`,
            minHeight: '200px'
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Virtual Marathon</h1>
              <p className="text-xl mb-4 drop-shadow-md">📍 Global Participation</p>
              <div className="flex gap-6 text-base">
                <div>
                  <p className="text-gray-200">Date</p>
                  <p className="font-medium text-white">March 15-30, 2025</p>
                </div>
                <div>
                  <p className="text-gray-200">Format</p>
                  <p className="font-medium text-white">Virtual/Remote</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form/Success Message Section */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-2xl font-bold text-orange-500 mb-6 border-b border-gray-700 pb-4">
              Participant Registration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Strava Profile URL</label>
                <input
                  type="url"
                  name="stravaProfileUrl"
                  value={formData.stravaProfileUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0B192C] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
              >
                Submit Registration
              </button>
            </div>
            {message && !isSuccess && (
              <p className="text-sm mt-4 text-center text-red-400">{message}</p>
            )}
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <svg 
                className="w-16 h-16 mx-auto mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-xl font-bold mb-2">Success!</p>
              <p className="mb-4">{message}</p>
              <p className="text-sm text-gray-200">Automatically closing in 2 seconds...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;

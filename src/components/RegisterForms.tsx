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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../assets/marathon.jpg')`,
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


// import React, { useEffect, useState } from "react";
// import { auth } from "../config/FirebaseConfig.ts"; // Import Firebase auth instance
// import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

// declare global {
//   interface Window {
//     recaptchaVerifier?: RecaptchaVerifier;
//   }
// }

// interface RegistrationFormProps {
//   onClose: () => void;
// }

// const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     state: "",
//     city: "",
//     stravaProfileUrl: "",
//   });

//   const [otp, setOtp] = useState("");
//   const [verificationId, setVerificationId] = useState<string | null>(null);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//         callback: () => console.log("reCAPTCHA verified successfully."),
//         "expired-callback": () => console.log("reCAPTCHA expired. Please try again."),
//       });
//       window.recaptchaVerifier.render();
//     }
//   }, []);

//   // Send OTP
//   const sendOtp = async () => {
//     try {
//       if (!/^\+\d{10,15}$/.test(formData.phone)) {
//         alert("Enter a valid phone number in international format (+91XXXXXXXXXX).");
//         return;
//       }

//       setMessage("Sending OTP...");
//       const confirmation = await signInWithPhoneNumber(auth, formData.phone, window.recaptchaVerifier!);
//       setVerificationId(confirmation.verificationId);
//       setIsOtpSent(true);
//       setMessage("OTP sent successfully!");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setMessage("Failed to send OTP. Try again.");
//     }
//   };

//   // Verify OTP
//   const verifyOtp = async () => {
//     try {
//       if (!verificationId) return;
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       const userCredential = await signInWithCredential(auth, credential);
//       const idToken = await userCredential.user.getIdToken();

//       const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idToken }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setIsVerified(true);
//         setMessage("OTP verified successfully!");
//       } else {
//         setMessage(data.error || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setMessage("Invalid OTP. Try again.");
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
//   };

//   // Submit form
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!isVerified) {
//       alert("Please verify your phone number before submitting.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/register/event-register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Registration successful!");
//         onClose();
//         setFormData({ name: "", email: "", phone: "", address: "", state: "", city: "", stravaProfileUrl: "" });
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//       <div className="bg-[#1A1F2B] p-8 rounded-lg shadow-lg w-[500px] max-w-[90%]">
//         <h2 className="text-2xl font-bold text-orange-500 mb-6">Register for Event</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white focus:outline-none"
//               required
//             />
//             {!isOtpSent ? (
//               <button type="button" onClick={sendOtp} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
//                 Send OTP
//               </button>
//             ) : (
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2 mt-2">Enter OTP</label>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white focus:outline-none"
//                   required
//                 />
//                 <button type="button" onClick={verifyOtp} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
//                   Verify OTP
//                 </button>
//               </div>
//             )}
//           </div>
          
//           <div id="recaptcha-container"></div>

//           <div className="flex justify-end gap-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded" disabled={!isVerified}>
//               Submit
//             </button>
//           </div>
//         </form>
//         {message && <p className="text-sm mt-3 text-center">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState } from "react";
import { Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    phone: ''
  });
  const [message, setMessage] = useState('');

  const handleConnectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        setMessage('Message sent successfully!');
        setFormState({ name: '', email: '', organization: '', phone: '' });
        setTimeout(() => {
          setIsConnectModalOpen(false);
          setMessage('');
        }, 2000);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <footer id='contact' className="bg-black text-white py-12">
      {/* Connect Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#1A1F2B] rounded-lg shadow-2xl w-[500px] max-w-[95%] p-8">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">Connect with Us</h2>
            <form onSubmit={handleConnectSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formState.organization}
                  onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0B192C] border border-gray-600 rounded text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
              {message && <p className="text-sm mt-3 text-center">{message}</p>}
            </form>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="../../assets/Kayrakaram_logo_white.png" alt="Custom Logo" className="w-16 h-10" />
            <span className="ml-2 text-2xl font-bold">Karyakaram</span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/karya.karam?igsh=MW82d2pnZnJ0aHhkdQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/karyakaram/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <div className="flex items-center gap-3">
              <span>Contact Us:</span>
              <a href="tel:+919650213199" className="hover:text-orange-500 transition">
                +91 9650213199
              </a>
            </div>
            <button
              onClick={() => setIsConnectModalOpen(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Connect with Us
            </button>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Karyakaram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
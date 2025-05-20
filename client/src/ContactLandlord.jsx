import { useState } from 'react';
import axios from 'axios';

export default function ContactLandlord({ listingId, landlordId }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user')); // or get from context
      if (!user) {
        setStatus('Please log in to contact the landlord.');
        return;
      }

      const payload = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        message,
        listingId,
        landlordId,
      };

      const res = await axios.post('/api/contact', payload);
      setStatus('Message sent successfully!');
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Contact Landlord</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    </div>
  );
}

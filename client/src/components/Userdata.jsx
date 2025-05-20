import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Userdata() {
  const location = useLocation();
  const navigate = useNavigate();

  const landlordUsername = location.state?.landlordUsername || "Unknown Landlord";
  const listingName = location.state?.listingName || "Unknown Listing";

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "",
    age: "",
    landlordUsername: landlordUsername,
    listingName: listingName,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.mobile.trim()))
      newErrors.mobile = "Mobile must be a 10-digit number";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (
      !formData.age ||
      isNaN(formData.age) ||
      formData.age < 1 ||
      formData.age > 120
    )
      newErrors.age = "Valid age (1-120) is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/usersdata/adddataitems",
        formData
      );
      setFormData({
        name: "",
        mobile: "",
        gender: "",
        age: "",
        landlordUsername: landlordUsername,
        listingName: listingName,
      });
      setErrors({});
      setShowSuccess(true);
    } catch (err) {
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 animate-fadeIn">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-green-500 animate-pingOnce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Success!</h3>
            <p className="text-gray-700 mb-4">Data saved successfully.</p>
            <button
              onClick={handleOk}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md z-10">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6 text-center">
          Contacting <span className="font-semibold">{landlordUsername}</span> for{" "}
          <span className="font-semibold">{listingName.toLowerCase()}</span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          User Information Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Landlord Username (readonly) */}
          <div>
            <label className="block text-gray-700">Landlord Username</label>
            <input
              type="text"
              name="landlordUsername"
              value={formData.landlordUsername}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Listing Name (readonly) */}
          <div>
            <label className="block text-gray-700">Listing Name</label>
            <input
              type="text"
              name="listingName"
              value={formData.listingName}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="\d{10}"
              maxLength="10"
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Userdata;

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "Sulur, Coimbatore",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "63852 58142",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "sesuuraj@gmail.com",
      gradient: "from-orange-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon–Sat • 9AM–8PM",
      gradient: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* HERO */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 pt-16 pb-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Get in <span className="text-emerald-200">Touch</span>
        </h1>
        <p className="mt-4 text-emerald-50 max-w-xl mx-auto text-base md:text-lg px-4">
          We’d love to hear from you. Reach out anytime.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* CONTACT INFO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-3`}
              >
                <info.icon className="text-white" size={22} />
              </div>
              <h3 className="font-semibold">{info.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {info.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
          <img
            src="https://images.pexels.com/photos/3781522/pexels-photo-3781522.jpeg"
            alt="Store"
            className="w-full h-[220px] md:h-[380px] object-cover"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* FORM */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Send a Message
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    className="input"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    className="input"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <input
                className="input"
                placeholder="Subject (Optional)"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <div>
                <textarea
                  className="input resize-none"
                  rows={4}
                  placeholder="Your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitted && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
                  <CheckCircle2 size={18} />
                  Message sent successfully!
                </div>
              )}

              <button
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>

          {/* SIDE */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
              <Briefcase size={28} />
              <h3 className="text-xl font-bold mt-3">
                Careers at Forever
              </h3>
              <p className="text-emerald-100 text-sm mt-2">
                Join our growing team.
              </p>
              <button className="mt-4 bg-white text-emerald-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                Explore Jobs <ArrowRight size={16} />
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-emerald-600" />
                <p className="font-semibold">Sulur, Coimbatore</p>
              </div>
              <button
                onClick={() => window.open("https://maps.google.com")}
                className="w-full py-3 bg-gray-900 text-white rounded-lg"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Contact;

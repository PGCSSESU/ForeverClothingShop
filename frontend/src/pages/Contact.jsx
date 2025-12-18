import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: "7736 Police Station, Sulur, Coimbatore",
      gradient: "from-emerald-500 via-green-500 to-teal-500",
      iconBg: "bg-gradient-to-br from-emerald-50 to-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "6385258142",
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      iconBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "sesuuraj@gmail.com",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      iconBg: "bg-gradient-to-br from-orange-50 to-red-50",
      iconColor: "text-orange-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Sat: 9AM-8PM",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      iconBg: "bg-gradient-to-br from-violet-50 to-purple-50",
      iconColor: "text-violet-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 pt-20 pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-600/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get In <span className="text-green-200">Touch</span>
            </h1>
            <p className="text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className={`h-2 bg-gradient-to-r ${info.gradient}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-xl ${info.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className={`${info.iconColor}`} size={28} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{info.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{info.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Section with Parallax Effect */}
        <motion.div
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative h-50 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="https://images.pexels.com/photos/3781522/pexels-photo-3781522.jpeg"
              alt="Contact Forever Store"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Welcome to Forever</h3>
              <p className="text-lg text-gray-200 max-w-2xl">
                Your trusted destination for quality products and exceptional customer service in Sulur, Coimbatore.
              </p>
            </motion.div>
            
            {/* Floating elements on hover */}
            <motion.div
              className="absolute top-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-8 w-16 h-16 bg-green-400/30 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                y: [0, 20, 0],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form - Takes 3 columns */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
              <p className="text-gray-600">Have a question or feedback? Fill out the form below and we'll respond within 24 hours.</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300"
                    placeholder="John Doe"
                    animate={{ 
                      scale: focusedField === 'name' ? 1.02 : 1,
                      borderColor: focusedField === 'name' ? '#10b981' : '#e5e7eb'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300"
                    placeholder="john@example.com"
                    animate={{ 
                      scale: focusedField === 'email' ? 1.02 : 1,
                      borderColor: focusedField === 'email' ? '#10b981' : '#e5e7eb'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300"
                  placeholder="How can we help you?"
                  animate={{ 
                    scale: focusedField === 'subject' ? 1.02 : 1,
                    borderColor: focusedField === 'subject' ? '#10b981' : '#e5e7eb'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="6"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                  animate={{ 
                    scale: focusedField === 'message' ? 1.02 : 1,
                    borderColor: focusedField === 'message' ? '#10b981' : '#e5e7eb'
                  }}
                />
              </div>

              {submitted && (
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold text-green-800">Message sent successfully!</p>
                    <p className="text-sm text-green-700 mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              <motion.button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                Send Message
              </motion.button>
            </div>
          </motion.div>

          {/* Sidebar - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Careers Card */}
            <motion.div
              className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-xl p-8 text-white overflow-hidden relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Briefcase size={28} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Careers at Forever</h3>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Learn more about our teams and job openings. Join us in building something amazing.
                </p>
                <motion.button
                  className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-50 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/explorejobs'}
                >
                  Explore Jobs
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="h-64 bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-300/30 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"></div>
                </div>
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-green-600" size={32} strokeWidth={2} />
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">Visit Our Store</p>
                  <p className="text-gray-500 text-sm mt-1">Sulur, Coimbatore</p>
                </div>
              </div>
              <div className="p-6">
                <motion.button
                  className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                >
                  <MapPin size={18} />
                  Get Directions
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
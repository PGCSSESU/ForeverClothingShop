import React from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { assets } from '../assets/assets'; // Assuming you have job-related assets

const ExploreJobs = () => {
  // Sample job data - in a real app, this would come from an API or database
  const jobOpenings = [
    {
      id: 1,
      title: 'Store Manager',
      location: 'Sulur, Coimbatore',
      type: 'Full-Time',
      description: 'Oversee daily operations and manage staff.',
    },
    {
      id: 2,
      title: 'Sales Associate',
      location: 'Sulur, Coimbatore',
      type: 'Part-Time',
      description: 'Assist customers and maintain store presentation.',
    },
    {
      id: 3,
      title: 'Inventory Specialist',
      location: 'Sulur, Coimbatore',
      type: 'Full-Time',
      description: 'Manage stock and coordinate deliveries.',
    },
  ];

  return (
    <motion.div
      className='bg-white rounded-xl shadow-lg p-10 border border-gray-200 min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'EXPLORE'} text2={'JOBS'} />
      </div>

      {/* Main Content */}
      <div className='my-10'>
        {/* Intro Section */}
        <motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Join our team at Forever! We're looking for passionate individuals to
            grow with us. Browse our current openings below.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {jobOpenings.map((job, index) => (
            <motion.div
              key={job.id}
              className='bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className='font-semibold text-xl text-gray-800 bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent'>
                {job.title}
              </h3>
              <p className='text-gray-600 mt-2'>{job.location}</p>
              <p className='text-gray-600'>{job.type}</p>
              <p className='text-gray-600 mt-3'>{job.description}</p>
              <p className='text-gray-600 mt-4'>
                Send your CV to this email:{' '}
                <a
                  href='mailto:rebelprem858@gmail.com'
                  className='text-green-600 hover:underline'
                >
                  rebelprem858@gmail.com
                </a>
                . We will contact you soon.
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <motion.div
        className='mt-12 text-center bg-gray-50 p-6 rounded-xl shadow-md'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className='text-gray-600'>
          Have questions? Contact our HR team at{' '}
          <a
            href='mailto:rebelprem858@gmail.com'
            className='text-green-600 hover:underline'
          >
            rebelprem858@gmail.com
          </a>
        </p>
        <p className='text-gray-600 mt-2'>
          Phone:{' '}
          <a href='tel:7639644749' className='text-green-600 hover:underline'>
            7639644749
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ExploreJobs;
import React from 'react';

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
        // You can add your form submission logic here
        alert("Thank you for subscribing!");
    }

    return (
        <div className='text-center p-6 bg-gray-100 rounded-lg shadow-md'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                "Best sellers are the most popular and in-demand products that customers love and frequently purchase."
            </p>
            {/* <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 rounded-md overflow-hidden'>
                <input 
                    className='w-full sm:flex-1 outline-none p-2' 
                    type="email" 
                    placeholder='Enter your email' 
                    required 
                />
                <button 
                    type='submit' 
                    className='bg-black text-white text-xs px-4 py-2 hover:bg-gray-800 transition duration-200'
                >
                    SUBSCRIBE
                </button>
            </form> */}
        </div>
    );
}

export default NewsletterBox;
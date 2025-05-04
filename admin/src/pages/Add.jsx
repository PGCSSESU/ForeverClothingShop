import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="bg-black text-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Add Product</h2>
      <div className="border-b border-green-400 w-20 mx-auto my-3"></div>

      <div>
        <p className="mb-2">Upload Images</p>
        <div className="grid grid-cols-4 gap-2">
          {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
            <label key={index} className="cursor-pointer">
              <img
                className="w-20 h-20 rounded-md object-cover border-2 border-gray-600"
                src={[image1, image2, image3, image4][index] ? URL.createObjectURL([image1, image2, image3, image4][index]) : assets.upload_area}
                alt={`Upload ${index + 1}`}
              />
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          ))}
        </div>
      </div>

      <div className="my-3">
        <label className="block mb-1">Product Name</label>
        <input
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="my-3">
        <label className="block mb-1">Product Description</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4 my-3">
        <div>
          <label className="block mb-1">Category</label>
          <select className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Sub Category</label>
          <select className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      <div className="my-3">
        <label className="block mb-1">Price</label>
        <input
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="my-3">
        <label className="block mb-1">Sizes</label>
        <div className="flex gap-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <span
              key={size}
              className={`px-3 py-1 border rounded-md cursor-pointer ${
                sizes.includes(size) ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      <div className="my-3 flex items-center gap-2">
        <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(!bestseller)} />
        <label htmlFor="bestseller" className="cursor-pointer">Add to Bestseller</label>
      </div>

      <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-all">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;

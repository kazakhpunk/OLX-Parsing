"use client";

import { useEffect, useState } from 'react';

// Define the type for a listing item
interface Listing {
    title: string;
    price: string;
}

const Home: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://functions.yandexcloud.net/d4e22dkvvkt9va7hka55');
                let data: Listing[] = await res.json();


                data = data.map(item => ({
                  ...item,
                  price: item.price.split('.css')[0].trim(), 
              }));

                const cleanedData = data.map(item => ({
                    ...item,
                    price: item.price.split('.css')[0].trim(),
                }));
                setListings(cleanedData);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        }
        fetchData();
    }, []);

    return (
      <div className="min-h-screen bg-gray-100 py-10">
          <h1 className="text-3xl font-bold text-center mb-10 text-black">OLX Listings</h1>
          <ul className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-5">
              {listings.map((listing, index) => (
                  <li key={index} className="border-b border-gray-300 py-3">
                      <h2 className="text-xl font-semibold text-gray-800">{listing.title}</h2>
                      <p className="text-gray-600">{listing.price}</p>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Home;

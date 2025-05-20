import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className='min-h-screen bg-gray-50'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation className='h-[500px]'>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='relative w-full h-full bg-center bg-cover'
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${url})`,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='flex flex-col max-w-5xl mx-auto px-4 py-10 gap-6'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-3xl font-bold text-slate-800'>
                {listing.name}{' '}
                <span className='text-indigo-600 font-semibold'>
                  - ₹
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('en-IN')
                    : listing.regularPrice.toLocaleString('en-IN')}
                  {listing.type === 'rent' && ' /mo'}
                </span>
              </h1>
              <p className='flex items-center gap-2 text-gray-600 text-sm'>
                <FaMapMarkerAlt className='text-green-600' />
                {listing.address}
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              <span className='bg-red-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow'>
                {listing.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
              </span>
              {listing.offer && (
                <span className='bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow'>
                  ₹
                  {+listing.regularPrice - +listing.discountPrice} OFF
                </span>
              )}
            </div>

            <div className='text-slate-700 leading-relaxed'>
              <span className='font-semibold text-slate-900'>Description: </span>
              {listing.description}
            </div>

            <ul className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-700 font-medium'>
              <li className='flex items-center gap-2'>
                <FaBed className='text-lg text-indigo-600' />
                {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
              </li>
              <li className='flex items-center gap-2'>
                <FaBath className='text-lg text-blue-600' />
                {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
              </li>
              <li className='flex items-center gap-2'>
                <FaParking className='text-lg text-orange-600' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-2'>
                <FaChair className='text-lg text-pink-600' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='mt-6 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-semibold px-6 py-3 rounded-lg transition'
              >
                Confirm Booking 
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}

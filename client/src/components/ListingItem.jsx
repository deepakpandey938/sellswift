import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath, FaCarAlt } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden w-full sm:w-[340px] group'>
      <Link to={`/listing/${listing._id}`} className='block relative'>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[220px] w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl'
        />
        <div className='absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm px-3 py-1 rounded-full shadow-md font-semibold'>
        ₹{listing.offer
  ? listing.discountPrice.toLocaleString('en-IN')
  : listing.regularPrice.toLocaleString('en-IN')}

        </div>
      </Link>

      <div className='p-4 flex flex-col gap-2'>
        <h3 className='text-lg font-bold text-slate-800 truncate'>{listing.name}</h3>

        <div className='flex items-center gap-1 text-sm text-slate-600'>
          <MdLocationOn className='text-green-600' />
          <span className='truncate'>{listing.address}</span>
        </div>

        <p className='text-sm text-slate-500 line-clamp-2'>{listing.description}</p>

        <div className='flex justify-between items-center mt-4 text-sm font-medium text-slate-700'>
          <span className='flex items-center gap-1'>
            <FaBed className='text-indigo-600' />
            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
          </span>

          <span className='flex items-center gap-1'>
            <FaBath className='text-indigo-600' />
            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
          </span>

          {listing.parking !== undefined && (
            <span className='flex items-center gap-1'>
              <FaCarAlt className={`text-indigo-600`} />
              {listing.parking ? 'Parking' : 'No Parking'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

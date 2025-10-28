import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'animate.css';
import ListingItem from '../components/ListingItem';
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <div className="relative w-full h-[80vh]">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2000 }}
          loop
          className="w-full h-full"
        >
          {[
            '/images/first.jpg',
            '/images/2.jpg',
            '/images/3.jpg',
            '/images/4.jpg', // Make sure this image exists
          ].map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-[80vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="max-w-6xl text-center text-white px-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 animate__animated animate__fadeInDown">
              Find your next <span className="text-yellow-300">perfect</span> place
            </h1>
            <p className="text-gray-200 text-sm sm:text-lg mb-6 animate__animated animate__fadeInUp animate__delay-1s">
              sellswift Estate makes house hunting effortless. Browse a wide range of listings.
            </p>
            <Link
              to="/search"
              className="inline-block bg-yellow-400 text-white px-6 py-2 rounded-full shadow-md hover:bg-yellow-500 transition duration-300 animate__animated animate__fadeInUp animate__delay-2s"
            >
              Let's get started
            </Link>
          </div>
        </div>
      </div>

      {/* Offer Listings Slider */}
      {offerListings?.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-10">
          <Swiper modules={[Navigation]} navigation className="rounded-2xl overflow-hidden shadow-lg">
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  className="relative h-[500px] bg-center bg-cover"
                  style={{ backgroundImage: `url(${listing.imageUrls[0]})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h2 className="text-white text-2xl font-bold drop-shadow-lg">{listing.name}</h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Listing Sections */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-10">
        {offerListings.length > 0 && (
          <Section title="Recent Offers" link="/search?offer=true" listings={offerListings} />
        )}
        {rentListings.length > 0 && (
          <Section title="Places for Rent" link="/search?type=rent" listings={rentListings} />
        )}
        {saleListings.length > 0 && (
          <Section title="Places for Sell" link="/search?type=sale" listings={saleListings} />
        )}
      </div>
    </div>
  );
}

function Section({ title, link, listings }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <Link to={link} className="text-sm text-indigo-600 hover:underline font-medium">
          Show more
        </Link>
      </div>
      <div className="flex flex-wrap gap-5">
        {listings.map((listing) => (
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>

    </div>
  );
}

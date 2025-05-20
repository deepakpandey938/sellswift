import React from 'react'

function Footer() {
  return (
   // Wrap the entire layout in a container with flex properties
<div className="min-h-screen flex flex-col">
  {/* Main Content */}
  <main className="flex-1">
    {/* Your content goes here */}
    <h1 className="text-center text-4xl font-bold py-8">Welcome to SellSwift!</h1>
    <p className="text-center text-lg">Browse and find your dream home.</p>
  </main>

  {/* Footer */}
  <footer className="bg-gray-900 text-white py-10 mt-auto">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between gap-10">
        
        {/* Logo and description */}
        <div className="w-full sm:w-1/3.5">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">SellSwift</h2>
          <p className="text-lg text-gray-400">
            Your trusted real estate platform for buying, selling, and renting properties. Let's help you find your dream home!
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="w-full sm:w-1/3">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Quick Links</h3>
          <ul className="text-gray-400">
            <li><a href="/about" className="hover:text-blue-500 transition-all">About Us</a></li>
            <li><a href="/listings" className="hover:text-blue-500 transition-all">Our Listings</a></li>
            <li><a href="/contact" className="hover:text-blue-500 transition-all">Contact Us</a></li>
            <li><a href="/terms" className="hover:text-blue-500 transition-all">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full sm:w-1/3">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Contact</h3>
          <ul className="text-gray-400">
            <li><a href="tel:+1234567890" className="hover:text-blue-500 transition-all">+1 (234) 567 890</a></li>
            <li><a href="mailto:support@sellswift.com" className="hover:text-blue-500 transition-all">support@sellswift.com</a></li>
            <li>123 Main St, Suite 100, City, Country</li>
          </ul>
        </div>
      </div>
      
      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-8">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2.25C18 1.007 17.368 0 16.5 0c-.42 0-.812.161-1.1.42C14.598.969 13.473.75 12 1.5c-2.482.754-3.892 3.51-3.06 5.755 1.345-.509 2.306-1.88 3.238-2.493-.797 1.777-1.692 2.69-3.02 4.156-3.207 3.653-3.245 7.95-5.01 11.428 2.772-.69 4.507-2.302 6.302-4.276 3.048-3.413 5.249-8.01 5.28-13.142z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22.46 6c-.77.35-1.59.59-2.46.69A4.1 4.1 0 0021.9 4c-.79.47-1.66.81-2.57.99a4.14 4.14 0 00-7.05 3.77c-3.28-.16-6.15-1.74-8.07-4.15a4.15 4.15 0 001.29 5.52A4.12 4.12 0 012.4 10c-.07.23-.07.47-.07.71 0 3.01 2.13 5.53 5 6.1a4.14 4.14 0 01-1.1.14c-.27 0-.52-.02-.77-.07a4.13 4.13 0 003.85 2.87A8.28 8.28 0 010 19.29c2.15 1.36 4.7 2.14 7.38 2.14a8.25 8.25 0 008.25-8.26c0-.13-.01-.26-.02-.39A5.92 5.92 0 0022.46 6z"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6zM14 8a4 4 0 10-8 0 4 4 0 008 0zM0 20h4V8H0v12zm1-14h2v-2H1v2z"/>
          </svg>
        </a>
      </div>
      
      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} SellSwift. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</div>

  )
}

export default Footer


   
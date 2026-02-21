const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo / Brand */}
        <div className="text-xl font-bold text-white tracking-wide">
          Campus Connect
        </div>

        
        {/* Credits */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          Created by{" "}
          <span className="text-white font-semibold hover:text-blue-400 transition">
            Ayub
          </span>{" "}
          &{" "}
          <span className="text-white font-semibold hover:text-blue-400 transition">
            Rahul
          </span>
          <p className="text-xs mt-1 text-gray-500">
            © {new Date().getFullYear()} Campus Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
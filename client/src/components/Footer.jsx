import React from "react";

function Footer() {
  return (
    <footer className="mt-16 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} FlavorFuel | All Rights Reserved
    </footer>
  );
}

export default Footer;

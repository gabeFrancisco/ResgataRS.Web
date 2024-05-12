import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row bg-green-500 text-white shadow py-3 px-5">
      <div className="mx-5">
        <h3>Resgate RS!</h3>
      </div>
      <div className="mx-10 ">
        <ul className="flex flex-row">
          <li className="mx-3">
            <Link href="/">Mapa</Link>
          </li>
          <li className="mx-3">
            <Link href="/sobre">Sobre</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

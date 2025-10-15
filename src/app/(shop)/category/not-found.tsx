import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link href={"/"}>Go Back</Link>
    </div>
  );
};

export default NotFound;

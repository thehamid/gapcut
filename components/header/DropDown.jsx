import React from 'react';
import Link from 'next/link';



const DropDown = ({ href,className, children}) => {
  return (
    <Link href={href}>
      <span className={className}>{children}</span>
    </Link>
  );
}

export default DropDown;
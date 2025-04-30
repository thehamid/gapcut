import React, { useState } from "react";
import dynamic from 'next/dynamic'

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });
const makeAnimated = dynamic(() => import("react-select/animated"), { ssr: false });

const PersonSearchBar = ({ setCollabs }) => {
  //set default query terms
  const [query, setQuery] = useState("");

  //get animated components wrapper
  const animatedComponents = makeAnimated();


    
    const loadOptions = async () => {
        const response = await fetch(`/api/dashboard/persons/search/`);
        const data = await response.json();
        const result= data.filter((ele) => ele.name.includes(query))
        return result
     }

  return (
    <div className="text-gray-800">
        <AsyncSelect   
        cacheOptions
        placeholder="جستجو براساس نام..."
        components={animatedComponents}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e._id}
        loadOptions={loadOptions}
        onInputChange={(value) => setQuery(value)}
        onChange={(value) => setCollabs(value)}
      />
    </div>
  );
};

export default PersonSearchBar;
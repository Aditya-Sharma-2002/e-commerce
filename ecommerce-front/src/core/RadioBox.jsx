import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        const selectedValue = parseInt(event.target.value);
        setValue(selectedValue);
        handleFilters(selectedValue);
    };

    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={p._id}
                name="price"
                type="radio"
                className="mr-2 ml-4"
                checked={value === p._id}
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default RadioBox;

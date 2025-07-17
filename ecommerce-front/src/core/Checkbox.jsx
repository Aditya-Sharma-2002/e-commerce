import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = categoryId => () => {
        const currentIndex = checked.indexOf(categoryId);
        const updatedChecked = [...checked];

        if (currentIndex === -1) {
            updatedChecked.push(categoryId);
        } else {
            updatedChecked.splice(currentIndex, 1);
        }

        setChecked(updatedChecked);
        handleFilters(updatedChecked);
    };

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input
                onChange={handleToggle(category._id)}
                value={category._id}
                type="checkbox"
                className="form-check-input"
                checked={checked.includes(category._id)}
            />
            <label className="form-check-label">{category.name}</label>
        </li>
    ));
};

export default Checkbox;

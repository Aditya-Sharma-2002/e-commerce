import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url, maxHeight = "100%", maxWidth = "100%" }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight, maxWidth }}
        />
    </div>
);

export default ShowImage;

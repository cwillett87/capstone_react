import React, {useEffect, useState} from "react";

function Image(props){
    console.log(props.productImages.path)
    
useEffect(() => {
    props.getImages(props.productId);
},[]);

    let getAImage = () => {
        props.getImages(props.productId);
    }

    return(
        <div>
            <hi><td><img src="images/hat.jpg"  width="150" height="100"/></td></hi>
        </div>
    )
}

export default Image;
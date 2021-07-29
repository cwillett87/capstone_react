import React, {useEffect, useState} from "react";
import { Carousel } from "react-bootstrap";

function Image(props){
    console.log(props)

    const [cardNumber, setCardNumber] = useState(0);
    
    useEffect(() => {
        props.getImages(props.productId);
    },[]);

    if(props.productImages[0] === undefined){
        return null
    }
    else{

        function goToNextCard() {
            let tempCardNumber = cardNumber;
            tempCardNumber++;
            if(tempCardNumber === props.productImages.length){
            tempCardNumber = 0;
            }
            setCardNumber(tempCardNumber);
        }

        function goToPreviousCard(){
            let tempCardNumber = cardNumber;
            tempCardNumber--;
            if(tempCardNumber < 0)
            tempCardNumber = props.productImages.length -1;
            setCardNumber(tempCardNumber);
            console.log(tempCardNumber)
        }
        
    return(
        <div className='row row-spacer'>
                <div className="col-md-4">
                <button className="cycle" onClick={() => goToPreviousCard()}>Previous Card</button>
                </div>
                <div className=' col-md-4'>
                    <div className='card'>
                    <img src={props.productImages[cardNumber].path}  width="150" height="100"/>
                    </div>
                </div>
                <div className="col-md-4 ml-10">
                    <button className="cycle" onClick={() => goToNextCard()}>Next Card</button>
                </div>
            </div>
    )
    }
}

export default Image;
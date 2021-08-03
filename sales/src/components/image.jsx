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
        <center>
            <br/>
        <div>
                <div className="col-md-2">
                <button className="cycle" onClick={() => goToPreviousCard()}>Previous</button>
                </div>
                <br/>
                <div className=' col-md'>
                    <div>
                    <img src={props.productImages[cardNumber].path}  width="250" height="200"/>
                    </div>
                </div>
                <br/>
                <div className="col-md-2 ml-10">
                    <button className="cycle" onClick={() => goToNextCard()}>Next</button>
                </div>
            </div>
            <br/>
        </center>
    )
    }
}

export default Image;
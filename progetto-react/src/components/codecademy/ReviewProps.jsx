import React from 'react'
import ButtonProps from './ButtonProps'



const ReviewProps = (props) => {
    
    {/*3.  Usare una prop per prendere decisioni su cosa visualizzare */}
    if (props.passed === false){
        return (
        <div>
            {/* 2. Accedere alla prop passata tramite props.propName */}
            {/* 3. Visualizzare la prop */}
            <p>{props.propName}</p>
            
        </div>
    )
    }else{
        return(
            <div>
                <h2>Blocco Else</h2>
            </div>
        )
    }
    
}






const DefineEvent = () =>{
    // 4. Definire un event handler in un componente 
    function onHandleClick(){
        let numbers = 0
        for (let i = 0; i<100; i++){
            numbers+=i 
        }
        alert(numbers)
    }
    return <ButtonProps onHandle = {onHandleClick} />
}


const DefaultProps = ({text = 'Messaggio di default'})=>{
    return <h5>{text}</h5>
}

export default ReviewProps;
export {DefineEvent, DefaultProps};


"use client"

import { useCart } from "@/hooks/UseCart";
import { formatPrice } from "@/utils/formatPrice";
import { PaymentElement, useElements, useStripe, AddressElement} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps{
    clientSecret:string,
    handleSetPaymentSuccess:(value:boolean)=>void

}

const CheckoutForm:React.FC<CheckoutFormProps> = ({clientSecret,handleSetPaymentSuccess}) => {
    const {cartTotalAmount , handleClearCart,handleSetPaymentIntent}=useCart()
    const stripe=useStripe()
    const elements =useElements()
    const [isLoading, setIsLoading]=useState(false);
    const formattedPrise = formatPrice(cartTotalAmount)

    useEffect(()=>{
        if(!stripe ){
            return
        }
        if(!clientSecret){
            return
        }
        handleSetPaymentSuccess(false)
    },[stripe])

    const handleSubmit= async(e:React.FormEvent)=>{
        e.preventDefault();

        if(!stripe||!elements){
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect:"if_required"
        }).then(result=>{
            if(!result.error){
                toast.success("CheckoutSuccess")

                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }

            setIsLoading(false);
        })
    }
    return (
        <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6">
            <Heading title="Введіть деталі замовлення" />
        </div>
        <h2 className="font-semibold  mb-2">
            Інформація для відправлення
        </h2>
        <AddressElement options={{
            mode:"shipping",
            allowedCountries:["UA","PL"]
        }}/>
        <h2 className="font-semibold mt-4 mb-2">Інформація для оплати</h2>
        <PaymentElement id="payment-element" options={{layout:"tabs"}}/>
        <div className="py-4 text-center text-slate-700 text-2xl font-bold ">
            Загалом:{formattedPrise}
        </div>
        <Button label={isLoading ? "Processing":"Pay now"} disabled={isLoading ||!stripe ||!elements} onClick={()=>{}}/>
    </form> );
}

export default CheckoutForm;
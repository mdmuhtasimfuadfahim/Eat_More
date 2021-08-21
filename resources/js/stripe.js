import { placeOrder } from './apiService'
import { loadStripe } from '@stripe/stripe-js'

export async function initStripe(){
    const stripe = await loadStripe('pk_test_51I7QKQBbq8Eqac2sUcKFGJdMED1jcRStgYhp4jYso99gSVOD169E5z6jbi41szCLE7A8w0KzZAfTFBcxkn9pzDju00fv8dmSOs');
    const elements = stripe.elements()
    let card = null;
    function mountWidget(){
        
        let style = {
            base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
            },
            invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
            }
        };

    card = elements.create('card', { style, hidePostalCode: true })
    card.mount('#card-element')
    }



    const paymentType = document.querySelector('#paymentType')
    if(!paymentType){
        return
    }
    paymentType.addEventListener('change',(e)=>{
        // console.log(e.target.value)
        if(e.target.value === 'card'){
            /* -------- display widget-----------*/
            mountWidget();
        }else{
            /*-------not display---------*/
            card.destroy()
        }

    })
    /*--------ajax call---------*/
    const paymentForm = document.querySelector('#payment-form')
    if(paymentForm){
        paymentForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let formData = new FormData(paymentForm)
        let formObject = {}
    
        for (let [key, value] of formData.entries()) {
          formObject[key] = value
        //   console.log(key, value)
        }
    
        if(!card){
            /*-------ajax-----*/
            placeOrder(formObject);
            // console.log(formObject)
            return;    
        }
    
        /*------verify card-------*/
        stripe.createToken(card).then((result)=>{
            // console.log(result)
            formObject.stripeToken = result.token.id;
            placeOrder(formObject);
        }).catch((err)=>{
            console.log(err)
        })
    })
    }
}
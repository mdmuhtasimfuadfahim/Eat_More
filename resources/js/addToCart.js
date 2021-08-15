import axios from 'axios'
import Noty from 'noty'


/*---------add to cart operations--------*/ 

export function addToCart(){

    let addToCart = document.querySelectorAll('.add-to-cart')
    let cartCounter = document.querySelector('#cartCounter')

    function updateCart(food){
        axios.post('/upate-cart', food).then(res =>{
            // console.log(res)
            cartCounter.innerText = res.data.totalQty
            new Noty({
                type: 'success',
                timeout: 1000,
                text: 'Food Added to Cart',
                progressBar: false
            }).show();
        }).catch(err =>{
            new Noty({
                type: 'error',
                timeout: 1000,
                text: 'Something Went Wrong',
                progressBar: false
            }).show();
        })
    }
    
    addToCart.forEach((btn)=>{
        if(!addToCart){
            return;
        }
        btn.addEventListener('click', (e)=>{
            // console.log(e)
            let food = JSON.parse(btn.dataset.food)
            updateCart(food)
            // console.log(food)
        })
    })    
}
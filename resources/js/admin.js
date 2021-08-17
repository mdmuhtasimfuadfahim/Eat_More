import axios from 'axios';
import moment from 'moment';
import Noty from 'noty';
import order from '../../app/models/order';

export function initAdmin(socket){
    const ordertableBody = document.querySelector('#orderTableBody')

    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        orders = res.data
        markup = generateMarkup(orders)
        ordertableBody.innerHTML = markup
    }).catch(err =>{
        console.log(err)
    })

    function renderMenus(menus){
        let parsedMenus = Object.values(menus)
        return parsedMenus.map((menuItem) =>{
            return `
              <p>${ menuItem.menus.foodName } - ${ menuItem.qty } Pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders){
        /*------------generating table body---------*/ 
        return orders.map(order => {
            return `
                <tr>
                <td class="border px-4 py-2"><img style="border-radius: 50px" height="70px" width="60px" src="${ order.customerId.image }" alt="image"></td>
                <td class="border px-4 py-2 text-green-900 text-left">
                    <p class="order-id">${ order._id }</p>
                    <div class="order-info">${ renderMenus(order.menus) }</div>
                </td>
                <td class="order-info border px-4 py-2 text-left">${ order.phone }</td>
                <td class="order-info border px-4 py-2 text-left">${ order.customerId.email }</td>               
                <td class="order-info border px-4 py-2 text-left">${ order.address }</td>
                <td class="order-info border px-4 py-2 text-left">
                    <div class="inline-block relative w-64 text-left">
                        <form action="/admin/order/status" method="POST">
                            <input type="hidden" name="orderId" value="${ order._id }">
                            <select name="status" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="order_placed"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-left px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td class="order-info border px-4 py-2">
                    ${ moment(order.createdAt).format('hh:mmA') }
                </td>
                <td class="order-info border px-4 py-2 text-left">
                    ${ moment(order.createdAt).format('DD:MM:YYYY') }
                </td>
                
                <td class="order-info border px-4 py-2 text-left">
                    ${ order.paymentStatus ? 'Paid' : 'Not paid' }
                </td>
            </tr>
        `
        }).join('')
    }

    /*-------socket--------*/
    socket.on('orderPlaced', (order) => {
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'New Order',
            progressBar: false,
        }).show();
        orders.unshift(order)
        orderTableBody.innerHTML = ''
        orderTableBody.innerHTML = generateMarkup(orders)
    })
}
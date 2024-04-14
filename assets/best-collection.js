document.addEventListener('DOMContentLoaded', function (){
    let addToCartButtons =  document.querySelectorAll('.section-best-collection .quick-add__submit');

    // add to cart button handler
    addToCartButtons.forEach(function (item) {
        item.addEventListener('click', function (event){
            event.preventDefault();

            // buy now or add to cart
            let action = item.getAttribute('name');

            // get product id
            let productId = item.closest('.form').querySelector('input[name="id"]').value;

            addToCart(productId, action);
        });
    });

    // buy now function
    async function addToCart(productId, action) {
        let formData = {
            'items': [{
                'id': productId,
                'quantity': 1
            }]
        };

        let response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let result = await response.json();

            if (action === 'now') {
                document.location.href = '/checkout';
            } else {
                alert('added first available variant')
                updateCart(result);
            }
    }

    async function updateCart() {
        // render cart drawer section
        let drawerResponse = await fetch('/?sections=cart-drawer', {
            method: 'GET',
        });

        let cartDrawer = await drawerResponse.json();

        // update cart drawer
        document.getElementsByTagName('cart-drawer')[0].remove();
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', cartDrawer['cart-drawer']);
        document.getElementsByTagName('cart-drawer')[0].classList.add('active');

        // render cart bubble section
        let bubbleResponse = await fetch('/?sections=cart-icon-bubble', {
            method: 'GET',
        });

        let cartBubble = await bubbleResponse.json();

        // update cart bubble
        document.getElementById('cart-icon-bubble').innerHTML = cartBubble['cart-icon-bubble'];
    }
});
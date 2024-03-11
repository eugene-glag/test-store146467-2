document.addEventListener('DOMContentLoaded', function () {
    let listProduct = document.querySelectorAll('.product-list-popup-modal__product');

    listProduct.forEach(function (item) {
        let productAddToCartFormVariantId = item.querySelector('.form .product-variant-id');
        let variantSelect = item.querySelector('.select__select');
        let productVariantsList;

        /// Get all product variants
        if (item.querySelector('.select__variants_json') !== null) {
            let productVariantsListJSON = item.querySelector('.select__variants_json').textContent;
            productVariantsList = JSON.parse(productVariantsListJSON);
        }

        /// Change hidden variant id in form
        if (variantSelect !== null) {
            variantSelect.addEventListener('change', function (event) {
                let currentValue = event.target.value;
                let variantId = productVariantsList.find(size => size.title === currentValue).id

                productAddToCartFormVariantId.value = variantId;
            });
        }
    });
});
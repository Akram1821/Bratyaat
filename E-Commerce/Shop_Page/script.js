document.addEventListener('DOMContentLoaded', function() {
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceValueMin = document.getElementById('price-value-min');
    const priceValueMax = document.getElementById('price-value-max');
    const filterLinks = document.querySelectorAll('.filter-link');
    const colorCircles = document.querySelectorAll('.color-circle');
    const sizeCircles = document.querySelectorAll('.size-circle');
    const resetButton = document.querySelector('.reset-button');
    let selectedCategory = '';
    let selectedColors = [];
    let selectedSize = '';

    function updatePriceRange() {
        const min = parseInt(priceMinInput.value);
        const max = parseInt(priceMaxInput.value);

        if (min > max) {
            const temp = min;
            priceMinInput.value = max;
            priceMaxInput.value = temp;
        }

        priceValueMin.textContent = priceMinInput.value;
        priceValueMax.textContent = priceMaxInput.value;

        const percentageMin = ((priceMinInput.value - 1000) / (20000 - 1000)) * 100;
        const percentageMax = ((priceMaxInput.value - 1000) / (20000 - 1000)) * 100;

        document.querySelector('.range').style.left = `${percentageMin}%`;
        document.querySelector('.range').style.right = `${100 - percentageMax}%`;
    }

    function filterProducts() {
        const products = document.querySelectorAll('.product');
        const minPrice = parseInt(priceMinInput.value);
        const maxPrice = parseInt(priceMaxInput.value);

        products.forEach(product => {
            const productPrice = parseInt(product.getAttribute('data-price'));
            const productCategories = product.getAttribute('data-category').split(',');
            const productColors = product.getAttribute('data-colors').split(',');
            const productSizes = product.getAttribute('data-sizes') ? product.getAttribute('data-sizes').split(',') : [];
            const productShoeSizes = product.getAttribute('data-shoe-sizes') ? product.getAttribute('data-shoe-sizes').split(',') : [];

            const matchesCategory = selectedCategory ? productCategories.includes(selectedCategory) : true;
            const matchesColors = selectedColors.length ? selectedColors.some(color => productColors.includes(color)) : true;
            const matchesSize = selectedSize ? (productSizes.includes(selectedSize) || productShoeSizes.includes(selectedSize)) : true;
            const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

            if (matchesCategory && matchesColors && matchesSize && matchesPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function selectFilter(e) {
        e.preventDefault();
        filterLinks.forEach(link => link.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedCategory = e.target.getAttribute('data-category');
        filterProducts();
    }

    function selectColor(e) {
        const color = e.target.getAttribute('data-color');
        if (selectedColors.includes(color)) {
            selectedColors = selectedColors.filter(c => c !== color);
            e.target.classList.remove('selected');
        } else {
            selectedColors.push(color);
            e.target.classList.add('selected');
        }
        filterProducts();
    }

    function selectSize(e) {
        sizeCircles.forEach(circle => circle.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedSize = e.target.getAttribute('data-size') || e.target.getAttribute('data-shoe-size');
        filterProducts();
    }

    function resetFilters() {
        filterLinks.forEach(link => link.classList.remove('selected'));
        colorCircles.forEach(circle => circle.classList.remove('selected'));
        sizeCircles.forEach(circle => circle.classList.remove('selected'));
        selectedCategory = '';
        selectedColors = [];
        selectedSize = '';
        priceMinInput.value = '1000';
        priceMaxInput.value = '20000';
        updatePriceRange();
        filterProducts();
    }

    priceMinInput.addEventListener('input', updatePriceRange);
    priceMaxInput.addEventListener('input', updatePriceRange);
    priceMinInput.addEventListener('input', filterProducts);
    priceMaxInput.addEventListener('input', filterProducts);
    filterLinks.forEach(link => link.addEventListener('click', selectFilter));
    colorCircles.forEach(circle => circle.addEventListener('click', selectColor));
    sizeCircles.forEach(circle => circle.addEventListener('click', selectSize));
    resetButton.addEventListener('click', resetFilters);

    updatePriceRange();
    filterProducts();
});

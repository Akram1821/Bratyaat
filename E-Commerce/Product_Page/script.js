const { createClient } = window.supabase;

const SUPABASE_URL = 'https://qgzgeanmtwuxiaeplbqg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnemdlYW5tdHd1eGlhZXBsYnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTExMDM2NiwiZXhwIjoyMDM0Njg2MzY2fQ.gV8GTwMcOfio_gnTH1RvvT4_Re5pimUk_kiAzLqAf-Q';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide-img');
    const thumbnails = document.querySelectorAll('.second .one, .second .two, .second .three');
    const totalSlides = slides.length;

    // Function to show the current slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        updateThumbnails(index);
    }

    // Function to update the thumbnail borders
    function updateThumbnails(index) {
        thumbnails.forEach(thumbnail => thumbnail.classList.remove('highlight'));
        if (index > 0) {
            thumbnails[index - 1].classList.add('highlight');
        }
    }

    // Show the first slide initially
    showSlide(currentIndex);

    // Navigation arrows
    document.querySelector('.arrow.left').addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        showSlide(currentIndex);
    });

    document.querySelector('.arrow.right').addEventListener('click', function() {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    // Update the principal image when clicking on a thumbnail
    document.querySelectorAll('.second-img').forEach((img, index) => {
        img.addEventListener('click', function() {
            currentIndex = index + 1;
            if (currentIndex >= totalSlides) currentIndex = 0;
            showSlide(currentIndex);
        });
    });

    const decreaseQty = document.getElementById('decrease-qty');
    const increaseQty = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');

    decreaseQty.addEventListener('click', function() {
        let currentQty = parseInt(quantityInput.value);
        if (currentQty > 1) {
            quantityInput.value = currentQty - 1;
        }
    });

    increaseQty.addEventListener('click', function() {
        let currentQty = parseInt(quantityInput.value);
        quantityInput.value = currentQty + 1;
    });

    const colorOptions = document.querySelectorAll('.color-circle');
    const sizeOptions = document.querySelectorAll('.size-circle');

    // Function to handle color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove highlight from all color options
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            // Add highlight to the clicked color option
            option.classList.add('selected');
        });
    });

    // Function to handle size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove highlight from all size options
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add highlight to the clicked size option
            option.classList.add('selected');
        });
    });


    // Form submission handler
    const button = document.getElementById('btn');
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const nom = document.getElementById('name').value;
        const numéro_de_téléphone = document.getElementById('phone').value;
        const wilaya = document.getElementById('wilaya').value;
        const commune = document.getElementById('commune').value;
        const quantité = document.getElementById('quantity').value;
        const nom_de_produit = document.querySelector('.order .name').textContent.trim();
        const couleur = document.querySelector('.color-circle.selected').getAttribute('data-color');
        const taille = document.querySelector('.size-circle.selected').getAttribute('data-size');
        const prix_de_produit = document.querySelector('.product-price .price').textContent.trim();
        const prix_total = parseInt(prix_de_produit) * parseInt(quantité);
        const { data, error } = await supabase
            .from('Orders')
            .insert([
                {
                    nom,
                    numéro_de_téléphone,
                    wilaya,
                    commune,
                    nom_de_produit,
                    couleur,
                    taille,
                    prix_de_produit,
                    quantité,
                    prix_total
                }
            ]);
        if (error) {
            console.error('Erreur lors de l\'insertion des données :', error);
        } else {
            console.log('Commande passée avec succès :', data);
            alert('Commande passée avec succès !');
            document.getElementById('order-form').reset();
        }
    });

});

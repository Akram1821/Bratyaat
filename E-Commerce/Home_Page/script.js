document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.circles');
    const image = document.querySelector('.model');

    container.addEventListener('mousemove', function(event) {
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const mouseX = event.clientX - containerRect.left;

        // Calculate the percentage of the cursor's position within the container
        const mouseXPercentage = mouseX / containerWidth;

        // Move the image in the opposite direction
        const translateX = (mouseXPercentage - 0.5) * -30; // Adjust the factor to control movement speed

        image.style.transform = `translate(${translateX}px) scale(1)`;
    });

    container.addEventListener('mouseleave', function() {
        // Add class for smooth return transition
        image.classList.add('smooth-return');
        image.style.transform = ''; // Reset transform to trigger transition
    });

    window.addEventListener('scroll', function() {
        // Add class for smooth return transition
        image.classList.add('smooth-return');
        image.style.transform = ''; // Reset transform to trigger transition
    });
});

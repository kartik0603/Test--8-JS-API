
const getProductDetails = async (id) => {
    let productReq = await fetch(`https://dummyjson.com/products/${id}`);
    let productRes = await productReq.json();
    return productRes;
};

const displayProductDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('productDetails').innerHTML = '<p>Product not found.</p>';
        return;
    }

    const product = await getProductDetails(productId);

    document.getElementById('productDetails').innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <img src="${product.images[0]}" class="card-img" alt="${product.title}">
                <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                <p class="card-text"><strong>Rating:</strong> ${product.rating}</p>
                <p class="card-text"><strong>Description:</strong> ${product.description}</p>
            </div>
        </div>`;
};

window.onload = displayProductDetails;

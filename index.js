
        let products = [];

        const getData = async () => {
            let productsReq = await fetch('https://dummyjson.com/products');
            let productsRes = await productsReq.json();
            products = productsRes.products;
            displayData(products);
        };

        const displayData = (products) => {
            const displayInfo = document.getElementById('products');
            displayInfo.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
                productCard.innerHTML = `
                <div class="card mt-4" data-id="${product.id}">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <div class="col-md-4">
                                    <img src="${product.images[0]}" class="card-img" alt="${product.title}">
                                </div>
                                <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                                <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                                <p class="card-text"><strong>Rating:</strong> ${product.rating}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
                displayInfo.appendChild(productCard);
            });

          
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const productId = card.getAttribute('data-id');
                    window.location.href = `product-details.html?id=${productId}`;
                });
            });
        };

        const applyFilters = () => {
            let filteredProducts = [...products];

            const sortPrice = document.getElementById('sortPrice').value;
            const sortRating = document.getElementById('sortRating').value;
            const searchTitle = document.getElementById('searchTitle').value.toLowerCase();
            const searchCategory = document.getElementById('searchCategory').value.toLowerCase();

            if (searchTitle) {
                filteredProducts = filteredProducts.filter(product =>
                    product.title.toLowerCase().includes(searchTitle)
                );
            }

            if (searchCategory) {
                filteredProducts = filteredProducts.filter(product =>
                    product.category.toLowerCase().includes(searchCategory)
                );
            }

            if (sortPrice === 'lowToHigh') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortPrice === 'highToLow') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            if (sortRating === 'highToLow') {
                filteredProducts.sort((a, b) => b.rating - a.rating);
            }

            displayData(filteredProducts);
        };

        document.getElementById('applyFilters').addEventListener('click', applyFilters);

        window.onload = getData;
    
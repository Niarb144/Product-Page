 // Sample product data
 const products = [
    { name: 'HP Nova', category: 'Laptops', price: '$349.99', image: './assets/img/hplaptop.png', link: 'Add links here to respective pages' },
    { name: 'Macbook M2 Pro', category: 'Laptops', price: '$1,299.99', image: '', link: '' },
    { name: 'Samsung S23 FE', category: 'Mobile Phones', price: '$827.99', image: '', link:'' },
    { name: 'Dualsense Controler', category: 'Gaming', price: '$89.99', image: '', link:'' },
    { name: 'LED Lights', category: 'Lighting', price: '$15.45', image: '', link:'' },
    { name: 'Playstation 5', category: 'Gaming', price: '$489.99', image: '', link:'' },
    { name: 'Playstation 5 Digital', category: 'Gaming', price: '$379.99', image: '', link:'' },
    { name: 'XBOX Series X', category: 'Gaming', price: '$479.99', image: '', link:'' },
    { name: 'Lenovo Ideapad 3', category: 'Laptops', price: '$500.00', image: '', link:'' },
    { name: 'IPhone 15 Pro', category: 'Mobile Phones', price: '$1,200.40', image: '', link:'' },
    { name: 'Logitech Keyboard', category: 'Keyboard & Mouse', price: '$75.99', image: '', link:'' },
    { name: 'Asus Rogue One', category: 'PCs', price: '$600.00', image: '', link:'' },
    
    // Add more products as needed
    // ...
   ];
   
   const categories = [...new Set(products.map(product => product.category))]; // Extract unique categories
   const itemsPerPage = 12;
   let currentPage = 1;
   
   // Function to render categories
   function renderCategories() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';
   
    categories.forEach(category => {
      const listItem = document.createElement('li');
      listItem.className = 'category-item';
      listItem.textContent = category;
      listItem.addEventListener('click', () => {
        document.getElementById('search-input').value = category;
        filterProducts();
      });
      categoryList.appendChild(listItem);
    });
   }
   
   // Function to render products based on filters and pagination
   function renderProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
   
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
   
    currentProducts.forEach(product => {
      const listItem = document.createElement('li');
      listItem.className = 'product-item';
      listItem.style.backgroundImage = product.image;
   
      const productDetails = document.createElement('div');
      productDetails.className = 'product-details';
   
      const productName = document.createElement('h3');
      productName.textContent = product.name;
   
      const productPrice = document.createElement('p');
      productPrice.textContent = product.price;
   
      const productLink = document.createElement('a');
      productLink.href = product.link;
   
      productDetails.appendChild(productName);
      productDetails.appendChild(productPrice);
      
      productLink.appendChild(productDetails);
   
      listItem.appendChild(productLink);
      productList.appendChild(listItem);
    });
   
    // Render pagination
    renderPagination(filteredProducts.length);
   }
   
   // Function to render pagination
   function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
   
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('span');
      button.className = 'pagination-button';
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        filterProducts();
      });
      paginationContainer.appendChild(button);
    }
   }
   
   // Function to filter products based on search input
   function filterProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
   
    // Apply filters
    const filteredProducts = products.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchInput) ||
                          product.category.toLowerCase().includes(searchInput);
      return matchSearch;
    });
   
    // Render the filtered products
    renderProducts(filteredProducts);
   }
   
   // Function to clear the search input
   function clearSearch() {
    document.getElementById('search-input').value = '';
    filterProducts();
   }
   
   // Initial render
   renderCategories();
   filterProducts();
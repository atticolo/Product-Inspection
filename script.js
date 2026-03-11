        function openImageModal(element) {
            const imgElement = element.querySelector('img');
            if (imgElement && imgElement.src) {
                const modal = document.getElementById('image-modal');
                const modalImg = document.getElementById('modal-image-element');
                
                modalImg.src = imgElement.src;
                modal.classList.add('show'); 
                
                document.body.style.overflow = 'hidden'; 
            }
        }

        function closeImageModal() {
            const modal = document.getElementById('image-modal');
            modal.classList.remove('show');
            document.getElementById('modal-image-element').src = '';
            
            document.body.style.overflow = 'auto';
        }


        document.getElementById('image-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeImageModal();
            }
        });


        const itemsPerPage = 3; // 숫자만 바꾸기
        let currentPage = 1;

        function setupPagination() {
            const products = document.querySelectorAll('.product-block');
            const totalPages = Math.ceil(products.length / itemsPerPage);
            const paginationContainer = document.getElementById('pagination-container');
            const countDisplay = document.getElementById('total-count-display');
            if(countDisplay) countDisplay.innerText = `등록된 총 제품: ${products.length}개 / 总产品数: ${products.length} 个`;


            paginationContainer.innerHTML = ''; 

            if (totalPages <= 1) return;

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                btn.innerText = i;
                

                btn.onclick = () => {
                    currentPage = i;
                    showPage(currentPage);
                    setupPagination(); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                };
                paginationContainer.appendChild(btn);
            }
        }

        function showPage(page) {
            const products = document.querySelectorAll('.product-block');
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            products.forEach((product, index) => {
                if (index >= startIndex && index < endIndex) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
  
        showPage(1); 
        setupPagination(); 


const topBtn = document.getElementById('top-btn');
if (topBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });
    
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });
}
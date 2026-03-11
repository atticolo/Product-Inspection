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
            if (e.target === this) closeImageModal();
        });


        const itemsPerPage = 2; // 페이지 수량 변경
        let currentPage = 1;
        let allProducts = []; 
        let filteredProducts = []; 

        function setupPagination() {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            const paginationContainer = document.getElementById('pagination-container');
            const countDisplay = document.getElementById('total-count-display');
            
            if (countDisplay) {
                countDisplay.innerText = `검색된 제품: ${filteredProducts.length}개 / 전체: ${allProducts.length}개`;
            }

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
            allProducts.forEach(product => product.style.display = 'none');


            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            filteredProducts.forEach((product, index) => {
                if (index >= startIndex && index < endIndex) {
                    product.style.display = 'block';
                }
            });
        }

        //위로 가기 버튼
        const topBtn = document.getElementById('top-btn');
        if (topBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) topBtn.classList.add('visible');
                else topBtn.classList.remove('visible');
            });
            topBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            });
        }

        // 문서 로딩 완료 실행로직
         function initApp() {

            allProducts = Array.from(document.querySelectorAll('.product-block'));
            filteredProducts = [...allProducts]; 

            showPage(1); 
            setupPagination();

            // 검색 기능 리스너
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const keyword = e.target.value.toLowerCase().trim();

                    if (keyword === '') {
                        filteredProducts = [...allProducts];
                    } else {
                        filteredProducts = allProducts.filter(product => {
                            const nameText = product.querySelector('.product-name').innerText.toLowerCase();
                            return nameText.includes(keyword); 
                        });
                    }

                    currentPage = 1;
                    setupPagination();
                    showPage(currentPage);
                });
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp(); 
        }
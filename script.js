     // 1. 사진 클릭 시 팝업 열기 기능
        function openImageModal(element) {
            const imgElement = element.querySelector('img');
            if (imgElement && imgElement.src) {
                const modal = document.getElementById('image-modal');
                const modalImg = document.getElementById('modal-image-element');
                
                modalImg.src = imgElement.src;
                modal.classList.add('show'); // CSS의 .show 클래스를 붙여 화면에 표시
                
                document.body.style.overflow = 'hidden'; // 뒤쪽 배경 스크롤 방지
            }
        }

        // 2. 팝업 닫기 기능
        function closeImageModal() {
            const modal = document.getElementById('image-modal');
            modal.classList.remove('show');
            document.getElementById('modal-image-element').src = '';
            
            document.body.style.overflow = 'auto'; // 스크롤 다시 허용
        }

        // 3. 사진 바깥쪽(검은 배경) 클릭해도 닫히도록 하는 기능
        document.getElementById('image-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeImageModal();
            }
        });


        // 4. 자동 페이지 나누기(Pagination) 기능
        const itemsPerPage = 2; // ★ 테스트를 위해 우선 2개로 줄였습니다. 정상 작동 확인 후 5로 변경해서 쓰시면 됩니다!
        let currentPage = 1;

        function setupPagination() {
            const products = document.querySelectorAll('.product-block');
            const totalPages = Math.ceil(products.length / itemsPerPage);
            const paginationContainer = document.getElementById('pagination-container');
            
            paginationContainer.innerHTML = ''; // 기존 버튼 초기화

            if (totalPages <= 1) return; // 제품이 적어서 1페이지면 버튼을 안 만듭니다.

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                btn.innerText = i;
                
                // 페이지 버튼 클릭 시 동작
                btn.onclick = () => {
                    currentPage = i;
                    showPage(currentPage);
                    setupPagination(); // 버튼들 색상(활성화 상태) 새로고침
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 넘어갈 때 스크롤 맨 위로 부드럽게 이동
                };
                paginationContainer.appendChild(btn);
            }
        }

        function showPage(page) {
            const products = document.querySelectorAll('.product-block');
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            products.forEach((product, index) => {
                // 현재 페이지 번호에 해당하는 제품만 화면에 보여주고 나머지는 숨김
                if (index >= startIndex && index < endIndex) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        // 미리보기 환경이나 어떤 곳에서든 무조건 실행되도록 로딩 대기 코드 제거 후 바로 실행!
        showPage(1); // 처음에 1페이지 보여주기
        setupPagination(); // 페이지 버튼 만들기
    // <!-- ===================================================================== -->
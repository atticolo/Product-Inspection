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
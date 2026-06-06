document.addEventListener('DOMContentLoaded', () => {
    // Definisi Elemen DOM
    const inputs = {
        name: document.getElementById('nameInput'),
        title: document.getElementById('titleInput'),
        about: document.getElementById('aboutInput'),
        photo: document.getElementById('photoInput'),
        shape: document.getElementById('photoShape'),
        template: document.getElementById('templateSelect')
    };

    const previews = {
        name: document.getElementById('cvName'),
        title: document.getElementById('cvTitle'),
        about: document.getElementById('cvAbout'),
        photo: document.getElementById('cvPhoto'),
        paper: document.getElementById('cvPreview')
    };

    // 1. Fungsi Update Live Preview
    const updatePreview = () => {
        previews.name.innerText = inputs.name.value || 'Nama Anda';
        previews.title.innerText = inputs.title.value || 'Profesi Anda';
        previews.about.innerText = inputs.about.value || 'Deskripsi profil Anda akan muncul di sini.';
        
        // Ubah Template
        previews.paper.className = `a4-paper ${inputs.template.value}`;
        
        // Ubah Bentuk Foto
        previews.photo.className = inputs.shape.value === 'round' ? 'photo-round' : 'photo-square';
    };

    // 2. Event Listeners untuk Input Text & Select
    ['name', 'title', 'about', 'shape', 'template'].forEach(key => {
        inputs[key].addEventListener('input', updatePreview);
    });

    // 3. Upload & Tampil Foto (Ubah File ke Base64)
    inputs.photo.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previews.photo.src = e.target.result;
                previews.photo.style.display = 'block';
                // Simpan foto ke Local Storage (Opsional, awas limit size)
                localStorage.setItem('cv_photo', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    // 4. Fitur Simpan Lokal (Local Storage)
    document.getElementById('saveBtn').addEventListener('click', () => {
        const cvData = {
            name: inputs.name.value,
            title: inputs.title.value,
            about: inputs.about.value,
            shape: inputs.shape.value,
            template: inputs.template.value
        };
        localStorage.setItem('cv_data', JSON.stringify(cvData));
        alert('Data CV berhasil disimpan di perangkat Anda!');
    });

    // Load Data dari Local Storage saat Web dibuka
    const loadData = () => {
        const savedData = JSON.parse(localStorage.getItem('cv_data'));
        if (savedData) {
            inputs.name.value = savedData.name || '';
            inputs.title.value = savedData.title || '';
            inputs.about.value = savedData.about || '';
            inputs.shape.value = savedData.shape || 'round';
            inputs.template.value = savedData.template || 'template-modern';
        }
        const savedPhoto = localStorage.getItem('cv_photo');
        if (savedPhoto) {
            previews.photo.src = savedPhoto;
            previews.photo.style.display = 'block';
        }
        updatePreview();
    };

    // 5. Fitur Export PDF menggunakan html2pdf
    document.getElementById('exportPdfBtn').addEventListener('click', () => {
        const element = document.getElementById('cvPreview');
        const opt = {
            margin:       0,
            filename:     `${inputs.name.value || 'CV'}_CVFastPro.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Mulai Proses PDF
        html2pdf().set(opt).from(element).save();
    });

    // Inisialisasi awal
    loadData();
});

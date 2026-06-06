document.addEventListener('DOMContentLoaded', () => {
    // Definisi Input dari Form Kiri
    const inputs = {
        layout: document.getElementById('layoutSelect'),
        theme: document.getElementById('themeSelect'),
        photo: document.getElementById('photoInput'),
        name: document.getElementById('nameInput'),
        title: document.getElementById('titleInput'),
        email: document.getElementById('emailInput'),
        phone: document.getElementById('phoneInput'),
        address: document.getElementById('addressInput'),
        link: document.getElementById('linkInput'),
        about: document.getElementById('aboutInput'),
        expTitle: document.getElementById('expTitle'),
        expDate: document.getElementById('expDate'),
        expDesc: document.getElementById('expDesc'),
        eduTitle: document.getElementById('eduTitle'),
        eduDate: document.getElementById('eduDate'),
        skills: document.getElementById('skillsInput')
    };

    // Definisi Output (Kertas A4 Kanan)
    const previews = {
        paper: document.getElementById('cvPreview'),
        photo: document.getElementById('cvPhoto'),
        name: document.getElementById('cvName'),
        title: document.getElementById('cvTitle'),
        email: document.getElementById('cvEmail'),
        phone: document.getElementById('cvPhone'),
        address: document.getElementById('cvAddress'),
        link: document.getElementById('cvLink'),
        about: document.getElementById('cvAbout'),
        expTitle: document.getElementById('cvExpTitle'),
        expDate: document.getElementById('cvExpDate'),
        expDesc: document.getElementById('cvExpDesc'),
        eduTitle: document.getElementById('cvEduTitle'),
        eduDate: document.getElementById('cvEduDate'),
        skillsList: document.getElementById('cvSkillsList')
    };

    // Fungsi Update Tampilan
    const updatePreview = () => {
        // Ganti Layout & Tema Warna
        previews.paper.className = `a4-paper ${inputs.layout.value} ${inputs.theme.value}`;

        // Update Text Standard
        previews.name.innerText = inputs.name.value || 'Budi Santoso';
        previews.title.innerText = inputs.title.value || 'Software Engineer';
        previews.email.innerText = inputs.email.value || 'budi@email.com';
        previews.phone.innerText = inputs.phone.value || '0812-xxxx-xxxx';
        previews.address.innerText = inputs.address.value || 'Jakarta, Indonesia';
        previews.link.innerText = inputs.link.value || 'linkedin.com/in/budi';
        previews.about.innerText = inputs.about.value || 'Profesional berpengalaman dengan dedikasi tinggi...';
        
        previews.expTitle.innerText = inputs.expTitle.value || 'Manajer Pemasaran - PT Maju Jaya';
        previews.expDate.innerText = inputs.expDate.value || '2020 - Sekarang';
        previews.expDesc.innerText = inputs.expDesc.value || 'Memimpin tim marketing beranggotakan 10 orang...';
        
        previews.eduTitle.innerText = inputs.eduTitle.value || 'S1 Ilmu Komputer - Universitas Indonesia';
        previews.eduDate.innerText = inputs.eduDate.value || '2015 - 2019';

        // Update Skills (Ubah koma jadi bullet points)
        const skillsArray = inputs.skills.value.split(',').filter(skill => skill.trim() !== '');
        if (skillsArray.length > 0) {
            previews.skillsList.innerHTML = skillsArray.map(skill => `<li>${skill.trim()}</li>`).join('');
        } else {
            previews.skillsList.innerHTML = '<li>Manajemen Proyek</li><li>Desain Grafis</li>';
        }
    };

    // Pasang Event Listener ke semua input teks & dropdown
    Object.keys(inputs).forEach(key => {
        if(key !== 'photo') {
            inputs[key].addEventListener('input', updatePreview);
            inputs[key].addEventListener('change', updatePreview);
        }
    });

    // Upload & Tampil Foto 
    inputs.photo.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previews.photo.src = e.target.result;
                previews.photo.style.display = 'block';
                localStorage.setItem('cv_photo_pro', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    // Fitur Simpan Draft Lokal
    document.getElementById('saveBtn').addEventListener('click', () => {
        const cvData = {};
        Object.keys(inputs).forEach(key => {
            if(key !== 'photo') cvData[key] = inputs[key].value;
        });
        localStorage.setItem('cv_data_pro', JSON.stringify(cvData));
        alert('Draft CV berhasil disimpan di browser Anda!');
    });

    // Load Data Saat Dibuka
    const loadData = () => {
        const savedData = JSON.parse(localStorage.getItem('cv_data_pro'));
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                if(inputs[key]) inputs[key].value = savedData[key];
            });
        }
        const savedPhoto = localStorage.getItem('cv_photo_pro');
        if (savedPhoto) {
            previews.photo.src = savedPhoto;
            previews.photo.style.display = 'block';
        }
        updatePreview();
    };

    // Export PDF
    document.getElementById('exportPdfBtn').addEventListener('click', () => {
        const element = document.getElementById('cvPreview');
        const opt = {
            margin:       0,
            filename:     `${inputs.name.value || 'CV'}_Professional.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });

    loadData();
});

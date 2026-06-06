document.addEventListener('DOMContentLoaded', () => {
    // Penangkapan Elemen Form Input Sisi Kiri
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

    // Penangkapan Elemen Output Pratinjau Kertas Kanan
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
        expList: document.getElementById('cvExpList'),
        eduTitle: document.getElementById('cvEduTitle'),
        eduDate: document.getElementById('cvEduDate'),
        skillsList: document.getElementById('cvSkillsList')
    };

    // Fungsi Sinkronisasi Data Real-Time
    const updatePreview = () => {
        if (!previews.paper) return;

        previews.name.innerText = inputs.name.value || 'Amelia Putri';
        previews.title.innerText = inputs.title.value || 'Software Engineer';
        previews.email.innerText = inputs.email.value || 'amelia@email.com';
        previews.phone.innerText = inputs.phone.value || '0812-xxxx-xxxx';
        previews.address.innerText = inputs.address.value || 'Jakarta, Indonesia';
        previews.link.innerText = inputs.link.value || 'linkedin.com/in/username';
        previews.about.innerText = inputs.about.value || 'Saya adalah seorang profesional yang berkomitmen tinggi dan berpengalaman dalam membangun solusi teknologi inovatif...';
        previews.expTitle.innerText = inputs.expTitle.value || 'Software Engineer - PT Teknologi';
        previews.expDate.innerText = inputs.expDate.value || '2022 - Sekarang';
        previews.eduTitle.innerText = inputs.eduTitle.value || 'S1 Ilmu Komputer - Universitas Indonesia';
        previews.eduDate.innerText = inputs.eduDate.value || '2018 - 2022';

        // Pengolahan Pil Keahlian (Skills Badges)
        const skillsArray = inputs.skills.value.split(',').filter(s => s.trim() !== '');
        previews.skillsList.innerHTML = skillsArray.length > 0 
            ? skillsArray.map(skill => `<li>${skill.trim()}</li>`).join('') 
            : '<li>Node.js</li><li>React</li><li>Manajemen Proyek</li>';

        // Pengolahan Kalimat Deskripsi Pekerjaan (Memisah koma menjadi baris baru)
        const expArray = inputs.expDesc.value.split(',').filter(e => e.trim() !== '');
        previews.expList.innerHTML = expArray.length > 0 
            ? expArray.map(exp => `<li>${exp.trim()}.</li>`).join('') 
            : '<li>Mengembangkan sistem aplikasi internal</li><li>Memimpin tim engineering untuk rilis produk baru</li>';

        // Penerapan Dinamis Atribut Tema Warna dan Aturan Tata Letak
        previews.paper.className = `a4-paper ${inputs.layout.value}`;
        previews.paper.style.setProperty('--cv-color', inputs.theme.value);
    };

    // Logika Alur Unggah Gambar dan Konversi ke Base64
    if (inputs.photo) {
        inputs.photo.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    previews.photo.src = event.target.result;
                    previews.photo.style.display = 'block';
                    localStorage.setItem('cv_photo_pro', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Pemasangan Event Listener Pengisian Teks
    Object.keys(inputs).forEach(key => {
        if (inputs[key] && key !== 'photo') {
            inputs[key].addEventListener('input', updatePreview);
            inputs[key].addEventListener('change', updatePreview);
        }
    });

    // Fitur Asisten Penulis AI (AI Writer Simulation)
    document.getElementById('aiBtn').addEventListener('click', () => {
        const currentTitle = inputs.title.value || 'Profesional';
        const aiButton = document.getElementById('aiBtn');
        
        aiButton.innerText = '⏳ Menyusun Teks...';
        aiButton.style.opacity = '0.6';

        // Kumpulan Template Profil Kaya Kompetensi Sesuai Jabatan
        const templates = [
            `Seorang ${currentTitle} yang berdedikasi tinggi dengan rekam jejak solid dalam mengoptimalkan efisiensi kerja dan memecahkan tantangan teknis kompleks. Memiliki kemampuan analisis kuat serta adaptasi cepat dalam lingkungan tim dinamis.`,
            `Profesional berpengalaman di bidang ${currentTitle} dengan spesialisasi pengembangan strategi inovatif. Memiliki komunikasi interpersonal yang unggul guna menjembatani kebutuhan teknis dan manajemen target perusahaan.`,
            `Lulusan berprestasi yang berfokus penuh pada kompetensi ${currentTitle}. Memiliki fondasi teori mendalam, terbiasa mengelola alur kerja terstruktur, dan siap berkontribusi aktif dalam proyek skala besar.`
        ];

        setTimeout(() => {
            const selectedText = templates[Math.floor(Math.random() * templates.length)];
            inputs.about.value = selectedText;
            updatePreview();
            aiButton.innerText = '✨ Buat dengan AI';
            aiButton.style.opacity = '1';
        }, 1200);
    });

    // Fitur Simpan Draft Lokal Browser
    document.getElementById('saveBtn').addEventListener('click', () => {
        const dataSave = {};
        Object.keys(inputs).forEach(key => {
            if(key !== 'photo' && inputs[key]) dataSave[key] = inputs[key].value;
        });
        localStorage.setItem('cv_data_pro', JSON.stringify(dataSave));
        alert('Draft CV Anda berhasil tersimpan secara lokal!');
    });

    // Pemuatan Otomatis Data Saat Halaman Dibuka Kembali
    const initApp = () => {
        const savedData = JSON.parse(localStorage.getItem('cv_data_pro'));
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                if(inputs[key]) inputs[key].value = savedData[key];
            });
        }
        const savedPhoto = localStorage.getItem('cv_photo_pro');
        if (savedPhoto && previews.photo) {
            previews.photo.src = savedPhoto;
            previews.photo.style.display = 'block';
        }
        updatePreview();
    };

    // Fungsi Ekspor PDF dengan Loading State
    document.getElementById('exportPdfBtn').addEventListener('click', function() {
        const element = document.getElementById('cvPreview');
        const originalText = this.innerText;
        this.innerText = '⏳ Memproses PDF...';
        this.disabled = true;

        const config = {
            margin:       0,
            filename:     `${inputs.name.value || 'CV'}_Premium.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(config).from(element).save().then(() => {
            this.innerText = originalText;
            this.disabled = false;
        });
    });

    initApp();
});

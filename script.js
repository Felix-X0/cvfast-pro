document.addEventListener('DOMContentLoaded', () => {
    // Menangkap Elemen Input Form Kiri
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

    // Fungsi sinkronisasi teks massal target Class/ID bercabang di layout
    const updatePreview = () => {
        if (!inputs.layout) return;

        const nameVal = inputs.name.value || 'Amelia Putri';
        const titleVal = inputs.title.value || 'Software Engineer';
        const emailVal = inputs.email.value || 'amelia@email.com';
        const phoneVal = inputs.phone.value || '0812-xxxx-xxxx';
        const addressVal = inputs.address.value || 'Jakarta, Indonesia';
        const linkVal = inputs.link.value || 'linkedin.com/in/username';

        // Update semua elemen nama & kontak yang bercabang di layout
        document.querySelectorAll('.dynamic-name').forEach(el => el.innerText = nameVal);
        document.querySelectorAll('.dynamic-title').forEach(el => el.innerText = titleVal);
        document.querySelectorAll('.dynamic-email').forEach(el => el.innerText = emailVal);
        document.querySelectorAll('.dynamic-phone').forEach(el => el.innerText = phoneVal);
        document.querySelectorAll('.dynamic-address').forEach(el => el.innerText = addressVal);
        document.querySelectorAll('.dynamic-link').forEach(el => el.innerText = linkVal);

        // Update section deskripsi tunggal
        document.getElementById('cvAbout').innerText = inputs.about.value || 'Saya adalah seorang profesional yang berkomitmen tinggi dan berpengalaman membangun solusi teknologi inovatif...';
        document.getElementById('cvExpTitle').innerText = inputs.expTitle.value || 'Software Engineer - PT Tech Nusantara';
        document.getElementById('cvExpDate').innerText = inputs.expDate.value || '2022 - Sekarang';
        document.getElementById('cvEduTitle').innerText = inputs.eduTitle.value || 'S1 Ilmu Komputer - Universitas Indonesia';
        document.getElementById('cvEduDate').innerText = inputs.eduDate.value || '2018 - 2022';

        // Pemisahan koma untuk keahlian (Skills Badges/Badges)
        const skillsArray = inputs.skills.value.split(',').filter(s => s.trim() !== '');
        document.getElementById('cvSkillsList').innerHTML = skillsArray.length > 0 
            ? skillsArray.map(skill => `<li>${skill.trim()}</li>`).join('') 
            : '<li>Node.js</li><li>React</li><li>Git</li>';

        // Pemisahan koma untuk deskripsi riwayat kerja (List Bullets)
        const expArray = inputs.expDesc.value.split(',').filter(e => e.trim() !== '');
        document.getElementById('cvExpList').innerHTML = expArray.length > 0 
            ? expArray.map(exp => `<li>${exp.trim()}</li>`).join('') 
            : '<li>Mengembangkan sistem aplikasi internal berbasis web.</li><li>Memimpin tim engineering untuk rilis produk baru skala nasional.</li>';

        // Terapkan tema warna dan layout class utama
        const previewPaper = document.getElementById('cvPreview');
        if (previewPaper) {
            previewPaper.className = `a4-paper ${inputs.layout.value}`;
            previewPaper.style.setProperty('--cv-color', inputs.theme.value);
        }
    };

    // Pengolahan File Foto Profil (FileReader)
    if (inputs.photo) {
        inputs.photo.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Update semua elemen foto (di header atas atau sidebar samping)
                    document.querySelectorAll('.cvPhotoClass').forEach(img => {
                        img.src = event.target.result;
                        img.style.display = 'block';
                    });
                    localStorage.setItem('cv_photo_pro', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Pasang Event Listener Real-time di semua input
    Object.keys(inputs).forEach(key => {
        if (inputs[key] && key !== 'photo') {
            inputs[key].addEventListener('input', updatePreview);
            inputs[key].addEventListener('change', updatePreview);
        }
    });

    // Fitur AI Simulator Generator Kalimat Profesional
    document.getElementById('aiBtn').addEventListener('click', () => {
        const title = inputs.title.value || 'Profesional';
        const aiBtn = document.getElementById('aiBtn');
        aiBtn.innerText = '⏳ Menyusun Teks...';
        
        const templates = [
            `Seorang ${title} yang berdedikasi tinggi dengan rekam jejak solid mengoptimalkan efisiensi kerja dan memecahkan tantangan teknis kompleks. Memiliki kemampuan analisis kuat serta adaptasi cepat dalam tim dinamis.`,
            `Profesional berpengalaman di bidang ${title} dengan spesialisasi pengembangan strategi inovatif. Memiliki komunikasi interpersonal yang unggul guna menjembatani kebutuhan teknis dan target perusahaan.`,
            `Lulusan baru dengan passion kuat di bidang ${title}. Memiliki pemahaman teori yang mendalam, kemampuan adaptasi cepat, serta siap berkontribusi positif dan berkembang bersama perusahaan.`
        ];

        setTimeout(() => {
            inputs.about.value = templates[Math.floor(Math.random() * templates.length)];
            updatePreview();
            aiBtn.innerText = '✨ Buat dengan AI';
        }, 1200);
    });

    // Simpan Draft Lokal Browser
    document.getElementById('saveBtn').addEventListener('click', () => {
        const dataSave = {};
        Object.keys(inputs).forEach(key => {
            if(key !== 'photo' && inputs[key]) dataSave[key] = inputs[key].value;
        });
        localStorage.setItem('cv_data_pro', JSON.stringify(dataSave));
        alert('Draft CV berhasil disimpan lokal!');
    });

    // Load Data Otomatis saat Aplikasi Dibuka Kembali
    const initApp = () => {
        const savedData = JSON.parse(localStorage.getItem('cv_data_pro'));
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                if(inputs[key]) inputs[key].value = savedData[key];
            });
        }
        const savedPhoto = localStorage.getItem('cv_photo_pro');
        if (savedPhoto) {
            document.querySelectorAll('.cvPhotoClass').forEach(img => {
                img.src = savedPhoto;
                img.style.display = 'block';
            });
        }
        updatePreview();
    };

    // Ekspor PDF Dokumen Premium
    document.getElementById('exportPdfBtn').addEventListener('click', function() {
        const element = document.getElementById('cvPreview');
        const originalText = this.innerText;
        this.innerText = '⏳ Memproses PDF...';

        const config = {
            margin:       0,
            filename:     `${inputs.name.value || 'CV'}_Professional.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(config).from(element).save().then(() => {
            this.innerText = originalText;
        });
    });

    initApp();
});

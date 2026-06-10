document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // REFERENSI INPUT
    // ============================================================
    const inputs = {
        layout:     document.getElementById('layoutSelect'),
        theme:      document.getElementById('themeSelect'),
        photo:      document.getElementById('photoInput'),
        name:       document.getElementById('nameInput'),
        title:      document.getElementById('titleInput'),
        email:      document.getElementById('emailInput'),
        phone:      document.getElementById('phoneInput'),
        address:    document.getElementById('addressInput'),
        link:       document.getElementById('linkInput'),
        about:      document.getElementById('aboutInput'),
        expPos:     document.getElementById('expPos'),
        expCompany: document.getElementById('expCompany'),
        expDate:    document.getElementById('expDate'),
        expDesc:    document.getElementById('expDesc'),
        eduDegree:  document.getElementById('eduDegree'),
        eduSchool:  document.getElementById('eduSchool'),
        eduDate:    document.getElementById('eduDate'),
        skills:     document.getElementById('skillsInput'),
    };

    const paper = document.getElementById('cvPreview');
    let currentPhotoBase64 = '';

    // ============================================================
    // FUNGSI UTAMA: RENDER ULANG SELURUH CV
    // ============================================================
    const renderCV = () => {
        const layout = inputs.layout.value;
        const theme  = inputs.theme.value;

        // Tentukan HTML berdasarkan layout
        if (layout === 'layout-sidebar') {
            paper.innerHTML = buildSidebar(theme);
        } else if (layout === 'layout-header') {
            paper.innerHTML = buildHeader(theme);
        } else {
            paper.innerHTML = buildMinimalist(theme);
        }

        paper.className = `a4-paper ${layout} ${theme}`;
    };

    // ============================================================
    // HELPER: ambil nilai atau default
    // ============================================================
    const val = (id, def) => inputs[id] ? (inputs[id].value.trim() || def) : def;
    const photoHTML = (cls) => currentPhotoBase64
        ? `<div class="photo-wrapper"><img src="${currentPhotoBase64}" alt="Foto Profil"></div>`
        : '';

    const skillsHTML = (ulClass) => {
        const arr = val('skills', 'Manajemen Proyek, Komunikasi, Microsoft Office')
            .split(',').map(s => s.trim()).filter(Boolean);
        return arr.map(s => `<li>${s}</li>`).join('');
    };

    // ============================================================
    // BUILD LAYOUT 1: SIDEBAR
    // ============================================================
    const buildSidebar = () => `
        <div class="cv-left">
            ${photoHTML()}
            <div class="contact-box">
                <h4>Kontak</h4>
                <p>${val('email','budi@email.com')}</p>
                <p>${val('phone','0812-xxxx-xxxx')}</p>
                <p>${val('address','Jakarta, Indonesia')}</p>
                <p>${val('link','linkedin.com/in/budi')}</p>
            </div>
            <div class="skills-box">
                <h4>Keahlian</h4>
                <ul>${skillsHTML()}</ul>
            </div>
        </div>
        <div class="cv-right">
            <div class="header-name">
                <h1>${val('name','Budi Santoso')}</h1>
                <h2>${val('title','Software Engineer')}</h2>
            </div>
            <div class="cv-section">
                <h3>Tentang Saya</h3>
                <p id="cvAbout">${val('about','Profesional berpengalaman dengan dedikasi tinggi dalam bidangnya.')}</p>
            </div>
            <div class="cv-section">
                <h3>Pengalaman Kerja</h3>
                <div class="timeline-item">
                    <div class="item-header">
                        <h4>${val('expPos','Manajer Pemasaran')}</h4>
                        <span class="date">${val('expDate','2020 - Sekarang')}</span>
                    </div>
                    <div class="company">${val('expCompany','PT Maju Jaya')}</div>
                    <p>${val('expDesc','Memimpin tim dan merancang strategi untuk mencapai target perusahaan.')}</p>
                </div>
            </div>
            <div class="cv-section">
                <h3>Pendidikan</h3>
                <div class="timeline-item">
                    <div class="item-header">
                        <h4>${val('eduDegree','S1 Ilmu Komputer')}</h4>
                        <span class="date">${val('eduDate','2015 - 2019')}</span>
                    </div>
                    <div class="company">${val('eduSchool','Universitas Indonesia')}</div>
                </div>
            </div>
        </div>`;

    // ============================================================
    // BUILD LAYOUT 2: HEADER ATAS (KREATIF)
    // ============================================================
    const buildHeader = () => `
        <div class="cv-header-top">
            ${currentPhotoBase64 ? `<div class="photo-wrapper"><img src="${currentPhotoBase64}" alt="Foto Profil"></div>` : ''}
            <div class="header-name">
                <h1>${val('name','Budi Santoso')}</h1>
                <h2>${val('title','Software Engineer')}</h2>
            </div>
        </div>
        <div class="cv-contact-bar">
            <span>&#9993; ${val('email','budi@email.com')}</span>
            <span>&#9742; ${val('phone','0812-xxxx-xxxx')}</span>
            <span>&#128205; ${val('address','Jakarta, Indonesia')}</span>
            <span>&#128279; ${val('link','linkedin.com/in/budi')}</span>
        </div>
        <div class="cv-body">
            <div class="cv-main">
                <div class="cv-section">
                    <h3>Tentang Saya</h3>
                    <p>${val('about','Profesional berpengalaman dengan dedikasi tinggi dalam bidangnya.')}</p>
                </div>
                <div class="cv-section">
                    <h3>Pengalaman Kerja</h3>
                    <div class="timeline-item">
                        <div class="item-header">
                            <h4>${val('expPos','Manajer Pemasaran')}</h4>
                            <span class="date">${val('expDate','2020 - Sekarang')}</span>
                        </div>
                        <div class="company">${val('expCompany','PT Maju Jaya')}</div>
                        <p>${val('expDesc','Memimpin tim dan merancang strategi untuk mencapai target perusahaan.')}</p>
                    </div>
                </div>
                <div class="cv-section">
                    <h3>Pendidikan</h3>
                    <div class="timeline-item">
                        <div class="item-header">
                            <h4>${val('eduDegree','S1 Ilmu Komputer')}</h4>
                            <span class="date">${val('eduDate','2015 - 2019')}</span>
                        </div>
                        <div class="company">${val('eduSchool','Universitas Indonesia')}</div>
                    </div>
                </div>
            </div>
            <div class="cv-sidebar">
                <h4>Kontak</h4>
                <p>${val('email','budi@email.com')}</p>
                <p>${val('phone','0812-xxxx-xxxx')}</p>
                <p>${val('address','Jakarta, Indonesia')}</p>
                <p>${val('link','linkedin.com/in/budi')}</p>
                <h4>Keahlian</h4>
                <ul>${skillsHTML()}</ul>
            </div>
        </div>`;

    // ============================================================
    // BUILD LAYOUT 3: MINIMALIS (KLASIK)
    // ============================================================
    const buildMinimalist = () => `
        <div class="cv-top-header">
            ${currentPhotoBase64 ? `<div class="photo-wrapper"><img src="${currentPhotoBase64}" alt="Foto Profil"></div>` : ''}
            <div>
                <div class="header-name">
                    <h1>${val('name','Budi Santoso')}</h1>
                    <h2>${val('title','Software Engineer')}</h2>
                </div>
                <div class="cv-contact-inline">
                    <span>${val('email','budi@email.com')}</span>
                    <span>${val('phone','0812-xxxx-xxxx')}</span>
                    <span>${val('address','Jakarta, Indonesia')}</span>
                    <span>${val('link','linkedin.com/in/budi')}</span>
                </div>
            </div>
        </div>
        <div class="cv-body">
            <div class="cv-main">
                <div class="cv-section">
                    <h3>Profil</h3>
                    <p>${val('about','Profesional berpengalaman dengan dedikasi tinggi dalam bidangnya.')}</p>
                </div>
                <div class="cv-section">
                    <h3>Pengalaman Kerja</h3>
                    <div class="timeline-item">
                        <div class="item-header">
                            <h4>${val('expPos','Manajer Pemasaran')}</h4>
                            <span class="date">${val('expDate','2020 - Sekarang')}</span>
                        </div>
                        <div class="company">${val('expCompany','PT Maju Jaya')}</div>
                        <p>${val('expDesc','Memimpin tim dan merancang strategi untuk mencapai target perusahaan.')}</p>
                    </div>
                </div>
                <div class="cv-section">
                    <h3>Pendidikan</h3>
                    <div class="timeline-item">
                        <div class="item-header">
                            <h4>${val('eduDegree','S1 Ilmu Komputer')}</h4>
                            <span class="date">${val('eduDate','2015 - 2019')}</span>
                        </div>
                        <div class="company">${val('eduSchool','Universitas Indonesia')}</div>
                    </div>
                </div>
            </div>
            <div class="cv-sidebar">
                <h4>Keahlian</h4>
                <ul>${skillsHTML()}</ul>
            </div>
        </div>`;

    // ============================================================
    // EVENT LISTENERS
    // ============================================================
    Object.keys(inputs).forEach(key => {
        if (key !== 'photo' && inputs[key]) {
            inputs[key].addEventListener('input', renderCV);
            inputs[key].addEventListener('change', renderCV);
        }
    });

    // Upload Foto
    inputs.photo.addEventListener('change', function() {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            currentPhotoBase64 = e.target.result;
            localStorage.setItem('cv_photo_pro', currentPhotoBase64);
            // Tampilkan thumbnail di form
            const thumb = document.getElementById('thumbImg');
            const wrapper = document.getElementById('photoPreviewThumb');
            if (thumb) { thumb.src = currentPhotoBase64; wrapper.style.display = 'block'; }
            renderCV();
        };
        reader.readAsDataURL(file);
    });

    // Hapus Foto
    window.clearPhoto = () => {
        currentPhotoBase64 = '';
        localStorage.removeItem('cv_photo_pro');
        inputs.photo.value = '';
        document.getElementById('photoPreviewThumb').style.display = 'none';
        renderCV();
    };

    // ============================================================
    // SIMPAN DRAFT
    // ============================================================
    document.getElementById('saveBtn').addEventListener('click', () => {
        const cvData = {};
        Object.keys(inputs).forEach(key => {
            if (key !== 'photo' && inputs[key]) cvData[key] = inputs[key].value;
        });
        localStorage.setItem('cv_data_pro', JSON.stringify(cvData));
        alert('Draft CV berhasil disimpan!');
    });

    // ============================================================
    // LOAD DATA TERSIMPAN
    // ============================================================
    const loadData = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('cv_data_pro'));
            if (saved) {
                Object.keys(saved).forEach(key => {
                    if (inputs[key]) inputs[key].value = saved[key];
                });
            }
            const savedPhoto = localStorage.getItem('cv_photo_pro');
            if (savedPhoto) {
                currentPhotoBase64 = savedPhoto;
                const thumb = document.getElementById('thumbImg');
                const wrapper = document.getElementById('photoPreviewThumb');
                if (thumb) { thumb.src = savedPhoto; wrapper.style.display = 'block'; }
            }
        } catch(e) {}
        renderCV();
    };

    // ============================================================
    // EXPORT PDF — BERSIH TANPA BERANTAKAN
    // ============================================================
    document.getElementById('exportPdfBtn').addEventListener('click', async () => {
        const btn = document.getElementById('exportPdfBtn');
        btn.disabled = true;
        btn.textContent = 'Memproses...';

        const element = document.getElementById('cvPreview');

        // Simpan style asli
        const origTransform = element.style.transform;
        const origBoxShadow = element.style.boxShadow;
        const origWidth     = element.style.width;
        const origMinHeight = element.style.minHeight;

        // Reset untuk PDF: ukuran asli, tanpa shadow
        element.style.transform = 'none';
        element.style.boxShadow = 'none';
        element.style.width     = '794px';
        element.style.minHeight = '1123px';
        element.classList.add('pdf-export-mode');

        // Tunggu sebentar agar browser render ulang
        await new Promise(r => setTimeout(r, 300));

        const namePDF = (inputs.name.value.trim() || 'CV') + '_Professional.pdf';

        const opt = {
            margin:      0,
            filename:    namePDF,
            image:       { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: 794,
                height: 1123,
                windowWidth: 794,
            },
            jsPDF: {
                unit: 'px',
                format: [794, 1123],
                orientation: 'portrait',
                hotfixes: ['px_scaling'],
            }
        };

        try {
            await html2pdf().set(opt).from(element).save();
        } catch(err) {
            alert('Gagal export PDF. Coba lagi.');
            console.error(err);
        }

        // Kembalikan style
        element.style.transform = origTransform;
        element.style.boxShadow = origBoxShadow;
        element.style.width     = origWidth;
        element.style.minHeight = origMinHeight;
        element.classList.remove('pdf-export-mode');

        btn.disabled = false;
        btn.textContent = 'Export PDF';
    });

    // ============================================================
    // INIT
    // ============================================================
    loadData();
});

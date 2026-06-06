document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        layout: document.getElementById('layoutSelect'),
        theme: document.getElementById('themeSelect'),
        name: document.getElementById('nameInput'),
        title: document.getElementById('titleInput'),
        email: document.getElementById('emailInput'),
        phone: document.getElementById('phoneInput'),
        about: document.getElementById('aboutInput'),
        expDesc: document.getElementById('expDesc'),
        skills: document.getElementById('skillsInput')
    };

    const previews = {
        paper: document.getElementById('cvPreview'),
        name: document.getElementById('cvName'),
        title: document.getElementById('cvTitle'),
        email: document.getElementById('cvEmail'),
        phone: document.getElementById('cvPhone'),
        about: document.getElementById('cvAbout'),
        expList: document.getElementById('cvExpList'),
        skillsList: document.getElementById('cvSkillsList')
    };

    // Fungsi Update Tampilan Real-time
    const updatePreview = () => {
        // Teks Biasa
        previews.name.innerText = inputs.name.value || 'Budi Santoso';
        previews.title.innerText = inputs.title.value || 'Software Engineer';
        previews.email.innerText = inputs.email.value || 'budi@email.com';
        previews.phone.innerText = inputs.phone.value || '0812-xxxx-xxxx';
        previews.about.innerText = inputs.about.value || 'Profesional berpengalaman dengan dedikasi tinggi...';

        // Update Skills (Pills/Badges)
        const skillsArray = inputs.skills.value.split(',').filter(s => s.trim() !== '');
        previews.skillsList.innerHTML = skillsArray.length > 0 
            ? skillsArray.map(skill => `<li>${skill.trim()}</li>`).join('') 
            : '<li>Manajemen Proyek</li><li>Desain Grafis</li>';

        // Update Pengalaman (List Bullets)
        const expArray = inputs.expDesc.value.split(',').filter(e => e.trim() !== '');
        previews.expList.innerHTML = expArray.length > 0 
            ? expArray.map(exp => `<li>${exp.trim()}</li>`).join('') 
            : '<li>Memimpin tim marketing</li><li>Meningkatkan penjualan 30%</li>';

        // Update Desain CSS
        previews.paper.className = `a4-paper ${inputs.layout.value}`;
        previews.paper.style.setProperty('--cv-color', inputs.theme.value);
    };

    // Pasang Event Listener ke semua input
    Object.values(inputs).forEach(input => {
        if(input) {
            input.addEventListener('input', updatePreview);
            input.addEventListener('change', updatePreview);
        }
    });

    // --- FITUR AJAIB: AI WRITER SIMULATOR ---
    document.getElementById('aiBtn').addEventListener('click', () => {
        const title = inputs.title.value || 'Profesional';
        const aiButton = document.getElementById('aiBtn');
        
        // Animasi Loading
        aiButton.innerText = 'Menganalisis...';
        aiButton.style.opacity = '0.7';
        inputs.about.value = 'Menulis menggunakan AI...';
        updatePreview();

        // Kumpulan Template Kata-kata (Bisa Anda tambah sendiri)
        const aiTemplates = [
            `Seorang ${title} yang berorientasi pada hasil dengan rekam jejak yang solid dalam memecahkan masalah kompleks. Memiliki dedikasi tinggi terhadap efisiensi kerja dan selalu berinovasi untuk mencapai target perusahaan.`,
            `${title} berpengalaman yang ahli dalam memimpin inisiatif strategis. Terbiasa bekerja di lingkungan serba cepat, serta memiliki kemampuan komunikasi yang baik untuk berkolaborasi dengan lintas divisi.`,
            `Lulusan baru dengan passion kuat di bidang ${title}. Memiliki pemahaman teori yang mendalam dan kemampuan adaptasi yang cepat. Siap memberikan kontribusi positif dan berkembang bersama perusahaan.`
        ];

        // Simulasi delay jaringan (1.5 detik)
        setTimeout(() => {
            // Pilih kata-kata acak
            const randomText = aiTemplates[Math.floor(Math.random() * aiTemplates.length)];
            inputs.about.value = randomText;
            updatePreview();
            
            // Kembalikan tombol
            aiButton.innerText = '✨ Buat dengan AI';
            aiButton.style.opacity = '1';
        }, 1500);
    });

    // Export PDF (Loading State)
    document.getElementById('exportPdfBtn').addEventListener('click', function() {
        const element = document.getElementById('cvPreview');
        const originalText = this.innerText;
        this.innerText = '⏳ Memproses PDF...';
        this.style.opacity = '0.7';

        const opt = {
            margin:       0,
            filename:     `${inputs.name.value || 'CV'}_Professional.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            this.innerText = originalText;
            this.style.opacity = '1';
        });
    });

    // Inisialisasi awal
    updatePreview();
});

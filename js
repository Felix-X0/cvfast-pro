document.addEventListener("DOMContentLoaded", () => {
    // 1. Mapping ID Input ke ID Preview
    const fieldMapping = {
        'input-name': 'preview-name',
        'input-title': 'preview-title',
        'input-email': 'preview-email',
        'input-phone': 'preview-phone',
        'input-summary': 'preview-summary',
        'input-experience': 'preview-experience',
        'input-education': 'preview-education'
    };

    const skillsInput = document.getElementById('input-skills');
    const skillsPreview = document.getElementById('preview-skills');
    const templateSelect = document.getElementById('template-select');
    const cvPreviewContainer = document.getElementById('cv-preview-container');

    // 2. Load Data dari Local Storage
    const loadData = () => {
        Object.keys(fieldMapping).forEach(inputId => {
            const savedValue = localStorage.getItem(inputId);
            if (savedValue) {
                document.getElementById(inputId).value = savedValue;
                updatePreview(inputId, savedValue);
            }
        });

        const savedSkills = localStorage.getItem('input-skills');
        if (savedSkills) {
            skillsInput.value = savedSkills;
            updateSkills(savedSkills);
        }

        const savedTemplate = localStorage.getItem('cv-template');
        if (savedTemplate) {
            templateSelect.value = savedTemplate;
            changeTemplate(savedTemplate);
        }
    };

    // 3. Update Text Preview
    const updatePreview = (inputId, value) => {
        const previewId = fieldMapping[inputId];
        const previewEl = document.getElementById(previewId);
        
        if (value.trim() === '') {
            previewEl.innerText = document.getElementById(inputId).getAttribute('placeholder') || '-';
        } else {
            previewEl.innerText = value;
        }
        // Simpan ke LocalStorage
        localStorage.setItem(inputId, value);
    };

    // 4. Update Skills (Format List)
    const updateSkills = (value) => {
        skillsPreview.innerHTML = '';
        if (value.trim() === '') {
            skillsPreview.innerHTML = '<li>Keahlian Anda</li>';
        } else {
            const skillsArray = value.split(',');
            skillsArray.forEach(skill => {
                if(skill.trim() !== '') {
                    const li = document.createElement('li');
                    li.innerText = skill.trim();
                    skillsPreview.appendChild(li);
                }
            });
        }
        localStorage.setItem('input-skills', value);
    };

    // 5. Ubah Tema Template
    const changeTemplate = (templateName) => {
        // Hapus class template lama
        cvPreviewContainer.classList.remove('cv-template-modern', 'cv-template-minimalist', 'cv-template-classic');
        // Tambahkan class template baru
        cvPreviewContainer.classList.add(`cv-template-${templateName}`);
        localStorage.setItem('cv-template', templateName);
    };

    // 6. Event Listeners untuk Semua Input Teks
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.id === 'input-skills') {
                updateSkills(e.target.value);
            } else {
                updatePreview(e.target.id, e.target.value);
            }
        });
    });

    // Event Listener untuk Template
    templateSelect.addEventListener('change', (e) => {
        changeTemplate(e.target.value);
    });

    // Event Listener Hapus Data
    document.getElementById('btn-clear').addEventListener('click', () => {
        if(confirm("Anda yakin ingin menghapus semua data CV?")) {
            localStorage.clear();
            location.reload();
        }
    });

    // 7. Ekspor ke PDF menggunakan html2pdf
    document.getElementById('btn-download').addEventListener('click', () => {
        const element = document.getElementById('cv-preview-container');
        // Hapus efek transform scale saat rendering PDF agar ukurannya tidak rusak
        element.style.transform = "none"; 

        const opt = {
            margin:       0,
            filename:     'CV_Professional.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Render PDF
        html2pdf().set(opt).from(element).save().then(() => {
            // Kembalikan efek CSS setelah diunduh (untuk mode mobile)
            element.style.transform = ""; 
        });
    });

    // Inisialisasi awal
    loadData();
});

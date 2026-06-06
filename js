document.addEventListener("DOMContentLoaded", () => {
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
    
    const photoInput = document.getElementById('input-photo');
    const previewPhoto = document.getElementById('preview-photo');
    const photoPlaceholder = document.getElementById('photo-placeholder');

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

        const savedTemplate = localStorage.getItem('cv-layout-theme');
        if (savedTemplate) {
            templateSelect.value = savedTemplate;
            changeTemplate(savedTemplate);
        }

        const savedPhoto = localStorage.getItem('cv-photo-data');
        if (savedPhoto) {
            setPhoto(savedPhoto);
        }
    };

    const updatePreview = (inputId, value) => {
        const previewId = fieldMapping[inputId];
        const previewEl = document.getElementById(previewId);
        
        if (value.trim() === '') {
            previewEl.innerText = document.getElementById(inputId).getAttribute('placeholder') || '-';
        } else {
            previewEl.innerText = value;
        }
        localStorage.setItem(inputId, value);
    };

    // Fungsi Render Keahlian sebagai Badge
    const updateSkills = (value) => {
        skillsPreview.innerHTML = '';
        if (value.trim() === '') {
            skillsPreview.innerHTML = '<span class="cv-skill-badge">Keahlian Anda</span>';
        } else {
            const skillsArray = value.split(',');
            skillsArray.forEach(skill => {
                if(skill.trim() !== '') {
                    const span = document.createElement('span');
                    span.className = 'cv-skill-badge';
                    span.innerText = skill.trim();
                    skillsPreview.appendChild(span);
                }
            });
        }
        localStorage.setItem('input-skills', value);
    };

    // Fungsi Mengganti Tata Letak (Layout Class)
    const changeTemplate = (layoutClass) => {
        // Reset seluruh class container, sisakan class wajib
        cvPreviewContainer.className = `bg-white shadow-2xl cv-a4 ${layoutClass}`;
        localStorage.setItem('cv-layout-theme', layoutClass);
    };

    const setPhoto = (base64Data) => {
        previewPhoto.src = base64Data;
        previewPhoto.classList.remove('hidden');
        photoPlaceholder.classList.add('hidden');
    };

    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                setPhoto(base64String);
                try {
                    localStorage.setItem('cv-photo-data', base64String);
                } catch (err) {
                    console.warn("Storage penuh, foto tidak tersimpan saat refresh.");
                }
            }
            reader.readAsDataURL(file);
        }
    });

    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.id === 'input-skills') {
                updateSkills(e.target.value);
            } else {
                updatePreview(e.target.id, e.target.value);
            }
        });
    });

    templateSelect.addEventListener('change', (e) => changeTemplate(e.target.value));

    document.getElementById('btn-clear').addEventListener('click', () => {
        if(confirm("Anda yakin ingin menghapus semua data CV?")) {
            localStorage.clear();
            location.reload();
        }
    });

    document.getElementById('btn-download').addEventListener('click', () => {
        const element = document.getElementById('cv-preview-container');
        element.style.transform = "none"; 

        const opt = {
            margin:       0,
            filename:     'Curriculum_Vitae.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            element.style.transform = ""; 
        });
    });

    loadData();
});

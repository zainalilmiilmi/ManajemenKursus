document.addEventListener('DOMContentLoaded', () => {
    const courseForm = document.getElementById('course-form');
    const courseList = document.getElementById('course-list');
    let courses = [];

    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('course-title').value;
        const description = document.getElementById('course-description').value;
        const duration = document.getElementById('course-duration').value;

        addCourse({ title, description, duration });
        courseForm.reset();
    });

    function addCourse(course) {
        course.materials = [];
        courses.push(course);
        renderCourses();
    }

    function renderCourses() {
        courseList.innerHTML = '';
        courses.forEach((course, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p>Durasi: ${course.duration}</p>
                <button class="edit" onclick="editCourse(${index})">Edit</button>
                <button class="delete" onclick="deleteCourse(${index})">Hapus</button>
                <button class="toggle-material-form" onclick="toggleMaterialForm(${index})">Tambah Materi</button>
                <div class="material-form" id="material-form-${index}" style="display: none;">
                    <h4>Tambah Materi</h4>
                    <label for="material-title-${index}">Judul Materi:</label>
                    <input type="text" id="material-title-${index}">
                    <label for="material-description-${index}">Deskripsi Materi:</label>
                    <textarea id="material-description-${index}"></textarea>
                    <label for="material-link-${index}">Link Embed:</label>
                    <input type="text" id="material-link-${index}">
                    <button onclick="addMaterial(${index})">Tambah Materi</button>
                </div>
                <ul id="material-list-${index}"></ul>
            `;
            courseList.appendChild(li);

            // Render daftar materi untuk setiap kursus
            const materialList = document.getElementById(`material-list-${index}`);
            course.materials.forEach((material, materialIndex) => {
                const materialItem = document.createElement('li');
                materialItem.innerHTML = `
                    <h5>${material.title}</h5>
                    <p>${material.description}</p>
                    <a href="${material.link}" target="_blank">Lihat Materi</a>
                    <button class="edit" onclick="editMaterial(${index}, ${materialIndex})">Edit</button>
                    <button class="delete" onclick="deleteMaterial(${index}, ${materialIndex})">Hapus</button>
                `;
                materialList.appendChild(materialItem);
            });
        });
    }

    window.editCourse = function(index) {
        const title = prompt("Masukkan Judul Baru", courses[index].title);
        const description = prompt("Masukkan Deskripsi Baru", courses[index].description);
        const duration = prompt("Masukkan Durasi Baru", courses[index].duration);

        if (title && description && duration) {
            courses[index].title = title;
            courses[index].description = description;
            courses[index].duration = duration;
            renderCourses();
        }
    }

    window.deleteCourse = function(index) {
        courses.splice(index, 1);
        renderCourses();
    }

    window.toggleMaterialForm = function(index) {
        const form = document.getElementById(`material-form-${index}`);
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }

    window.addMaterial = function(index) {
        const title = document.getElementById(`material-title-${index}`).value;
        const description = document.getElementById(`material-description-${index}`).value;
        const link = document.getElementById(`material-link-${index}`).value;

        if (title && description && link) {
            const material = { title, description, link };
            courses[index].materials.push(material);
            renderCourses();
        }
    }

    window.deleteMaterial = function(courseIndex, materialIndex) {
        courses[courseIndex].materials.splice(materialIndex, 1);
        renderCourses();
    }

    window.editMaterial = function(courseIndex, materialIndex) {
        const material = courses[courseIndex].materials[materialIndex];
        const materialList = document.getElementById(`material-list-${courseIndex}`);
        const materialItem = materialList.children[materialIndex];

        materialItem.innerHTML = `
            <label for="edit-material-title-${courseIndex}-${materialIndex}">Judul Materi:</label>
            <input type="text" id="edit-material-title-${courseIndex}-${materialIndex}" value="${material.title}">
            <label for="edit-material-description-${courseIndex}-${materialIndex}">Deskripsi Materi:</label>
            <textarea id="edit-material-description-${courseIndex}-${materialIndex}">${material.description}</textarea>
            <label for="edit-material-link-${courseIndex}-${materialIndex}">Link Embed:</label>
            <input type="text" id="edit-material-link-${courseIndex}-${materialIndex}" value="${material.link}">
            <button onclick="saveMaterial(${courseIndex}, ${materialIndex})">Simpan</button>
        `;
    }

    window.saveMaterial = function(courseIndex, materialIndex) {
        const title = document.getElementById(`edit-material-title-${courseIndex}-${materialIndex}`).value;
        const description = document.getElementById(`edit-material-description-${courseIndex}-${materialIndex}`).value;
        const link = document.getElementById(`edit-material-link-${courseIndex}-${materialIndex}`).value;

        courses[courseIndex].materials[materialIndex] = { title, description, link };
        renderCourses();
    }
});

let sinhViens = [];
let selectedIndex = -1;

function hienThiThongTin() {
    let tableBody = document.querySelector("#sinhVienTable tbody");
    tableBody.innerHTML = "";

    sinhViens.forEach((sinhVien, index) => {
        let row = `
        <tr>
            <td>${sinhVien.id}</td>
            <td>${sinhVien.name}</td>
            <td>${sinhVien.date}</td>
            <td>${sinhVien.gender}</td>
            <td>${sinhVien.class}</td>
            <td><img src="${sinhVien.image}" alt="Student Image" width="50"></td>
            <td>
                <button type="button" onclick="chinhSuaSinhVien(${index})"><i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa</button>
                <button type="button" onclick="xoaSinhVien(${index})"><i class="fa-solid fa-trash"></i> Xoá</button>
            </td>
        </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("gender").value = "nam";
    document.getElementById("class").value = "";
    document.getElementById("image").value = "";
    //
    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
}

function themSinhVien() {
    let newId = document.getElementById("id").value.trim();
    let newName = document.getElementById("name").value.trim();
    let newDate = document.getElementById("date").value;
    let newGender = document.getElementById("gender").value;
    let newStudentClass = document.getElementById("class").value.trim();
    let newImageInput = document.getElementById("image");

    if (newId && newName && newDate && newGender && newStudentClass && newImageInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = (e) => {
            const newSinhVien = {
                id: newId,
                name: newName,
                date: newDate,
                gender: newGender,
                class: newStudentClass,
                image: e.target.result,
            };

            sinhViens.push(newSinhVien);
            hienThiThongTin();
            resetForm();
            alert("Đã thêm sinh viên thành công");
        };

        reader.readAsDataURL(newImageInput.files[0]);
    } else {
        alert("Vui lòng nhập đầy đủ thông tin sinh viên.");
    }
}

function chinhSuaSinhVien(index) {
    selectedIndex = index;
    let sinhVien = sinhViens[index];
    document.getElementById("id").value = sinhVien.id;
    document.getElementById("name").value = sinhVien.name;
    document.getElementById("date").value = sinhVien.date;
    document.getElementById("gender").value = sinhVien.gender;
    document.getElementById("class").value = sinhVien.class;

    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline-block";

}

function capNhatSinhVien() {
    if (selectedIndex === -1) {
        alert("Vui long chon sinh vien muon cap nhat");
        return;
    }
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;
    let gender = document.getElementById("gender").value;
    let studentClass = document.getElementById("class").value.trim();
    let newImageInput = document.getElementById("image");

    if (!id || !name || !date || !gender || !studentClass || !sinhViens[selectedIndex].image) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    if (newImageInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = (e) => {
            sinhViens[selectedIndex] = {
                id,
                name,
                date,
                gender,
                class: studentClass,
                image: e.target.result,
            };
            hienThiThongTin();
            resetForm();
            alert("Cập nhật thành công!");
        };
        reader.readAsDataURL(newImageInput.files[0]);
    } else {
        sinhViens[selectedIndex] = {
            id,
            name,
            date,
            gender,
            class: studentClass,
        };
        hienThiThongTin();
        resetForm();
        alert("Cập nhật thành công!");
    }
}

function xoaSinhVien(index) {
    if (confirm("Bạn có chắc chắn muốn xoá sinh viên này không?")) {
        sinhViens = sinhViens.filter((_, i) => i !== index);
        hienThiThongTin();
    }
}


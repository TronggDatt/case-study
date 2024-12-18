class QuanLySinhVien {
    constructor() {
        this.sinhViens = [];
        this.selectedIndex = -1;
        this.tableBody = document.querySelector("#sinhVienTable tbody");
    }

    dinhDangNgay(ngay) {
        let [nam, thang, ngayTrongThang] = ngay.split('-');
        return `${ngayTrongThang}/${thang}/${nam}`;
    }

    hienThiThongTin() {
        this.tableBody.innerHTML = "";
        this.sinhViens.forEach((sinhVien, index) => {
            let ngaySinhFormatted = this.dinhDangNgay(sinhVien.date);
            let row = `
            <tr>
                <td>${sinhVien.id}</td>
                <td>${sinhVien.name}</td>
                <td>${ngaySinhFormatted}</td>
                <td>${sinhVien.gender}</td>
                <td>${sinhVien.class}</td>
                <td><img src="${sinhVien.image}" alt="Student Image" width="50"></td>
                <td>
                    <button type="button" onclick="quanLySinhVien.chinhSuaSinhVien(${index})">Chỉnh sửa</button>
                    <button type="reset" onclick="quanLySinhVien.xoaSinhVien(${index})">Xoá</button>
                </td>
            </tr>
            `;
            this.tableBody.insertAdjacentHTML("beforeend", row);
        });
    }

    resetForm() {
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
        document.querySelectorAll('[name="gender"]').forEach((radio) => (radio.checked = false));
        document.getElementById("class").value = "";
        document.getElementById("image").value = "";
        document.getElementById("addButton").style.display = "inline-block";
        document.getElementById("updateButton").style.display = "none";
    }

    themSinhVien() {
        let newId = document.getElementById("id").value.trim();
        let newName = document.getElementById("name").value.trim();
        let newDate = document.getElementById("date").value;
        let newGender = document.querySelector('input[name="gender"]:checked')?.value;
        let newClass = document.getElementById("class").value.trim();
        let newImageInput = document.getElementById("image");

        if (newId && newName && newDate && newGender && newClass && newImageInput.files.length > 0) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let newSinhVien = {
                    id: newId,
                    name: newName,
                    date: newDate,
                    gender: newGender,
                    class: newClass,
                    image: e.target.result
                };
                this.sinhViens.push(newSinhVien);
                this.hienThiThongTin();
                this.resetForm();
                Swal.fire({icon: 'success', title: 'Thành công!', text: 'Đã thêm sinh viên thành công!'});
            };
            reader.readAsDataURL(newImageInput.files[0]);
        } else {
            Swal.fire({icon: 'error', title: 'Lỗi!', text: 'Vui lòng điền đầy đủ thông tin!'});
        }
    }

    chinhSuaSinhVien(index) {
        this.selectedIndex = index;
        let sinhVien = this.sinhViens[index];
        document.getElementById("id").value = sinhVien.id;
        document.getElementById("name").value = sinhVien.name;
        document.getElementById("date").value = sinhVien.date;
        document.querySelectorAll('[name="gender"]').forEach((radio) => {
            radio.checked = radio.value === sinhVien.gender;
        });
        document.getElementById("class").value = sinhVien.class;
        document.getElementById("addButton").style.display = "none";
        document.getElementById("updateButton").style.display = "inline-block";
    }

    capNhatSinhVien() {
        if (this.selectedIndex === -1) {
            Swal.fire({icon: 'error', title: 'Lỗi!', text: 'Vui lòng chọn sinh viên cần cập nhật!'});
            return;
        }
        let id = document.getElementById("id").value.trim();
        let name = document.getElementById("name").value.trim();
        let date = document.getElementById("date").value;
        let gender = document.querySelector('input[name="gender"]:checked')?.value;
        let studentClass = document.getElementById("class").value.trim();
        let newImageInput = document.getElementById("image");

        if (!id || !name || !date || !gender || !studentClass) {
            Swal.fire({icon: 'error', title: 'Lỗi!', text: 'Vui lòng điền đầy đủ thông tin!'});
            return;
        }

        if (newImageInput.files.length > 0) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.sinhViens[this.selectedIndex] = {
                    id,
                    name,
                    date,
                    gender,
                    class: studentClass,
                    image: e.target.result
                };
                this.hienThiThongTin();
                this.resetForm();
                Swal.fire({icon: 'success', title: 'Thành công!', text: 'Cập nhật sinh viên thành công!'});
            };
            reader.readAsDataURL(newImageInput.files[0]);
        } else {
            this.sinhViens[this.selectedIndex] = {
                id,
                name,
                date,
                gender,
                class: studentClass,
                image: this.sinhViens[this.selectedIndex].image
            };
            this.hienThiThongTin();
            this.resetForm();
            Swal.fire({icon: 'success', title: 'Thành công!', text: 'Cập nhật sinh viên thành công!'});
        }
    }

    xoaSinhVien(index) {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xoá?',
            text: "Dữ liệu sinh viên sẽ bị xóa vĩnh viễn!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xoá!',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                this.sinhViens.splice(index, 1);
                this.hienThiThongTin();
                Swal.fire('Đã xoá!', 'Sinh viên đã được xoá thành công.', 'success');
            }
        });
    }
}

let quanLySinhVien = new QuanLySinhVien();

var nguoiDungService = new NguoiDungService();

getListUser();

getEle("btnThemNguoiDung").addEventListener("click", function() {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người dùng";

  var footer = `
        <button class="btn btn-success" onclick="ThemNguoiDung()">Thêm</button>
    `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 * Them nguoi dung
 */
function ThemNguoiDung() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    soDT,
    loaiNguoiDung
  );

  nguoiDungService
    .themNguoiDung(nguoiDung)
    .then(function(result) {
      console.log(result);
      //location.reload();
      getListUser();
      alert("Thêm người dùng thành công");
    })
    .catch(function(err) {
      console.log(err);
    });
}

function xoaNguoiDung(id){
  nguoiDungService
    .xoaNguoiDung(id)
    .then(function(result) {
      getListUser();
      alert("Xóa người dùng thành công");
    })
    .catch(function(errors) {
      console.log(errors);
    });
}

function getListUser() {
  nguoiDungService
    .layDanhSachNguoiDung()
    .then(function(result) {
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function(errors) {
      console.log(errors);
    });
}

function renderTable(mangNguoiDung) {
  var contentHTML = "";

  mangNguoiDung.map(function(item, index) {
    contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.soDT}</td>
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal"
                      data-target="#myModal" onclick = "suaNguoiDung(${item.id})">Sửa</button>
                      <button class="btn btn-danger" onclick="xoaNguoiDung(${item.id})">Xóa</button>
                    </td>
                </tr>
            `;
  });

  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getEle(id) {
  return document.getElementById(id);
}
function suaNguoiDung(id){
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa người dùng";

  var footer = `
        <button class="btn btn-success" onclick="capNhatNguoiDung(${id})">Cập nhật</button>
    `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  nguoiDungService.layThongTinNguoiDung(id)
    .then(function(result){
      var nguoiDung = result.data;
      getEle("TaiKhoan").value = nguoiDung.taiKhoan;
      getEle("HoTen").value = nguoiDung.hoTen;
      getEle("MatKhau").value = nguoiDung.matKhau;
      getEle("Email").value = nguoiDung.email;
      getEle("SoDienThoai").value = nguoiDung.soDT;
      getEle("loaiNguoiDung").value = nguoiDung.maLoaiNguoiDung;
    })
    .catch(function(errors){
      console.log(errors);
    });
};

function capNhatNguoiDung(id){
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var user = new NguoiDung(taiKhoan,hoTen,matKhau,email,soDT,loaiNguoiDung);
  nguoiDungService.capNhatNguoiDung(id, user)
    .then(function(result){
      alert("Cập nhật thành công");
      getListUser();
    })
    .catch(function(err){
      console.log(err);
    });
};
getEle("txtSearch").addEventListener("keyup", function(){
  var chuoiTimKiem = getEle("txtSearch").value;
  var danhSachNguoiDung = getLocalStorage();
  var mangNguoiDung = nguoiDungService.timKiemNguoiDung(chuoiTimKiem,danhSachNguoiDung);
  renderTable(mangNguoiDung);
});

function setLocalStorage(danhSachNguoiDung){
  localStorage.setItem("DSND", JSON.stringify(danhSachNguoiDung));
}
function getLocalStorage(){
  return JSON.parse(localStorage.getItem("DSND"));
}
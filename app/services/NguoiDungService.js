function NguoiDungService() {
  this.layDanhSachNguoiDung = function() {
    return axios({
      method: "GET",
      url: "http://5dce9e1575f9360014c2600f.mockapi.io/api/NguoiDung"
    });
  };

  this.themNguoiDung = function(nguoiDung) {
    return axios({
      method: "POST",
      url: "http://5dce9e1575f9360014c2600f.mockapi.io/api/NguoiDung",
      data: nguoiDung
    });
  };
  this.xoaNguoiDung = function(id) {
    return axios({
      method: "DELETE",
      url: `http://5dce9e1575f9360014c2600f.mockapi.io/api/NguoiDung/${id}`,
    });
  };
  this.layThongTinNguoiDung = function(id) {
    return axios({
      method: "GET",
      url: `http://5dce9e1575f9360014c2600f.mockapi.io/api/NguoiDung/${id}`,
    });
  };
  this.capNhatNguoiDung = function(id, user) {
    return axios({
      method: "PUT",
      url: `http://5dce9e1575f9360014c2600f.mockapi.io/api/NguoiDung/${id}`,
      data: user
    });
  };
  this.timKiemNguoiDung = function(chuoiTimKiem, danhSachNguoiDung){
    return danhSachNguoiDung.filter(function(item){
      return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) >= 0;
    });
  }
}

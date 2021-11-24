function createList() {
  let xhrInput = new XMLHttpRequest();
  xhrInput.onload = function () {
    let api = JSON.parse(xhrInput.responseText);

    for (let x of api.kota) {
      let selection = document.getElementById("selection");
      let option = document.createElement("option");
      option.setAttribute("value", x.id);
      option.setAttribute("name", x.nama);
      option.text = x.nama;
      selection.appendChild(option);
    }
  };
  xhrInput.open(
    "GET",
    "https://api.banghasan.com/sholat/format/json/kota",
    true
  );
  xhrInput.send();
}

const tombol = document.getElementById("cekJadwal");
tombol.addEventListener("click", function () {
  let xhrTable = new XMLHttpRequest();
  let tanggal = document.getElementById("tanggal").value;
  let kota = document.getElementById("selection");
  let idKota = kota.options[kota.selectedIndex].value;
  let namaKota = kota.options[kota.selectedIndex].text;
  xhrTable.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let ajak = JSON.parse(xhrTable.responseText);
      document.getElementById("jadwal").innerHTML = `
                      <div class="table-responsive">
                        <table class="table table-bordered mt-5">
                          <tr>
                            <th rowspan="2">Nama Kota</th>
                            <th rowspan="2">Tanggal</th>
                            <th colspan="5">Waktu Sholat</th>
                          </tr>
                          <tr>
                            <th>Subuh</th>
                            <th>Dzuhur</th>
                            <th>Ashar</th>
                            <th>Maghrib</th>
                            <th>Isya</th>
                          </tr>
                          <tr>
                            <td>${namaKota}</td>
                            <td>${tanggal}</td>
                            <td>${ajak.jadwal.data.subuh}</td>
                            <td>${ajak.jadwal.data.dzuhur}</td>
                            <td>${ajak.jadwal.data.ashar}</td>
                            <td>${ajak.jadwal.data.maghrib}</td>
                            <td>${ajak.jadwal.data.isya}</td>
                          </tr>
                        </table>
                      </div>
                        `;
    }
  };
  xhrTable.open(
    "GET",
    "https://api.banghasan.com/sholat/format/json/jadwal/kota/" +
      idKota +
      "/tanggal/" +
      tanggal +
      "",
    true
  );
  xhrTable.send();
});

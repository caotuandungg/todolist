let btnTask = document.querySelector(".btn-add");
let taskName = document.querySelector(".content");
let task = getTaskFromLocalStorage();
let newValue;
renderTask(task);

btnTask.addEventListener("click", function () {
  if (!taskName.value) {
    alert("Nhap ten cong viec");
    return false;
  }
  //Nghĩa là mỗi lần mình click vào, thì sẽ có thêm 1 cái taskId
  let taskId = this.getAttribute("id");
  //this o day la dai dien cho cai gi? cái gì sẽ lấy ra attribute
  //=> Giải thích: this ở đây là đại diện cho cái button ta vừa click vào. Nghĩa là lấy ra attribute của nút button đó
  //Sau đó mình vẫn cần phải lấy ra danh sách task
  let task = getTaskFromLocalStorage();
  let task2 = { name: taskName.value };
  //Đến đây vẫn chưa biết đc là push hay update, nên mình phải thêm câu lệnh để kiểm tra, tại vì key vẫn có cái bằng 0 (đoạn này cx ko hiểu vì sao)
  //Câu lệnh này nghĩa là: nếu taskId chính xác là bằng 0, hoặc là tồn tại cái taskId thì sẽ thực hiện, còn trái lại thì sẽ xóa
  if (taskId == 0 || taskId) {
    //Đối với update thì mình sẽ dựa vào cơ chế override key của mảng (cũng ko hiểu luôn, cần xem lại)
    //Có nghĩa là mình khai báo và gán giá trị cho chính cái mảng đấy, và set luôn key cho nó thì chắc chắn nó sẽ override giá trị
    //Cụ thể là với cái task này ta sẽ lấy luôn cái taskId- là key của mảng- bằng đúng cái task2 là nội dung của task, hay còn gọi là content
    if (newValue) {
      task[taskId] = { name: newValue };
    } else task[taskId] = task2;
    //Đến đây, sau khi update nội dung xong, thì mình phải set lại attribute kia về rỗng
    //Cách 1 là dùng hàm setAttribute có tên là id, value là dấu nháy kép- có nghĩa là rỗng
    //Cách 2 là sử dụng hàm removeAttribute, nhưng mà đến đây thì mình cũng đ hiểu cái hàm này lắm vì chưa học bh,nên cần xem lại đoạn này
    this.removeAttribute("id");
  } else {
    task.push(task2);
    //ham push la gi?
  }
  //Đến đây nghĩa là sau khi update xong thì vẫn phải đưa giá trị của taskName về rỗng và lưu lại vào local storage
  taskName.value = "";
  localStorage.setItem("task", JSON.stringify(task));
  renderTask(task);
});

function editTask(id) {
  //45:10s
  //Ý tưởng là khi mà người dùng click vào chữ Sửa, thì nó sẽ hiện cái tên task đó lên trên
  //sẽ phải lấy task trong localstorage ra khi ma nguoi dung click vao
  //lay dua vao cai key cua no ( doan nay ko hieu lam)
  let task = getTaskFromLocalStorage();
  //sau đó kiểm trả xem nếu tổng số phần tử trong mảng > 0 thì mới thực hiện
  if (task.length > 0) {
    //taskName lúc này sẽ được gán bằng name của cái task với ẩn số là id
    //(đoạn này cũng chưa hiểu lắm, sao lại là id, và sao lại để trong dấu ngoặc vuông)
    taskName.value = task[id].name;
    // vấn đề tiếp theo sẽ là mỗi khi mình click vào nút btn, thì sẽ ko thể biết được là thực hiện chức năng "thêm" hay "sửa"
    //vì vậy nên phải vì ra câu lệnh, để sao cho mỗi lần click vào thì sẽ có 1 cái attribute được add vào btn
    btnTask.setAttribute("id", id);
    //mỗi lần click vào, sẽ có 1 attribute mới đc thêm vào, attribute tên là "id", key chính là id (tham số)
    //mục đích là để máy hiểu được là mình muốn thêm vào
    // sau đó phải quay lên trên để thêm câu lệnh vào sự kiện click Btn ở trên
    renderTask(task, id);
  }
  //lay key cua mang lam key nghia la sao? 40:45s
}
function deleteTask(id) {
  let task = getTaskFromLocalStorage();
  task.splice(id, 1);
  //ham nay co chuc nang xoa bat dau cai key là id, va xoa 1 phan tu
  localStorage.setItem("task", JSON.stringify(task));
  // sau do ghi no lai vao trong local storage
  renderTask(getTaskFromLocalStorage());
  //sau do hien thi lai danh sach task ma doc dc o local storage len( de cho can than)
}
const changeValue = (e) => {
  newValue = e;
};
const saveValue = (e, id) => {

    if (event.keyCode == 13) {
    let task = getTaskFromLocalStorage();

    // console.log(index)

    task[id] = { name: e };
    // console.log(task[index])
    // console.log(task)
    taskName.value = "";
    localStorage.setItem("task", JSON.stringify(task));
    renderTask(task);
  }
};
function renderTask(task = [], id) {
  let content = "<ul>";
  task.forEach((task, index) => {
    //ham for nay vua lay ra dc item, vua lay ra dc index? de lam gi?
    if (index === id) {
      return (content += `<li>
        <input class="task-name" onchange="changeValue(this.value)" onkeydown="saveValue(this.value,${index})" value=${task.name} />
        <a href="#" onclick="editTask(${index})">Sửa</a>
        <a href="#" class="delete" onclick="deleteTask(${index})">Xóa</a>
    </li>`);
    } else {
      return (content += `<li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Sửa</a>
            <a href="#" class="delete" onclick="deleteTask(${index})">Xóa</a>
        </li>`);
    }

    //tai sao lai phai noi chuoi?
  });
  content += "</ul>";
  //tai sao lai phai nuoi chuoi ul?
  document.querySelector(".result").innerHTML = content;
  //tai sao in cai content ma ko phai la taskName?
}

function getTaskFromLocalStorage() {
  return localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task")) : [];
}
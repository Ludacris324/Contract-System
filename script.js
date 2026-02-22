// --- 1. التحكم في نافذة "إضافة مناقصة جديدة" (Modal) ---

// وظيفة لفتح النافذة
function openForm() {
  const modal = document.getElementById("tenderModal");
  if (modal) {
    modal.style.display = "block";
  }
}

// وظيفة لإغلاق النافذة
function closeForm() {
  const modal = document.getElementById("tenderModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// إغلاق النافذة تلقائياً لو المستخدم ضغط في أي مكان خارج المربع الأبيض
window.onclick = function (event) {
  const modal = document.getElementById("tenderModal");
  if (event.target == modal) {
    closeForm();
  }
};

// --- 2. معالجة بيانات الفورم وإضافتها للجدول ---

const tenderForm = document.getElementById("tenderForm");

if (tenderForm) {
  tenderForm.addEventListener("submit", function (e) {
    // منع الصفحة من إعادة التحميل (Refresh) عند الضغط على حفظ
    e.preventDefault();

    // سحب البيانات اللي المستخدم كتبها في الخانات
    const projName = document.getElementById("projName").value;
    const clientName = document.getElementById("clientName").value;
    const closeDate = document.getElementById("closeDate").value;

    // الوصول لمكان الجدول في الصفحة
    const tableBody = document.querySelector("table tbody");

    // إنشاء سطر (Row) جديد تماماً
    const newRow = document.createElement("tr");

    // وضع البيانات داخل السطر بتنسيق الـ HTML المناسب
    newRow.innerHTML = `
            <td>#${Math.floor(Math.random() * 9000) + 1000}</td>
            <td>${projName}</td>
            <td>${clientName}</td>
            <td>${closeDate}</td>
            <td><span class="status open">نشطة</span></td>
        `;

    // إضافة السطر الجديد لآخر الجدول
    tableBody.appendChild(newRow);

    // تصفير الخانات في الفورم عشان تكون جاهزة للإضافة الجاية
    tenderForm.reset();

    // قفل النافذة بعد الحفظ الناجح
    closeForm();

    console.log("تمت إضافة المشروع الجديد بنجاح!");
  });
}

// --- 3. نظام التنقل في القائمة الجانبية (Sidebar Navigation) ---

const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    // شيل اللون الأزرق (Active) من القسم القديم وحطه للقسم الجديد اللي ضغطت عليه
    menuItems.forEach((li) => li.classList.remove("active"));
    this.classList.add("active");

    // سحب اسم القسم (مثل: المناقصات، الموردين...)
    const sectionName = this.innerText.trim();
    const mainHeader = document.querySelector(".main-content h1");

    // تحديث العنوان الرئيسي للمحتوى بناءً على القسم المختار
    if (mainHeader) {
      mainHeader.innerText = "إدارة " + sectionName;
    }

    console.log("انتقلت الآن إلى: " + sectionName);
  });
});

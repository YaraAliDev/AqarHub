function displayMyProperties() {
    const container = document.getElementById("my-properties-container");

    const properties =
        JSON.parse(localStorage.getItem("userProperties")) || [];

    container.innerHTML = "";

    if (properties.length === 0) {
        container.innerHTML = "<p>لم تقومي بإضافة أي عقارات حتى الآن.</p>";
        return;
    }

    properties.forEach(property => {
        const card = document.createElement("div");
        card.className = "property-card";

        card.innerHTML = `
            <img src="${property.image}" class="property-image" alt="صورة العقار">

            <div class="property-info">
                <h3>${property.title}</h3>
                <p>📍 ${property.location}</p>
                <p>💰 ${property.price} جنيه</p>
                <p>📐 ${property.area} متر</p>
                <p>🛏️ ${property.rooms} غرف</p>

                <button onclick="editProperty(${property.id})">
                    تعديل العقار
                </button>

                <button onclick="deleteProperty(${property.id})">
                    حذف العقار
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function editProperty(id) {
    let properties =
        JSON.parse(localStorage.getItem("userProperties")) || [];

    const property = properties.find(item => item.id === id);

    if (!property) return;

    const newTitle = prompt("اكتبي عنوان العقار الجديد:", property.title);
    if (newTitle === null || newTitle.trim() === "") return;

    const newPrice = prompt("اكتبي السعر الجديد:", property.price);
    if (newPrice === null || newPrice.trim() === "") return;

    property.title = newTitle;
    property.price = newPrice;

    localStorage.setItem("userProperties", JSON.stringify(properties));

    displayMyProperties();
    alert("تم تعديل العقار بنجاح ❤️");
}

function deleteProperty(id) {
    if (!confirm("هل أنت متأكدة من حذف العقار؟")) return;

    let properties =
        JSON.parse(localStorage.getItem("userProperties")) || [];

    properties = properties.filter(item => item.id !== id);

    localStorage.setItem("userProperties", JSON.stringify(properties));

    displayMyProperties();
    alert("تم حذف العقار بنجاح");
}

displayMyProperties();
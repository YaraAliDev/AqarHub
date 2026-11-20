const properties = [
    {
        id: 1,
        title: "شقة فاخرة بإطلالة مميزة",
        location: "القاهرة",
        type: "شقة",
        purpose: "بيع",
        price: 2500000,
        area: 160,
        rooms: 3,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    },
    {
        id: 2,
        title: "فيلا عصرية بحديقة خاصة",
        location: "الجيزة",
        type: "فيلا",
        purpose: "بيع",
        price: 6500000,
        area: 320,
        rooms: 5,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    },
    {
        id: 3,
        title: "شقة مميزة بالقرب من الخدمات",
        location: "الشرقية",
        type: "شقة",
        purpose: "إيجار",
        price: 8000,
        area: 130,
        rooms: 3,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"
    },
    {
        id: 4,
        title: "شقة راقية بتصميم حديث",
        location: "الإسكندرية",
        type: "شقة",
        purpose: "بيع",
        price: 1800000,
        area: 145,
        rooms: 3,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
    },
    {
        id: 5,
        title: "فيلا فاخرة بمساحات واسعة",
        location: "القاهرة",
        type: "فيلا",
        purpose: "إيجار",
        price: 25000,
        area: 400,
        rooms: 6,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
    },
    {
        id: 6,
        title: "مكتب إداري بموقع مميز",
        location: "الجيزة",
        type: "مكتب",
        purpose: "إيجار",
        price: 12000,
        area: 100,
        rooms: 2,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
    }
];
// تحميل العقارات الجديدة المحفوظة
const userProperties =
    JSON.parse(localStorage.getItem("userProperties")) || [];

// إضافة العقارات الجديدة للقائمة الأساسية
properties.push(...userProperties);

function displayProperties(list) {
    const container = document.getElementById("properties-container");

    if (list.length === 0) {
        container.innerHTML = `
            <p class="no-results">لا توجد عقارات تطابق اختياراتك.</p>
        `;
        return;
    }

    container.innerHTML = list.map(property => `
        <article class="property-card">

            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">

                <span class="property-badge">
                    ${property.purpose === "بيع" ? "للبيع" : "للإيجار"}
                </span>
            </div>

            <div class="property-info">

                <h3>${property.title}</h3>

                <p class="property-location">
                    📍 ${property.location}
                </p>

                <p class="property-price">
                    ${property.price.toLocaleString("en-US")} جنيه
                    ${property.purpose === "إيجار" ? "/ شهريًا" : ""}
                </p>

                <div class="property-details">
                    <span>📐 ${property.area} م²</span>
                    <span>🛏 ${property.rooms} غرف</span>
                    <span>🏠 ${property.type}</span>
                </div>

                <button onclick="showPropertyDetails(${property.id})">
                    عرض التفاصيل
                </button>

            </div>
        </article>
    `).join("");
}

function searchProperties() {
    const location = document.getElementById("location").value;
    const type = document.getElementById("type").value;
    const purpose = document.getElementById("purpose").value;

    const minPrice = Number(document.getElementById("minPrice").value) || 0;
    const maxPrice = Number(document.getElementById("maxPrice").value) || Infinity;
    const minArea = Number(document.getElementById("minArea").value) || 0;

    const filtered = properties.filter(property => {
        const price = Number(String(property.price).replace(/[^\d.]/g, ""));

        return (
            (!location || property.location.includes(location)) &&
            (!type || property.type === type) &&
            (!purpose || property.purpose === purpose) &&
            price >= minPrice &&
            price <= maxPrice &&
            property.area >= minArea
        );
    });
    const sortPrice = document.getElementById("sortPrice").value;

    if (sortPrice === "low") {
       filtered.sort((a, b) =>
           Number(String(a.price).replace(/[^\d.]/g, "")) -
           Number(String(b.price).replace(/[^\d.]/g, ""))
        );
    }
 
    if (sortPrice === "high") {
       filtered.sort((a, b) =>
           Number(String(b.price).replace(/[^\d.]/g, "")) -
           Number(String(a.price).replace(/[^\d.]/g, ""))
        );
    }

    displayProperties(filtered);
}

function showPropertyDetails(id) {
    const property = properties.find(item => item.id === id);

    if (!property) {
        alert("العقار غير موجود");
        return;
    }

    localStorage.setItem("selectedProperty", JSON.stringify(property));

    window.location.href = "property.html";
}

// Display all properties when the website opens
displayProperties(properties);
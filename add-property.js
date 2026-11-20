const form = document.getElementById("propertyForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
        alert("من فضلك اختاري صورة للعقار");
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const newProperty = {
            id: Date.now(),
            title: document.getElementById("title").value,
            location: document.getElementById("location").value,
            type: document.getElementById("type").value,
            purpose: document.getElementById("purpose").value,
            price: document.getElementById("price").value,
            area: Number(document.getElementById("area").value),
            rooms: Number(document.getElementById("rooms").value),
            image: reader.result
        };

        let savedProperties =
            JSON.parse(localStorage.getItem("userProperties")) || [];

        savedProperties.push(newProperty);

        localStorage.setItem(
            "userProperties",
            JSON.stringify(savedProperties)
        );

        alert("تم حفظ العقار بنجاح ❤️");

        form.reset();
    };

    reader.readAsDataURL(imageFile);
});
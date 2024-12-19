// Мэдээ татах функц
function fetchRSS() {
    const xhr = new XMLHttpRequest(); // XMLHttpRequest объект үүсгэх
    const url = "https://ikon.mn/rss"; // RSS-ийн URL

    xhr.open("GET", url, true); // GET хүсэлт илгээх
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = xhr.responseText; // Хариуг авах
            parseRSS(response); // RSS өгөгдлийг задлах
        }
    };
    xhr.send(); // Хүсэлтээ илгээх
}

// RSS өгөгдлийг задлах функц
function parseRSS(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "application/xml");
    const items = xml.querySelectorAll("item"); // RSS-ийн <item> элементийг сонгох

    const newsContainer = document.getElementById("newsContainer");
    items.forEach((item) => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;

        // HTML элемент үүсгэх
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.textContent = title;
        anchor.target = "_blank";

        listItem.appendChild(anchor);
        newsContainer.appendChild(listItem);
    });
}

// Мэдээ татаж авахыг эхлүүлэх
fetchRSS();

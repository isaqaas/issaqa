
const laptops = [
    {
        id: 1,
        brand: "Apple",
        name: "MacBook Air M3",
        category: "Премиум",
        price: 549990,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        cpu: "Apple M3",
        ram: "16 GB",
        gpu: "Apple M3 Graphics",
        storage: "512 GB SSD",
        screen: "13.6 дюйма",
        resolution: "2560 × 1664",
        description: "Лёгкий и производительный ноутбук для работы, учёбы и творчества."
    },
    {
        id: 2,
        brand: "ASUS",
        name: "ROG Strix G16",
        category: "Игровые",
        price: 899990,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800",
        cpu: "Intel Core i7-13650HX",
        ram: "16 GB DDR5",
        gpu: "NVIDIA RTX 4060",
        storage: "1 TB SSD",
        screen: "16 дюймов",
        resolution: "1920 × 1200",
        description: "Мощный игровой ноутбук для современных игр и тяжёлых задач."
    },
    {
        id: 3,
        brand: "Lenovo",
        name: "IdeaPad Slim 5",
        category: "Для учёбы",
        price: 349990,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
        cpu: "AMD Ryzen 5 7530U",
        ram: "16 GB",
        gpu: "AMD Radeon Graphics",
        storage: "512 GB SSD",
        screen: "15.6 дюйма",
        resolution: "1920 × 1080",
        description: "Удобный ноутбук для учёбы, интернета и повседневных задач."
    },
    {
        id: 4,
        brand: "HP",
        name: "Pavilion 15",
        category: "Для работы",
        price: 329990,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
        cpu: "Intel Core i5-1335U",
        ram: "16 GB",
        gpu: "Intel Iris Xe",
        storage: "512 GB SSD",
        screen: "15.6 дюйма",
        resolution: "1920 × 1080",
        description: "Универсальная модель для офисных программ и работы."
    },
    {
        id: 5,
        brand: "Acer",
        name: "Nitro 5",
        category: "Игровые",
        price: 649990,
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=800",
        cpu: "Intel Core i5-12500H",
        ram: "16 GB DDR5",
        gpu: "NVIDIA RTX 4050",
        storage: "512 GB SSD",
        screen: "15.6 дюйма",
        resolution: "1920 × 1080",
        description: "Игровая модель с дискретной видеокартой для современных игр."
    },
    {
        id: 6,
        brand: "Dell",
        name: "Inspiron 15",
        category: "Для работы",
        price: 379990,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
        cpu: "Intel Core i7-1355U",
        ram: "16 GB",
        gpu: "Intel Iris Xe",
        storage: "1 TB SSD",
        screen: "15.6 дюйма",
        resolution: "1920 × 1080",
        description: "Надёжный ноутбук для работы, учёбы и многозадачности."
    },
    {
        id: 7,
        brand: "MSI",
        name: "Katana 15",
        category: "Игровые",
        price: 729990,
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=800",
        cpu: "Intel Core i7-13620H",
        ram: "16 GB DDR5",
        gpu: "NVIDIA RTX 4060",
        storage: "1 TB SSD",
        screen: "15.6 дюйма",
        resolution: "1920 × 1080",
        description: "Производительный ноутбук для игр, монтажа и графики."
    },
    {
        id: 8,
        brand: "ASUS",
        name: "Zenbook 14",
        category: "Премиум",
        price: 599990,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        cpu: "Intel Core Ultra 7",
        ram: "16 GB",
        gpu: "Intel Arc Graphics",
        storage: "1 TB SSD",
        screen: "14 дюймов",
        resolution: "2880 × 1800",
        description: "Стильный тонкий ноутбук с качественным экраном."
    }
];

let cartCount = 0;
let activeCategory = "Все";

const productsElement = document.getElementById("products");
const searchInput = document.getElementById("search");
const productTotal = document.getElementById("product-total");

// Форматирование цены
function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₸";
}

// Создание карточек
function renderProducts() {
    const search = searchInput.value.toLowerCase().trim();

    const filtered = laptops.filter(laptop => {
        const matchesSearch =
            laptop.name.toLowerCase().includes(search) ||
            laptop.brand.toLowerCase().includes(search) ||
            laptop.cpu.toLowerCase().includes(search);

        const matchesCategory =
            activeCategory === "Все" ||
            laptop.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    productTotal.textContent = filtered.length + " моделей";

    if (filtered.length === 0) {
        productsElement.innerHTML =
            '<p class="empty">Ноутбуки не найдены.</p>';
        return;
    }

    productsElement.innerHTML = filtered.map(laptop => `
        <article class="product-card">

            <div class="product-image">
                <a href="?id=${laptop.id}">
                    <img src="${laptop.image}"
                         alt="${laptop.brand} ${laptop.name}"
                         loading="lazy">
                </a>
                <span class="product-category">
                    ${laptop.category}
                </span>
            </div>

            <div class="product-info">
                <div class="brand">${laptop.brand}</div>

                <h3>
                    <a href="?id=${laptop.id}"
                       class="product-title-link">
                        ${laptop.name}
                    </a>
                </h3>

                <div class="product-bottom">
                    <strong>${formatPrice(laptop.price)}</strong>

                    <button class="add-button"
                            data-add="${laptop.id}"
                            aria-label="Добавить в корзину">
                        +
                    </button>
                </div>
            </div>

        </article>
    `).join("");
}

// Поиск
searchInput.addEventListener("input", renderProducts);

document.getElementById("search-button")
    .addEventListener("click", renderProducts);

// Категории
document.querySelectorAll(".categories a")
    .forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            document.querySelectorAll(".categories a")
                .forEach(item => item.classList.remove("active"));

            link.classList.add("active");

            activeCategory = link.dataset.category;

            renderProducts();
        });
    });

// Корзина
productsElement.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");

    if (!button) return;

    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;

    button.textContent = "✓";
    setTimeout(() => button.textContent = "+", 700);
});

// Страница характеристик
function renderDetails() {
    const id = Number(new URLSearchParams(location.search).get("id"));
    const laptop = laptops.find(item => item.id === id);

    if (!laptop) return false;

    document.getElementById("home-view").hidden = true;
    document.getElementById("details-view").hidden = false;

    document.title = laptop.name + " — NOTECH";

    const specs = [
        ["Процессор", laptop.cpu],
        ["Оперативная память", laptop.ram],
        ["Видеокарта", laptop.gpu],
        ["Накопитель", laptop.storage],
        ["Диагональ экрана", laptop.screen],
        ["Разрешение экрана", laptop.resolution],
        ["Категория", laptop.category]
    ];

    document.getElementById("details-content").innerHTML = `
        <div class="details-card">

            <div class="details-image">
                <img src="${laptop.image}" alt="${laptop.name}">
            </div>

            <div class="details-info">
                <div class="details-brand">${laptop.brand}</div>

                <h1>${laptop.name}</h1>

                <span class="details-category">
                    ${laptop.category}
                </span>

                <div class="details-price">
                    ${formatPrice(laptop.price)}
                </div>

                <p class="details-description">
                    ${laptop.description}
                </p>

                <button class="details-add-button" id="details-add">
                    Добавить в корзину
                </button>
            </div>

        </div>

        <div class="specifications">
            <h2>Технические характеристики</h2>

            ${specs.map(spec => `
                <div class="spec-row">
                    <span>${spec[0]}</span>
                    <span>${spec[1]}</span>
                </div>
            `).join("")}
        </div>
    `;

    document.getElementById("details-add")
        .addEventListener("click", () => {
            cartCount++;
            document.getElementById("cart-count").textContent = cartCount;

            const button = document.getElementById("details-add");
            button.textContent = "Добавлено ✓";
        });

    return true;
}

// Запуск
if (!renderDetails()) {
    renderProducts();
}


// ===================================
// ISAQA — MATH SPACE
// ===================================

let operation = "+";
let num1, num2, correctAnswer;
let correctCount = 0;
let wrongCount = 0;
let totalCount = 0;
let answered = false;

function generateExample() {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;

    if (operation === "/") {
        num2 = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
    }

    if (operation === "+") correctAnswer = num1 + num2;
    if (operation === "-") correctAnswer = num1 - num2;
    if (operation === "*") correctAnswer = num1 * num2;
    if (operation === "/") correctAnswer = num1 / num2;

    document.getElementById("example").textContent =
        `${num1} ${operation} ${num2} = ?`;

    document.getElementById("answer").value = "";
    document.getElementById("message").textContent = "";
    answered = false;
}

document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".operation").forEach(b =>
            b.classList.remove("active")
        );

        button.classList.add("active");
        operation = button.dataset.op;
        generateExample();
    });
});

document.getElementById("check").addEventListener("click", () => {
    if (answered) return;

    const input = document.getElementById("answer").value;
    const message = document.getElementById("message");

    if (input.trim() === "") {
        message.textContent = "Введи свой ответ!";
        message.style.color = "#D97706";
        return;
    }

    totalCount++;
    answered = true;

    if (Number(input) === correctAnswer) {
        correctCount++;
        message.textContent = "🎉 Правильно! Отличная работа!";
        message.style.color = "#16A36A";
    } else {
        wrongCount++;
        message.textContent = `❌ Неверно. Ответ: ${correctAnswer}`;
        message.style.color = "#E05252";
    }

    document.getElementById("correct").textContent = correctCount;
    document.getElementById("wrong").textContent = wrongCount;
    document.getElementById("total").textContent = totalCount;
});

document.getElementById("answer").addEventListener("keydown", e => {
    if (e.key === "Enter") {
        document.getElementById("check").click();
    }
});

document.getElementById("next").addEventListener("click", generateExample);

generateExample();


// ===================================
// ISAQA — COLOR SPACE
// ===================================

const mixInputs = document.getElementById("mixInputs");
const resultColor = document.getElementById("resultColor");
const mixedName = document.getElementById("mixedName");
const hexCode = document.getElementById("hexCode");
const palette = document.getElementById("palette");

let activeSlot = 0;
let activeCount = 2;

const shadeNames = {
    "#FFF0C9": "Сливочный блонд",
    "#F1D49A": "Золотистый блонд",
    "#E6C28B": "Натуральный блонд",
    "#D8B477": "Медовый блонд",
    "#C5A77C": "Бежевый блонд",
    "#B9B1A1": "Пепельный блонд",
    "#987453": "Русый",
    "#79472E": "Каштановый",
    "#593522": "Шоколад",
    "#70452D": "Молочный шоколад",
    "#432B22": "Тёмный шоколад",
    "#A87950": "Карамель",
    "#B95D36": "Медный",
    "#A6422E": "Рыжий",
    "#873D32": "Махагон",
    "#722F35": "Бордовый",
    "#C77C54": "Терракотовый",
    "#D69A69": "Персиковый",
    "#D58FA7": "Пастельно-розовый",
    "#B85A86": "Ягодный",
    "#9B79C5": "Лавандовый",
    "#7667B5": "Фиолетовый",
    "#668DAA": "Голубой",
    "#477C76": "Мятный",
    "#49704B": "Зелёный",
    "#29252A": "Чёрный"
};


// ===================================
// НАЗВАНИЯ НОВЫХ ОТТЕНКОВ
// ===================================

function getColorName(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;

    if (delta !== 0) {
        if (max === r) hue = 60 * (((g - b) / delta) % 6);
        else if (max === g) hue = 60 * ((b - r) / delta + 2);
        else hue = 60 * ((r - g) / delta + 4);
    }

    if (hue < 0) hue += 360;

    const lightness = (max + min) / 510;

    if (delta < 18) {
        if (lightness < 0.16) return "Чёрный эспрессо";
        if (lightness < 0.35) return "Тёмный графит";
        if (lightness < 0.65) return "Натуральный серый";
        return "Серебристый оттенок";
    }

    if (hue >= 15 && hue < 48) {
        if (lightness > 0.7) return "Золотистый блонд";
        if (lightness > 0.5) return "Медовая карамель";
        if (lightness > 0.3) return "Карамельный каштан";
        return "Тёмный медный шоколад";
    }

    if (hue >= 48 && hue < 75) {
        return lightness > 0.55 ? "Песочный блонд" : "Тёплый орех";
    }

    if (hue >= 75 && hue < 165) return "Оливковый оттенок";
    if (hue >= 165 && hue < 210) return "Холодный бирюзовый";
    if (hue >= 210 && hue < 260) return "Пепельно-голубой";
    if (hue >= 260 && hue < 310) return "Лавандовый оттенок";

    if (hue >= 310 || hue < 15) {
        if (lightness > 0.65) return "Пудровая роза";
        if (lightness > 0.4) return "Ягодный каштан";
        return "Вишнёвый шоколад";
    }

    return "Авторский оттенок";
}


// ===================================
// ВЫБОР ЦВЕТА
// ===================================

function selectSlot(index) {
    activeSlot = index;

    document.querySelectorAll(".mix-item").forEach((item, i) => {
        item.style.outline = i === index
            ? "2px solid #3985F5"
            : "none";
    });
}

function mixAllColors() {
    const items = [...document.querySelectorAll(".mix-item")]
        .filter(item => !item.classList.contains("hidden"))
        .slice(0, activeCount);

    let colors = items.map(item => ({
        hex: item.querySelector(".mix-color").value,
        weight: Number(item.querySelector(".mix-weight").value)
    }));

    let totalWeight = colors.reduce((sum, c) => sum + c.weight, 0);

    if (totalWeight === 0) {
        colors.forEach(c => c.weight = 1);
        totalWeight = colors.length;
    }

    let rgb = [0, 0, 0];

    colors.forEach(c => {
        const r = parseInt(c.hex.slice(1, 3), 16);
        const g = parseInt(c.hex.slice(3, 5), 16);
        const b = parseInt(c.hex.slice(5, 7), 16);

        const weight = c.weight / totalWeight;

        rgb[0] += r * weight;
        rgb[1] += g * weight;
        rgb[2] += b * weight;
    });

    const hex = "#" + rgb.map(value =>
        Math.round(value).toString(16).padStart(2, "0")
    ).join("").toUpperCase();

    resultColor.style.background = hex;
    hexCode.textContent = hex;
    mixedName.textContent = getColorName(hex);
}


// ===================================
// ПОЛЗУНКИ И ЦВЕТА
// ===================================

function attachMixerEvents() {
    document.querySelectorAll(".mix-item").forEach(item => {
        const color = item.querySelector(".mix-color");
        const weight = item.querySelector(".mix-weight");
        const label = item.querySelector(".weight-value");

        color.addEventListener("input", mixAllColors);

        weight.addEventListener("input", () => {
            label.textContent = weight.value + "%";
            mixAllColors();
        });
    });
}

document.querySelectorAll(".mix-item").forEach((item, index) => {
    item.addEventListener("click", () => selectSlot(index));
});

attachMixerEvents();
selectSlot(0);


// ===================================
// ГОТОВАЯ ПАЛИТРА
// ===================================

const categoryRules = {
    all: () => true,

    blonde: color => [
        "#FFF0C9", "#F1D49A", "#E6C28B",
        "#D8B477", "#C5A77C", "#B9B1A1"
    ].includes(color),

    brunette: color => [
        "#987453", "#79472E", "#593522",
        "#70452D", "#432B22", "#A87950", "#29252A"
    ].includes(color),

    red: color => [
        "#B95D36", "#A6422E", "#873D32",
        "#722F35", "#C77C54", "#D69A69"
    ].includes(color),

    fantasy: color => [
        "#D58FA7", "#B85A86", "#9B79C5",
        "#7667B5", "#668DAA", "#477C76", "#49704B"
    ].includes(color)
};

function setupPalette() {
    document.querySelectorAll(".shade").forEach(shade => {
        shade.addEventListener("click", () => {
            document.querySelectorAll(".shade").forEach(item =>
                item.classList.remove("selected")
            );

            shade.classList.add("selected");

            const color = shade.dataset.color.toUpperCase();

            document.querySelectorAll(".mix-color")[activeSlot].value = color;

            document.getElementById("selectedName").textContent =
                "Выбранный цвет: " +
                (shadeNames[color] || shade.title || color);

            mixAllColors();
        });
    });
}

setupPalette();


// ===================================
// СОБСТВЕННЫЙ ЦВЕТ
// ===================================

document.getElementById("addCustomColor").addEventListener("click", () => {
    const color = document.getElementById("customColor").value.toUpperCase();

    document.querySelectorAll(".mix-color")[activeSlot].value = color;

    const shade = document.createElement("button");

    shade.className = "shade";
    shade.style.background = color;
    shade.dataset.color = color;
    shade.title = "Мой цвет " + color;

    shade.addEventListener("click", () => {
        document.querySelectorAll(".mix-color")[activeSlot].value = color;
        mixAllColors();
    });

    palette.appendChild(shade);

    document.getElementById("selectedName").textContent =
        "Твой цвет: " + color;

    mixAllColors();
});


// ===================================
// ДОБАВИТЬ И УБРАТЬ ЦВЕТ
// ===================================

document.getElementById("addMixColor").addEventListener("click", () => {
    if (activeCount >= 4) {
        alert("Можно смешивать максимум 4 цвета!");
        return;
    }

    document.querySelectorAll(".extra-color")
        [activeCount - 2].classList.remove("hidden");

    activeCount++;

    selectSlot(activeCount - 1);
    mixAllColors();
});

document.getElementById("removeMixColor").addEventListener("click", () => {
    if (activeCount <= 2) {
        alert("Минимум два цвета!");
        return;
    }

    activeCount--;

    document.querySelectorAll(".extra-color")
        [activeCount - 2].classList.add("hidden");

    selectSlot(0);
    mixAllColors();
});


// ===================================
// ПОИСК И КАТЕГОРИИ
// ===================================

function filterPalette() {
    const search = document.getElementById("colorSearch");
    const category = document.getElementById("colorCategory");

    if (!search || !category) return;

    const query = search.value.toLowerCase().trim();
    const selectedCategory = category.value;

    document.querySelectorAll(".shade").forEach(shade => {
        const color = shade.dataset.color.toUpperCase();
        const name = shade.title.toLowerCase();

        const matchesSearch =
            name.includes(query) || color.toLowerCase().includes(query);

        const matchesCategory =
            !categoryRules[selectedCategory] ||
            categoryRules[selectedCategory](color);

        shade.style.display =
            matchesSearch && matchesCategory ? "" : "none";
    });
}

const colorSearch = document.getElementById("colorSearch");
const colorCategory = document.getElementById("colorCategory");

if (colorSearch) colorSearch.addEventListener("input", filterPalette);
if (colorCategory) colorCategory.addEventListener("change", filterPalette);


// ===================================
// КОПИРОВАНИЕ ЦВЕТА
// ===================================

document.getElementById("copyColor").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(hexCode.textContent);
        document.getElementById("copyColor").textContent = "✓ Скопировано!";
    } catch {
        alert("Не удалось скопировать цвет");
    }
});


// ===================================
// СОХРАНЕНИЕ ЛЮБИМЫХ ЦВЕТОВ
// ===================================

let savedColors = [];

try {
    savedColors = JSON.parse(localStorage.getItem("isaqaColors") || "[]");
    if (!Array.isArray(savedColors)) savedColors = [];
} catch {
    savedColors = [];
}

function renderSavedColors() {
    const container = document.getElementById("savedColors");
    container.innerHTML = "";

    if (savedColors.length === 0) {
        container.innerHTML =
            '<p class="color-description">Пока нет сохранённых цветов.</p>';
        return;
    }

    savedColors.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "saved-item";

        const swatch = document.createElement("div");
        swatch.className = "saved-swatch";
        swatch.style.background = item.hex;

        const title = document.createElement("b");
        title.textContent = item.name;

        const code = document.createElement("p");
        code.textContent = item.hex;

        const remove = document.createElement("button");
        remove.textContent = "Удалить";

        remove.addEventListener("click", () => {
            savedColors.splice(index, 1);

            localStorage.setItem(
                "isaqaColors",
                JSON.stringify(savedColors)
            );

            renderSavedColors();
        });

        card.append(swatch, title, code, remove);
        container.appendChild(card);
    });
}

document.getElementById("saveColor").addEventListener("click", () => {
    const hex = hexCode.textContent;

    if (savedColors.some(item => item.hex === hex)) {
        alert("Этот цвет уже сохранён!");
        return;
    }

    savedColors.push({
        hex,
        name: mixedName.textContent
    });

    localStorage.setItem("isaqaColors", JSON.stringify(savedColors));

    renderSavedColors();

    alert("❤️ Цвет сохранён!");
});

renderSavedColors();
mixAllColors();

console.log("ISAQA успешно запущен!");

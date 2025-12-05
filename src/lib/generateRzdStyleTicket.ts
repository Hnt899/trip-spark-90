import { PDFDocument, StandardFonts, rgb, PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import type { EpdData } from "@/types/epd";

// Функция для загрузки шрифта с поддержкой кириллицы
async function loadCyrillicFont(pdfDoc: PDFDocument) {
  // Используем локальный шрифт (приоритет) или CDN с поддержкой CORS
  const fontUrls = [
    "/fonts/DejaVuSans.ttf", // Локальный файл (приоритет)
    "https://cdn.jsdelivr.net/npm/dejavu-fonts@2.37/ttf/DejaVuSans.ttf",
  ];

  for (const fontUrl of fontUrls) {
    try {
      console.log(`Попытка загрузить шрифт из: ${fontUrl}`);
      const fontResponse = await fetch(fontUrl);
      if (!fontResponse.ok) {
        console.warn(`HTTP ${fontResponse.status} для ${fontUrl}`);
        continue;
      }
      const fontBytes = await fontResponse.arrayBuffer();
      
      // Проверяем, что файл не пустой
      if (fontBytes.byteLength === 0) {
        console.warn("Файл шрифта пустой, пропускаем");
        continue;
      }
      
      const font = await pdfDoc.embedFont(fontBytes);
      console.log("Шрифт успешно загружен");
      return font;
    } catch (error) {
      console.warn(`Не удалось загрузить шрифт из ${fontUrl}:`, error);
      continue;
    }
  }

  // Если все источники не сработали, используем встроенный (с ограничениями)
  console.warn("Используем встроенный шрифт (кириллица может не отображаться)");
  return await pdfDoc.embedFont(StandardFonts.Helvetica);
}

async function loadCyrillicFontBold(pdfDoc: PDFDocument) {
  const fontUrls = [
    "/fonts/DejaVuSans-Bold.ttf", // Локальный файл (приоритет)
    "https://cdn.jsdelivr.net/npm/dejavu-fonts@2.37/ttf/DejaVuSans-Bold.ttf",
  ];

  for (const fontUrl of fontUrls) {
    try {
      console.log(`Попытка загрузить жирный шрифт из: ${fontUrl}`);
      const fontResponse = await fetch(fontUrl);
      if (!fontResponse.ok) {
        console.warn(`HTTP ${fontResponse.status} для ${fontUrl}`);
        continue;
      }
      const fontBytes = await fontResponse.arrayBuffer();
      
      // Проверяем, что файл не пустой
      if (fontBytes.byteLength === 0) {
        console.warn("Файл шрифта пустой, пропускаем");
        continue;
      }
      
      const font = await pdfDoc.embedFont(fontBytes);
      console.log("Жирный шрифт успешно загружен");
      return font;
    } catch (error) {
      console.warn(`Не удалось загрузить жирный шрифт из ${fontUrl}:`, error);
      continue;
    }
  }

  console.warn("Используем встроенный жирный шрифт (кириллица может не отображаться)");
  return await pdfDoc.embedFont(StandardFonts.HelveticaBold);
}

// Функция для генерации QR кода
async function drawQRCode(
  pdfDoc: PDFDocument,
  page: PDFPage,
  x: number,
  y: number,
  size: number,
  orderNumber: string
) {
  try {
    // Генерируем QR код как Data URL (PNG)
    const qrDataUrl = await QRCode.toDataURL(orderNumber, {
      width: size * 2, // Увеличиваем разрешение для лучшего качества
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Извлекаем base64 данные из Data URL
    const base64Data = qrDataUrl.split(',')[1];
    const binaryString = atob(base64Data);
    const imageBytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      imageBytes[i] = binaryString.charCodeAt(i);
    }

    // Встраиваем PNG изображение в PDF
    const qrImage = await pdfDoc.embedPng(imageBytes);

    // Рисуем QR код
    page.drawImage(qrImage, {
      x: x,
      y: y - size,
      width: size,
      height: size,
    });

    return true;
  } catch (error) {
    console.warn("Ошибка при генерации QR кода:", error);
    return false;
  }
}

export async function generateRzdStyleTicket(epd: EpdData): Promise<string> {
  try {
    console.log("Начинаем создание PDF документа...");
    // Создаём альбомный A4 PDF (842x595 точек)
    const pdfDoc = await PDFDocument.create();
    
    // Регистрируем fontkit для поддержки кастомных шрифтов
    pdfDoc.registerFontkit(fontkit);
    
    const page = pdfDoc.addPage([842, 595]); // Альбомная ориентация A4
    
    // Загружаем шрифты с поддержкой кириллицы
    const font = await loadCyrillicFont(pdfDoc);
    const fontBold = await loadCyrillicFontBold(pdfDoc);
    console.log("PDF документ создан, шрифты загружены");

  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();

  // Синяя рамка сверху слева (ПОЕЗД / ВАГОН / МЕСТО) - сдвинуто ближе к центру на 25%
  const blueBoxX = 22; // Было 30, уменьшено на 25%
  const blueBoxY = pageHeight - 90;
  const blueBoxWidth = 180;
  const blueBoxHeight = 60;

  page.drawRectangle({
    x: blueBoxX,
    y: blueBoxY,
    width: blueBoxWidth,
    height: blueBoxHeight,
    borderColor: rgb(0, 0.4, 0.8),
    borderWidth: 2,
  });

  // Текст в синей рамке - шрифты увеличены в 1.5 раза
  page.drawText("ПОЕЗД", {
    x: blueBoxX + 10,
    y: blueBoxY + 40,
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0.4, 0.8),
  });
  page.drawText(epd.trainNumber, {
    x: blueBoxX + 75,
    y: blueBoxY + 40,
    size: 18, // Было 12, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText("ВАГОН", {
    x: blueBoxX + 10,
    y: blueBoxY + 22,
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0.4, 0.8),
  });
  page.drawText(epd.carriage, {
    x: blueBoxX + 75,
    y: blueBoxY + 22,
    size: 18, // Было 12, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText("МЕСТО", {
    x: blueBoxX + 10,
    y: blueBoxY + 4,
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0.4, 0.8),
  });
  page.drawText(epd.seat, {
    x: blueBoxX + 75,
    y: blueBoxY + 4,
    size: 18, // Было 12, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // Сверху справа: "Электронный билет. Посадочный купон" и номер билета - сдвинуто влево
  const ticketInfoX = pageWidth - 350; // Сдвинуто влево
  const ticketInfoY = pageHeight - 40;

  page.drawText("Электронный билет. Посадочный купон", {
    x: ticketInfoX,
    y: ticketInfoY + 20,
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(`№ ${epd.orderNumber}`, {
    x: ticketInfoX,
    y: ticketInfoY,
    size: 21, // Было 14, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // Левая колонка: время/дата отправления и прибытия с вертикальной линией - сдвинуто ближе к центру на 25%
  const leftColX = 22; // Было 30, уменьшено на 25%
  const timelineX = leftColX + 120; // Позиция линии
  const dateColX = timelineX + 20; // Справа от линии - дата, город и т.д.
  const depY = pageHeight - 250; // Сдвинуто ниже, чтобы не залезало на синюю рамку
  const arrY = depY - 180;
  
  // Координаты для линии (сдвинуты вниз относительно текста)
  const lineDepY = depY - 20; // Линия опущена на 20 пунктов ниже
  const lineArrY = arrY - 20; // Линия опущена на 20 пунктов ниже

  // Вертикальная линия (толще на 40%)
  const lineColor = rgb(0, 0.4, 0.8);
  page.drawLine({
    start: { x: timelineX, y: lineDepY + 10 },
    end: { x: timelineX, y: lineArrY - 10 },
    thickness: 2.8, // Увеличено с 2 до 2.8 (на 40%)
    color: lineColor,
  });

  // Точка отправления
  page.drawCircle({
    x: timelineX,
    y: lineDepY,
    size: 5,
    color: lineColor,
  });

  // Точка прибытия
  page.drawCircle({
    x: timelineX,
    y: lineArrY,
    size: 5,
    color: lineColor,
  });

  // Отправление - ВРЕМЯ СЛЕВА ОТ ЛИНИИ (время и город на одной высоте)
  page.drawText(epd.depTime, {
    x: leftColX,
    y: depY + 5,
    size: 27, // Было 18, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // "Отправление по местному времени" в 3 строчки
  page.drawText("Отправление", {
    x: leftColX,
    y: depY - 20,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText("по местному", {
    x: leftColX,
    y: depY - 38,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText("времени", {
    x: leftColX,
    y: depY - 56,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Парсим дату для получения дня недели
  const depDateObj = new Date(epd.depDate.split('.').reverse().join('-'));
  const depDayOfWeek = depDateObj.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase().slice(0, 2);

  // ДАТА И ГОРОД СПРАВА ОТ ЛИНИИ (время и город на одной высоте)
  page.drawText(epd.depDate, {
    x: dateColX,
    y: depY + 30, // Дата выше времени
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(depDayOfWeek, {
    x: dateColX + 110, // Уменьшено расстояние для меньшего шрифта
    y: depY + 30, // Дата выше времени
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(epd.depCity, {
    x: dateColX,
    y: depY + 5, // Выровнено с временем
    size: 18, // Было 12, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText(epd.depStation, {
    x: dateColX,
    y: depY - 25,
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(epd.depAddress, {
    x: dateColX,
    y: depY - 45,
    size: 12, // Было 8, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Часовой пояс между отправлением и прибытием
  const timezoneY = (depY + arrY) / 2;
  page.drawText(`UTC+${epd.depTz}, МСК`, {
    x: dateColX,
    y: timezoneY + 10,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText("Часовой пояс", {
    x: dateColX,
    y: timezoneY - 6,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Прибытие - ВРЕМЯ СЛЕВА ОТ ЛИНИИ (время и город на одной высоте)
  page.drawText(epd.arrTime, {
    x: leftColX,
    y: arrY + 5,
    size: 27, // Было 18, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // "Прибытие по местному времени" в 3 строчки
  page.drawText("Прибытие", {
    x: leftColX,
    y: arrY - 20,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText("по местному", {
    x: leftColX,
    y: arrY - 38,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText("времени", {
    x: leftColX,
    y: arrY - 56,
    size: 10.5, // Было 7, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const arrDateObj = new Date(epd.arrDate.split('.').reverse().join('-'));
  const arrDayOfWeek = arrDateObj.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase().slice(0, 2);

  // ДАТА И ГОРОД СПРАВА ОТ ЛИНИИ (время и город на одной высоте)
  page.drawText(epd.arrDate, {
    x: dateColX,
    y: arrY + 30, // Дата выше времени
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(arrDayOfWeek, {
    x: dateColX + 110, // Уменьшено расстояние для меньшего шрифта
    y: arrY + 30, // Дата выше времени
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(epd.arrCity, {
    x: dateColX,
    y: arrY + 5, // Выровнено с временем
    size: 18, // Было 12, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText(epd.arrStation, {
    x: dateColX,
    y: arrY - 25,
    size: 15, // Было 10, увеличено в 1.5 раза
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(epd.arrAddress, {
    x: dateColX,
    y: arrY - 45,
    size: 12, // Было 8, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Правая колонка: ФИО пассажира и данные документа - поднято выше
  const rightColX = pageWidth - 280; // Вернули обратно, чтобы не обрезалось
  const rightColY = pageHeight - 120; // Поднято выше (было 180)

  page.drawText("ПАССАЖИР", {
    x: rightColX,
    y: rightColY,
    size: 13.5, // Было 9, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText(epd.passengerFullName, {
    x: rightColX,
    y: rightColY - 30,
    size: 18, // Было 12, увеличено в 1.5 раза
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // Документ с типом
  const documentTypeText = epd.documentType ? `ДОКУМЕНТ (${epd.documentType})` : "ДОКУМЕНТ";
  page.drawText(documentTypeText, {
    x: rightColX,
    y: rightColY - 60,
    size: 13.5, // Было 9, увеличено в 1.5 раза
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Серия и номер документа
  const documentFull = epd.documentSeries && epd.documentNumber 
    ? `${epd.documentSeries} ${epd.documentNumber}`
    : epd.documentSeries || epd.documentNumber || "";
  
  page.drawText(documentFull, {
    x: rightColX,
    y: rightColY - 85,
    size: 16.5, // Было 11, увеличено в 1.5 раза
    font: font,
    color: rgb(0, 0, 0),
  });

  // Дата рождения (без РФ)
  page.drawText(epd.birthDate || "", {
    x: rightColX,
    y: rightColY - 110,
    size: 13.5, // Было 9, увеличено в 1.5 раза
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  // QR код
  const qrX = rightColX;
  const qrY = rightColY - 140;
  const qrSize = 150; // Увеличено в 1.5 раза (было 100)

  const qrSuccess = await drawQRCode(pdfDoc, page, qrX, qrY, qrSize, epd.orderNumber);
  
  // Если QR код не сгенерировался, рисуем номер заказа
  if (!qrSuccess) {
    page.drawText(epd.orderNumber, {
      x: qrX,
      y: qrY - qrSize - 10,
      size: 15, // Было 10, увеличено в 1.5 раза
      font: font,
      color: rgb(0, 0, 0),
    });
  } else {
    // Номер заказа под QR кодом
    page.drawText(epd.orderNumber, {
      x: qrX + qrSize / 2 - (epd.orderNumber.length * 4.5), // Уменьшено для меньшего шрифта
      y: qrY - qrSize - 12,
      size: 12, // Было 8, увеличено в 1.5 раза
      font: font,
      color: rgb(0, 0, 0),
    });
  }

  // Информационный текст под QR кодом
  const infoY = qrY - qrSize - 40;
  const infoText = epd.infoText || 
    "Вы зарегистрированы на рейс. Билет можно распечатать или показать на экране мобильного устройства. При посадке предъявите проводнику документ, удостоверяющий личность.";

  page.drawText(infoText, {
    x: rightColX,
    y: infoY,
    size: 12, // Было 8, увеличено в 1.5 раза
    font: font,
    color: rgb(0.4, 0.4, 0.4),
    maxWidth: 250, // Вернули обратно для меньшего шрифта
  });

    // Генерируем PDF и возвращаем blob URL
    console.log("Сохраняем PDF...");
    const pdfBytes = await pdfDoc.save();
    console.log("PDF сохранен, размер:", pdfBytes.length, "байт");
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    console.log("Blob URL создан:", url);
    return url;
  } catch (error) {
    console.error("Ошибка при генерации PDF билета:", error);
    throw error;
  }
}


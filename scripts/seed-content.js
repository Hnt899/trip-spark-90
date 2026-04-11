/**
 * Переносит захардкоженные статьи блога и маршруты в PostgreSQL.
 * Копирует обложки из src/assets/ → uploads/ и вставляет записи в БД.
 *
 * Запуск:  node scripts/seed-content.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../server/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const UPLOAD_DIR = path.resolve(ROOT, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

function copyAsset(relPath) {
  const src = path.resolve(ROOT, "src", relPath);
  if (!fs.existsSync(src)) {
    console.warn(`  [skip] файл не найден: ${relPath}`);
    return null;
  }
  const ext = path.extname(src).toLowerCase();
  const safeName = path
    .basename(relPath)
    .replace(/\s+/g, "-")
    .toLowerCase();
  const dest = path.join(UPLOAD_DIR, safeName);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`  [copy] ${relPath} → uploads/${safeName}`);
  }
  return `/uploads/${safeName}`;
}

// ─── Blog articles (18 шт) ─────────────────────────────────────────

const blogArticles = [
  {
    slug: "kak-nayti-deshevye-bilety-na-poezd",
    title: "Как искать выгодные ж/д билеты без лишних кликов",
    excerpt: "Собрали практичные приёмы: гибкие даты, альтернативные станции и уведомления о цене.",
    cover: "assets/images/transport/train-interior.jpg",
    publishedAt: "2026-03-28T10:00:00.000Z",
    readingMinutes: 6,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["trains", "lifehacks", "budget", "instructions"],
    editorsPick: true, partnerCarousel: false, sponsoredGrid: false, views: 12400,
  },
  {
    slug: "moskva-peterburg-pervyy-raz",
    title: "Москва — Петербург первый раз: что знать до поездки",
    excerpt: "Сапсаны, вокзалы и короткая памятка для тех, кто едет по золотому маршруту впервые.",
    cover: "assets/images/transport/сапсан.jpeg",
    publishedAt: "2026-03-22T09:00:00.000Z",
    readingMinutes: 8,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["trains", "russia", "destinations", "instructions"],
    editorsPick: true, partnerCarousel: false, sponsoredGrid: false, views: 9800,
  },
  {
    slug: "semeynyy-otdyh-na-baikale",
    title: "Семейный отдых у Байкала: сезоны и логистика",
    excerpt: "Когда ехать, как добираться и чем заняться с детьми — без перегруза программой.",
    cover: "assets/images/routes/байкал1.jpg",
    publishedAt: "2026-03-15T11:30:00.000Z",
    readingMinutes: 10,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["family", "russia", "eco", "destinations"],
    editorsPick: true, partnerCarousel: false, sponsoredGrid: false, views: 7600,
  },
  {
    slug: "avtobusy-mezhdu-gorodami-2026",
    title: "Междугородние автобусы: как читать расписание и багаж",
    excerpt: "Разбираем нюансы посадки, перевозки сумок и возврата на примере популярных направлений.",
    cover: "assets/images/features/маршруты.png",
    publishedAt: "2026-03-10T08:00:00.000Z",
    readingMinutes: 7,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["buses", "instructions", "lifehacks"],
    editorsPick: true, partnerCarousel: false, sponsoredGrid: false, views: 5100,
  },
  {
    slug: "novyy-interfeys-poiska",
    title: "Обновили поиск: быстрее подбор и понятные фильтры",
    excerpt: "Что изменилось на главной в поиске билетов и как пользоваться новыми подсказками.",
    cover: "assets/images/features/интерфейс.png",
    publishedAt: "2026-04-01T12:00:00.000Z",
    readingMinutes: 4,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["service-news", "about-service", "instructions"],
    editorsPick: true, partnerCarousel: false, sponsoredGrid: false, views: 3200,
  },
  {
    slug: "partner-strahovka-v-poezdku",
    title: "Страховка в поездку: на что смотреть в полисе",
    excerpt: "Партнёрский материал: какие риски закрывает страховка и как оформить онлайн до вылета.",
    cover: "assets/images/features/инфаструктура.png",
    publishedAt: "2026-03-30T14:00:00.000Z",
    readingMinutes: 5,
    badges: ["partner"], channel: "partners",
    tagIds: ["flights", "trains", "visas", "instructions"],
    editorsPick: false, partnerCarousel: true, sponsoredGrid: false, views: 8900,
  },
  {
    slug: "partner-otelnyy-servis",
    title: "Как выбрать отель у вокзала: советы от сети партнёров",
    excerpt: "Ночёвка рядом с ж/д узлом — критерии, отзывы и бронирование без сюрпризов.",
    cover: "assets/images/cities/moscow.jpg",
    publishedAt: "2026-03-25T10:00:00.000Z",
    readingMinutes: 6,
    badges: ["partner"], channel: "partners",
    tagIds: ["hotels", "trains", "lifehacks"],
    editorsPick: false, partnerCarousel: true, sponsoredGrid: false, views: 4500,
  },
  {
    slug: "partner-keshbek-na-aviabilety",
    title: "Кешбэк и мили на авиабилеты: сравниваем программы",
    excerpt: "Обзор от финансового партнёра: карты и программы лояльности для путешественников.",
    cover: "assets/images/features/скидка.png",
    publishedAt: "2026-03-18T16:00:00.000Z",
    readingMinutes: 9,
    badges: ["partner"], channel: "partners",
    tagIds: ["flights", "budget", "lifehacks"],
    editorsPick: false, partnerCarousel: true, sponsoredGrid: false, views: 11200,
  },
  {
    slug: "partner-ekskursii-kaliningrad",
    title: "Калининград за три дня: маршрут от гида-партнёра",
    excerpt: "Куршская коса, замки и город без лишней суеты — готовый план на выходные.",
    cover: "assets/images/routes/калиниград 1.jpg",
    publishedAt: "2026-03-12T11:00:00.000Z",
    readingMinutes: 12,
    badges: ["partner"], channel: "partners",
    tagIds: ["destinations", "russia", "europe"],
    editorsPick: false, partnerCarousel: true, sponsoredGrid: false, views: 6700,
  },
  {
    slug: "partner-vladivostok-dalniy-vostok",
    title: "Владивосток и Дальний Восток: логистика и сезоны",
    excerpt: "Партнёрский гид: перелёты, паромы и локальные лайфхаки для длинной поездки.",
    cover: "assets/images/routes/владивосток 1.jpg",
    publishedAt: "2026-03-08T09:30:00.000Z",
    readingMinutes: 11,
    badges: ["partner"], channel: "partners",
    tagIds: ["flights", "russia", "asia", "destinations"],
    editorsPick: false, partnerCarousel: true, sponsoredGrid: false, views: 5400,
  },
  {
    slug: "spec-gornolyzhnyy-kurort-zima",
    title: "Зимний курорт: пакеты «перелёт + отель + трансфер»",
    excerpt: "Спецпроект: акции раннего бронирования и что входит в предложение от оператора.",
    cover: "assets/images/cities/karelia.jpg",
    publishedAt: "2026-03-27T10:00:00.000Z",
    readingMinutes: 5,
    badges: ["ad", "partner"], channel: "special",
    tagIds: ["ski", "hotels", "flights"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: true, views: 2100,
  },
  {
    slug: "spec-turtsiya-letnie-tury",
    title: "Турция летом: чартеры и отели на берегу",
    excerpt: "Рекламный материал туроператора: направления, даты и условия бронирования.",
    cover: "assets/images/hero/hero-train.jpg",
    publishedAt: "2026-03-20T13:00:00.000Z",
    readingMinutes: 6,
    badges: ["ad"], channel: "special",
    tagIds: ["turkey", "hotels", "flights", "family"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: true, views: 4800,
  },
  {
    slug: "spec-aziya-aviakompaniya",
    title: "Азия: прямые рейсы и бонусная программа авиакомпании",
    excerpt: "Спецпроект перевозчика: маршрутная сеть и накопление миль на рейсах из России.",
    cover: "assets/images/cities/saint-petersburg.jpg",
    publishedAt: "2026-03-05T15:00:00.000Z",
    readingMinutes: 7,
    badges: ["ad"], channel: "special",
    tagIds: ["asia", "flights"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: true, views: 3600,
  },
  {
    slug: "solo-poezdka-v-kazan",
    title: "Соло-трип в Казань: безопасность и идеи маршрута",
    excerpt: "Компактный план на 48 часов: музеи, улица Баумана и общественный транспорт.",
    cover: "assets/images/cities/kazan.jpg",
    publishedAt: "2026-02-28T10:00:00.000Z",
    readingMinutes: 8,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["solo", "russia", "trains", "destinations"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: false, views: 6200,
  },
  {
    slug: "viza-shengen-kratko",
    title: "Шенген кратко: сроки и пакет документов",
    excerpt: "Чек-лист для самостоятельной подачи: справки, страховка, брони отелей.",
    cover: "assets/images/cities/novgorod.jpg",
    publishedAt: "2026-02-20T09:00:00.000Z",
    readingMinutes: 9,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["visas", "europe", "instructions"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: false, views: 15000,
  },
  {
    slug: "loyalnost-i-skidki",
    title: "Программа лояльности TudaSuda: как копить и тратить бонусы",
    excerpt: "Обновления правил начисления и партнёрские предложения для постоянных путешественников.",
    cover: "assets/images/features/лояльность.png",
    publishedAt: "2026-03-29T08:00:00.000Z",
    readingMinutes: 5,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["service-news", "about-service", "budget"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: false, views: 4100,
  },
  {
    slug: "rossiya-poezdki-po-regionam",
    title: "По России на поезде: регионы, где особенно удобно ехать рельсами",
    excerpt: "От Карелии до Урала — направления с хорошей доступностью и видами из окна.",
    cover: "assets/images/features/россия м.png",
    publishedAt: "2026-02-10T12:00:00.000Z",
    readingMinutes: 11,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["trains", "russia", "destinations", "eco"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: false, views: 7300,
  },
  {
    slug: "sotrudnichestvo-dlya-blogerov",
    title: "Партнёрская программа для авторов и медиа",
    excerpt: "Как подключиться к TudaSuda: форматы интеграций и требования к контенту.",
    cover: "assets/images/features/приложение.png",
    publishedAt: "2026-01-15T10:00:00.000Z",
    readingMinutes: 4,
    badges: ["own"], channel: "tudasuda",
    tagIds: ["for-partners", "about-service"],
    editorsPick: false, partnerCarousel: false, sponsoredGrid: false, views: 2800,
  },
];

// ─── Routes (40 шт) ────────────────────────────────────────────────

const imageMap = {
  karelia:  "assets/images/cities/karelia.jpg",
  moscow:   "assets/images/cities/moscow.jpg",
  spb:      "assets/images/cities/saint-petersburg.jpg",
  kazan:    "assets/images/cities/kazan.jpg",
  novgorod: "assets/images/cities/novgorod.jpg",
  armenia:  "assets/images/cities/armenia.jpg",
  china:    "assets/images/cities/china.jpg",
  heroTrain:"assets/images/hero/hero-train.jpg",
};

const routePages = [
  { legacyId: "1",  slug: "vladimirskaya-oblast",         name: "Владимирская область",              rating: 8.2,  img: "karelia",  region: "Центр" },
  { legacyId: "2",  slug: "voronezhskaya-oblast",         name: "Воронежская область",               rating: 9.5,  img: "moscow",   region: "Центр" },
  { legacyId: "3",  slug: "zaraysk-i-kolomna",            name: "Зарайск и Коломна",                 rating: 8.5,  img: "spb",      region: "Центр" },
  { legacyId: "5",  slug: "ivanovskaya-oblast-1",         name: "Ивановская область, маршрут №1",    rating: 8.6,  img: "novgorod", region: "Центр" },
  { legacyId: "6",  slug: "ivanovskaya-oblast-2",         name: "Ивановская область, маршрут №2",    rating: 9.5,  img: "armenia",  region: "Центр" },
  { legacyId: "7",  slug: "kaliningradskaya-oblast-1",    name: "Калининградская область, маршрут №1",rating: 9.3, img: "china",    region: "Северо-Запад" },
  { legacyId: "8",  slug: "kaliningradskaya-oblast-4",    name: "Калининградская область, маршрут №4",rating: 9.0, img: "heroTrain",region: "Северо-Запад" },
  { legacyId: "10", slug: "murmanskaya-oblast-1",         name: "Мурманская область, маршрут №1",    rating: 9.3,  img: "moscow",   region: "Северо-Запад" },
  { legacyId: "11", slug: "murmanskaya-oblast-2",         name: "Мурманская область, маршрут №2",    rating: 9.8,  img: "spb",      region: "Северо-Запад" },
  { legacyId: "13", slug: "arkhangelskaya-oblast",        name: "Архангельская область",             rating: 9.3,  img: "karelia",  region: "Северо-Запад" },
  { legacyId: "9",  slug: "krasnodarskiy-kray",           name: "Краснодарский край",                rating: 10,   img: "karelia",  region: "Юг" },
  { legacyId: "14", slug: "rostov-na-donu",               name: "Ростов-на-Дону",                    rating: 9.1,  img: "moscow",   region: "Юг" },
  { legacyId: "15", slug: "krym",                         name: "Крым",                              rating: 9.7,  img: "spb",      region: "Юг" },
  { legacyId: "16", slug: "stavropolskiy-kray",           name: "Ставропольский край",               rating: 8.8,  img: "kazan",    region: "Юг" },
  { legacyId: "17", slug: "sochi-i-okrestnosti",          name: "Сочи и окрестности",                rating: 9.6,  img: "novgorod", region: "Юг" },
  { legacyId: "18", slug: "kazan",                        name: "Казань",                            rating: 9.4,  img: "kazan",    region: "Поволжье" },
  { legacyId: "19", slug: "samara",                       name: "Самара",                            rating: 8.7,  img: "armenia",  region: "Поволжье" },
  { legacyId: "20", slug: "nizhniy-novgorod",             name: "Нижний Новгород",                   rating: 9.2,  img: "china",    region: "Поволжье" },
  { legacyId: "21", slug: "volgograd",                    name: "Волгоград",                         rating: 8.9,  img: "heroTrain",region: "Поволжье" },
  { legacyId: "22", slug: "velikiy-volzhskiy-put",        name: "Великий Волжский путь",             rating: 9.7,  img: "karelia",  region: "Поволжье" },
  { legacyId: "4",  slug: "ekaterinburg",                 name: "Екатеринбург",                      rating: 8.9,  img: "kazan",    region: "Урал" },
  { legacyId: "23", slug: "chelyabinsk",                  name: "Челябинск",                         rating: 8.4,  img: "moscow",   region: "Урал" },
  { legacyId: "24", slug: "perm",                         name: "Пермь",                             rating: 8.6,  img: "spb",      region: "Урал" },
  { legacyId: "25", slug: "tyumen",                       name: "Тюмень",                            rating: 9.0,  img: "kazan",    region: "Урал" },
  { legacyId: "26", slug: "khmao-yugra",                  name: "ХМАО - Югра",                       rating: 9.9,  img: "novgorod", region: "Урал" },
  { legacyId: "12", slug: "novosibirskaya-oblast",        name: "Новосибирская область",             rating: 7.4,  img: "kazan",    region: "Сибирь" },
  { legacyId: "27", slug: "krasnoyarsk",                  name: "Красноярск",                        rating: 8.8,  img: "armenia",  region: "Сибирь" },
  { legacyId: "28", slug: "irkutsk-i-baykal",             name: "Иркутск и Байкал",                  rating: 9.8,  img: "china",    region: "Сибирь" },
  { legacyId: "29", slug: "altayskiy-kray",               name: "Алтайский край",                    rating: 9.7,  img: "heroTrain",region: "Сибирь" },
  { legacyId: "30", slug: "tomsk",                        name: "Томск",                             rating: 8.5,  img: "karelia",  region: "Сибирь" },
  { legacyId: "31", slug: "dagestan",                     name: "Дагестан",                          rating: 9.3,  img: "moscow",   region: "Кавказ" },
  { legacyId: "32", slug: "karachaevo-cherkesiya",        name: "Карачаево-Черкесия",                rating: 9.1,  img: "spb",      region: "Кавказ" },
  { legacyId: "33", slug: "kabardino-balkariya",          name: "Кабардино-Балкария",                rating: 9.5,  img: "kazan",    region: "Кавказ" },
  { legacyId: "34", slug: "osetiya",                      name: "Осетия",                            rating: 9.0,  img: "novgorod", region: "Кавказ" },
  { legacyId: "35", slug: "chechnya",                     name: "Чечня",                             rating: 9.2,  img: "armenia",  region: "Кавказ" },
  { legacyId: "36", slug: "vladivostok-i-okrestnosti",    name: "Владивосток и окрестности",         rating: 10,   img: "china",    region: "Дальний Восток" },
  { legacyId: "37", slug: "khabarovsk",                   name: "Хабаровск",                         rating: 8.9,  img: "heroTrain",region: "Дальний Восток" },
  { legacyId: "38", slug: "kamchatka",                    name: "Камчатка",                          rating: 9.8,  img: "karelia",  region: "Дальний Восток" },
  { legacyId: "39", slug: "sakhalin",                     name: "Сахалин",                           rating: 9.4,  img: "moscow",   region: "Дальний Восток" },
  { legacyId: "40", slug: "yakutiya",                     name: "Якутия",                            rating: 9.6,  img: "spb",      region: "Дальний Восток" },
];

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  console.log("=== Seed: копирование обложек ===\n");

  const coverCache = new Map();
  function resolveCover(assetRel) {
    if (!assetRel) return null;
    if (coverCache.has(assetRel)) return coverCache.get(assetRel);
    const url = copyAsset(assetRel);
    coverCache.set(assetRel, url);
    return url;
  }

  // ─── Blog ───
  console.log("\n=== Seed: блог (18 статей) ===\n");
  let blogInserted = 0;
  for (const a of blogArticles) {
    const exists = await pool.query(
      `SELECT 1 FROM blog_posts WHERE slug = $1`,
      [a.slug],
    );
    if (exists.rows.length) {
      console.log(`  [exists] ${a.slug}`);
      continue;
    }
    const coverUrl = resolveCover(a.cover);
    const blocks = [{ type: "paragraph", text: a.excerpt }];
    await pool.query(
      `INSERT INTO blog_posts (
        slug, title, excerpt, cover_image_url, content_blocks,
        status, published_at, reading_minutes, badges, channel,
        tag_ids, editors_pick, partner_carousel, sponsored_grid, views
      ) VALUES ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::text[],$10,$11::text[],$12,$13,$14,$15)`,
      [
        a.slug,
        a.title,
        a.excerpt,
        coverUrl,
        JSON.stringify(blocks),
        "published",
        a.publishedAt,
        a.readingMinutes,
        a.badges,
        a.channel,
        a.tagIds,
        a.editorsPick,
        a.partnerCarousel,
        a.sponsoredGrid,
        a.views,
      ],
    );
    blogInserted++;
    console.log(`  [insert] ${a.slug}`);
  }
  console.log(`\nБлог: вставлено ${blogInserted} из ${blogArticles.length}`);

  // ─── Routes ───
  console.log("\n=== Seed: маршруты (40 шт) ===\n");
  let routeInserted = 0;
  for (const r of routePages) {
    const exists = await pool.query(
      `SELECT 1 FROM route_pages WHERE slug = $1 OR legacy_id = $2`,
      [r.slug, r.legacyId],
    );
    if (exists.rows.length) {
      console.log(`  [exists] ${r.slug} (#${r.legacyId})`);
      continue;
    }
    const coverUrl = resolveCover(imageMap[r.img]);
    await pool.query(
      `INSERT INTO route_pages (
        slug, name, legacy_id, region, rating, cover_image_url,
        excerpt, content_blocks, status, published_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10)`,
      [
        r.slug,
        r.name,
        r.legacyId,
        r.region,
        r.rating,
        coverUrl,
        "",
        JSON.stringify([]),
        "published",
        new Date().toISOString(),
      ],
    );
    routeInserted++;
    console.log(`  [insert] ${r.slug} (#${r.legacyId})`);
  }
  console.log(`\nМаршруты: вставлено ${routeInserted} из ${routePages.length}`);

  console.log("\n=== Готово! ===");
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

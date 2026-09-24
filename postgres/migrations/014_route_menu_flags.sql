-- Флаги управления выпадающим меню "Маршруты" в шапке сайта.
-- show_in_menu = true  → маршрут показывается в dropdown-меню шапки
-- menu_order           → порядок сортировки внутри меню (меньше = выше)

ALTER TABLE route_pages
  ADD COLUMN IF NOT EXISTS show_in_menu BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS menu_order  INT     NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_route_pages_menu
  ON route_pages(show_in_menu, menu_order, name)
  WHERE show_in_menu = true;
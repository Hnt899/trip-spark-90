ALTER TABLE reference_sections
  ADD COLUMN IF NOT EXISTS moved_from_parent_id UUID
  REFERENCES reference_sections(id) ON DELETE SET NULL;

-- Restore sections moved to top-level back under the default kind root
-- (needed for items moved before the "return back" feature).
UPDATE reference_sections
SET
  parent_id = (
    SELECT r.id
    FROM reference_sections r
    WHERE r.kind = 'trains'
      AND r.parent_id IS NULL
      AND r.slug = 'trains'
    LIMIT 1
  ),
  moved_from_parent_id = NULL,
  updated_at = NOW()
WHERE kind = 'trains'
  AND parent_id IS NULL
  AND slug IN ('o-poezdah', 'poleznye-stati');

UPDATE reference_sections
SET
  parent_id = (
    SELECT r.id
    FROM reference_sections r
    WHERE r.kind = 'flights'
      AND r.parent_id IS NULL
      AND r.slug = 'flights'
    LIMIT 1
  ),
  moved_from_parent_id = NULL,
  updated_at = NOW()
WHERE kind = 'flights'
  AND parent_id IS NULL
  AND slug IN ('voprosy-posle-pokupki');


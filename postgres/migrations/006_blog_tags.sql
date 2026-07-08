CREATE TABLE IF NOT EXISTS blog_tag_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_tag_groups_sort
  ON blog_tag_groups(sort_order, name);

DROP TRIGGER IF EXISTS update_blog_tag_groups_updated_at ON blog_tag_groups;
CREATE TRIGGER update_blog_tag_groups_updated_at
  BEFORE UPDATE ON blog_tag_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_tags_name ON blog_tags(name);

DROP TRIGGER IF EXISTS update_blog_tags_updated_at ON blog_tags;
CREATE TRIGGER update_blog_tags_updated_at
  BEFORE UPDATE ON blog_tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS blog_tag_group_links (
  tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES blog_tag_groups(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (tag_id, group_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_tag_group_links_group
  ON blog_tag_group_links(group_id, tag_id);

CREATE TABLE products (
 id BIGSERIAL,
 campus TEXT NOT NULL,
 name TEXT NOT NULL,
 slogan TEXT,
 description TEXT,
 default_price TEXT NOT NULL,
 category_id INTEGER,
 PRIMARY KEY (id)
);

CREATE TABLE categories (
 id BIGSERIAL,
 name TEXT NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE features (
 id BIGSERIAL,
 products_id INTEGER NOT NULL,
 feature TEXT,
 description TEXT,
 PRIMARY KEY (id)
);

CREATE TABLE styles (
 id BIGSERIAL,
 products_id INTEGER NOT NULL,
 name TEXT NOT NULL,
 original_price TEXT NOT NULL,
 sale_price TEXT NOT NULL,
 default_product BOOLEAN NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE photos (
 id BIGSERIAL,
 styles_id INTEGER NOT NULL,
 thumbnail_url TEXT,
 full_url TEXT,
 PRIMARY KEY (id)
);

CREATE TABLE skus (
 id BIGSERIAL,
 styles_id INTEGER NOT NULL,
 style_size TEXT NOT NULL,
 quantity INTEGER NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE related (
 id BIGSERIAL,
 product_id INTEGER NOT NULL,
 related_product_id INTEGER NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE cart (
  id BIGSERIAL,
  user_session INTEGER NOT NULL,
  sku_id INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE products ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id);
ALTER TABLE features ADD CONSTRAINT features_products_id_fkey FOREIGN KEY (products_id) REFERENCES products(id);
ALTER TABLE styles ADD CONSTRAINT styles_products_id_fkey FOREIGN KEY (products_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_styles_id_fkey FOREIGN KEY (styles_id) REFERENCES styles(id);
ALTER TABLE skus ADD CONSTRAINT skus_styles_id_fkey FOREIGN KEY (styles_id) REFERENCES styles(id);
ALTER TABLE related ADD CONSTRAINT related_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE related ADD CONSTRAINT related_related_product_id_fkey FOREIGN KEY (related_product_id) REFERENCES products(id);
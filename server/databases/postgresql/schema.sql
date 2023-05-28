DROP TABLE IF EXISTS related CASCADE ;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
 id SERIAL,
 name TEXT NOT NULL,
 slogan TEXT,
 description TEXT,
 category TEXT,
 default_price TEXT NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE features (
 id SERIAL,
 product_id INTEGER NOT NULL,
 feature TEXT,
 value TEXT,
 PRIMARY KEY (id)
);

CREATE TABLE styles (
 id SERIAL,
 product_id INTEGER NOT NULL,
 name TEXT NOT NULL,
 sale_price TEXT NOT NULL,
 original_price TEXT NOT NULL,
 default_style BOOLEAN NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE photos (
 id SERIAL,
 style_id INTEGER NOT NULL,
 url TEXT,
 thumbnail_url TEXT,
 PRIMARY KEY (id)
);

CREATE TABLE skus (
 id SERIAL,
 style_id INTEGER NOT NULL,
 size TEXT NOT NULL,
 quantity INTEGER NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE related (
 id SERIAL,
 current_product_id INTEGER NOT NULL,
 related_product_id INTEGER NOT NULL,
 PRIMARY KEY (id)
);

ALTER TABLE features ADD CONSTRAINT features_products_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE styles ADD CONSTRAINT styles_products_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_styles_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE skus ADD CONSTRAINT skus_styles_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE related ADD CONSTRAINT related_current_product_id_fkey FOREIGN KEY (current_product_id) REFERENCES products(id);
ALTER TABLE related ADD CONSTRAINT related_related_product_id_fkey FOREIGN KEY (related_product_id) REFERENCES products(id);

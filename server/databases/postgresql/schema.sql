DROP TABLE IF EXISTS related CASCADE ;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
 id BIGSERIAL,
 name TEXT NOT NULL,
 slogan TEXT,
 description TEXT,
 category TEXT,
 default_price TEXT NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE features (
 id BIGSERIAL,
 product_id INTEGER NOT NULL,
 feature TEXT,
 value TEXT,
 PRIMARY KEY (id)
);

CREATE TABLE styles (
 id BIGSERIAL,
 product_id INTEGER NOT NULL,
 name TEXT NOT NULL,
 sale_price TEXT NOT NULL,
 original_price TEXT NOT NULL,
 default_style BOOLEAN NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE photos (
 id BIGSERIAL,
 style_id INTEGER NOT NULL,
 url TEXT,
 thumbnail_url TEXT,
 PRIMARY KEY (id)
);

CREATE TABLE skus (
 id BIGSERIAL,
 style_id INTEGER NOT NULL,
 size TEXT NOT NULL,
 quantity INTEGER NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE related (
 id BIGSERIAL,
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

\COPY products FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/product.csv' DELIMITER ',' CSV HEADER;
\COPY features FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/features.csv' DELIMITER ',' CSV HEADER;
\COPY styles FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/styles.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/photos.csv' DELIMITER ',' CSV HEADER;
\COPY skus FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/skus.csv' DELIMITER ',' CSV HEADER;
\COPY related FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/related.csv' DELIMITER ',' CSV HEADER WHERE related_product_id > 0;

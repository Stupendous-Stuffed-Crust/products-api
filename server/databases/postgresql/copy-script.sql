\COPY products FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/product.csv' DELIMITER ',' CSV HEADER;
\COPY features FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/features.csv' DELIMITER ',' CSV HEADER;
\COPY styles FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/styles.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/photos-fixed.csv' DELIMITER ',' CSV HEADER;
\COPY skus FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/skus.csv' DELIMITER ',' CSV HEADER;
\COPY related FROM '/home/davidguy/Documents/hack-reactor/SDC/products-api/csv-files/related.csv' DELIMITER ',' CSV HEADER WHERE related_product_id > 0;
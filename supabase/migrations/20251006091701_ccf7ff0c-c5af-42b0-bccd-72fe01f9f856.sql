-- Update all product image paths to remove '/src' prefix
UPDATE public.products
SET image = REPLACE(image, '/src/assets/', '/assets/')
WHERE image LIKE '/src/assets/%';
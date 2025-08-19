-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  bestseller BOOLEAN DEFAULT false,
  discount INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table for persistent cart storage
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policies for cart_items (users can manage their own cart)
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items 
FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- Create policies for orders (users can view their own orders)
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Create policies for order_items (users can view items from their own orders)
CREATE POLICY "Users can view their own order items" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id::text = auth.uid()::text
  )
);

CREATE POLICY "Users can create order items for their own orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id::text = auth.uid()::text
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products data
INSERT INTO public.products (name, description, price, image, category, bestseller, discount) VALUES
('Chocolate Bliss Cake', 'Rich chocolate layers with premium ganache frosting and decorative chocolate curls. Perfect for celebrations.', 45.99, '/src/assets/chocolate-cake.jpg', 'Cake', true, 0),
('Vanilla Dream Cupcakes', 'Fluffy vanilla cupcakes topped with swirled buttercream frosting in pastel colors. Sold as a set of 6.', 24.99, '/src/assets/cupcakes.jpg', 'Cupcakes', true, 0),
('Blueberry Morning Muffins', 'Fresh-baked muffins bursting with juicy blueberries and a golden brown top. Perfect for breakfast.', 18.99, '/src/assets/muffins.jpg', 'Muffin', true, 0),
('Fudgy Chocolate Brownies', 'Decadent brownies with a fudgy texture, topped with chopped walnuts and a light dusting of powdered sugar.', 22.99, '/src/assets/brownies.jpg', 'Brownie', true, 15),
('French Pastry Selection', 'Assorted French pastries including croissants, pain au chocolat, and éclairs. A taste of Paris in every bite.', 32.99, '/src/assets/pastries.jpg', 'Pastry', false, 0),
('Healthy Oat Granola Bars', 'Wholesome granola bars made with organic oats, dried berries, and nuts. A guilt-free sweet treat.', 16.99, '/src/assets/healthy-treats.jpg', 'Healthy', false, 0),
('Red Velvet Cupcakes', 'Classic red velvet cupcakes with cream cheese frosting and a hint of cocoa. Rich and indulgent.', 26.99, '/src/assets/cupcakes.jpg', 'Cupcakes', false, 0),
('Lemon Poppy Seed Muffins', 'Bright and citrusy muffins with poppy seeds and a sweet lemon glaze. Light and refreshing.', 19.99, '/src/assets/muffins.jpg', 'Muffin', false, 0),
('Triple Layer Carrot Cake', 'Moist carrot cake with cream cheese frosting, crushed walnuts, and a touch of cinnamon spice.', 42.99, '/src/assets/chocolate-cake.jpg', 'Cake', false, 10),
('Almond Croissants', 'Buttery croissants filled with sweet almond paste and topped with sliced almonds and powdered sugar.', 28.99, '/src/assets/pastries.jpg', 'Pastry', false, 0),
('Double Chocolate Brownies', 'Extra chocolatey brownies with chocolate chips baked right in. For the ultimate chocolate lover.', 24.99, '/src/assets/brownies.jpg', 'Brownie', false, 0),
('Energy Protein Balls', 'No-bake protein balls made with dates, nuts, and dark chocolate. Perfect post-workout treat.', 14.99, '/src/assets/healthy-treats.jpg', 'Healthy', false, 0);
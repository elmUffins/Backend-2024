
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.pedidos (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha date NOT NULL,
    estado character varying(25) NOT NULL
);


ALTER TABLE public.pedidos OWNER TO "BurgerTIC_owner";

CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_id_seq OWNER TO "BurgerTIC_owner";

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


CREATE TABLE public.pedidos_platos (
    id integer NOT NULL,
    id_pedido integer NOT NULL,
    id_plato integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.pedidos_platos OWNER TO "BurgerTIC_owner";

CREATE SEQUENCE public.pedidos_platos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_platos_id_seq OWNER TO "BurgerTIC_owner";

ALTER SEQUENCE public.pedidos_platos_id_seq OWNED BY public.pedidos_platos.id;


CREATE TABLE public.platos (
    id integer NOT NULL,
    tipo character varying(15) NOT NULL,
    nombre character varying(60) NOT NULL,
    precio integer NOT NULL,
    descripcion text
);


ALTER TABLE public.platos OWNER TO "BurgerTIC_owner";

CREATE SEQUENCE public.platos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.platos_id_seq OWNER TO "BurgerTIC_owner";

ALTER SEQUENCE public.platos_id_seq OWNED BY public.platos.id;


CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    apellido character varying(60) NOT NULL,
    email character varying(256) NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.usuarios OWNER TO "BurgerTIC_owner";

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO "BurgerTIC_owner";

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


ALTER TABLE ONLY public.pedidos_platos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_platos_id_seq'::regclass);


ALTER TABLE ONLY public.platos ALTER COLUMN id SET DEFAULT nextval('public.platos_id_seq'::regclass);


ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.pedidos_platos
    ADD CONSTRAINT pedidos_platos_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.platos
    ADD CONSTRAINT platos_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON UPDATE RESTRICT ON DELETE CASCADE;


ALTER TABLE ONLY public.pedidos_platos
    ADD CONSTRAINT pedidos_platos_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id) ON UPDATE RESTRICT ON DELETE CASCADE;


ALTER TABLE ONLY public.pedidos_platos
    ADD CONSTRAINT pedidos_platos_id_plato_fkey FOREIGN KEY (id_plato) REFERENCES public.platos(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


INSERT INTO public.platos (tipo, nombre, precio, descripcion) VALUES
('combo', 'Combo Ivo', 3000, 'Un sandwich de gallina, con papas y gaseosa. Si venis con 12 amigos te cobramos la mitad + 1'),
('combo', 'Combo Chona', 3100, 'Una FigmaBurger, con papas y gaseosa. Si queres una hamburguesa estética para subir a Instagram, esta es la tuya'),
('combo', 'Combo Aro y Ranzo', 4500, 'Una P.H.P. y un Em-Paty-Zando con 2 gaseosas y 2 porciones de papas. Ideal para compartir con tu pareja'),
('combo', 'Combo M.E.P.', 5000, 'Milanesa gigante, 3 empanadas y papas. Laburar? No, veni a compartir este combo con tus amigos y disfruta del tiempo libre'),
('combo', 'Combo Nacho', 3500, 'Un SQL, nachos con guacamole, gaseosa y de postre un vigilante. Si haces bien la request, te llega al instante'),
('combo', 'Combo Jero', 3100, 'Una milanesa Blender, bolsa de 3Ds y gaseosa. No se juega con la comida, pero podes jugar videojuegos mientras comes este combo'),
('combo', 'Combo Daro', 2900, 'Una hamburguesa eléctrica con pocas papas y un vaso de gaseosa, el dólar está muy alto y no nos aceptan más presupuesto. Nosotros los preparamos pero vos andá a buscarlo. Si no lo encontras, no hay reembolso'),
('combo', 'Menu Infantil Luca', 3500, 'Una caja de 10 nuggets y gaseosa. Para los más chicos de la casa, o para los que tengan muchos rulos'),
('principal', 'FigmaBurger', 2000, 'Hamburguesa de carne, con lechuga, tomate, cebolla, queso y salsa de la casa. Está separada en componentes, así que podes editarla a tu gusto'),
('principal', 'P.H.P.', 2500, 'Pan, hamburguesa, pan. La hamburguesa más simple, pero la más rica. No te dejes engañar por su simplicidad, es una de las mejores hamburguesas que vas a probar'),
('principal', 'Milanesa Blender', 3000, 'Milanesa de carne, con queso provolone y cebolla. Combina formas y texturas de manera increible, una foto con la iluminación correcta y esta milanesa parece un render'),
('principal', 'Em-Paty-Zando', 2500, 'Pedila como vos quieras, nosotros vamos a atender tus pedidos y armarla como necesites'),
('principal', 'Sandwich de gallina', 1500, 'Sandwich de gallina, con lechuga, tomate, cebolla y salsa de la casa. Sale siempre fría, nada como una de estas después de ganar algún partido por penales.'),
('principal', 'SQL', 2500, 'Salsa, Queso y Lomito. No vas a encontrar un lomito más rico que este, ni aunque hagas un "select * from lomitos"'),
('postre', 'Vigilante', 1000, 'Queso y dulce de BATATA, no vendemos de membrillo. Un clásico de los postres, no puede faltar en tu pedido'),
('postre', 'Pau-stre de chocolate', 1500, 'Postre de chocolate, con dulce de leche y crema. Muy dulce, te va a hacer acordar al postre que te hacía tu mamá'),
('postre', 'Helado', 1000, 'Helado de crema, con dulce de leche y chocolate. Es helado, acá no se me ocurre nada'),
('postre', 'TIC', 1500, 'Torta Irresistible de Chocolate. Es la mejor elección sobre todo si estás en 2do.');


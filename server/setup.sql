--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Homebrew)

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

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brand (
    brand_id integer NOT NULL,
    brand_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.brand OWNER TO postgres;

--
-- Name: brand_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brand_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brand_brand_id_seq OWNER TO postgres;

--
-- Name: brand_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brand_brand_id_seq OWNED BY public.brand.brand_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_category_id_seq OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'PENDING'::character varying NOT NULL,
    shipping_address character varying(255),
    billing_address character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'PROCESSING'::character varying, 'SHIPPED'::character varying, 'DELIVERED'::character varying, 'CANCELLED'::character varying])::text[]))),
    CONSTRAINT order_total_amount_check CHECK ((total_amount >= (0)::numeric))
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    order_item_id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    CONSTRAINT order_item_quantity_check CHECK ((quantity > 0)),
    CONSTRAINT order_item_unit_price_check CHECK ((unit_price > (0)::numeric))
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- Name: order_item_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_item_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_item_order_item_id_seq OWNER TO postgres;

--
-- Name: order_item_order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_item_order_item_id_seq OWNED BY public.order_item.order_item_id;


--
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_order_id_seq OWNER TO postgres;

--
-- Name: order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_order_id_seq OWNED BY public."order".order_id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    payment_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_method character varying(50) NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status character varying(50) DEFAULT 'PENDING'::character varying NOT NULL,
    transaction_id character varying(255) DEFAULT gen_random_uuid() NOT NULL,
    CONSTRAINT payment_amount_check CHECK ((amount > (0)::numeric)),
    CONSTRAINT payment_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'COMPLETED'::character varying, 'FAILED'::character varying, 'REFUNDED'::character varying])::text[])))
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- Name: payment_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_payment_id_seq OWNER TO postgres;

--
-- Name: payment_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_payment_id_seq OWNED BY public.payment.payment_id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stock_quantity integer NOT NULL,
    category_id integer NOT NULL,
    brand_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_path text,
    CONSTRAINT product_price_check CHECK ((price > (0)::numeric)),
    CONSTRAINT product_stock_quantity_check CHECK ((stock_quantity >= 0))
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_product_id_seq OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    street character varying(255),
    city character varying(100),
    postal_code character varying(20),
    phone_number character varying(20),
    date_of_birth date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_user_id_seq OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: brand brand_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand ALTER COLUMN brand_id SET DEFAULT nextval('public.brand_brand_id_seq'::regclass);


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: order order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN order_id SET DEFAULT nextval('public.order_order_id_seq'::regclass);


--
-- Name: order_item order_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item ALTER COLUMN order_item_id SET DEFAULT nextval('public.order_item_order_item_id_seq'::regclass);


--
-- Name: payment payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_payment_id_seq'::regclass);


--
-- Name: product product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.brand VALUES (1, 'Apple', 'Smartphones, laptops, and tablets');
INSERT INTO public.brand VALUES (2, 'Samsung', 'Electronics, TVs, smartphones');
INSERT INTO public.brand VALUES (3, 'Sony', 'Audio, cameras, and gaming');
INSERT INTO public.brand VALUES (4, 'Dell', 'Business and personal laptops');
INSERT INTO public.brand VALUES (5, 'LG', 'Home appliances and TVs');
INSERT INTO public.brand VALUES (6, 'Microsoft', 'Gaming and productivity hardware');


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category VALUES (1, 'Smartphones', 'Mobile phones and devices');
INSERT INTO public.category VALUES (2, 'Laptops', 'Portable computers');
INSERT INTO public.category VALUES (3, 'Tablets', 'Touchscreen computing devices');
INSERT INTO public.category VALUES (4, 'TVs', 'Smart and 4K televisions');
INSERT INTO public.category VALUES (5, 'Audio', 'Headphones and sound systems');
INSERT INTO public.category VALUES (6, 'Cameras', 'DSLRs and mirrorless cameras');
INSERT INTO public.category VALUES (7, 'Gaming', 'Consoles and gaming gear');
INSERT INTO public.category VALUES (8, 'Appliances', 'Home and kitchen electronics');
INSERT INTO public.category VALUES (9, 'Accessories', 'Chargers, cables, stands');
INSERT INTO public.category VALUES (10, 'Wearables', 'Smartwatches and fitness bands');


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."order" VALUES (40, 27, '2025-05-22 12:07:38.189418', 13998.00, 'SHIPPED', NULL, NULL, '2025-05-22 12:07:38.189418');
INSERT INTO public."order" VALUES (42, 29, '2025-05-22 12:30:18.47417', 699900.00, 'SHIPPED', NULL, NULL, '2025-05-22 12:30:18.47417');
INSERT INTO public."order" VALUES (43, 29, '2025-05-22 12:33:33.406076', 1449917.00, 'SHIPPED', NULL, NULL, '2025-05-22 12:33:33.406076');
INSERT INTO public."order" VALUES (44, 27, '2025-05-22 13:31:24.871589', 8499.00, 'SHIPPED', NULL, NULL, '2025-05-22 13:31:24.871589');
INSERT INTO public."order" VALUES (45, 27, '2025-05-22 14:06:57.541966', 10498.00, 'SHIPPED', NULL, NULL, '2025-05-22 14:06:57.541966');


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_item VALUES (8, 40, 9, 1, 6999.00);
INSERT INTO public.order_item VALUES (9, 40, 19, 1, 6999.00);
INSERT INTO public.order_item VALUES (11, 42, 9, 10, 69990.00);
INSERT INTO public.order_item VALUES (12, 43, 11, 7, 111993.00);
INSERT INTO public.order_item VALUES (13, 43, 10, 5, 89995.00);
INSERT INTO public.order_item VALUES (14, 43, 16, 3, 71997.00);
INSERT INTO public.order_item VALUES (15, 44, 7, 1, 8499.00);
INSERT INTO public.order_item VALUES (17, 45, 3, 1, 5999.00);
INSERT INTO public.order_item VALUES (18, 45, 13, 1, 4499.00);


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payment VALUES (12, 40, 'PayPal', 13998.00, '2025-05-22 12:08:12.404414', 'COMPLETED', '710aa500-a436-4c81-bd03-a123234c3237');
INSERT INTO public.payment VALUES (13, 42, 'PayPal', 699900.00, '2025-05-22 12:32:38.213708', 'COMPLETED', '5dacd28c-bb9e-4542-83ad-85785cad88b9');
INSERT INTO public.payment VALUES (14, 43, 'PayPal', 1449917.00, '2025-05-22 12:34:42.826941', 'COMPLETED', '2c8bcb87-58e4-48af-8d39-32c0a032f05c');
INSERT INTO public.payment VALUES (15, 44, 'PayPal', 8499.00, '2025-05-22 13:44:24.515112', 'COMPLETED', 'b95002f7-4186-4df7-b869-082c8cee016a');
INSERT INTO public.payment VALUES (16, 45, 'PayPal', 10498.00, '2025-05-22 15:16:54.643982', 'COMPLETED', '103782fc-aca5-4f1f-aa53-3d531028906d');


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES (6, 'Samsung Galaxy Book3', 'Slim laptop with AMOLED screen.', 9999.00, 15, 2, 2, '2025-05-21 15:44:44.584771', '6.jpg');
INSERT INTO public.product VALUES (8, 'Samsung Tab S9', 'Android tablet for productivity.', 7999.00, 10, 3, 2, '2025-05-21 15:44:44.584771', '8.jpg');
INSERT INTO public.product VALUES (12, 'Sony Bravia XR', 'Smart Google TV with 4K HDR.', 16999.00, 6, 4, 3, '2025-05-21 15:44:44.584771', '12.jpg');
INSERT INTO public.product VALUES (14, 'Bose QuietComfort Ultra', 'Premium over-ear ANC headphones.', 3999.00, 15, 5, 3, '2025-05-21 15:44:44.584771', '14.jpg');
INSERT INTO public.product VALUES (15, 'LG XBOOM Go', 'Portable Bluetooth speaker.', 1199.00, 25, 5, 5, '2025-05-21 15:44:44.584771', '15.jpg');
INSERT INTO public.product VALUES (17, 'Canon EOS R50', 'Compact beginner-friendly mirrorless.', 9999.00, 4, 6, 3, '2025-05-21 15:44:44.584771', '17.jpg');
INSERT INTO public.product VALUES (20, 'Xbox Series X', 'Microsoft 4K gaming console.', 6499.00, 8, 7, 6, '2025-05-21 15:44:44.584771', '20.jpg');
INSERT INTO public.product VALUES (21, 'DualSense Controller', 'PS5 wireless controller.', 899.00, 30, 7, 3, '2025-05-21 15:44:44.584771', '21.jpg');
INSERT INTO public.product VALUES (22, 'LG Smart Fridge', 'WiFi-enabled multi-door fridge.', 19999.00, 3, 8, 5, '2025-05-21 15:44:44.584771', '22.jpg');
INSERT INTO public.product VALUES (23, 'Samsung Washing Machine', 'EcoBubble front loader.', 9999.00, 4, 8, 2, '2025-05-21 15:44:44.584771', '23.jpg');
INSERT INTO public.product VALUES (24, 'LG Air Purifier', 'Smart air cleaning device.', 3499.00, 6, 8, 5, '2025-05-21 15:44:44.584771', '24.jpg');
INSERT INTO public.product VALUES (25, 'Apple MagSafe Charger', 'Magnetic wireless iPhone charger.', 499.00, 40, 9, 1, '2025-05-21 15:44:44.584771', '25.jpg');
INSERT INTO public.product VALUES (26, 'Samsung 45W Charger', 'Super fast USB-C charger.', 399.00, 35, 9, 2, '2025-05-21 15:44:44.584771', '26.jpg');
INSERT INTO public.product VALUES (27, 'Dell Docking Station', 'Multi-port hub for laptops.', 1499.00, 10, 9, 4, '2025-05-21 15:44:44.584771', '27.jpg');
INSERT INTO public.product VALUES (28, 'Apple Watch Series 9', 'Smartwatch with health tracking.', 5999.00, 15, 10, 1, '2025-05-21 15:44:44.584771', '28.jpg');
INSERT INTO public.product VALUES (29, 'Samsung Galaxy Watch 6', 'Wear OS smartwatch.', 4999.00, 18, 10, 2, '2025-05-21 15:44:44.584771', '29.jpg');
INSERT INTO public.product VALUES (30, 'Fitbit Charge 6', 'Fitness tracker with heart monitor.', 2299.00, 20, 10, 6, '2025-05-21 15:44:44.584771', '30.jpg');
INSERT INTO public.product VALUES (1, 'iPhone 14 Pro', 'Apple flagship phone with A16 chip.', 12999.00, 20, 1, 1, '2025-05-21 15:44:44.584771', '1.jpg');
INSERT INTO public.product VALUES (4, 'MacBook Pro M3', 'Apple laptop with M3 chip.', 21999.00, 9, 2, 1, '2025-05-21 15:44:44.584771', '4.jpg');
INSERT INTO public.product VALUES (2, 'Samsung Galaxy S23', 'Premium Samsung Android phone.', 11999.00, 24, 1, 2, '2025-05-21 15:44:44.584771', '2.jpg');
INSERT INTO public.product VALUES (18, 'Sony ZV-E10', 'Vlogging camera with flip screen.', 9499.00, 0, 6, 3, '2025-05-21 15:44:44.584771', '18.jpg');
INSERT INTO public.product VALUES (5, 'Dell XPS 13', 'Compact and powerful ultrabook.', 14999.00, 12, 2, 4, '2025-05-21 15:44:44.584771', '5.jpg');
INSERT INTO public.product VALUES (9, 'iPad Mini', 'Compact tablet for reading & games.', 6999.00, 11, 3, 1, '2025-05-21 15:44:44.584771', '9.jpg');
INSERT INTO public.product VALUES (11, 'Samsung QLED Q80B', 'High-end QLED smart TV.', 15999.00, 0, 4, 2, '2025-05-21 15:44:44.584771', '11.jpg');
INSERT INTO public.product VALUES (10, 'LG OLED CX 55"', '4K OLED TV with deep blacks.', 17999.00, 0, 4, 5, '2025-05-21 15:44:44.584771', '10.jpg');
INSERT INTO public.product VALUES (16, 'Sony Alpha A7 IV', 'Mirrorless full-frame camera.', 23999.00, 120, 6, 3, '2025-05-21 15:44:44.584771', '16.jpg');
INSERT INTO public.product VALUES (7, 'iPad Air', 'Lightweight iPad with M1 chip.', 8499.00, 17, 3, 1, '2025-05-21 15:44:44.584771', '7.jpg');
INSERT INTO public.product VALUES (19, 'PlayStation 5', 'Sony next-gen gaming console.', 6999.00, 9, 7, 3, '2025-05-21 15:44:44.584771', '19.jpg');
INSERT INTO public.product VALUES (3, 'iPhone SE 3rd Gen', 'Compact iPhone with Touch ID.', 5999.00, 25, 1, 1, '2025-05-21 15:44:44.584771', '3.jpg');
INSERT INTO public.product VALUES (13, 'Sony WH-1000XM5', 'Top-tier noise cancelling headphones.', 4499.00, 19, 5, 3, '2025-05-21 15:44:44.584771', '13.jpg');


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (27, 'fredrik.wiik', '$2b$10$YnISJKm2l33OVF4/M23Phu4zEekilN7Z..I3iJGULOYEZhnlH68h6', 'fredrikwiik03@gmail.com', 'Fredrik', 'Wiik', 'Ekeveien 20c', 'Drøbak', '1446', '90818483', '2003-06-26', '2025-05-22 12:05:27.57447');
INSERT INTO public."user" VALUES (28, '<script>alert("test")</script>', '$2b$10$PGuRMHI29eewBxNp0ONale2un.hZENrwu2iRV1EpTPBtYpWGjtpSa', 'test@test.com', '<script>alert("test")</script>', '<script>alert("test")</script>', '<script>alert("test")</script>', '<script>alert("test")</script>', '1234', '1234', '3421-02-12', '2025-05-22 12:29:19.15378');
INSERT INTO public."user" VALUES (29, 'Sindre', '$2b$10$bEUQTUfCnEVofSkqXhuCDOjpZh57vZQFKzZuSQ9O4Sf661fyJOdI.', 'sindresmedalolsen@gmail.com', 'Sindre', 'Olsen', 'Fjellstien 3', 'Gjøvik', '2812', '97815965', '2025-10-23', '2025-05-22 12:29:23.644926');
INSERT INTO public."user" VALUES (30, 'p', '$2b$10$0JJEVtxpr1eWsVIErz6vuOhNLsigm6JICvOxAtKg65wq4Oi3nKsui', 'p@p', 'p', 'p', 'p', 'p', 'p', 'p', '1900-01-01', '2025-05-22 12:41:52.813306');


--
-- Name: brand_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brand_brand_id_seq', 6, true);


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 10, true);


--
-- Name: order_item_order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_item_order_item_id_seq', 18, true);


--
-- Name: order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_order_id_seq', 45, true);


--
-- Name: payment_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_payment_id_seq', 16, true);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_product_id_seq', 30, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 30, true);


--
-- Name: brand brand_brand_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT brand_brand_name_key UNIQUE (brand_name);


--
-- Name: brand brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT brand_pkey PRIMARY KEY (brand_id);


--
-- Name: category category_category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_category_name_key UNIQUE (category_name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (order_item_id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);


--
-- Name: payment payment_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_order_id_key UNIQUE (order_id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);


--
-- Name: payment payment_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_transaction_id_key UNIQUE (transaction_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: idx_order_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_date ON public."order" USING btree (order_date);


--
-- Name: idx_order_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_user ON public."order" USING btree (user_id);


--
-- Name: idx_product_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_product_name ON public.product USING btree (product_name);


--
-- Name: idx_user_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_email ON public."user" USING btree (email);


--
-- Name: order_item order_item_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(order_id) ON DELETE CASCADE;


--
-- Name: order_item order_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- Name: order order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- Name: payment payment_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(order_id) ON DELETE CASCADE;


--
-- Name: product product_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(brand_id);


--
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- PostgreSQL database dump complete
--


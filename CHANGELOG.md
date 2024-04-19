# Changelog


## v1.0.2

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v1.0.1...v1.0.2)

### 🏡 Chore

- **ci:** Add env variable in build step (ebcdbbe)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>

## v1.0.1

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v1.0.0...v1.0.1)

### 🩹 Fixes

- **ci:** Lock file issue (0d2e999)

### 🏡 Chore

- **useProductsApi:** Add jsdoc hints (f5867de)
- **useAuth:** Add jsdoc hints (46b2858)
- **useProductsSorting:** Add jsdoc hints (79cdaa7)
- **useSearchbar:** Add jsdoc hints (3c3c3c5)
- **config:** Add jsdoc hints (50ff478)
- **utils:** Remove unused url util (3ac9226)
- **ProductsList:** Add jsdoc hints (a2134cb)
- Alert provider jsdoc hints (d314c76)
- **router:** Add jsdoc hints (74e7f7a)
- **CreateProductDialog:** Add jsdoc hints (95cf3e9)
- **LoginButton:** Add jsdoc hints (0b2859c)
- **LoginDialog:** Add jsdoc hints (df4fbc3)
- **ProductCard:** Add jsdoc hints (db86618)
- **ProductSearchbar:** Add jsdoc hints (2c37537)
- **ProductsStatusLabel:** Add jsdoc hints (01a9368)
- **useProductsApi:** Improve hints (b0b6244)
- **config/auth:** Decrase delay for login and logout (09c3f9d)
- Remove .env from repositor & remove unused API_KEY (6f2753f)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>

## v1.0.0

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v0.0.5...v1.0.0)

### 🚀 Enhancements

- Add db.json (for running json-server) (1b02556)
- Add element-plus & configure auto imports (dc1a519)
- Move api to json-server (6b53205)
- Use more clear api for http requests (migrate to axios) (ca2d33b)
- Migrate dashboard to new api (json-server) (3f61b24)
- Configure eslint (antfu config) (1f0c7bc)
- **json-server:** Add initial products (5023e29)
- **dashboard:** Add product filters (2baba28)
- **dashboard:** Add product filters (03466eb)
- Add products pagination (81d78b8)
- Add network error alert (d57cc46)
- **dashboard:** Search in products (51712ab)
- **dashboard:** Improve empty products message (426fbab)
- Pagination in home page (dd970c4)
- Add sorting in home page (e84a43a)

### 🩹 Fixes

- Eslint issues (791e8d0)
- Naming issue (useProductSorting => useProductsSorting) (4464755)
- **AuthActionsProvider:** Handle create product button (ee5d9cf)
- Use fixed version of json-server (7416cbf)
- Json-server host (039704b)
- **ProductSearchbar:** New searching api (c26fd21)
- **api:** FindProduct transformer issue (handling single object instead array) (ddafa67)
- Json-server uses string for resource ids (ef5de8c)
- Pagination issue (double fetch) (4a162a1)

### 💅 Refactors

- Improve code quality (decomposite products api) (e18b33a)
- Better loading state when deleting product (b789991)
- Use productsApi in home page (99cdbe8)
- Decomposite product categories and model (473168f)
- User fields improvements (6e5bc49)

### 🏡 Chore

- Revert element-plus installation (and auto imports) (8c08b16)
- Return back typechecking (47dd9cd)
- Disable typecheck (a9d4d89)
- Remove --watching parameter from json-server command (5fc5712)
- Json-server port (41e3ab1)

### 🎨 Styles

- Reformat code via eslint rules (f665f53)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>

## v0.0.5

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v0.0.4...v0.0.5)

### 🎨 Styles

- Add jsdoc hints (c31a9f0)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>

## v0.0.4

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v0.0.3...v0.0.4)

### 🚀 Enhancements

- Customize alert when request limit handled (4a7005f)

### 🎨 Styles

- Reformat code (c21962e)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>

## v0.0.3

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v0.0.2...v0.0.3)

### 🩹 Fixes

- **vite:** Correct base parameter (for github pages) (706a014)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>

## v0.0.2

[compare changes](https://github.com-azabroflovski/azabroflovski/device-shop-master/compare/v0.0.1...v0.0.2)

### 🏡 Chore

- **ci:** Deploy to github pages (a64b3f4)
- Disable typecheck (sorry, времени нету) (37f1a24)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>
- Aza Broflovski ([@azabroflovski](http://github.com/azabroflovski))

## v0.0.1


### 🚀 Enhancements

- Add simple app layout (7e9b5dd)
- Products page (54d1445)
- **HomeView:** Loading state (fd0767a)
- Add useSearchbar (01bed0f)
- Add ProductSearchbar (autocomplete searching) (d6c09a7)
- Add product page (ProductView) (7ab505f)
- **AppHeader:** Go home on logo click (444359c)
- Ui improvements (71cc116)
- Handling 404 routes (adf3c18)
- Big ui improvements (improve auth and more) (37a9c84)
- **DashboardView:** Dividers for blocks (001149f)
- **LoginDialog:** Help to fill demo credentials (9760de3)
- Seo improvements & enhance ui in dashboard (90ed7d4)
- **ProductCard:** HideActions & hideFooter props for more control over ui (c63b200)
- Product crud operations (simple) (c78a67c)
- Add product deletions (5a3f42b)
- Ui improvements (6768223)

### 🩹 Fixes

- Product types and ProductCard props (13da92e)
- Remove padding of AppHeader when it is in a container (bdf4b19)
- **ProudctSearchbar:** Opened state issue (f9a6f89)
- **ProductView:** Handling invalid routes (326f9cf)
- **AuthActionsProvider:** Hide from guest & logout handler (3875e95)

### 💅 Refactors

- Use custom rest api client (instead supabase client) (5b4bf30)
- Decomposite layout structure (795018b)
- **api:** Http request improvements & add transformers (192904c)
- Remove <Suspense> strategy (92f89a6)
- **api:** New search query url (b9f5fbd)
- Decomposite product card & ui improvements (0892bd6)
- **ProductsList:** More readable conditions (14e22ac)

### 🏡 Chore

- Remove unused files (d4306aa)
- Add ant-vue-design (968834a)
- Add env example file (3ff9ed9)
- **api:** Correct response types (23da257)

### ❤️ Contributors

- Azabroflovski <azabroflovski@gmail.com>


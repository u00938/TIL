const request = require('supertest');
const app = require('../../server');

const newProduct = require('../data/new-product.json');
let firstProduct;

// Create
it("POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send(newProduct);
  expect(response.statusCode).toBe(201)
  expect(response.body.name).toBe(newProduct.name)
  expect(response.body.description).toBe(newProduct.description)
})

// 에러 처리를 위한 통합 테스트
it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: "phone" })
  expect(response.statusCode).toBe(500)

  // console.log('response.body', response.body)

  expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required."})
})

// Read
it("Get /api/products", async () => {
  const response = await request(app).get('/api/products');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0]
})

// Read by Id
it("Get /api/products/:productId", async () => {
  const response = await request(app).get('/api/products/' + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
})

it("Get id doesnt exist /api/products/:productId", async () => {
  const response = await request(app).get('/api/products/5f5cb1e3646c57caf47a1788')
  expect(response.statusCode).toBe(404);
})

// Update
it("PUT /api/products", async () => {
  const response = await request(app)
    .put("/api/products/" + firstProduct._id)
    .send({ name: "updated name", description: "updated description" })
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("updated name");
  expect(response.body.description).toBe("updated description");
})

it("should return 404 on PUT /api/products when item doesnt exist", async () => {
  const response = await request(app)
    .put('/api/products/5f5cb1e3646c57caf47a1788')
    .send({ name: "updated name", description: "updated description" });
    expect(response.statusCode).toBe(404);
  })

// Delete
it("DELETE /api/products", async () => {
  const response = await request(app)
    .delete("/api/products/" + firstProduct._id)
    .send();
  expect(response.statusCode).toBe(200);
})

it("DELETE id doesnt exist /api/products/:productId", async () => {
  const response = await request(app)
    .delete("/api/products/5f5cb1e3646c57caf47a1788")
    .send();
  expect(response.statusCode).toBe(404);
})
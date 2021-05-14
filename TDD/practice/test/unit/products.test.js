// Create 
const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-product.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

// 임의의 Id
const productId = "608bce8e36f748690f16a30d";

// 임의의 update data
const updatedProduct = { name: "updated name", description: "updated description" };

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

// Create
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  })
  // create 함수 createProduct가 있는지
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function")
  });

  // createProduct 함수 호출 시 Product Model의 Create 메소드가 호출되는지
  it("should call ProductModel.create", async () => {
    // unit test에서 http 객체(request, response) 이용하기
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  })

  // 성공적으로 데이터를 create 하면 201 status를 response로 전송하는지
  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    // 결과값이 잘 전송됐는지
    expect(res._isEndCalled()).toBeTruthy()
  })

  it("should return json body in response", async () => {
    // 가짜 함수가 어떤 결과값을 반환할지 알려주고
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    // 비교
    expect(res._getJSONData()).toStrictEqual(newProduct);
  })

  // 에러 처리
  // MongoDb에서 처리하는 부분은 문제 없다고 가정
  // 에러 처리를 의존하지 않기 위해 임의로 Mock 함수로 처리하는 것
  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
});

// Read
describe("Product Controller Get", () => {

  // read 함수 getProducts가 있는지
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe("function")
  })

  // createProduct 함수 호출 시 Product Model의 Create 메소드가 호출되는지
  it("should call ProductModel.find({})", async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({})
  })

  // 성공적으로 데이터를 find 하면 201 status를 response로 전송하는지
  it("should return 200 response code", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy()
  })

  it("should return json body in response", async() => {
    productModel.find.mockReturnValue(allProducts)
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts)
  })

  // 에러 처리
  it("should handle error", async () => {
    const errorMessage = { message: "Error finding product data" }
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})

// 조건(by Id) Read
describe("Product Controller GetById", () => {
  it("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe("function")
  })

  it("should call productModel.findById", async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next)
    expect(productModel.findById).toBeCalledWith(productId)
  })
  
  it("should return json body and response code 200", async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it("should return 404 when item dosent exist", async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })

  // 에러 처리
  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
})

// Update
describe("Product Controller Update", () => {
  it("should have an updateProduct", () => {
    expect(typeof productController.updateProduct).toBe("function");
  })

  it("should call productModel.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      { new: true }
    )
  })

  it("should return json body and response code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
  })

  it("should handle 404 when item doesnt exist", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })

  // 에러 처리
  it("should handle errors", async () => {
    const errorMessage = { message: "Error" };
    const rejectPromise = Promise.reject(errorMessage);
    productModel.findByIdAndUpdate.mockReturnValue(rejectPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})

// Delete
describe("Product Controller Delete", () => {
  it("should have a deleteProduct function", () => {
    expect(typeof productController.deleteProduct).toBe("function");
  })

  it("should call ProductModel.finByIdAndDelete", async () => {
    req.params.productId = productId;
    await productController.deleteProduct(req, res, next);
    expect(productModel.findByIdAndDelete).toBeCalledWith(productId);
  })

  it("should return 200 response", async () => {
    let deletedProduct = { name: "deletedProduct", description: "It is deleted" }
    productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(deletedProduct);
  })

  it("should handle 404 when item doesnt exist", async () => {
    productModel.findByIdAndDelete.mockReturnValue(null);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  })

  it("should handle errors", async () => {
    const errorMessage = { message: "Error deleting" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await productController.deleteProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})
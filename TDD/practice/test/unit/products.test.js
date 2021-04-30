// Create 
const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

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


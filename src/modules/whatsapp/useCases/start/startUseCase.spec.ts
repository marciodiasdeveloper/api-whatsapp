import { StartUseCase } from "./startUseCase";

describe("WhatsApp Start Controller", () => {
  beforeEach(() => {
    // checkEmailExistsUseCase = new CheckEmailExistsUseCase({
    //   email,
    // });
    // createUserUseCase = new CheckEmailExistsUseCase(UsersRepositoryInMemory);
  });

  it("Should return 400 if sessionName is provided", async () => {
    const sessionName = "";

    const start = new StartUseCase();
    const httpResponse = await start.execute(sessionName);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse).toEqual(new Error("Missing param: sessionName"));
  }, 50000);
});

import { StartUseCase } from "./startUseCase";

// Testar caso sessionName não seja enviado como parametro getSession
// Testar se o client foi iniciado com sucesso.

describe("WhatsApp Start Controller", () => {
  beforeEach(() => {
    // checkEmailExistsUseCase = new CheckEmailExistsUseCase({
    //   email,
    // });
    // createUserUseCase = new CheckEmailExistsUseCase(UsersRepositoryInMemory);
  });

  it("Should return 400 if sessionName is not provided.", async () => {
    const sessionName = "";

    const start = new StartUseCase();
    const httpResponse = await start.execute(sessionName);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse).toEqual(new Error("Missing param: sessionName"));
  }, 50000);

  it("Should return 200 when a WhatsApp session started successfully.", async () => {
    const sessionName = "";
    const start = new StartUseCase();
    const httpResponse = await start.execute(sessionName);
    expect(httpResponse.statusCode).toBe(400);
    // expect(httpResponse).toEqual(new Error("Missing param: sessionName"));
  }, 50000);

  it("Should return 400 when a WhatsApp session started error.", async () => {
    // const sessionName = "";
    // const start = new StartUseCase();
    // const httpResponse = await start.execute(sessionName);
    // expect(httpResponse.statusCode).toBe(400);
  }, 50000);
});

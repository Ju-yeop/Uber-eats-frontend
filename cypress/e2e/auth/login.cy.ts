describe("Log In", () => {
  const user = cy;
  it("should go to homepage", () => {
    user.visit("/").title().should("eq", "Login | Nuber Eats");
  });
  it("can see email / password validation errors", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("bad@email");
    user.findByRole("alert").should("have.text", "Please enter a valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required");
    user.findByPlaceholderText(/email/i).type("yeop@naver.com");
    user
      .findByPlaceholderText(/password/i)
      .type("err")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required");
  });
  it("can fill out the form and login", () => {
    // @ts-ignore
    user.login("owner@naver.com", "123");
  });
});

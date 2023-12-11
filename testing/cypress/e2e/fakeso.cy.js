// Template test file. Change the file to add more tests.
// You will need to change path to the file

const PATH = "C:\\Users\\Owner\\Documents\\CS5500\\project\\chrisBranch\\";

let _init = () => {
    // cy.exec('node ' + PATH +  'cs5500-final-project-christopher-pramatha\\server\\init.js mongodb://127.0.0.1:27017/fake_so');
    cy.exec('node ..\\server\\init.js mongodb://127.0.0.1:27017/fake_so');
}

let _destroy = () => {
    // cy.exec('node ' + PATH + 'cs5500-final-project-christopher-pramatha\\server\\destroy.js');
    cy.exec('node ..\\server\\destroy.js');
}
//////////////////////////////////////////////////////////////
/////////////////////////Welcome//////////////////////////////
//////////////////////////////////////////////////////////////
describe("Welcome", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Shows Welcome message", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome to our Fake Stack Overflow");
  });
  it("Shows options in welcome page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user");
    cy.contains("Login as an existing user");
    cy.contains("Continue as a guest user");
  });
});

//////////////////////////////////////////////////////////////
/////////////////////////Register/////////////////////////////
//////////////////////////////////////////////////////////////
describe("Register", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Shows Register Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Re-Enter Password");
    cy.contains("Register");
  });
  it("Register Page Functions Valid Email", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Re-Enter Password");
    cy.contains("Register");
    cy.get("#username").type("test");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("test");
    cy.get("#repeatPassword").type("test");
    cy.get("#registerButton").click();
    cy.contains("Login");
  });
  it("Register Page Functions Invalid Email", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Register");
    cy.get("#username").type("test");
    cy.get("#email").type("test");
    cy.get("#password").type("test");
    cy.get("#repeatPassword").type("test");
    cy.get("#registerButton").click();
    cy.get("#emailError");
    cy.contains("Must be a valid email");
  });
  it("Register Page Functions Existing Username", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Register");
    cy.get("#username").type("cmorgan");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("test");
    cy.get("#repeatPassword").type("test");
    cy.get("#registerButton").click();
    cy.get("#usernameError");
    cy.contains("This user already exists");
  });
  it("Register Page Functions Existing Email", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Register");
    cy.get("#username").type("test");
    cy.get("#email").type("email@email.com");
    cy.get("#password").type("test");
    cy.get("#repeatPassword").type("test");
    cy.get("#registerButton").click();
    cy.get("#emailError");
    cy.contains("This email already exists");
  });
  it("Register Page Functions Not Matching Password", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Register");
    cy.get("#username").type("test");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("test");
    cy.get("#repeatPassword").type("badTest");
    cy.get("#registerButton").click();
    cy.get("#repeatPasswordError");
    cy.contains("Both passwords must match");
  });
});
//////////////////////////////////////////////////////////////
/////////////////////////Login////////////////////////////////
//////////////////////////////////////////////////////////////
describe("Login", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Shows Login Screen", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
    cy.get("#loginButton");
  });
  it("Logs In", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
  });
  it("Invalid Username", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
    cy.get("#username").type("badTest");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.get("#passwordError").contains("Username or Password is incorrect");
  });
  it("Invalid Password", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1235");
    cy.get("#loginButton").click();
    cy.get("#passwordError").contains("Username or Password is incorrect");
  });
});
//////////////////////////////////////////////////////////////
/////////////////////////Logout///////////////////////////////
//////////////////////////////////////////////////////////////
describe("Logout", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("User Logs Out Successfully", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Logout").click();
    cy.contains("Login as an existing user").click();
  });
});
//////////////////////////////////////////////////////////////
/////////////////////////Guest User///////////////////////////
//////////////////////////////////////////////////////////////
describe("Guest", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Guest User Works", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
  });
  it("Guest User HomePage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    const qTitles = [
      "Programmatically navigate using React router",
      "android studio save string shared preference, start activity and load the saved string",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
      cy.contains("cmorgan");
    });
  });
  it("Guest User Scroll Next", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#next").click();
    cy.contains("This is the end of the list");
  });
  it("Guest User Scroll Prev", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#prev").click();
    cy.contains("This is the end of the list");
  });
  it("Guest User Scroll Next Prev", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#next").click();
    cy.get("#prev").click();
    cy.contains("Programmatically navigate using React router");
  });
  it("Guest User Scroll Prev Next", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#prev").click();
    cy.get("#next").click();
    cy.contains("Programmatically navigate using React router");
  });
  it("Guest User Active Sort", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Active").click();
    const qTitles = [
      "This is the end of the list, unless active sorted, then it is the start",
      "Programmatically navigate using React router",
      "android studio save string shared preference, start activity and load the saved string",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Guest User Newest Sort", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Active").click();
    cy.contains("This is the end of the list, unless active sorted, then it is the start");
    cy.contains("Newest").click();
    cy.contains("Programmatically navigate using React route");
  });
  it("Guest User Unanswered Sort", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Unanswered").click();
    cy.contains("4 questions");
    const qTitles = [
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Get Question Answers", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question").should("not.exist");
    cy.contains("Answer Question").should("not.exist");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
  });
  it("Guest User All Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.contains("Tags").click();
    cy.contains("All Tags");
    cy.contains("4 Tags");
    cy.contains("Ask a Question").should("not.exist");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("android-studio");
    cy.contains("shared-preferences");
  });
  it("Guest User Selects a Tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.contains("Tags").click();
    cy.contains("All Tags");
    cy.contains("4 Tags");
    cy.contains("Ask a Question").should("not.exist");
    cy.contains("react").click();
    cy.contains("Search Results");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router");
    cy.contains("2 answers");
    cy.contains("0 views");
    cy.contains("0 points");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("cmorgan asked Nov 24 at 03:24");
  });
  it("Guest User Searches No Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar").type("navigation{enter}");
    cy.contains("Search Results");
    cy.contains("1 question");
    cy.contains(
      "android studio save string shared preference, start activity and load the saved string"
    );
  });
  it("Guest User Search Only Tags 1 Tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    const qTitles = ["Programmatically navigate using React router"];
    cy.get("#searchBar").type("[react]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Guest User Search Only Tags 2 Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    const qTitles = [
      "Programmatically navigate using React router",
      "android studio save string shared preference, start activity and load the saved string",
      "This is the end of the list, unless active sorted, then it is the start",
    ];
    cy.get("#searchBar").type("[react] [android-studio]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Guest User Go To Login Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.get("#loginLink").click();
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
  });
  it("Guest User Go To Register Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.get("#registerLink").click();
    cy.contains("Register Screen");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Re-Enter Password");
  });
});
//////////////////////////////////////////////////////////////
//////////////////////Registered User/////////////////////////
//////////////////////////////////////////////////////////////
describe("Registered", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Registered User Works", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
  });
  it("Registered User HomePage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    const qTitles = [
      "Programmatically navigate using React router",
      "android studio save string shared preference, start activity and load the saved string",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
      cy.contains("cmorgan");
    });
  });
  it("Registered User Scroll Next", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#next").click();
    cy.contains("This is the end of the list");
  });
  it("Registered User Scroll Prev", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#prev").click();
    cy.contains("This is the end of the list");
  });
  it("Registered User Scroll Next Prev", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#next").click();
    cy.get("#prev").click();
    cy.contains("Programmatically navigate using React router");
  });
  it("Registered User Scroll Prev Next", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.get("#prev").click();
    cy.get("#next").click();
    cy.contains("Programmatically navigate using React router");
  });
  it("Registered User Active Sort", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Active").click();
    const qTitles = [
      "This is the end of the list, unless active sorted, then it is the start",
      "Programmatically navigate using React router",
      "android studio save string shared preference, start activity and load the saved string",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Registered User Newest Sort", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Active").click();
    cy.contains("This is the end of the list, unless active sorted, then it is the start");
    cy.contains("Newest").click();
    cy.contains("Programmatically navigate using React route");
  });
  it("Registered User Unanswered Sort", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Unanswered").click();
    cy.contains("4 questions");
    const qTitles = [
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
      "Cypress delete testing data after testing",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Registered User Get Question Answers", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
  });
  it("Registered User All Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.contains("Tags").click();
    cy.contains("All Tags");
    cy.contains("4 Tags");
    cy.contains("Ask a Question");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("android-studio");
    cy.contains("shared-preferences");
  });
  it("Registered User Selects a Tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.contains("Tags").click();
    cy.contains("All Tags");
    cy.contains("4 Tags");
    cy.contains("Ask a Question");
    cy.contains("react").click();
    cy.contains("Search Results");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router");
    cy.contains("2 answers");
    cy.contains("0 views");
    cy.contains("0 points");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("cmorgan asked Nov 24 at 03:24");
  });
  it("Registered User Searches No Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar").type("navigation{enter}");
    cy.contains("Search Results");
    cy.contains("1 question");
    cy.contains(
      "android studio save string shared preference, start activity and load the saved string"
    );
  });
  it("Registered User Search Only Tags 1 Tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar").type("[react]{enter}");
    cy.contains("1 question");
    cy.contains("Programmatically navigate using React router");
  });
  it("Registered User Search Only Tags 2 Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    const qTitles = [
      "Programmatically navigate using React router",
      "android studio save string shared preference, start activity and load the saved string",
      "This is the end of the list, unless active sorted, then it is the start",
    ];
    cy.get("#searchBar").type("[react] [android-studio]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  it("Registered User can go to Ask a Questions", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput");
    cy.contains("Question Text*");
    cy.get("#formTextInput");
    cy.contains("Tags*");
    cy.get("#formTagInput");
  });
  it("Registered User asks a question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type(
      "This is a test question for the purpose of user testing for the Registered User"
    );
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("This is a test question");
    cy.contains("test");
    cy.contains("user-cases");
    cy.contains("react");
    cy.contains("cmorgan");
  });
  it("Registered User asks a question with too many characters in the title", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type(
      "asfasdfasdfasfasfasfasfasdfsdkljiufjsdflkfjhsadlifkjasdkujfhhhasdkiljfhaskjihdfjksahdfaskjuhdfkasjhdfsakjdhgf"
    );
    cy.contains("Question Text*");
    cy.get("#formTextInput").type(
      "This is a test question for the purpose of user testing for the Registered User"
    );
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.get("#titleError");
    cy.contains("Title cannot be more than 100 characters");
  });
  it("Registered User asks a question without a title", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type(
      "This is a test question for the purpose of user testing for the Registered User"
    );
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.get("#titleError");
    cy.contains("Title cannot be empty");
  });
  it("Registered User asks a question without text", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.get("#textError");
    cy.contains("Question text cannot be empty");
  });
  it("Registered User asks a question with a valid hyperlink", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("[Northeastern Canvas](https://www.canvas.northeastern.edu)");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("This is a test question");
    cy.contains("test");
    cy.contains("user-cases");
    cy.contains("react");
    cy.contains("cmorgan");
  });
  it("Registered User asks a question with an invalid hyperlink", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("[Northeastern Canvas](http://www.canvas.northeastern.edu)");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.get("#textError");
    cy.contains("Invalid Hyperlink");
  });
  it("Registered User asks a question with too many tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("This is test text");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react javascript web-dev tags");
    cy.contains("Post Question").click();
    cy.get("#tagError");
    cy.contains("Cannot have more than 5 tags");
  });
  it("Registered User asks a question with too many tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("This is test text");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases reactreactreactreactreact");
    cy.contains("Post Question").click();
    cy.get("#tagError");
    cy.contains("New tag length cannot be more than 20");
  });
  it("Registered User asks a question with no tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("This is test text");
    cy.contains("Tags*");
    cy.get("#formTagInput");
    cy.contains("Post Question").click();
    cy.get("#tagError");
    cy.contains("There must be tags associated with a question");
  });
  it("Registered User with less than 50 rep tries to add a new tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("mjn0830");
    cy.get("#password").type("abcd");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.get("#askQuestion").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type(
      "This is a test question for the purpose of user testing for the Registered User"
    );
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test user-cases react");
    cy.contains("Post Question").click();
    cy.get("#tagError");
    cy.contains("Must have over 50 reputation points to add new tags");
  });
  it("Registered User upvotes a question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("▲").eq(0).click();
    cy.get("#votes").contains("1 point");
    cy.contains("▲").eq(0).should("be.disabled");
    cy.contains("▼").eq(0).should("not.be.disabled");
  });
  it("Registered User downvotes after upvoting a question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("▲").eq(0).click();
    cy.contains("1 point");
    cy.contains("▲").eq(0).should("be.disabled");
    cy.contains("▼").eq(0).click();
    cy.contains("-1 points");
    cy.contains("▲").eq(0).should("not.be.disabled");
    cy.contains("▼").eq(0).should("be.disabled");
  });
  it("Registered User downvotes a question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("▼").eq(0).click();
    cy.contains("-1 points");
    cy.contains("▼").eq(0).should("be.disabled");
    cy.contains("▲").eq(0).should("not.be.disabled");
  });
  it("Registered User upvotes after downvoting a question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("▼").eq(0).click();
    cy.contains("-1 points");
    cy.contains("▼").eq(0).should("be.disabled");
    cy.contains("▲").eq(0).should("not.be.disabled");
    cy.contains("▲").eq(0).click();
    cy.contains("1 point");
    cy.contains("▲").eq(0).should("be.disabled");
  });
  it("Registered User cannot upvote a question due to too low of a reputation score", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("mjn0830");
    cy.get("#password").type("abcd");
    cy.get("#loginButton").click();
    cy.wait(2000);
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.wait(2000);
    cy.get("button")
      .contains("▲")
      .each((element) => {
        cy.wrap(element).click();
        cy.wait(2000);
      });
    cy.get("div").contains("Need 50 rep to vote").should("exist");
  });
  it("Registered User cannot downvote a question due to too low of a reputation score", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("mjn0830");
    cy.get("#password").type("abcd");
    cy.get("#loginButton").click();
    cy.wait(2000);
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.wait(2000);
    cy.get("button")
      .contains("▼")
      .each((element) => {
        cy.wrap(element).click();
        cy.wait(2000);
      });
    cy.get("div").contains("Need 50 rep to vote").should("exist");
  });
  it("Registered User All Tags Asks a question with a new tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("Programmatically navigate using React router");
    cy.contains("cmorgan");
    cy.contains("Tags").click();
    cy.contains("All Tags");
    cy.contains("4 Tags");
    cy.contains("Ask a Question");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("android-studio");
    cy.contains("shared-preferences");
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("https://www.canvas.northeastern.edu");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("This is a test question");
    cy.contains("test");
    cy.contains("cmorgan");
    cy.contains("Tags").click();
    cy.contains("All Tags");
    cy.contains("5 Tags");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("android-studio");
    cy.contains("shared-preferences");
    cy.contains("test");
  });
  it("Registered User Get Question Answers Asks A Question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
    cy.contains("Ask a Question").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Question Text*");
    cy.get("#formTextInput").type("https://www.canvas.northeastern.edu");
    cy.contains("Tags*");
    cy.get("#formTagInput").type("test react javascript");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("This is a test question");
    cy.contains("test");
    cy.contains("javascript");
    cy.contains("react");
    cy.contains("cmorgan");
    cy.contains("This is a test question").click();
    cy.contains("0 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
  });
  it("Registered User Get Question Answers Asks A Question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
    cy.get("#answerQuestion").click();
    cy.get("#answerTextInput").type("This is the answer to the question");
    cy.get("#postanswer").click();
    cy.contains("Programmatically navigate using React router");
    cy.contains("3 answers");
    cy.contains("1 views");
    const qAnswers2 = [
      "This is the answer to the question",
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers2[index]);
    });
  });
  it("Registered User goes to Profile", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Questions");
    cy.contains("Answers");
    cy.contains("Tags");
  });
  it("Registered User goes to Profile and gets their questions", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router");
    cy.contains("2 answers");
    cy.contains("0 views");
    cy.contains("0 points");
    cy.contains("react");
    cy.contains("javascript");
  });

  it("Registered User goes to Profile and modifies a question title successfully", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").clear();
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Update Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("This is a test question");
    cy.contains("react");
    cy.contains("javascript");
    cy.contains("cmorgan");
  });
  it("Registered User goes to Profile and modifies a question title unsuccessfully too long of a title", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").clear();
    cy.get("#formTitleInput").type(
      "asjkldfsiadfhalksjdhflkjasdhflkjasdhflkjahsdlkfhasdlkjfsaldkjfasdmjhfgaskjdhfgkajshdfkjasdhfkjhsydasdgfsdfg"
    );
    cy.contains("Update Question").click();
    cy.get("#titleError").contains("Title cannot be more than 100 characters");
  });
  it("Registered User goes to Profile and modifies a question title unsuccessfully no title", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").clear();
    cy.contains("Update Question").click();
    cy.get("#titleError").contains("Title cannot be empty");
  });
  it("Registered User goes to Profile and deletes question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").clear();
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Delete Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("Programmatically navigate using React router").should("not.exist");
  });
  it("Registered User goes to Profile and reposts question", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.get("#formTitleInput").clear();
    cy.get("#formTitleInput").type("This is a test question");
    cy.contains("Repost Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("Active").click();
    cy.get(".postTitle").eq(0).contains("Programmatically navigate using React router");
    cy.get(".postTitle")
      .eq(1)
      .contains("This is the end of the list, unless active sorted, then it is the start");
  });

  it("Registered User goes to Profile and modifies a question text successfully", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.contains("Question Text*");
    cy.get("#formTextInput").clear();
    cy.get("#formTextInput").type(
      "This is a test question for the purpose of user testing for the Registered User"
    );
    cy.contains("Update Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("This is a test question for the purpose of user testing for the Registered User");
  });
  it("Registered User goes to Profile and modifies a question text unsuccessfully invalid hyperlink", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Text*");
    cy.get("#formTextInput").clear();
    cy.get("#formTextInput").type("[Northeastern Canvas](http://www.canvas.northeastern.edu)");
    cy.contains("Update Question").click();
    cy.get("#textError").contains("Invalid Hyperlink");
  });
  it("Registered User goes to Profile and modifies a question text unsuccessfully no text", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Text*");
    cy.get("#formTextInput").clear();
    cy.contains("Update Question").click();
    cy.get("#textError").contains("Question text cannot be empty");
  });

  it("Registered User goes to Profile and modifies a question tags successfully", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.contains("Question Text*");
    cy.contains("Tags*");
    cy.get("#formTagInput").clear();
    cy.get("#formTagInput").type("test user-cases registration");
    cy.contains("Update Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("test");
    cy.contains("user-cases");
    cy.contains("registration");
  });

  it("Registered User goes to Profile and modifies a question tags unsuccessfully too many tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.contains("Question Text*");
    cy.contains("Tags*");
    cy.get("#formTagInput").clear();
    cy.get("#formTagInput").type("test user-cases registration expressjs nodejs cypress");
    cy.contains("Update Question").click();
    cy.get("#tagError").contains("Cannot have more than 5 tags");
  });
  it("Registered User goes to Profile and modifies a question tags unsuccessfully no tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.contains("Question Text*");
    cy.contains("Tags*");
    cy.get("#formTagInput").clear();
    cy.contains("Update Question").click();
    cy.get("#tagError").contains("There must be tags associated with a question");
  });
  it("Registered User goes to Profile and modifies a question tags unsuccessfully too long tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Questions").click();
    cy.contains("cmorgans Questions");
    cy.contains("1 question");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("Question Title*");
    cy.contains("Question Text*");
    cy.contains("Tags*");
    cy.get("#formTagInput").clear();
    cy.get("#formTagInput").type("lkiasdjflkjsdfhfsdfgsdfg");
    cy.contains("Update Question").click();
    cy.get("#tagError").contains("New tag length cannot be more than 20");
  });

  it("Registered User goes to Profile and gets their Answers", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Answers").click();
    cy.contains("3 answers");
    cy.contains("cmorgan's Answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    );
    cy.contains(
      "YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);"
    );
    cy.contains("I just found all the above examples just too confusing, so I wrote my own.");
  });
  it("Registered User goes to Profile and modifies an answer successfully", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Answers").click();
    cy.contains("3 answers");
    cy.contains("cmorgan's Answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    ).click();
    cy.get("#answerTextInput").clear();
    cy.get("#answerTextInput").type("Modified for testing purposes");
    cy.contains("Update Answer").click();
  });
  it("Registered User goes to Profile and modifies an answer unsuccessfully no answer", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Answers").click();
    cy.contains("3 answers");
    cy.contains("cmorgan's Answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    ).click();
    cy.get("#answerTextInput").clear();
    cy.contains("Update Answer").click();
    cy.get("#enteranswererror").contains("Answer text cannot be empty");
  });
  it("Registered User goes to Profile and modifies an answer unsuccessfully bad hyperlink", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Answers").click();
    cy.contains("3 answers");
    cy.contains("cmorgan's Answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    ).click();
    cy.get("#answerTextInput").clear();
    cy.get("#answerTextInput").type("[Northeastern Canvas](http://www.canvas.northeastern.edu)");
    cy.contains("Update Answer").click();
    cy.get("#enteranswererror").contains("Invalid hyperlink constraints");
  });
  it("Registered User goes to Profile and deletes an answer", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Answers").click();
    cy.contains("3 answers");
    cy.contains("cmorgan's Answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    ).click();
    cy.contains("Delete Answer").click();
    cy.contains("2 answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    ).should("not.exist");
  });
  it("Registered User goes to Profile and reposts an answer", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Answers").click();
    cy.contains("3 answers");
    cy.contains("cmorgan's Answers");
    cy.contains(
      "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background."
    ).click();
    cy.contains("Repost Answer").click();
    cy.get("#questionsLink").click();
    cy.contains("Active").click();
    cy.get(".postTitle")
      .eq(0)
      .contains(
        "android studio save string shared preference, start activity and load the saved string"
      );
  });

  it("Registered User goes to Profile and gets their Tags", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Tags").click();
    cy.contains("2 Tags");
    cy.contains("cmorgan's Tags");
    cy.contains("react");
    cy.contains("javascript");
  });
  it("Registered User goes to Profile and modifies a tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Tags").click();
    cy.contains("2 Tags");
    cy.contains("cmorgan's Tags");
    cy.contains("react").click();
    cy.get("#tagTextInput").clear();
    cy.get("#tagTextInput").type("java");
    cy.contains("Update Tag").click();
    cy.contains("java");
  });
  it("Registered User goes to Profile and modifies a tag no value", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Tags").click();
    cy.contains("2 Tags");
    cy.contains("cmorgan's Tags");
    cy.contains("react").click();
    cy.get("#tagTextInput").clear();
    cy.contains("Update Tag").click();
    cy.contains("Tag must have a value");
  });
  it("Registered User goes to Profile and modifies a tag too long tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Tags").click();
    cy.contains("2 Tags");
    cy.contains("cmorgan's Tags");
    cy.contains("react").click();
    cy.get("#tagTextInput").clear();
    cy.get("#tagTextInput").type("asdfkljhasdkjhfasdfgsdfg");
    cy.contains("Update Tag").click();
    cy.contains("Tag length cannot be more than 20");
  });
  it("Registered User goes to Profile and deletes a tag", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Profile").click();
    cy.contains("User Profile");
    cy.contains("User Information");
    cy.contains("Username: cmorgan");
    cy.contains("Email: email@email.com");
    function daysSinceCreation(creationDate) {
      const specificDateObject = new Date(creationDate);
      const currentDate = new Date();
      const timeDifference = currentDate - specificDateObject;
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    let days = daysSinceCreation(new Date("2023-02-13T09:36:00"));
    cy.contains("Member for: " + days);
    cy.contains("Reputation: 76");
    cy.contains("What you have made");
    cy.contains("Your Tags").click();
    cy.contains("2 Tags");
    cy.contains("cmorgan's Tags");
    cy.contains("react").click();
    cy.contains("Delete Tag").click();
    cy.contains("1 Tag");
    cy.contains("react").should("not.exist");
  });
});

//////////////////////////////////////////////////////////////
/////////////////////////Answers//////////////////////////////
//////////////////////////////////////////////////////////////
describe("Answers", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Guest user Get Question Answers", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Continue as a guest user").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile").should("not.exist");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question").should("not.exist");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question").should("not.exist");
    cy.contains("Answer Question").should("not.exist");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
    const qVotesBefore = ["0 votes", "0 votes"];
    cy.get("#formattedAnswers .so-upper-div .answerVotes").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qVotesBefore[index]);
    });
  });
  it("Logged in user Get Question Answers", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
  });
  it("Registerd user upvote and downvote answers", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("cmorgan");
    cy.get("#password").type("1234");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Ask a Question");
    cy.get("#searchBar");
    cy.contains("cmorgan");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
    const qVotesBefore = ["0 votes", "0 votes"];
    cy.get("#formattedAnswers .so-upper-div .answerVotes").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qVotesBefore[index]);
    });
    cy.get(".so-answer-upvote").contains("▲").eq(0).click();
    const qVotesAfter = ["1 vote", "0 votes"];
    cy.get("#formattedAnswers .so-upper-div .answerVotes").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qVotesAfter[index]);
    });
    cy.get(".so-answer-downvote").contains("▼").eq(0).click();
    const qVotesAfterDownvote = ["-1 votes", "0 votes"];
    cy.get("#formattedAnswers .so-upper-div .answerVotes").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qVotesAfterDownvote[index]);
    });
    cy.contains("Logout").click();
  });
  it("Registered User with less than 50 rep tries to upvote and downvote", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login as an existing user").click();
    cy.get("#username").type("mjn0830");
    cy.get("#password").type("abcd");
    cy.get("#loginButton").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("All Questions");
    cy.contains("7 questions");
    cy.contains("Questions");
    cy.contains("Tags");
    cy.contains("Profile");
    cy.contains("Newest");
    cy.contains("Active");
    cy.contains("Unanswered");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains("2 answers");
    cy.contains("1 views");
    cy.contains("Ask a Question");
    cy.contains("Answer Question");
    cy.contains(
      "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate"
    );
    cy.contains("mjn0830");
    cy.contains("Nov 26, 2023 3:24");
    const qAnswers = [
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.get("#formattedAnswers").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qAnswers[index]);
    });
    cy.get(".so-answer-upvote").contains("▲").eq(0).click();
    cy.contains("Need 50 rep to vote");
    cy.get(".so-answer-downvote").contains("▼").eq(0).click();
    cy.contains("Need 50 rep to vote");
  });
});

///////////////////////////////////////////////////////////////
/////////////////////////New Answer//////////////////////////////
//////////////////////////////////////////////////////////////
describe("New Answer", () => {
  beforeEach(_init);
  afterEach(_destroy);
  it("Shows Welcome message", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome to our Fake Stack Overflow");
  });
  it("Shows options in welcome page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Register as a new user");
    cy.contains("Login as an existing user");
    cy.contains("Continue as a guest user");
  });
});

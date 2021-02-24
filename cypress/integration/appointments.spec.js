describe("Booking", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")

    cy.visit("/");

    cy.contains("Monday");

  })

  it("Should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type("Lydia Miller-Jones");

    cy.get('[alt="Sylvia Palmer"]').click()

    cy.contains('Save').click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("Should cancel an existing interview", () => {

    cy.get("[alt=Delete]").click({ force: true })
    cy.contains('Confirm').click()

    cy.contains("Deleting").should('exist')
    cy.contains("Deleting").should('not.exist')

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should('not.exist')

  })
})

// We can also perform a test to cancel an existing interview. It is for this reason that we need to reset the database after each test. If one test cancels and interview and the next test expects that interview to exist, then our tests can break for reasons unrelated to our code quality.

// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty
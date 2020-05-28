
describe("Broad behavioral test", () => {
  it("Enter website", () => {
    cy.visit("http://localhost:3000/")
    cy.get("button").click()
  })
  it("Add a counter", () => {
    cy.get("button#add").click()
    cy.get("div.name-input input").type("This is a test counter")
    cy.get("button").contains("Save").click()
  })
  it("Add a long counter", () => {
    cy.get("button#add").children("span").click()
    cy.get("div.name-input input").type("This is a long counter test name that's suposed to be displayed correctly")
    cy.get("button").contains("Save").click()
  })
  it("Add an example counter", () => {
    cy.get("button#add").click()
    cy.get("span.link").click()
    cy.get("div.badge-container").first().parent().scrollTo("right")
    cy.get(".badge-container").contains("Milk shakes").scrollIntoView().click()
  })
  it("Add 3 counts to first counter", () => {
    const plus = cy.get("div#plus").first()
    plus.click()
    plus.click()
    plus.click()
  })
  it("Remove 2 counts from first counter", () => {
    const minus = cy.get("div#minus").first()
    minus.click()
    minus.click()
  })
  it("Search for Milk Shakes and add 1", () => {
    cy.get("input").type("shakes")
    cy.get("div#plus").first().click()
    cy.get("button").contains("Cancel").click()
  })
  it("Search for something that's not present", () => {
    cy.get("input").type("doesn't-exists")
    cy.get("div.counter-content").should('not.exist')
    cy.contains("No results").should('exist')
    cy.get("button").contains("Cancel").click()
  })
  it("Select a counter pressing for 300ms", () => {
    cy.get("div.counter-content").first().trigger('mousedown')
    cy.wait(500)
    cy.get("div.counter-content").first().trigger('mouseleave')
  })
  it("Copy it's content with the share button", () => {
    cy.get("button#share").click()
    cy.wait(1000)
    cy.get("button").contains("Copy").click()
  })
  it("Delete mutiple counters", () => {
    cy.get("div.counter-content").eq(0).click()
    cy.get("div.counter-content").eq(1).trigger('mousedown')
    cy.wait(500)
    cy.get("div.counter-content").eq(1).trigger('mouseleave')
    cy.get("div.counter-content").eq(2).trigger('mousedown')
    cy.wait(500)
    cy.get("div.counter-content").eq(2).trigger('mouseleave')

    cy.get("button#delete").click()
    cy.get("button").contains("Delete").click()
  })
})
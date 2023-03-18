Feature: Searching through YouTube website

  Scenario Outline: Open YouTube website and search for a specific band
    Given I open the website <url>
    When I get browser cookies and generate access token
    And I enter <Search Text> in YouTube Search bar
    And I click on Search button
    Then I should see valid result for "<Search Text>"

    Examples:
      | url                      | Search Text  |
      | https://www.youtube.com/ | Linkin Park  |

  # Scenario Outline: Test YouTube website's search API 
  #   Given Base URL is "<baseURL>"
  #   # When I GET from path "<search_endpoint>"
  #   # And I GET from path "<search_endpoint>" and save response as "search_response"
  #   # Then I assert that response status is "200" and response text is "OK"

  #   Examples:
  #     | baseURL                                     | search_endpoint                                           |
  #     | https://suggestqueries-clients6.youtube.com | /complete/search?client=youtube&hl=en&gl=in&q=linkin park |

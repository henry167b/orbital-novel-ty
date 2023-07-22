import React from "react";
import TestRenderer, { act } from "react-test-renderer";

import BookLists, { LoanList } from "../app/(home)/booklists";
import { LoanlistScraperWebView } from "../scrapers/loanlist_scraper";

jest.mock('../scrapers/loanlist_scraper', () => ({
  LoanlistScraperWebView: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe("<BookLists />", () => {
  it("can render", () => {
    const tree = TestRenderer.create(<BookLists />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<LoanList />', () => {
  it('renders correctly', async () => {
    const tree = TestRenderer.create(<LoanList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders LoanlistScraperWebView when data is null', () => {
    // Create a test renderer for the LoanList component
    const testRenderer = TestRenderer.create(<LoanList />);

    // Assert that LoanlistScraperWebView is rendered when data is null
    expect(LoanlistScraperWebView).toHaveBeenCalled();
  });
});
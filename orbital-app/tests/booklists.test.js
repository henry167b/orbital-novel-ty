import React from "react";
import renderer from "react-test-renderer";

import BookLists from "../app/(home)/booklists";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe("<BookLists />", () => {
  it("can render", () => {
    const tree = renderer.create(<BookLists />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
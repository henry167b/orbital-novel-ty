import React from "react";
import renderer from "react-test-renderer";

import Home from "../app/(home)/index";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useFocusEffect: () => ({
    replace: jest.fn()
  }),
}));

describe("<Home />", () => {
  it("can render", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

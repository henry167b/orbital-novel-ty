import React from "react";
import renderer from "react-test-renderer";

import Libraries from "../app/(home)/libraries";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useFocusEffect: () => ({
    replace: jest.fn()
  }),
}));

describe("<Libraries />", () => {
  it("can render", () => {
    const tree = renderer.create(<Libraries />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

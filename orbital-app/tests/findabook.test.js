import React from "react";
import renderer from "react-test-renderer";

import FindABook from "../app/(home)/findabook";

jest.mock("expo-router", () => ({
    useRouter: () => ({
      replace: jest.fn(),
    }),
    useFocusEffect: () => ({
      replace: jest.fn()
    }),
  }));

describe("<FindABook />", () => {
  it("can render", () => {
    const tree = renderer.create(<FindABook />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
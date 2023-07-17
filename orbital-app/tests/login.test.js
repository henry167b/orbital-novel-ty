import React from "react";
import renderer from "react-test-renderer";

import Login from "../app/(auth)/login";


describe("<Login />", () => {
  it("can render", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has 1 child", () => {
    const tree = renderer.create(<Login />).toJSON();
    console.log(tree[1]);
    expect(tree[0].children.length).toBe(2);
  })
});

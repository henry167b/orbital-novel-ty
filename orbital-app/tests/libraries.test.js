import React from "react";
import TestRenderer, {act} from "react-test-renderer";

import Libraries from "../app/(home)/libraries";
import { getLibraries, getBooks } from "../async_storage/storage";

jest.mock("../async_storage/storage", () => ({
  getLibraries: jest.fn().mockResolvedValue([
    { name: 'Library1', location: 'Location1', books: [{ isbn: 'ISBN 1', title: 'Test Book', author: 'Test Author', bid: 'BID1' }] },
    { name: 'Library2', location: 'Location2', books: [] },
  ]),
  getBooks: jest.fn().mockResolvedValue([{ isbn: 'ISBN 1', title: 'Test Book', author: 'Test Author', bid: 'BID1' }])
}))

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useFocusEffect: jest.fn()
}));

describe("<Libraries />", () => {
  it("can render", async () => {
    const tree = TestRenderer.create(<Libraries />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
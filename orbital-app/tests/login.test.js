import React from "react";
import renderer from "react-test-renderer";

import Login from "../app/(auth)/login";

const mockSignIn = jest.fn();

jest.mock('../contexts/auth', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
  }),
}));

jest.mock('../async_storage/storage', () => ({
  clearRecentSearches: jest.fn(),
}));

// jest.mock('react-native-webview', () => 'WebView');



describe("<Login />", () => {
  it("can render", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has 1 child", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree[0].children.length).toBe(2);
  })
});

// describe('Login', () => {
//   it('bypass works', () => {
//     const component = renderer.create(<Login />);
//     const instance = component.root;

//     // Get the username and password TextInput components
//     const usernameInput = instance.findByProps({ testID: 'username-input' });
//     const passwordInput = instance.findByProps({ testID: 'password-input' });

//     // Set invalid login details
//     usernameInput.props.onChangeText('novelty');
//     passwordInput.props.onChangeText('password');

//     // Get the SIGN IN button component
//     const signInButton = instance.findByProps({ testID: 'button' });

//     // Trigger onPress event of the SIGN IN button
//     signInButton.props.onPress();

//     // Assert that the error message is displayed
//     expect(mockSignIn).toHaveBeenCalledWith('novelty', 'password');
//   });

//   it('should bypass login for valid preset user', () => {
//     const component = renderer.create(<Login />);
//     const instance = component.root;

//     // Get the username and password TextInput components
//     const usernameInput = instance.findByProps({ testID: 'username-input' });
//     const passwordInput = instance.findByProps({ testID: 'password-input' });

//     // Set valid preset login details
//     usernameInput.props.onChangeText('novelty');
//     passwordInput.props.onChangeText('password');

//     // Get the SIGN IN button component
//     const signInButton = instance.findByProps({ testID: 'button' });

//     // Trigger onPress event of the SIGN IN button
//     signInButton.props.onPress();

//     // Get the error message component
//     const errorMessage = instance.findByProps({ testID: 'error-message' });

//     // Assert that the error message is not displayed
//     expect(errorMessage).toBeUndefined();

//     // Get the loading indicator component
//     const loadingIndicator = instance.findByProps({ testID: 'loading-indicator' });

//     // Assert that the loading indicator is not displayed
//     expect(loadingIndicator).toBeUndefined();

//     // Get the WebView component
//     const webView = instance.findByProps({ testID: 'webview' });

//     // Assert that the WebView is present (bypassed login)
//     expect(webView).toBeTruthy();
//   });
// });
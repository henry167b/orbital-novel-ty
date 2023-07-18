import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import axios from 'axios';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('axios');

jest.useFakeTimers();
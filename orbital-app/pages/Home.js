import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Text, Button, Divider } from 'react-native-paper';

function HomeBar() {
  return (
		<Appbar.Header style={styles.bar} elevated="true" mode="center-aligned">
			<Appbar.BackAction />
			<Appbar.Content title="Novel-ty" />
			<Appbar.Action icon="bell" />
			<Appbar.Action icon="dots-vertical" />
		</Appbar.Header>
	);
}

function Events() {
	return (
		<View style={styles.events}>
			<Text>Upcoming Events</Text>
			<Divider style={{borderColor: 'black', opacity: 100}}/>
			<Button mode='contained-tonal'>
				View More
			</Button>
		</View>
	);
}

function BookSeat() {
	return (
		<Button>
			Book a seat
		</Button>
	);
}

function FindBook() {
	return (
		<Button>
			Find a book
		</Button>
	);
}

function Functions() {
	return (
		<View>
			<BookSeat />
			<FindBook /> 
		</View>
	);
}

export function Home() {
  return (
    <SafeAreaProvider>
			<HomeBar />
			<Events />
			<Functions />
		</SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
    alignItems: 'center',
    justifyContent: 'start',
  },
	bar: {
		backgroundColor: '#DBE9FD',
		borderBottomWidth: 0.5,
	},
	events: {
		alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 30,
    gap: 20,
    width: '75%',
    borderRadius: 10
	}
});

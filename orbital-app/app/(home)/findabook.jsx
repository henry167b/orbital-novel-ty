import { useFocusEffect, useRouter } from "expo-router";
import { Button, Appbar, Surface, Text, TextInput, Searchbar, Divider } from "react-native-paper";
import { Modal, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAvailability, search , getTitleDetails} from "../../nlb_api/nlb";
import { addBook } from "../../async_storage/storage";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Animated } from "react-native";
import { addRecentSearch } from "../../async_storage/storage";
import { getRecentSearches } from "../../async_storage/storage";
import { AddToWishlist } from "../../scrapers/wishlist_scraper";


function Search({ searchNLB }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    searchNLB(searchQuery);
    addRecentSearch(searchQuery); // Add search query to recent searches
  };

  return (
    <Searchbar
      placeholder="Search keywords or ISBN"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
      onIconPress={handleSearch}
      onSubmitEditing={handleSearch}
      mode="bar"
    />
  );
}

function Bookbox({ book, brnToAdd, setBrnToAdd }) {
  const [modalVisible, setModalVisible] = useState(false); 

  const handleAddtoWishList = () => {
    setBrnToAdd(book.bid);
    addBook(book);
    console.log("ISBN:", book.isbn); // to be removed afterwards
    setModalVisible(true);
  };

  return (
    <View style={styles.book}>
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>ISBN: {book.isbn}</Text>
      {true && (
        <LogButton onPress={handleAddtoWishList} text="Add to Wish List" />
      )}
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Book is added to Wishlist</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Searchresults({ data, brnToAdd, setBrnToAdd }) {
  return (
    <View style={styles.searchResults}>
      <Text>RESULTS</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', marginVertical: 20 }}
        data={data}
        renderItem={({ item }) => <Bookbox book={item} brnToAdd={brnToAdd} setBrnToAdd={setBrnToAdd} />}
      />
    </View>
  );
}

function RecentSearches({ searchNLB, setSearchQuery }) {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    const searches = await getRecentSearches();
    setRecentSearches(searches);
  };

  const handleRecentSearch = (searchQuery) => {
    setSearchQuery(searchQuery); // Set the search query in the state
    searchNLB(searchQuery); // Trigger the search with the updated query
  };

  return (
    <View style={styles.recentSearches}>
      <Text>RECENT SEARCHES</Text>
      <Text></Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => handleRecentSearch(item)}
          style={styles.recentSearchButtonContainer}
          >
            <Text style={styles.recentSearchButton}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function Recommended() {
  return (
    <View style={styles.recommended}>
      <Text>RECOMMENDED FOR YOU</Text>
    </View>
  );
}

export default function FindABook() {
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [brnToAdd, setBrnToAdd] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const searchNLB = (query) => {
    if ((query.length == 10 || query.length == 13) && /^\d+$/.test(query)) {
      getTitleDetails('', query).then(res => {
        setData(res);
        setShowSearch(true);
      })
    } else {
      search(query).then(res => {
        setData(res);
        setShowSearch(true);
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setShowSearch(false);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Search searchNLB={searchNLB} setSearchQuery={setSearchQuery} />
      <Divider style={{ width: '100%' }} />
      {brnToAdd && <AddToWishlist brnToAdd={brnToAdd} setBrnToAdd={setBrnToAdd} />}
      {showSearch && <Searchresults data={data} brnToAdd={brnToAdd} setBrnToAdd={setBrnToAdd} />}
      {!showSearch && (
        <RecentSearches searchNLB={searchNLB} setSearchQuery={setSearchQuery} />
      )}
      {!showSearch && <Recommended />}
      
    </SafeAreaView>
  );
}

function LogButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchbar: {
    backgroundColor: "#F3F6F8",
    width: '80%',
    borderRadius: 10,
    marginHorizontal: 35,
    marginVertical: 25,
    height: 50
  },
  recentSearches: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingBottom: 20,
    paddingTop: 20
  },
  recentSearchButton: {
    fontSize:15,
    fontWeight: 'bold'
  },
  recentSearchButtonContainer: {
    backgroundColor: '#F3F6F8',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity:0.25,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:10,
    margin:5
  },
  recommended: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 20
  },
  searchResults: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 20
  },
  book: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0,
    borderRadius: 5,
    margin: 10,
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4, // for Android 
  },
  button: {
    backgroundColor: "#0D98C0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 500,
    marginTop: 10,
    },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center"
    },
    modalText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20
    },
    modalButton: {
      backgroundColor: "#0D98C0",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5
    },
    modalButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
    }
});

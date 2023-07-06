import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAvailability } from "../nlb_api/nlb";

const booksObject = [];

const librariesObject = [
  { name: 'Tampines Regional Library', location: '1 Tampines Walk Our Tampines Hub #02-01 Singapore 528523', books: [] },
  { name: 'Woodlands Regional Library', location: '900 South Woodlands Drive #01-03 Singapore 730900', books: [] },
  { name: 'Clementi Public Library', location: '3155 Commonwealth Avenue West The Clementi Mall #05-13/14/15 Singapore 129588', books: [] },
  { name: 'Lee Kong Chian Reference Library', location: '100 Victoria Street Singapore 188064', books: [] },
  { name: 'Ang Mo Kio Public Library', location: '4300 Ang Mo Kio Avenue 6 Singapore 569842', books: [] },
  { name: 'Bukit Batok Public Library', location: '1 Bukit Batok Central Link West Mall #03-01 Singapore 658713', books: [] },
  { name: 'Bukit Panjang Public Library', location: '1 Jelebu Road Bukit Panjang Plaza #04-04 & 16/17 Singapore 677743', books: [] },
  { name: 'Central Public Library', location: '100 Victoria Street National Library Board Singapore 188064', books: [] },
  { name: 'Cheng San Public Library', location: '90 Hougang Avenue 10 Hougang Mall #03-11 Singapore 538766', books: [] },
  { name: 'Choa Chu Kang Public Library', location: '21 Choa Chu Kang Ave 4 Lot One Shoppers Mall #04-01/02 and #05-06 Singapore 689812', books: [] },
  { name: 'Geylang East Public Library', location: '50 Geylang East Ave 1 Singapore 389777', books: [] },
  { name: 'Jurong Regional Library', location: '21 Jurong East Central 1 Singapore 609732', books: [] },
  { name: 'Jurong West Public Library', location: '60 Jurong West Central 3 #01-03 Singapore 648346', books: [] },
  { name: 'Queenstown Public Library', location: '53 Margaret Drive Singapore 149297', books: [] },
  { name: 'Toa Payoh Public Library', location: '6 Toa Payoh Central Singapore 319191', books: [] },
  { name: 'Yishun Public Library', location: '930 Yishun Ave 2 North Wing, Northpoint City #04-01 Singapore 769098', books: [] },
  { name: 'library@orchard', location: '277 Orchard Road orchardgateway #03-12 / #04-11 Singapore 238858', books: [] },
  { name: 'library@chinatown', location: '133 New Bridge Road Chinatown Point #04-12 Singapore 059413', books: [] },
  { name: 'Sembawang Public Library', location: '30 Sembawang Drive Sun Plaza #05-01 Singapore 757713', books: [] },
  { name: 'Serangoon Public Library', location: '23 Serangoon Central NEX #04-82/83 Singapore 556083', books: [] },
  { name: 'Bedok Public Library', location: '11 Bedok North Street 1 Heartbeat@Bedok #02-03 & #03-04 Singapore 469662', books: [] },
  { name: 'Sengkang Public Library', location: '1 Sengkang Square Compass One #03-28 & #04-19 Singapore 545078', books: [] },
  { name: 'Pasir Ris Public Library', location: '1 Pasir Ris Central St 3 White Sands #04-01/06 Singapore 518457', books: [] },
  { name: 'Bishan Public Library', location: '5 Bishan Place #01-01 Singapore 579841', books: [] },  
  { name: 'library@harbourfront', location: '1 Harbourfront Walk VivoCity #03-05 (Lobby F) Singapore 098585', books: [] },
  { name: 'Punggol Regional Library', location: '1 Punggol Drive One Punggol #01-12 Singapore 828629', books: [] }
]

export const addBook = async (book) => {
  try {
    const ISBN = book.isbn;

    const jsonBooks = await AsyncStorage.getItem("@books");
    const books = JSON.parse(jsonBooks);
    if (books.some(b => b.isbn == ISBN)) { return }
    books.push(book);

    await AsyncStorage.setItem("@books", JSON.stringify(books));

    const jsonLibs = await AsyncStorage.getItem("@libraries");
    const libraries = JSON.parse(jsonLibs);

    await getAvailability(ISBN).then( locations => {
      for (let i = 0; i < locations.length; i++) {
        const library = libraries.find(element => element.name == locations[i]);

        if (library != null && !library.books.some(b => b.isbn == ISBN)) { library.books.push(book) }
      }
    })
    await AsyncStorage.setItem("@libraries", JSON.stringify(libraries));
  } catch (e) {
    console.log(e);
  }
}

export const addManyBooks = async (books) => {
  try {
    const jsonBooks = await AsyncStorage.getItem("@books");
    const booksStorage = JSON.parse(jsonBooks);

    for (let i = 0; i < books.length; i++) {
      const bk = books[i];
      if (booksStorage.some(b => b.isbn == bk.isbn)) {
        books.splice(i, 1);
        continue;
      }
      booksStorage.push(bk);
    }

    await AsyncStorage.setItem("@books", JSON.stringify(books));

    const jsonLibs = await AsyncStorage.getItem("@libraries");
    const libraries = JSON.parse(jsonLibs);

    await Promise.all(
      books.map( async bk => { 
        const locations = await getAvailability(bk.isbn);
        for (let i = 0; i < locations.length; i++) {
          const library = libraries.find(element => element.name == locations[i]);
  
          if (library != null && !library.books.some(b => b.isbn == bk.ISBN)) { library.books.push(bk) }
        }
      }));

    await AsyncStorage.setItem("@libraries", JSON.stringify(libraries));

  } catch (e) {
    console.log(e);
  }
}

export const removeBook = async (book) => {
  try {
    const ISBN = book.isbn;
    const jsonBooks = await AsyncStorage.getItem("@books");
    const books = JSON.parse(jsonBooks);
    const index = books.findIndex(b => b.isbn == ISBN);
    books.splice(index, 1);
    await AsyncStorage.setItem("@books", JSON.stringify(books));

    const jsonLibs = await AsyncStorage.getItem("@libraries");
    const libraries = JSON.parse(jsonLibs);
    libraries.filter( lib => lib.books.some(b => b.isbn == ISBN) ).forEach( lib => {
      const index = lib.books.findIndex(b => b.isbn == ISBN);
      lib.books.splice(index, 1);
    });
    AsyncStorage.setItem("@libraries", JSON.stringify(libraries));
  } catch (e) {
    console.log(e);
  }
}

export const getBooks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@books');
    if (jsonValue != null) {
      const parsedData = JSON.parse(jsonValue);
      return parsedData;
    }
  } catch(e) {
    console.log(e);
  }
}

export const getLibraries = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@libraries');
    if (jsonValue != null) {
      const parsedData = JSON.parse(jsonValue);
      return parsedData;
    }
  } catch(e) {
    console.log(e);
  }
}

export const hasDefaults = () => {
  try {
    
    return AsyncStorage.getAllKeys().then(keys => {
      return keys.includes('@books') && keys.includes('@libraries');
    });
    
  } catch (e) {
    console.log(e);
  }
}

export const storeDefaults = () => {
  try {
    AsyncStorage.multiSet([["@libraries", JSON.stringify(librariesObject)], ["@books", JSON.stringify(booksObject)]]);
  } catch (e) {
    console.log(e);
  }
};

//new shit below

export const addRecentSearch = async (searchQuery) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@recentSearches');
    let recentSearches = [];

    if (jsonValue != null) {
      recentSearches = JSON.parse(jsonValue);
    }

    // Add the new search query to the beginning of the array
    recentSearches.unshift(searchQuery);

    // Limit the array to store up to three objects
    recentSearches = recentSearches.slice(0, 3);

    await AsyncStorage.setItem('@recentSearches', JSON.stringify(recentSearches));
  } catch (e) {
    console.log(e);
  }
};

export const getRecentSearches = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@recentSearches');
    if (jsonValue != null) {
      const parsedData = JSON.parse(jsonValue);
      return parsedData;
    }
  } catch (e) {
    console.log(e);
  }
};

import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";
import config from "../../config";

const HomeScreen = () => {
  const { height, width } = useWindowDimensions();

  const [coins, setCoins] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState(0);

  const fetchCoins = async () => {
    setLoading(true);

    setPageNumber((prevState) => prevState + 1);

    const response = await getMarketData(pageNumber);

    setCoins((existingCoins) => [...existingCoins, ...response]);

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // const footerIndicator = () => {
  //   console.log("GİRDİM");
  //   return loading ? (
  //     <View
  //       style={{
  //         backgroundColor: "green",
  //         flexDirection: "row",
  //         height: 50,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         position: "absolute",
  //         bottom: 0,
  //       }}>
  //       <ActivityIndicator animating size="large" color={"white"} />
  //     </View>
  //   ) : null;
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Text
        style={{
          fontFamily: "DroidSans",
          color: "white",
          fontSize: 25,
          letterSpacing: 1,
          paddingHorizontal: 20,
          paddingBottom: 5,
        }}>
        Kripto Para
      </Text>

      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) =>
          console.log(`${item.id}_${item.symbol}`) ||
          `${item.id}_${item.symbol}`
        }
        onEndReached={fetchCoins}
        // ListFooterComponent={footerIndicator}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={fetchCoins}
            size={30}
          />
        }
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

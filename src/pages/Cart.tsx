import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { removeMovie } from "../redux/actions";
import { IMovieItem } from "../types/IMovie";
import { IState } from "../types/IState";

const mapStateToProps = (state: IState) => state.cart;

function Cart({ cart, removeMovie }: IState) {

  function handleRemoveMovie(movie: IMovieItem) {
    removeMovie(movie);
  }

  return (
    <ScrollView style={styles.container}>
      {cart.map(movie => {
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        return (
          <View style={styles.viewContainer} key={movie.id}>
            <TouchableOpacity
              onPress={() => handleRemoveMovie(movie)}
              activeOpacity={0.7}
              style={styles.itemStyle}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  viewContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle: {
    width: 200,
    height: 300,
    marginVertical: 8
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.65,

    elevation: 12,
  }
});

export default connect(mapStateToProps, { removeMovie })(Cart);

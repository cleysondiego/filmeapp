import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux';

import { removeMovie } from '../redux/actions';
import { IMovie } from '../types/IMovie';

interface ICartState {
  cart: IMovie[],
  removeMovie: (movie: IMovie) => void;
}

const mapStateToProps = (state: ICartState) => state.cart;

function Cart({ cart, removeMovie }: ICartState) {
  const showAlert = (movie: IMovie) => Alert.alert(
    'Atenção!',
    'Você realmente deseja remover o filme do carrinho?',
    [
      {
        text: 'Remover',
        onPress: () => removeMovie(movie),
        style: 'default',
      },
      {
        text: 'Cancelar',
        style: 'cancel'
      }
    ],
    {
      cancelable: true,
    }
  );

  return (
    <ScrollView style={styles.container}>
      {cart.map(movie => {
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        return (
          <View style={styles.viewContainer} key={movie.id}>
            <TouchableOpacity
              onPress={() => showAlert(movie)}
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
    shadowColor: '#000',
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

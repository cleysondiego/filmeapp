import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <ScrollView contentContainerStyle={styles.container}>
      {cart.length > 0 ? cart.map(movie => {
          const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

          return (
            <View style={styles.view} key={movie.id}>
              <View style={styles.viewContainer}>
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
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 24 }}>{movie.title}</Text>
              </View>
            </View>
          );
        })
        :
        (
          <View style={styles.messageContainer}>
            <Text>
              <Icon name='cart-outline' size={23} />
              Carrinho vazio!
            </Text>
          </View>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, { removeMovie })(Cart);

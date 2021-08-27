import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getMovieInfo } from '../redux/actions';
import { IStackParamList } from '../types/IStackParamsList';

interface IProps extends StackScreenProps<IStackParamList, 'MovieInfo'> {
  getMovieInfo: (id: number) => void;
}

type IMoviesNavigation = StackNavigationProp<IStackParamList, 'Movies'>;

const screenHeigth = Dimensions.get('screen').height

function MovieInfo({ route, getMovieInfo }: IProps) {
  const { movie } = route.params;
  const navigation = useNavigation<IMoviesNavigation>();

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const showAlert = () => Alert.alert(
    'Atenção!',
    'Você realmente deseja adicionar o filme ao carrinho?',
    [
      {
        text: 'Adicionar',
        onPress: () => handleAddMovieToCart(),
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

  function handleAddMovieToCart() {
    getMovieInfo(movie.id)
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageBorder}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri }}
              style={styles.posterImage}
            />
          </View>
        </View>

        <View style={styles.marginContainer}>
            <Text style={styles.subtitle}>{movie.original_title}</Text>
            <Text style={styles.title}>{movie.title}</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>

          <View style={{ flexDirection: 'row' }}>
            <Icon name='star-outline' color='gray' size={16} />
            <Text>{movie.vote_average}</Text>
          </View>

          <Text style={styles.sinopse}>
            Sinopse
          </Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={showAlert} style={{ marginBottom: 8 }}>
            <Text style={styles.buttonsText}>
              <Icon name='cart-outline' size={23} />
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Text style={styles.buttonsText}>
              <Icon name='arrow-back-outline' size={23} />
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  posterImage: {
    flex: 1
  },
  imageContainer: {
    width: '100%',
    height: screenHeigth * 0.5,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 20,
  },
  marginContainer: {
    marginTop: 20,
    marginHorizontal: 20
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sinopse: {
    fontSize: 23,
    marginTop: 10,
    fontWeight: 'bold'
  },
  overview: {
    fontSize: 16,
    marginBottom: 20
  },
  buttonsContainer: {
    flex: 1,
    marginBottom: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsText: {
    fontSize: 23,
  }
});

export default connect(null, { getMovieInfo })(MovieInfo);

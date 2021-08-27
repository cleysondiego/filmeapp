import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { api } from '../services/api';
import { IMovie } from '../types/IMovie';
import { IStackParamList } from '../types/IStackParamsList';

interface IApiResponse {
  results: IMovie[]
}

type IMovieInfoNavigation = StackNavigationProp<IStackParamList, 'MovieInfo'>;

function Movies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const navigation = useNavigation<IMovieInfoNavigation>();

  useEffect(() => {
    const FetchData = async (): Promise<void> => {
      try {
        const response = await api.get<IApiResponse>('/movie/popular');

        setMovies(response.data.results);
      } catch(error) {
        console.error(error);
      }

    }

    FetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {movies && movies.map(movie => {
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        return (
          <View style={styles.view} key={movie.id}>
            <View style={styles.viewContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MovieInfo', { movie })}
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
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  }
});

export default Movies;

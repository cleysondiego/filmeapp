import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { addMovie } from "../redux/actions";
import { api } from "../services/api";
import { IMovieItem } from "../types/IMovie";

type IState = {
  addMovie: (movie: IMovieItem) => void;
}

interface IResponse {
  results: IMovieItem[]
}

function Movies({ addMovie }: IState) {
  const [movies, setMovies] = useState<IMovieItem[]>([]);

  useEffect(() => {
    const FetchData = async (): Promise<void> => {
      try {
        const response = await api.get<IResponse>('/movie/popular');
        // const response = await axios.get<IResponse>(`https://api.themoviedb.org/3/movie/popular?api_key=e125d46a9e74f39d2ecafa3b18ce627d&language=pt-BR`)

        setMovies(response.data.results);
      } catch(err) {
        // alert(err);
      }

    }

    FetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {movies && movies.map(movie => {
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        return (
          <View style={styles.viewContainer} key={movie.id}>
            <TouchableOpacity
              onPress={() => addMovie(movie)}
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

export default connect(null, { addMovie })(Movies);

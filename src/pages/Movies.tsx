import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { getMovieInfo } from "../redux/actions";
import { api } from "../services/api";
import { IMovieItem } from "../types/IMovie";

type IState = {
  getMovieInfo: (id: number) => void;
}

interface IResponse {
  results: IMovieItem[]
}

function Movies({ getMovieInfo }: IState) {
  const [movies, setMovies] = useState<IMovieItem[]>([]);

  useEffect(() => {
    const FetchData = async (): Promise<void> => {
      try {
        const response = await api.get<IResponse>('/movie/popular');

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
          <View style={styles.viewContainer} key={movie.id}>
            <TouchableOpacity
              onPress={() => getMovieInfo(movie.id)}
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

export default connect(null, { getMovieInfo })(Movies);

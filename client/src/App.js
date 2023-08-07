import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom/";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import Film from "./Filmler/Film";
import FilmListesi from "./Filmler/FilmListesi";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın??
        .then((response) => {
          console.log(response.data);
          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.log("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <BrowserRouter>
      <div>
        {loading && <p>loading..</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <h1>Kaydedilenler Listesi</h1>}
        <KaydedilenlerListesi
          list={
            [
              /* Burası esnek */
            ]
          }
        />

        <div>
          <Switch>
            <Route path="/film" exact>
              <Film />
            </Route>

            <Route path="/filmListesi" exact>
              <FilmListesi movies={movieList} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

// import { BrowserRouter } from "react-router-dom/" ekledim, return içindekileri <BrowserRouter></BrowserRouter> ile sardım.loading ve error için useState'leri yazıp response.data'yı console'da görüntüledim.Film ve Filmlistesini import edip switch içerisine routerlerini ekledim.

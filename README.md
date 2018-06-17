# Movie Info service

A sample service intended to demonstrate a microservices environment. This service returns information about a given set of movies (by ids).

## REST Endpoint
This service exposes a REST endpoint:

For batched support:

``` 
  GET /movies?ids=680,1893,12&limit=5&offset=0
```

or for single item:

```
GET /movies?id=680
```

And the response is:

``` javascript
    "metadata": {
        "offset": 0,
        "limit": 3,
        "total": 3
    },
    "data": [
        {
            "id": 680,
            "title": "Pulp Fiction",
            "tagline": "Just because you are a character doesn't mean you have character.",
            "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
            "popularity": 22.685188,
            "runtime": 154,
            "releaseDate": "1994-09-10",
            "revenue": 213928762,
            "budget": 8000000,
            "posterPath": "https://image.tmdb.org/t/p/w342/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
            "originalLanguage": "en",
            "genres": [
                53,
                80
            ],
            "cast": [
                8891,
                2231,
                139,
                62,
                10182,
                1037,
                7036
            ]
        },
        {
            "id": 1893,
            "title": "Star Wars: Episode I - The Phantom Menace",
            "tagline": "Every generation has a legend. Every journey has a first step. Every saga has a beginning.",
            "overview": "Anakin Skywalker, a young slave strong with the Force, is discovered on Tatooine. Meanwhile, the evil Sith have returned, enacting their plot for revenge against the Jedi.",
            "popularity": 22.71543,
            "runtime": 136,
            "releaseDate": "1999-05-19",
            "revenue": 924317558,
            "budget": 115000000,
            "posterPath": "https://image.tmdb.org/t/p/w342/n8V09dDc02KsSN6Q4hC2BX6hN8X.jpg",
            "originalLanguage": "en",
            "genres": [
                12,
                28,
                878
            ],
            "cast": [
                3896,
                3061,
                524,
                33196,
                27762,
                6,
                130
            ]
        },
        {
            "id": 12,
            "title": "Finding Nemo",
            "tagline": "There are 3.7 trillion fish in the ocean. They're looking for one.",
            "overview": "Nemo, an adventurous young clownfish, is unexpectedly taken from his Great Barrier Reef home to a dentist's office aquarium. It's up to his worrisome father Marlin and a friendly but forgetful fish Dory to bring Nemo home -- meeting vegetarian sharks, surfer dude turtles, hypnotic jellyfish, hungry seagulls, and more along the way.",
            "popularity": 22.619522,
            "runtime": 100,
            "releaseDate": "2003-05-30",
            "revenue": 940335536,
            "budget": 94000000,
            "posterPath": "https://image.tmdb.org/t/p/w342/syPWyeeqzTQIxjIUaIFI7d0TyEY.jpg",
            "originalLanguage": "en",
            "genres": [
                16,
                10751
            ],
            "cast": [
                13,
                14,
                12,
                5293,
                18,
                19,
                17401
            ]
        }
    ]
```

## Docker
Following ENV variables are available:

`SERVICE_NAME`: movie-info (Default)

`FAIL_PERCENT`: 0.3 (Default) - Indicates the percent of time this service will simulate a failure (500 response). This is used to simulate failures so that you can test retries, circuit breakers etc.

`MAX_ALLOWED`: 10 (Default) - Maximum number of items can be passed in ids argument for batching.



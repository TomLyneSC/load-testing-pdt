package main

import (
	"fmt"
	"html"
	"log"
	"math/rand/v2"
	"net/http"
	"time"
)

func main() {

	var cache = map[int]int{}
	i := 0

	cache[i] = i

	http.HandleFunc("/normal", func(w http.ResponseWriter, r *http.Request) {
		log.Println(time.Now().GoString())

		//cache[i] = i
		//i++

		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	http.HandleFunc("/laggy", func(w http.ResponseWriter, r *http.Request) {
		log.Println(time.Now().GoString())

		//cache[i] = i
		//i++

		delay := rand.IntN(220)
		time.Sleep(time.Duration(delay) * time.Millisecond)
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	http.ListenAndServe(":8080", nil)
}

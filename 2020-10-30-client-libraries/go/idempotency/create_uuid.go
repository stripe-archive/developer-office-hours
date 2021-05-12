package main

import (
  "fmt"

  guuid "github.com/google/uuid"
)

func main() {
  id := guuid.New()
	fmt.Printf(id.String() + "\n")
}

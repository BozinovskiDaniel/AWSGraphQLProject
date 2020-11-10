## Notes

- Retrieves all the books with the given fields

```graphql
query {
  books {
    id
    name
    genre
    author {
      id
      name
      age
      books {
        name
      }
    }
  }
}
```

- Roots Queries describe how connections are made

```graphql
query {
  user(id: "234") {
    age
    name
  }
}
```

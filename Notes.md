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

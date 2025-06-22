# 🎬 CineSeek - Movie Discovery API Integration

This project integrates the **MoviesDatabase API** to fetch and display dynamic movie content. It uses TypeScript for strict typing and Next.js for building a responsive frontend.

---

## 🔍 API Overview

The **MoviesDatabase API** provides access to a vast collection of movies and TV shows. It allows developers to:

- Retrieve movie and show details
- Search by title, year, or genre
- Implement pagination for large results
- Filter content efficiently

---

## 🧭 API Version

**Version:** v1 (as per official documentation)

---

## 📌 Available Endpoints

| Endpoint                     | Description |
|-----------------------------|-------------|
| `/titles`                   | Main endpoint for listing movies and shows |
| `/titles/search/title`      | Search for a movie/show by its title |
| `/titles/{id}`              | Get detailed information about a specific title |
| `/genres`                   | List all available genres |
| `/titles/utils/genres`      | Helper for genre-based filtering |

---

## 🔄 Request and Response Format

### Example Request (GET):
```http
GET /titles?year=2020&genre=action&page=1
Headers:
  x-rapidapi-host: moviesdatabase.p.rapidapi.com
  x-rapidapi-key: YOUR_API_KEY

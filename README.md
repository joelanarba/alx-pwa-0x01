# 🎬 CineSeek – MoviesDatabase API Integration

A modern movie discovery app that leverages the MoviesDatabase API to access comprehensive entertainment data including over 9 million titles and 11 million actors.

## 📊 Project Overview

CineSeek utilizes the MoviesDatabase API to provide detailed movie and TV show information including trailers, awards, biographies, ratings, episodes, and cast information. Perfect for building applications that involve browsing, searching, and filtering movie-related data.

### 🔍 API Capabilities

The **MoviesDatabase API** provides complete and frequently updated data for:

-   **9+ million titles**: Movies, TV series, and episodes
-   **11+ million actors** and crew members
-   YouTube trailer URLs, detailed biographies, awards, ratings
-   Real-time data updates (recent titles weekly, ratings daily)

## 🚀 Getting Started

### Prerequisites

-   API key from RapidAPI MoviesDatabase
-   Node.js environment (for Next.js integration)

### Installation

1.  Clone the repository

```bash
git clone https://github.com/yourusername/cineseek.git
cd cineseek
```

2.  Install dependencies

```bash
npm install
```

3.  Set up environment variables

```bash
# Create .env.local file
MOVIES_API_KEY=your_rapidapi_key_here
```

4.  Start development server

```bash
npm run dev
```

## 📚 API Documentation

### 🔐 Authentication

All requests require the following headers:

```http
x-rapidapi-host: moviesdatabase.p.rapidapi.com
x-rapidapi-key: YOUR_API_KEY
```

### 🎥 Titles Endpoints

| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| **Get Titles** | `GET` | `/titles` | Returns titles with optional filters |
| **Titles by IDs** | `GET` | `/x/titles-by-ids` | Fetch multiple titles using ID list |
| **Title Details** | `GET` | `/titles/{id}` | Get comprehensive title information |
| **Title Ratings** | `GET` | `/titles/{id}/ratings` | Ratings and vote counts |
| **Upcoming Releases** | `GET` | `/titles/x/upcoming` | Get upcoming movie releases |

### 📺 Series & Episodes

| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| **Series Episodes** | `GET` | `/titles/series/{id}` | All episodes in a series |
| **Season Count** | `GET` | `/titles/seasons/{id}` | Number of seasons |
| **Episodes by Season** | `GET` | `/titles/series/{id}/{season}` | Episodes for specific season |
| **Episode Details** | `GET` | `/titles/episode/{id}` | Complete episode information |

### 🔍 Search Functionality

| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| **Keyword Search** | `GET` | `/titles/search/keyword/{keyword}` | Find titles by keyword |
| **Title Search** | `GET` | `/titles/search/title/{title}` | Search by exact/partial title |
| **Alternative Title Search** | `GET` | `/titles/search/akas/{aka}` | Search by alternative titles |

### 👤 Actors & Cast

| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| **All Actors** | `GET` | `/actors` | Filterable actor listings |
| **Actor Details** | `GET` | `/actors/{id}` | Complete actor biography |

### ⚙️ Utility Endpoints

| Endpoint | Method | Path | Description |
| --- | --- | --- | --- |
| **Title Types** | `GET` | `/title/utils/titleType` | Available title categories |
| **Genres** | `GET` | `/title/utils/genres` | Movie/TV show genres |
| **Curated Lists** | `GET` | `/title/utils/lists` | Predefined collections (Top 250, etc.) |

## 💡 Usage Examples

### Basic Title Search

```javascript
const searchMovies = async (keyword) => {
  try {
    const response = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles/search/keyword/${keyword}?page=1&limit=10`,
      {
        headers: {
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          'x-rapidapi-key': process.env.MOVIES_API_KEY
        }
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Search failed:', error);
  }
};
```

### Get Title Details

```javascript
const getTitleDetails = async (titleId) => {
  try {
    const response = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles/${titleId}?info=base_info`,
      {
        headers: {
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          'x-rapidapi-key': process.env.MOVIES_API_KEY
        }
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch title details:', error);
  }
};
```

### Sample API Response

```json
{
  "results": [
    {
      "id": "tt1234567",
      "titleText": { "text": "Example Movie" },
      "releaseDate": { "year": 2022 },
      "genres": {
        "genres": [{ "text": "Action" }]
      },
      "primaryImage": {
        "url": "https://example.com/poster.jpg"
      }
    }
  ],
  "page": 1,
  "next": "page=2",
  "entries": 5
}
```

## 🔧 Configuration Options

### Info Parameter Values

Control response data with the `info` parameter:

| Value | Returns |
| --- | --- |
| `mini_info` | Title, ID, image, type, year |
| `base_info` | mini\_info + genres, plot, ratings |
| `rating` | Ratings data only |
| `awards` | Awards summary |
| `creators_directors_writers` | Crew information |

### Query Parameters

```javascript
// Example with multiple filters
const filteredRequest = {
  year: 2022,
  genre: 'Action',
  page: 1,
  limit: 20,
  info: 'base_info'
};
```

## 🚨 Error Handling

| Status Code | Meaning | Solution |
| --- | --- | --- |
| `401` | Unauthorized | Verify API key and headers |
| `429` | Rate limit exceeded | Implement retry logic with delays |
| `500` | Server error | Show fallback UI, retry request |

### Recommended Error Handling

```javascript
const handleApiError = (error, response) => {
  if (response?.status === 401) {
    throw new Error('Invalid API key');
  } else if (response?.status === 429) {
    throw new Error('Rate limit exceeded. Please try again later.');
  } else if (response?.status >= 500) {
    throw new Error('Server error. Please try again.');
  } else {
    throw new Error('Request failed');
  }
};
```

## 📏 Best Practices & Limits

### Usage Guidelines

-   **Rate Limit**: ~500 requests/day (free tier)
-   **Pagination**: Use `limit` (max 50) and `page` parameters
-   **API Key Security**: Store in `.env.local`, never commit to Git
-   **Caching**: Implement response caching to minimize requests
-   **Server-side Requests**: Use Next.js API routes to protect keys

### Performance Optimization

```javascript
// Next.js API route example (/pages/api/movies.js)
export default async function handler(req, res) {
  const { keyword } = req.query;

  try {
    const response = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles/search/keyword/${keyword}`,
      {
        headers: {
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          'x-rapidapi-key': process.env.MOVIES_API_KEY
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
```

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://claude.ai/chat/LICENSE) file for details.

## 🔗 Resources

-   [MoviesDatabase API Documentation](https://rapidapi.com/SAdrian/api/moviesdatabase/)
-   [API Provider Support](https://www.buymeacoffee.com/SAdrian13)
-   [Next.js Documentation](https://nextjs.org/docs)

## 🙋‍♂️ Support

If you have any questions or run into issues:

1.  Check the [Issues](https://github.com/yourusername/cineseek/issues) page
2.  Create a new issue with detailed information
3.  Contact the API provider for service-related questions
* * *

**Built with ❤️ using MoviesDatabase API**

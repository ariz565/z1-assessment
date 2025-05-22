# Movie Search App

![Movie Search App Screenshot](https://via.placeholder.com/800x400?text=Movie+Search+App)

## 📝 Assessment Overview

This project was created as part of a coding assessment to build a live web app that interacts with a public API. The goal was to develop a functional application within a short timeframe (approximately 1 hour) that demonstrates:

- Consuming third-party REST APIs with GET requests
- Managing component state for search terms/results
- Parsing JSON data and rendering it in a user interface

## 🎬 Project Description

The Movie Search App allows users to search for movies using the [OMDb API](https://www.omdbapi.com/). Key features include:

- **Search Functionality**: Users can search for movies by title
- **Results Display**: Shows movie posters, titles, and years in a responsive grid
- **Detailed View**: Clicking on a movie reveals comprehensive information including plot, actors, ratings, etc.
- **Recent Searches**: Tracks and displays recent search terms for quick access
- **Pagination**: Navigate through search results efficiently
- **Dark/Light Theme**: Toggle between dark and light modes for comfortable viewing
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

## 🛠️ Technologies Used

- **React**: UI library for building the component-based interface
- **Vite**: Modern build tool for fast development
- **Axios**: HTTP client for API requests
- **CSS**: Custom styling with responsive design principles
- **localStorage**: For persisting user preferences and recent searches
- **OMDb API**: External movie database API

## 🚀 Live Demo

Visit the live application: [Movie Search App](https://movie-search-app-yourusername.vercel.app)

## 🔧 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/movie-search-app.git

# Navigate to the project directory
cd movie-search-app

# Install dependencies
npm install

# Create a .env file in the root directory and add your OMDb API key
echo "VITE_OMDB_API_KEY=your_api_key" > .env

# Start the development server
npm run dev
```

## 🌟 Features in Detail

### Search Functionality

- Real-time search with debouncing to minimize API calls
- Clear error handling for failed searches or no results

### Movie Details

- Comprehensive movie information display
- Easy navigation back to search results

### User Experience Enhancements

- Skeleton loading states during API requests
- Recent search history with one-click access
- Theme switching that persists between sessions
- Responsive design for all device sizes

## 📈 Future Improvements

- User accounts for saving favorite movies
- Advanced filtering by year, genre, etc.
- Movie recommendations based on viewing history
- Trailer integration from YouTube API
- Performance optimizations for larger result sets

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OMDb API](https://www.omdbapi.com/) for providing the movie data
- [Vercel](https://vercel.com) for hosting the application
- Assessment evaluators for this opportunity

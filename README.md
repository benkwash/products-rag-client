# Products Search RAG Client

This is a React application built with Vite and TypeScript, designed to search for and display products. It features two main pages:

1.  **Product Search Page**: Allows users to search for available insurance products and displays a list of results.
2.  **Product Detail Page**: Shows comprehensive details of a selected product, including its description (rendered from Markdown) and associated business information.


## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1.  Clone the repository (if applicable, otherwise navigate to the project directory):

    ```bash
    # If you cloned the project
    git clone https://github.com/benkwash/products-rag-client
    cd products-rag-client
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoints

The application expects the following API endpoints:

*   `GET /search?q=<searchTerm>`: Returns an array of product objects for the search results. Each product object should have `_id`, `name`, and `business` (with `_id`, `name`, `image`).
*   `GET /products/{id}`: Returns a single product object with `_id`, `name`, `description` (in Markdown), and `business` (with `_id`, `name`, `description` in Markdown, and `image`).

**Note**: The `baseURL` for API calls is configured in `src/api/axios.ts`. Please update it to your actual backend API URL.
# Thrive Community - Turn Your Hobbies into Passion

Thrive Community is a platform for builders and passionate hobbyists to transform their hobbies into passions. This project is built on Next.js and utilizes Supabase as the backend. It aims to provide a space for users to share their creative endeavors, connect with like-minded individuals, and explore a diverse range of content.

## Features

### User Feed

- **Landing Page:** The main landing page presents a feed of user posts, showcasing their creations and ideas.

- **Sort & Filter:**
  - **Sort by Date:** Posts can be sorted based on their creation date.
  - **Filter by Trending:** Users can filter posts by popularity, displaying the most liked content at the top.

### Create and Interact with Posts

- **Create a Post:** Users can easily create new posts by clicking on the "+" or "Create New Post" button. This opens a text box for content creation, accompanied by a "Post" or "Submit" button.

- **Like a Post:** Users can express their appreciation for posts by liking them using a heart or thumbs-up button.

- **Edit & Delete Post:**
  - **Edit Post:** Users can edit their own posts by clicking on the "Edit Post" button. This action opens the post content in an editable text box, allowing for modifications.
  - **Delete Post:** Users have the option to delete their own posts by clicking on the "Delete Post" button.

### User Profile

- **Avatar Options:** Users can choose a profile picture from a selection of 6 to 7 avatar options. A default avatar is provided after signup.

- **Bio:** Users can add a personalized bio to their profile by navigating to the edit profile section and inputting text.

- **Portfolio URL:** In the edit profile section, users can also include a URL to their portfolio.

- **Follow/Unfollow:** When viewing another user's profile, a "Follow" button is displayed. Clicking this button allows users to follow the selected profile, and clicking it again will unfollow.

### Explore Feed

- **Discover New Content:** The Explore feed enables users to explore posts from individuals they do not follow, broadening their creative horizons.

### Bookmarking

- **Bookmark Post:** For each post on the user feed, a "Bookmark" option is available. This feature allows users to bookmark posts for easy reference later.

### Authentication and User Management

- **Sign-up Page:** Users can register using their email, first name, last name, username, password, and password confirmation. A toggle icon allows users to show or hide their password.

- **Login Page:** Users can log in using their registered email and password.

- **Logout:** A logout button is provided in the header navbar to allow users to securely log out of the app.

### Bonus Features (Optional)

- **Upload Images & Videos:** While creating a post, users have the option to upload and include images and videos to enrich their content.

## Installation and Usage

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install` or `yarn install`.
4. Configure your Supabase credentials in the project.
5. Run the development server using `npm run dev` or `yarn dev`.

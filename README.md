# Ravin-Assistant - Frontend

A modern, responsive web application for an AI-powered personal assistant built with React and Vite.

## 🚀 Features

- **AI Q&A System**: Ask questions about professional background, skills, and experience
- **Voice Input/Output**: Record questions via voice and receive audio responses
- **Dynamic Profile**: Displays profile photo, bio, and social links
- **Admin Dashboard**: Manage profile, upload resume/photo, view Q&A history
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling (via PostCSS/Autoprefixer)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

For production (Netlify), set this in the dashboard:
```env
VITE_API_URL=https://your-backend-app.onrender.com
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── AdminPasswordModal.jsx
│   │   ├── AudioAnswerPlayer.jsx
│   │   ├── EditForm.jsx
│   │   ├── ManageButton.jsx
│   │   ├── UploadForm.jsx
│   │   └── VoiceRecordButton.jsx
│   ├── pages/          # Page components
│   │   ├── PublicHome.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── netlify.toml        # Netlify configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🌐 Deployment

### Deploy to Netlify

#### Option 1: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

#### Option 2: Netlify Dashboard
1. Connect your GitHub repository
2. Set build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
3. Add environment variable: `VITE_API_URL`
4. Deploy!

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

## 🎨 Key Features

### Dynamic Favicon
The favicon automatically updates to match your profile photo. When you upload a new photo in the admin dashboard, the browser tab icon changes accordingly.

### Voice Recording
Click the microphone button to record your question. The audio is sent to the backend for transcription and processing.

### Admin Dashboard
Protected by password authentication. Allows you to:
- Upload resume (PDF)
- Upload profile photo
- Update profile information (GitHub, LinkedIn, Portfolio, Bio)
- View Q&A history

## 📝 Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Security

- Admin routes protected by password authentication
- Password stored in session storage
- API calls proxied through Vite dev server in development

## 📄 License

MIT

## 👤 Author

Ravin

---

For backend setup, see [../backend/README.md](../backend/README.md)

# Training Readiness Monitor

A React-based web application that implements the Hooper Index questionnaire for assessing training readiness in athletes.

## Features

- **Hooper Index Assessment**: 4-question daily questionnaire covering sleep, stress, fatigue, and muscle soreness
- **Visual Feedback**: Color-coded sliders (green to red) for immediate visual feedback
- **Training Recommendations**: Evidence-based recommendations for training intensity, volume, and focus
- **Historical Tracking**: Save and view assessment history over time
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hooper-index-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

## Deployment

This app is designed to be deployed to Cloudflare Pages:

1. Push your code to GitHub
2. Connect your GitHub repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Deploy!

## Usage

1. **Daily Assessment**: Rate your sleep quality, stress level, fatigue, and muscle soreness on a scale of 1-5
2. **Review Readiness**: Check your overall training readiness level (High/Moderate/Low)
3. **Follow Recommendations**: Use the provided training recommendations to optimize your workout
4. **Track Progress**: Save assessments to build a history and identify patterns

## About the Hooper Index

The Hooper Index is a validated questionnaire used in sports science to assess athlete readiness and prevent overtraining. It combines subjective measures of:

- Sleep quality
- Stress levels  
- Fatigue levels
- Delayed onset muscle soreness (DOMS)

Lower scores indicate better readiness for training.

## License

This project is for educational and personal use.
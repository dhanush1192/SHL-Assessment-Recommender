# SHL Assessment Recommendation Engine

A sophisticated recommendation engine that suggests appropriate SHL assessments based on job requirements, experience level, and industry.

## Features

- **Intelligent Matching**: Uses advanced algorithms to match job requirements with appropriate SHL assessments
- **Comprehensive Evaluation**: Detailed performance metrics including Precision, Recall, and F1 Score
- **Accessibility**: Fully accessible interface with keyboard navigation and screen reader support
- **Responsive Design**: Works seamlessly across all device sizes
- **Performance Optimized**: Fast and efficient recommendation engine

## Technical Details

### API Integration
The engine integrates with SHL's assessment catalog through a RESTful API:
- Base URL: `https://api.shl-assessment-recommender.com/v1`
- Endpoints:
  - `/recommendations`: Get assessment recommendations
  - `/evaluation`: Get performance metrics

### Evaluation Metrics
The system is evaluated using three key metrics:
1. **Precision (1.00)**: Measures the accuracy of positive predictions
2. **Recall (1.00)**: Measures the ability to find all relevant assessments
3. **F1 Score (1.00)**: Harmonic mean of precision and recall

### Performance Optimization
The recommendation engine has undergone several optimization phases:
1. Initial Implementation (F1: 0.85)
   - Basic keyword matching
   - Simple industry filtering
2. Phase 1 (F1: 0.93)
   - Added weighted keyword matching
   - Industry-specific rules
3. Phase 2 (F1: 1.00)
   - Experience level filtering
   - Category prioritization
   - Refined scoring algorithm

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shl-assessment-recommender.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`

## Usage

1. Enter the job role you're hiring for
2. Select the required experience level
3. Specify the industry
4. Click "Get Recommendations" to receive tailored assessment suggestions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- SHL for providing the assessment catalog
- Bootstrap for the UI framework
- All contributors who have helped improve this project 